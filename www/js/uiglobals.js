//@ts-check
var adToken = 0;
const box = new Map(); const proStatus = {expire: 0, prodId: null};
// proStatus only work with one sub for now. Fix. todo

const 
donatelink = 'https://www.paypal.com/donate?hosted_button_id=P6VFWELXZESVQ',
googleplaystore = 'https://play.google.com/store/apps/details?id=com.standardguysoftware.fgg',
appversion = "App version: 6.0.0",
termslink = 'https://standardguytechnologies.github.io/Flaxa/',
emaillink = 'mailto:gethelp.fga@gmail.com',
liblink = "https://standardguytechnologies.github.io/Flaxa/external_lib.html";

const appmsgs = {
  donatelink, googleplaystore, appversion, termslink, emaillink, liblink
};

const G = require('./globals.js');
const F = Object.assign(
  { xDaysAgo, strDate, addSign, aboveThreshold, errorclose, }, G.func
);/* I want to add more properties na why */
const V = Object.assign({box, appmsgs, }, G.var);

document.addEventListener('proUser.config', function (evt) {
  evt.stopImmediatePropagation();
  proStatus.expire = evt.premium.expD;
  proStatus.prodId = evt.premium.prodId;
}, true);

function aboveThreshold(app, feature) {
  if (!window.cordova) return;
  if (!proStatus.prodId) {
    app.toast.show({
      text: `${feature} is available with premium.`,
      closeTimeout: 2500,
      destroyOnClose: true,
    });
  } else if (proStatus.expire < G.func.getFirstTime()) {
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
function addSign(num) {
  let isPositive = Math.sign(num)+1;
  let val = (isPositive) ? '+' : '-';
  return val;
}
const days = '00 01 02 03 04 05 06 07 09'.split(' ');
const weeks = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',');
const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
function dateformat (date) {
  let y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
  let day = date.getDay();
  return `${weeks[day]} ${days[d] || d}/${months[m]}/${y}`
}
function strDate(sqldate) {
  if (typeof sqldate === 'string') {
    return dateformat(new Date(sqldate));
  } else if (typeof sqldate === 'number') {
    return dateformat(G.func.utcTimeDate(sqldate*1000));
  } else {
    throw new Error ("Bad arguent "+typeof sqldate);
  }
}

let errE = new Event('blockui');
function errorclose(e='Something went wrong!') {
  console.log('errorclose showed'); console.log(e); 
  errE.err = e;
  document.dispatchEvent(errE);
}
module.exports = {F, V};