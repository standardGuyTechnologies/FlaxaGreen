//@ts-check
var adToken = 0;
const box = new Map(); const proStatus = {expire: 0, prodId: null};
// proStatus only work with one sub for now. Fix. todo
const analyzerRexe = /\[([^\*\t\v\n\r]+?):([\s\S]*?)\]/ig;
/* thus subtag cannot contain, asterik, or whitespace other than space */

const 
donatelink = 'https://www.paypal.com/donate?hosted_button_id=P6VFWELXZESVQ',
googleplaystore = 'https://play.google.com/store/apps/details?id=com.standardguysoftware.fgg',
appversion = "App version: 5.2.9",
deletewarn = "Deleting this account will permernently erease all of its data. This action cannot be undone.",
consolidatemsg = "Taking into account #n. consolidated via ",
supportmail = "<i class='far fa-envelope monoiconmargin'></i>usersupport@fgaccounts.com",
termslink = 'https://standardguytechnologies.github.io/Flaxa/',
emaillink = 'mailto:gethelp.fga@gmail.com',
liblink = "https://standardguytechnologies.github.io/Flaxa/external_lib.html",
about = {
  fblink: 'https://m.facebook.com/Flaxa-App-105522008703426/',
  twtlink: 'https://mobile.twitter.com/flaxa_app',
  instalink: 'https://www.instagram.com/flaxaapp'
},
credits = {
  twtusrname: '@1eyeddeveloper',
  twtusrlink: 'https://mobile.twitter.com/1eyeddeveloper',
  libraries: [
    'https://purecss.io/',
    'https://splidejs.com/',
    'https://fonts.google.com/',
    'https://fontawesome.com/free',
    'https://github.com/cakuki/cordova-plugin-exit',
    'https://github.com/apache/cordova-plugin-file',
    'https://github.com/apache/cordova-plugin-statusbar',
    'https://github.com/storesafe/cordova-sqlite-storage',
    'https://github.com/apache/cordova-plugin-inappbrowser',
    'https://github.com/apache/cordova-plugin-splashscreen',
    'https://github.com/chemerisuk/cordova-plugin-web-share'
  ],
  inspiration: [
    'https://w3schools.com/howto/howto_css_calendar.asp'
  ],
  licenses: [
    'https://opensource.org/licenses/MIT',
    'https://scripts.sil.org/OFL',
    'https://creativecommons.org/licenses/by/4.0/',
    'https://fontawesome.com/license/free',
    'https://apache.org/licenses/LICENSE-2.0'
  ]
}

const appmsgs = {
  donatelink, googleplaystore, appversion, deletewarn, consolidatemsg, supportmail, termslink, emaillink, liblink, about, credits,
};

// let ipcRenderer;
// if (process.env.ENVIRON === 'electron') {
//   // ({ipcRenderer} = require('electron'));
// } else if (process.env.ENVIRON === 'cordova') {
//   ({ipcRenderer} = require('../bundlehook/cordova/npmmodules'));
// }
// let stalker, stalker_init;
// if(process.env.STAGE == 'development'){
//   ({stalker, stalker_init} = require('source-breakpoint'));
// }else if(process.env.STAGE == 'production'){
//   (stalker = stalker_init = () => {});
// }
const G = require('./globals.js');
const F = Object.assign(
  { preload_image, cloneElement, xDaysAgo, daysDiff, save4analyzer, aboveThreshold, errorclose, }, G.func
);/* I want to add more properties na why */
const V = Object.assign({box, analyzerRexe, appmsgs, }, G.var);

document.addEventListener('adToken.update', function (evt) {
  evt.stopImmediatePropagation();
  adToken = evt.adToken;
}, true);
document.addEventListener('proUser.config', function (evt) {
  evt.stopImmediatePropagation();
  proStatus.expire = evt.premium.expD;
  proStatus.prodId = evt.premium.prodId;
}, true);

function cloneElement(template) {
  let cloner = document.createElement('div'), shell = document.createElement('div');
  if(typeof template == "string") {
    shell.innerHTML = template;
  }else if(template instanceof HTMLElement) {
    cloner.appendChild(template);
    shell.innerHTML = cloner.innerHTML;
  }
  return shell.children[0];
}
function aboveThreshold(app, feature, val) {
  if(process.env.STAGE === 'development') adToken = 1000;
  if (!proStatus.prodId && adToken < val) {
    app.toast.show({
      text: `Insufficient adTokens to access the ${feature} feature.`,
      closeTimeout: 2500,
      destroyOnClose: true,
    });
    return false;
  } else if (proStatus.prodId && proStatus.expire < G.func.getFirstTime() && adToken < val) {
    app.toast.show({
      text: `Your subscription has expired! Please check your billing information and network connection to reclaim access.`,
      closeTimeout: 2500,
      destroyOnClose: true,
    });
    return false;
  } else {
    return true;
  }
}
function xDaysAgo(date1, date2) {
  if(date1 > date2) ([date1, date2] = [date2, date1]);
  let epochdate = G.func.utcTimeDate(date2 - date1);
  let years = epochdate.getFullYear() - 1970;
  if (years == 0){ //check the months, then weeks then days
    let months = epochdate.getMonth();
    if(months == 0) { // check the weeks then days
      let days = epochdate.getDate() - 1, weeks = Math.floor(days/7);
      if(weeks == 0) {
          let stampmsg = (days > 1) ? `${days} days ago` 
            : (days === 1) ? `${days} day ago`: "today";
          return stampmsg;
      } else {
        let stamp = (weeks > 1) ? "weeks" : "week";
        return (`${weeks} ${stamp} ago`);
      }
    }else {
      let stamp = (months > 1) ? "months" : "month";
      return (`${months} ${stamp} ago`)
    }
  }else {
    let stamp = (years > 1) ? "years" : "year";
    return (`${years} ${stamp} ago`);
  }
}

function daysDiff(stamp1, stamp2){
  if(typeof (stamp1+stamp2) !== 'number' || isNaN(stamp1+stamp2)){
    alert('args must be a number'); throw new Error();
  } 
  if(stamp1 > stamp2) [stamp1, stamp2] = [stamp2, stamp1];
  let d1 = new Date(stamp1), d2 = new Date(stamp2); let deltaD = 0;
  stamp1 = (d1.setHours(0), d1.setMinutes(0), d1.setSeconds(0), d1.setMilliseconds(0));
  stamp2 = (d2.setHours(0), d2.setMinutes(0), d2.setSeconds(0), d2.setMilliseconds(0));
  while(stamp1 !== stamp2){
    let approxD = Math.ceil((stamp2 - stamp1)/(25*3600000));
    stamp1 = d1.setDate(approxD+d1.getDate());
    deltaD+=approxD;
  }
  return deltaD;
}
const list = [];
function preload_image (imgarr) {
  imgarr.forEach(link => {
    if (list.includes(link)) return;
    let img = new Image();
    img.src = link; $q('#img-preloader').appendChild(img);
    list.push(link);
  })
}
function save4analyzer(db, acc, selectdatenum, analyzer) {
  /* combine idential elements in the analyzer, so it is not lost during backup. Issue described on UpNext tasks for v5.2 */
  analyzer = analyzer.sort((a, b) => {
    let aSort = a.parent+a.name, bSort = b.parent+b.name;
    if (aSort> bSort) return 1;
    else if (aSort < bSort) return -1;
    else return 0;
  }).reduce((a, x) => {
    if (!a.length) a.push(x);
    else {
      let obj = a[a.length-1];
      if (obj.parent === x.parent && obj.name === x.name) {
        obj.subtotal += x.subtotal;
      } else { a.push(x); }
    }
    return a;
  }, []);

  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM ANALYZER WHERE acc = ? AND date = ?', [acc, selectdatenum])
    }, function (e) { reject(e) }, function () {
      db.transaction(function (tx) {
        analyzer.forEach((obj) => {
          const { parent, name, subtotal } = obj;
          tx.executeSql(
            'INSERT INTO ANALYZER (acc, date, parent, name, subtotal) VALUES (?, ?, ?, ?, ?)', [acc, selectdatenum, parent, name, subtotal]
          );
        })
      }, function (e) { reject(e) }, function () { resolve('') })
    })
  })
}

let errE = new Event('blockui');
function errorclose(e='Something went wrong!') {
  console.log('errorclose showed'); console.log(e); 
  errE.err = e;
  document.dispatchEvent(errE);
}
module.exports = {F, V};