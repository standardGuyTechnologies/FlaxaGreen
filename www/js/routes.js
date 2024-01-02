// import Setup from "../pages/app-setup.f7.html"
import Home from "../pages/home.f7.html"
import Ginfo from "../pages/general-info.f7.html"
import Records from "../pages/records.f7.html"
import Fast from "../pages/fast.f7.html"
import Tracking from "../pages/tracking.f7.html"
import NewTracking from "../pages/new-tracking.f7.html"
import ResolveTracking from "../pages/resolve-tracking.f7.html"

import getDB from './db.js';
import G from './uiglobals.js';
const {toUTCms, strDate } = G.F;

export default [
  {
    path: '/',
    async: function ({ app, resolve, reject }) {
      const db = getDB();
      const tlmap = new Map();
      db.transaction(function (tx) {
        tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, tdiff FROM TRACKDIFF LEFT JOIN QUICKDIFF USING(date, acc) WHERE qdiff IS NULL', [], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i); x.qdiff = 0;
            let date = x.date, acc = x.acc;
            tlmap.set(date+acc, x);
          }
        })
        tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc)', [], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i); if (!x.tdiff) x.tdiff = 0;
            let date = x.date, acc = x.acc;
            tlmap.set(date+acc, x);
          }
        })
      }, function (e) {reject(); console.log(e)}, function () {
        resolve(
          { component: Home }, 
          { 
            props: { data: [...tlmap.entries()] } 
          }
        )
      });
    },
    master: true,
    detailRoutes: [
      {
        path: '/transact/:date/:acc/',
        async: function ({ app, from, to, resolve, reject }) {
          const db = getDB(), arr0 = [], arr1 = [], arr2 = [];
          const date = Number(to.params.date), acc = to.params.acc;
          const datestr = strDate(date);
          db.transaction(function (tx) {
            tx.executeSql('SELECT categ, subcateg, COUNT(*) AS instances, SUM(amt) AS sumamt FROM QUICK INNER JOIN TRANSFER USING(date, acc, tid) WHERE date = ? AND acc = ? AND categ = ? GROUP BY categ, subcateg', [date, acc, "Money Transfer"], function (tx, result) {
              const res = result.rows; 
              for(let i=0; i<res.length; i++){
                arr0.push(res.item(i));
              }
            })
            tx.executeSql('SELECT categ, subcateg, COUNT(*) AS instances, SUM(amt) AS sumamt FROM QUICK WHERE date = ? AND acc = ? AND categ <> ? GROUP BY categ, subcateg', [date, acc, "Money Transfer"], function (tx, result) {
              const res = result.rows; 
              for(let i=0; i<res.length; i++){
                arr1.push(res.item(i));
              }
            })
            tx.executeSql('SELECT categ, info, COUNT(*) AS instances, SUM(val) AS sumamt FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE categ <> ? AND type <> ? AND date = ? AND acc = ? GROUP BY categ', ["Pledge", "forfeit", date, acc], function (tx, result) {
              const res = result.rows; 
              for(let i=0; i<res.length; i++){
                arr2.push(res.item(i));
              }
            })
          }, function (e) {reject(); console.log(e)}, function () {
            resolve(
              { component: Records }, 
              { 
                props: { date, datestr, acc, ndata: arr0, qdata: arr1, tdata: arr2  } 
              }
            )
          });
        },
      },
      {
        path: '/fast-transactions/',
        component: Fast,
        options: {
          animate: true,
        },
        beforeEnter: function ({app, to, resolve}) {
          const date = Number(to.query.date), acc = to.query.acc;
          app.store.dispatch('accrefresh', acc);
          resolve();
        },
        beforeLeave: function ({app, to, resolve}) {
          app.store.dispatch('accrefresh', '');
          resolve();
        },
      },
      {
        path: '/tracking-transactions/',
        async: function ({ app, from, to, resolve, reject }) {
          const date = Number(from.params.date), acc = from.params.acc;
          const db = getDB();
          db.transaction(function (tx) {
            tx.executeSql('SELECT id, date, acc, categ, party, SUM(val) AS pending FROM TRACK LEFT JOIN TRACKPHASE USING(id) WHERE state = ? GROUP BY categ, subcateg, party HAVING date <= ? ORDER BY date DESC', ['active', date], function (tx, result) {
              const arr = [], res = result.rows;
              for(let i=0; i<res.length; i++){
                arr.push(res.item(i));
              }
              resolve(
                { component: Tracking }, 
                { 
                  props: { data: arr, date, acc } 
                }
              )
            })
          }, function (e) {reject(); console.log(e)}, function () {});
        },
      },
      {
        path: '/new-tracking/',
        component: NewTracking,
        options: {
          animate: true,
        },
      },
      {
        path: '/resolve-track/',
        async: function ({ app, from, to, resolve, reject }) {
          const id = Number(to.query.id), date = Number(to.query.date), acc = to.query.acc;
          const db = getDB(); const data = {};
          db.transaction(function (tx) {
            tx.executeSql('SELECT id, date, acc, categ, subcateg, party, intent, val FROM TRACK LEFT JOIN TRACKPHASE USING(id) WHERE id = ? ORDER BY date ASC LIMIT 1', [id], function (tx, result) {
              Object.assign(data, result.rows.item(0));
            })
            tx.executeSql('SELECT date AS date2, acc AS acc2, SUM(val) AS val2 FROM TRACKPHASE WHERE id = ? ORDER BY date DESC LIMIT 1', [id], function (tx, result) {
              Object.assign(data, result.rows.item(0));
            })
          }, function (e) {reject(); console.log(e)}, function () {
            resolve(
              { component: ResolveTracking }, 
              { 
                props: { data, date, acc } 
              }
            )
          });
        },
      },
    ],
  },
  {
    path: '/general-info/',
    async: function ({ app, resolve, reject }) {
      const db = getDB(); const query2 = [], query3 = []; const activetrack = [];
      let trackamt = {}, trackr = {}, trackf = {};
      db.transaction(function (tx) {
        tx.executeSql('SELECT acc, SUM(qdiff) AS qnet, SUM(tdiff) AS tnet FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) GROUP BY acc ORDER BY acc', [], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            query2.push(res.item(i));
          }
        })
        tx.executeSql('SELECT acc, SUM(tdiff) AS tnet FROM TRACKDIFF LEFT JOIN QUICKDIFF USING(date, acc) WHERE qdiff IS NULL GROUP BY acc ORDER BY acc', [], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i); x.qnet = 0;
            query3.push(x);
          }
        })
        tx.executeSql('SELECT categ, COUNT(*) AS num FROM TRACK WHERE state = ? GROUP BY categ', ['active'], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            activetrack.push(res.item(i));
          }
        })
        // stats
        tx.executeSql('SELECT categ, subcateg, SUM(val) AS net FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE type = ? GROUP BY categ, subcateg', ['amt'], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i);
            trackamt[x.categ+x.subcateg] = x.net;
          }
        })
        tx.executeSql('SELECT categ, subcateg, SUM(val) AS rnet FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE type = ? GROUP BY categ, subcateg', ['repaid'], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i);
            trackr[x.categ+x.subcateg] = x.rnet;
          }
        })
        tx.executeSql('SELECT categ, subcateg, SUM(val) AS fnet FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE type = ? GROUP BY categ, subcateg', ['forfeit'], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i);
            trackf[x.categ+x.subcateg] = x.fnet;
          }
        })
      }, function (e) {reject(); console.log(e)}, function () {
        const query1 = app.store.getters.getaccobj.value;
        const arr = query1.map((x, i) => {
          const acc = query2[i] ? query2[i].acc : null;
          if (x.acc == acc) x.bal += query2[i].qnet + query2[i].tnet;
          const acc2 = query3[i] ? query3[i].acc2 : null;
          if (x.acc == acc2) x.bal += query3[i].qnet + query3[i].tnet;
          return x;
        })
        const totalcount = query1.length;
        const totalbal = arr.reduce((a, x) => { return a += x.bal }, 0);
        resolve(
          { component: Ginfo }, 
          { 
            props: { data: arr, totalcount, totalbal, activetrack, trackamt, trackr, trackf } 
          }
        )
      });
    },
  },
  {
    path: '/paywall/',
    componentUrl: './pages/meta/paywall.f7.html',
  },
  {
    path: '/left-page-2/',
    componentUrl: './pages/left-page-2.f7.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];