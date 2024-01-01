// Import entire bundle, but it will affect app load time
import Framework7, { Dom7, createStore } from "framework7/bundle";

import Mainapp from "../pages/index.f7.html"
import routes from "./routes.js"
import params from "./store.js"
import {recordsItemSheet, recordsTrackSheet, recordsTransferSheet} from "./custom-components.js"
import {initDB} from './db.js';
import G from './uiglobals.js'; 
// import {adsSDKconfig, paymentsSDKconfig} from './meta/sdk.js'; 

const { toUTCms, xDaysAgo, digitcomma, reset_currtokens} = G.F;
const { labelmap, trackermap, box, appmsgs, } = G.V;

// Register custom components
Framework7.registerComponent(
  'records-item-sheet', recordsItemSheet
)
Framework7.registerComponent(
  'records-track-sheet', recordsTrackSheet
)
Framework7.registerComponent(
  'records-transfer-sheet', recordsTransferSheet
)

var $ = Dom7;
var device = Framework7.getDevice();
const store = createStore(params);

var app = new Framework7({
  name: 'Flaxa', // App name
  theme: 'ios',
  colors: {
    primary: '#1ceb4f',
  },

  el: '#app', // App root element
  component: Mainapp,
  init: false,
  initOnDeviceReady: false,

  store: store,
  routes: routes,
  clicks: {
    // avoid link class
    externalLinks: '.external',
  },
  
  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});
function mockdata (db) {
  return new Promise((resolve, reject) => {
    if (window.sqlitePlugin) return;
    db.transaction(function (tx) {
      window.db = db; // todo del;
      tx.executeSql("INSERT INTO CONFIG (mode) VALUES ('light')");
      tx.executeSql("INSERT INTO ACCOUNTS (acc, bal) VALUES ('FirstBank', 30000), ('GTBank', 17000);");
      tx.executeSql('\
      INSERT INTO QUICK (date, acc, categ, subcateg, item, amt, qty, location) VALUES \
      (1703456767, "FirstBank", "Expenses", "Fast Food", "Cheese Burger", -600, 2, "Shoprite"),\
      (1703456767, "GTBank", "Expenses", "Connectivity", "MTN airtime", -4000, 1, "Valley Estate"),\
      (1702166400, "GTBank", "Wages", "Freelance", "Web Design", 2500, null, "Ikorodu"),\
      (1702252800, "FirstBank", "Expenses", "News", "The Sun", -180, 1, "Victoria Island"),\
      (1702425600, "GTBank", "Expenses", "Games", "Fifa23", -1400, 1, "Jos market"),\
      (1702598400, "FirstBank", "Expenses", "Clothes", "Casuals", -3000, 4, "Alausa market")', [], function (tx, result) {
        tx.executeSql('INSERT INTO QUICKDIFF SELECT date, acc, SUM(amt) AS qdiff FROM QUICK GROUP BY date, acc;', [], function (tx, result) {});
      });
      tx.executeSql('\
      INSERT INTO TRACK (id, categ, subcateg, state, party) VALUES\
      (193671473, "Loan", "out", "active", "Chukwulozie"),\
      (198097934, "Deposit", "in", "active", "Chukwulozie"),\
      (1667998085, "Loan", "in", "active", "FirstBank"),\
      (1478170465, "Loan", "in", "active", "Microventures")');
      tx.executeSql('\
      INSERT INTO TRACKPHASE (id, date, acc, info, val, type) VALUES \
      (193671473, 1703456767, "FirstBank", "Lolos business", -2200, "amt"),\
      (435744213, 1703456767, "GTBank", "Harvest", 3000, "amt"),\
      (198097934, 1703456767, "FirstBank", "Lolos safe withdrawal", -500, "repaid"),\
      (198097934, 1702166400, "FirstBank", "Lolos safe", 1200, "amt"),\
      (1667998085, 1702252800, "FirstBank", "Bank loan", 2000, "amt"),\
      (1478170465, 1702425600, "GTBank", "Corporate loan", 5000, "amt")', [], function (tx, result) {
        tx.executeSql('INSERT INTO TRACKDIFF SELECT date, acc, SUM(val) AS tdiff FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE categ <> "Pledge" AND type <> "forfeit" GROUP BY date, acc', [], function (tx, result) {});
      });
    }, function (e) {reject(e)}, function () {resolve(db)});
  })
}

document.addEventListener('deviceready', () => {
  // adsSDKconfig(); paymentsSDKconfig(); //todo uncomment
  initDB().then(mockdata).then(db => {
    store.dispatch('accrefresh', '');
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM CONFIG', [], function (tx, result) {
        if (!result.rows.length) {
          // store.dispatch("accExists", false);
        } else {
          store.dispatch("mode", result.rows.item(0).mode);
          // reset_currtokens(result.rows.item(0));
          // store.dispatch("accExists", true); 
        }
      })
    }, function (e) {console.log(e)}, function () {app.init()});
  }).catch(e => console.log(e))
}, false);

if (typeof cordova === 'undefined') {
  document.dispatchEvent(new Event('deviceready'));
}


document.addEventListener('securitypolicyviolation', (e) => {
  console.log(e.blockedURI);
  console.log(e.violatedDirective);
  console.log(e.originalPolicy);
  setTimeout(() => cordova.plugins.exit(), 5000);
  alert('securitypolicyviolation');
});
