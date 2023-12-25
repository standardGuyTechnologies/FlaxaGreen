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

document.addEventListener('deviceready', () => {
  // adsSDKconfig(); paymentsSDKconfig(); todo uncomment
  initDB().then(db => {
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
  })
}, false);

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
