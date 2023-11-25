// Import entire bundle, but it will affect cordova app load time
// import Framework7, { Dom7, createStore } from "framework7/bundle";

// ===== OR use Lazy Modules =====

// Import core framework
import Framework7, { Dom7, createStore } from "framework7";
// Import additional components
import Panel from 'framework7/components/panel';
import Progressbar from 'framework7/components/progressbar';
import LoginScreen from 'framework7/components/login-screen';
import Swiper from 'framework7/components/swiper';
import Card from 'framework7/components/card';
import Fab from 'framework7/components/fab';
import Picker from 'framework7/components/picker';
import Popover from 'framework7/components/popover';
import Swipeout from 'framework7/components/swipeout';
import Preloader from 'framework7/components/preloader';
import Input from 'framework7/components/input';
// Error: I don't wish to import input yet, but if i dont i lose auto form validate

// Import components css: imported with webpack css-style loaders
import 'framework7/components/panel/css';
import 'framework7/components/progressbar/css';
import 'framework7/components/login-screen/css';
import 'framework7/components/swiper/css';
import 'framework7/components/card/css';
import 'framework7/components/fab/css';
import 'framework7/components/picker/css';
import 'framework7/components/popover/css';
import 'framework7/components/swipeout/css';
import 'framework7/components/preloader/css';
import 'framework7/components/input/css';

Framework7.use([
  Panel,
  Progressbar,
  LoginScreen,
  Swiper,
  Card,
  Fab,
  Picker,
  Popover,
  Swipeout,
  Preloader,
  Input,
]);

import Mainapp from "../pages/index.f7.html"
import routes from "./routes.js"
import params from "./store.js"
// import getDB, {initDB} from './db.js';
// import G from './uiglobals.js'; todo 

/* error: no G */
// const { utcTimeDate, xDaysAgo, digitcomma, computeInput, save4analyzer, reset_currtokens, errorclose } = G.F;
// const { ipcRenderer, labelmap, trackermap, box, analyzerRexe, appmsgs, } = G.V;

// Register custom components
Framework7.registerComponent(
  'custom-component', (props, { $h, $f7, $update }) => {
  }
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


Promise.all([
  import ('framework7/components/accordion'),
  import ('framework7/components/grid'),
  import ('framework7/components/dialog'),
  import ('framework7/components/popup'),
  import ('framework7/components/form'),
  import ('framework7/components/radio'),
  import ('framework7/components/toast'),
  import ('framework7/components/timeline'),
  import ('framework7/components/searchbar'),
  // import ('framework7/components/stepper'), //not using the api for now, just css
  import ('framework7/components/range'),
  import ('framework7/components/chip'),
  import ('framework7/components/typography'),
  import ('framework7/components/calendar'),
  import ('framework7/components/gauge'),
  import ('framework7/components/sheet'),
  import ('framework7/components/data-table'),
  import ('framework7/components/toggle'),
  import ('framework7/components/tabs'),
]).then((modules) => {
  return app.loadModules(modules.map(module => module.default));
}).then(() => {
  console.log('lazy modules loaded')
})

document.addEventListener('securitypolicyviolation', (e) => {
  console.log(e.blockedURI);
  console.log(e.violatedDirective);
  console.log(e.originalPolicy);
  setTimeout(() => cordova.plugins.exit(), 5000);
  alert('securitypolicyviolation');
});