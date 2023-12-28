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

const props1 = {};

export default [
  {
    path: '/',
    async: function ({ app, resolve, reject }) {
      const db = getDB(), arr1 = [], arr2 = []; let arr;
      db.transaction(function (tx) {
        tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, tdiff FROM TRACKDIFF LEFT JOIN QUICKDIFF USING(date, acc) WHERE qdiff IS NULL', [], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i); x.net = x.tdiff;
            arr2.push(x);
          }
        })
        tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc)', [], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i); 
            if (!x.tdiff) x.tdiff = 0; x.net = x.qdiff + x.tdiff;
            arr1.push(x);
          }
        })
      }, function (e) {reject(); console.log(e)}, function () {
        arr = [...arr1, ...arr2].sort((x, y) => y.date - x.date);
        resolve(
          { component: Home }, 
          { 
            props: { data: arr } 
          }
        )
      });
    },
    master: true,
    detailRoutes: [
      {
        path: '/transact/:date/:acc/',
        async: function ({ app, from, to, resolve, reject }) {
          const db = getDB(), arr1 = [], arr2 = [];
          const date = Number(to.params.date), acc = to.params.acc;
          const datestr = strDate(date);
          db.transaction(function (tx) {
            tx.executeSql('SELECT categ, subcateg, info, COUNT(*) AS instances, SUM(amt) AS sumamt FROM QUICK WHERE date = ? AND acc = ? GROUP BY categ, subcateg', [date, acc], function (tx, result) {
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
                props: { date, datestr, acc, qdata: arr1, tdata: arr2  } 
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
          props: props1
        },
        beforeEnter: function ({from, to, resolve}) {
          props1.date = Number(from.params.date); props1.acc = from.params.acc;
          resolve();
        },
      },
      {
        path: '/tracking-transactions/',
        async: function ({ app, from, to, resolve, reject }) {
          props1.date = Number(from.params.date); props1.acc = from.params.acc;
          const db = getDB();
          db.transaction(function (tx) {
            tx.executeSql('SELECT id, date, acc, categ, party, SUM(val) AS pending FROM TRACK LEFT JOIN TRACKPHASE USING(id) WHERE state = ? GROUP BY categ, subcateg, party HAVING date <= ? ORDER BY date DESC', ['active', props1.date], function (tx, result) {
              const arr = [], res = result.rows;
              for(let i=0; i<res.length; i++){
                arr.push(res.item(i));
              }
              resolve(
                { component: Tracking }, 
                { 
                  props: { data: arr, date: props1.date, acc: props1.acc } 
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
          props: props1
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
      const db = getDB(); let query1, query2; const activetrack = [];
      let trackamt = {}, trackr = {}, trackf = {};
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ACCOUNTS ORDER BY acc', [], function (tx, result) {
          query1 = result.rows;
        })
        tx.executeSql('SELECT acc, SUM(qdiff) AS qnet, SUM(tdiff) AS tnet FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) GROUP BY acc ORDER BY acc', [], function (tx, result) {
          query2 = result.rows;
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
        const arr = []; let i = 0, j = 0;
        for(; i<query1.length; i++){
          let x = query1.item(i); x.bal += query2.item(i).qnet + query2.item(i).tnet;
          arr.push(x); j += x.bal;
        }
        resolve(
          { component: Ginfo }, 
          { 
            props: { data: arr, totalcount: i, totalbal: j, activetrack, trackamt, trackr, trackf } 
          }
        )
      });
    },
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },

  {
    path: '/left-page-1/',
    url: './pages/left-page-1.html',
  },
  {
    path: '/left-page-2/',
    url: './pages/left-page-2.html',
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    componentUrl: './pages/dynamic-route.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];

/* let packed = arr.reduce((a, x) => {
            if (a.a.date === x.date && a.a.acc === x.acc) {
              a.a[x.type] = x.sumamt;
              a.result.push(Object.assign({}, a.a));
              a.a = {}; return a;
            } else {
              a.a = Object.assign({}, x); delete a.a.type; delete a.a.sumamt;
              a.a[x.type] = x.sumamt; return a;
            }
          }, {result:[], a: {}}) */