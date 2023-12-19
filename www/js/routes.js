// import Setup from "../pages/app-setup.f7.html"
import Home from "../pages/home.f7.html"
import Ginfo from "../pages/general-info.f7.html"
import Records from "../pages/records.f7.html"
import Fast from "../pages/fast.f7.html"
import Tracking from "../pages/tracking.f7.html"
import NewTracking from "../pages/new-tracking.f7.html"


export default [
  {
    path: '/',
    async: function ({ app, resolve, reject }) {
      const db = getDB();
      db.transaction(function (tx) {
        tx.executeSql('SELECT date, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) ORDER BY date DESC, rowid DESC', [], function (tx, result) {
          const arr = [], res = result.rows;
          for(let i=0; i<res.length; i++){
            let x = res.item(i); x.net = x.qdiff + x.tdiff;
            arr.push(x);
          }
          resolve(
            // todo need a list of accounts on the homepage. do this on component mount
            { component: Home }, 
            { 
              props: { data: arr } 
            }
          )
        })
      }, function (e) {reject(); console.log(e)}, function () {});
    },
    master: true,
    detailRoutes: [
      {
        path: '/transact/:date/:acc/',
        async: function ({ app, from, to, resolve, reject }) {
          const db = getDB(); const date = to.params.date, acc = to.params.acc;
          const arr1 = [], arr2 = [];
          db.transaction(function (tx) {
            tx.executeSql('SELECT categ, subcateg, COUNT(*) AS instances, SUM(amt) AS sumamt FROM QUICK GROUP BY categ, subcateg HAVING date = ? AND acc = ?', [date, acc], function (tx, result) {
              const res = result.rows; 
              for(let i=0; i<res.length; i++){
                arr1.push(res.item(i));
              }
            })
            tx.executeSql('SELECT categ, COUNT(*) AS instances, SUM(amt) AS sumamt FROM TRACK INNER JOIN TRACKDIFF td USING(id) GROUP BY categ HAVING td.date = ? AND td.acc = ?', [date, acc], function (tx, result) {
              const res = result.rows; 
              for(let i=0; i<res.length; i++){
                arr2.push(res.item(i));
              }
            })
          }, function (e) {reject(); console.log(e)}, function () {
            resolve(
              { component: Records }, 
              { 
                props: { qdata: arr1, tdata: arr2  } 
              }
            )
          });
        },
      },
      {
        path: '/fast-transactions/',
        component: Fast,
      },
      {
        path: '/tracking-transactions/',
        component: Tracking,
      },
      {
        path: '/new-tracking/',
        component: NewTracking,
      },
    ],
  },
  {
    path: '/general-info/',
    async: function ({ app, resolve, reject }) {
      const db = getDB(); let query1, query2; const activeT = [];
      db.transaction(function (tx) {
        tx.executeSql('SELECT acc, SUM(qdiff) AS qnet, SUM(tdiff) AS tnet FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) GROUP BY acc ORDER BY acc', [], function (tx, result) {
          query2 = result.rows;
        })
        tx.executeSql('SELECT * FROM ACC ORDER BY acc', [], function (tx, result) {
          query1 = result.rows;
        })
        tx.executeSql('SELECT categ, COUNT(*) AS num FROM TRACK GROUP BY categ HAVING state = ?', ['active'], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            activeT.push(res.item(i));
          }
        })
        // test query for errors! todo
        tx.executeSql('SELECT categ, subcateg, phase, SUM(amt) AS net FROM TRACK INNER JOIN TRACKPHASE USING(id) GROUP BY categ, subcateg HAVING phase = ?', [1], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            trackstat1.push(res.item(i)); // todo no trackstat1
          }
        })
        tx.executeSql('SELECT categ, subcateg, SUM(repaid) AS rnet, SUM(forfeit) AS fnet FROM TRACK INNER JOIN TRACKPHASE USING(id) GROUP BY categ, subcateg', [], function (tx, result) {
          const res = result.rows;
          for(let i=0; i<res.length; i++){
            trackstat2.push(res.item(i)); // todo no trackstat2
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
            props: { data: arr, totalcount: i, totalbal: j, activeT  } 
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