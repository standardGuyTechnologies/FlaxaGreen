// Import entire bundle, but it will affect app load time
import Framework7, { Dom7, createStore } from "framework7/bundle";

import Mainapp from "../pages/index.f7.html"
import routes from "./routes.js"
import params from "./store.js"
import {recordsItemSheet, recordsTrackSheet} from "./custom-components.js"
import {initDB} from './db.js';
import G from './uiglobals.js'; 

const { utcTimeDate, xDaysAgo, digitcomma, computeInput, save4analyzer, reset_currtokens, errorclose } = G.F;
const { ipcRenderer, labelmap, trackermap, box, analyzerRexe, appmsgs, } = G.V;

// Register custom components
Framework7.registerComponent(
  'records-item-sheet', recordsItemSheet
)
Framework7.registerComponent(
  'records-track-sheet', recordsTrackSheet
)

var $ = Dom7;
var device = Framework7.getDevice();
const store = createStore(params);

var app = new Framework7({
  name: 'Flaxa Green', // App name
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
  window.db = db; // todo del;
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql("INSERT INTO CONFIG (currency, currindex, delimeter) VALUES ('$', 0, ',')");
      tx.executeSql("INSERT INTO ACCOUNTS (acc, bal) VALUES ('FirstBank', 30000), ('GTBank', 17000);");
      tx.executeSql('\
      INSERT INTO QUICK (date, acc, categ, subcateg, item, amt, qty, location) VALUES \
      (1703456767, "FirstBank", "Expenses", "Fast Food", "Cheese Burger", -600, 2, "Alausa market"),\
      (1703456767, "GTBank", "Expenses", "Connectivity", "MTN airtime", -4000, 1, null),\
      (1702166400, "GTBank", "Wages", "Freelance", "Web Design", 2500, null, "Ikorodu"),\
      (1702252800, "FirstBank", "Expenses", "News", "The Sun", -180, 1, "Mangoro"),\
      (1702425600, "GTBank", "Expenses", "Games", "Fifa23", -1400, 1, "Alausa market"),\
      (1702598400, "FirstBank", "Expenses", "Clothes", "Casuals", -3000, 4, "Alausa market")', [], function (tx, result) {
        tx.executeSql('INSERT INTO QUICKDIFF SELECT date, acc, SUM(amt) AS qdiff FROM QUICK GROUP BY date, acc;', [], function (tx, result) {});
      });
      tx.executeSql('\
      INSERT INTO TRACK (id, categ, subcateg, state, party) VALUES\
      (193671473, "Loan", "out", "active", "Chukwulozie"),\
      (435744213, "Pledge", "out", "active", "Church"),\
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
  // adsSDKconfig(); paymentsSDKconfig(); todo uncomment
  initDB().then(mockdata).then(db => {
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM CONFIG', [], function (tx, result) {
        if (!result.rows.length) {
          store.dispatch("accExists", false);
        } else {
          reset_currtokens(result.rows.item(0));
          store.dispatch("accExists", true); 
        }
      })
    }, function (e) {console.log(e)}, function () {app.init()});
  }).catch(e => console.log(e))
}, false);

if (typeof cordova === 'undefined') {
  document.dispatchEvent(new Event('deviceready'));
}

function adsSDKconfig () {
  // Before loading ads, have your app initialize the Google Mobile Ads SDK by calling
  // This needs to be done only once, ideally at app launch.
  cordova.plugins.emiAdmobPlugin.initialize(
    // Optional
    (info) => { console.log(info) },
    (error) => { console.log(error) }
  );
  document.addEventListener('on.sdkInitialization', () => {
    console.log("\n On Sdk Initialization");
  });
}
function paymentsSDKconfig() {
  // Configure RevenueCat SDK
  if (process.env.ENVIRON === 'development') {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE); // should make a version 4 production
  }
  if (window.cordova.platformId === 'ios') {
    // Purchases.configureWith({ apiKey: <public_ios_sdk_key> });
  } else if (window.cordova.platformId === 'android') {
    Purchases.configureWith({ apiKey: "goog_bJcMgQgiGSTGUiKqNcWKGhhlIzi" });
    // OR: if building for Amazon, be sure to follow the installation instructions then:
    // Purchases.configureWith({ apiKey: <public_amazon_sdk_key>, useAmazon: true });
  }
  Purchases.getCustomerInfo(
    customerInfo => {
      Object.keys(customerInfo.entitlements.all).forEach(e_id => {
        let status = customerInfo.entitlements.all[e_id];
        let isActive = status.isActive, prodId = status.productIdentifier;
        let arr = status.expirationDate ?
          status.expirationDate.split('T').shift().split('-').map(x => Number(x)) :
          [1970, 1, 1];
        let expD = Date.UTC(arr[0], arr[1] - 1, arr[2]);
        let premium = { isActive, prodId, expD };
        let proEvt = new Event('proUser.config'); proEvt.premium = premium;
        document.dispatchEvent(proEvt);
      });
    },
    error => {
      console.log('Error fetching customerInfo', error);
      console.log(error.message, error.readableErrorCode)
    }
  )
}

document.addEventListener('securitypolicyviolation', (e) => {
  console.log(e.blockedURI);
  console.log(e.violatedDirective);
  console.log(e.originalPolicy);
  setTimeout(() => cordova.plugins.exit(), 5000);
  alert('securitypolicyviolation');
});
