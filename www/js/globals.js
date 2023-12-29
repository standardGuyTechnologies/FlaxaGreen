//@ts-check
const maxamt = Math.pow(10, 15);/* 1000 trillion */
let currency, currindex, delimeter, sanitize = /\D/g;

const labelmap = new Map([
  ['l', {
    label: "Lost", 
    sign: -1, 
    placeholder: "Cash lost", 
    subcateg: ["Fined", "Misplaced", "Swindled", "Stolen"], 
  }],
  ['t', {
    label: "Taxes", 
    sign: -1, 
    placeholder: "Taxes paid", 
    subcateg: ["Toll", "Income Tax", "Value Added Tax", "Property Tax", "Corporate Tax", "Stamp Duty", ],
  }],
  ['w', {
    label: "Wages", 
    sign: +1, 
    placeholder: "Wages received", 
    subcateg: ["Freelance", "Part time", "Full time"], 
  }],
  ['p', {
    label: "Payout", 
    sign: -1, 
    placeholder: "Administered payouts", 
    subcateg: ["Allowance", "Reimburse", "Rewards", "Tuition" ,"Grant", "Payroll", "Pension", ], 
  }],
  ['tr', {
    label: "Tributes", 
    sign: +1, 
    placeholder: "Tributes received", 
    subcateg: ["Registration", "Membership", "Levied tax", "Levied fine"], 
  }],
  ['aw', {
    label: "Awarded", 
    sign: +1, 
    placeholder: "Awards received", 
    subcateg: ["Allowance", "Gifts", "Tuition", "Prize", "Grant", "Bonuses", "Subsidy", "Pension", "Donations"], 
  }],
  ['x', {
    label: "Expenses", 
    sign: -1, 
    placeholder: "Cash spent", 
    subcateg: ["Travel", "Commute", "Meals", "Fast food", "Snacks", "Drinks", "Fruits", "Drugs", "Connectivity", "Clothes", "Ornaments", "Provisions", "News", "Books", "Printing", "Furniture", "Devices", "Equipment", "Tuition", "Rent", "Bills", "Maintenance", "Repairs", "Saloon", "Toys", "Art", "Photos", "Movie", "Music", "Games", "Leisure", "Artifact", "Registration", "Membership", "Refuel", "Vehicle"], 
  }],
  ['d', {
    label: "Dividends", 
    sign: +1, 
    placeholder: "Dividend returns", 
    subcateg: ["Sales", "Services", "Rewards", "Corporate", "Rent income", ], 
  }],
  ['f', {
    label: "Recovered", 
    sign: +1, 
    placeholder: "Cash recovered", 
    subcateg: ["Reimbursed", "Refunds", "Found", ], 
  }],
  ['cg', {
    label: "Generosity", 
    sign: -1, 
    placeholder: "Charitable gestures", 
    subcateg: ["Gifts", "Subsidy", "Donations", "Philanthropy"], 
  }],
  ['i', {
    label: "Investments", 
    sign: -1, 
    placeholder: "Cash invested", 
    subcateg: ["Bets", "Goods", "Assets", "Corporate", ], 
  }],
  ['n', {
    label: "Transfer into", 
    sign: -1, 
    placeholder: "Transfers to domicile", 
    subcateg: ["via POS", "via ATM", ], 
  }],
]);

const trackermap = new Map([
  ["Loan out", {
    label: "Loan Administered",
    sign: -1,
    placeholder: "Loan administered",
    subcateg: [],
  }],
  ["Loan in", {
    label: "Loan Received",
    sign: 1,
    placeholder: "Loan received",
    subcateg: [],
  }],
  ["looutnR", {
    label: "Repaid",
    sign: 1,
    placeholder: "Debtors loan payments",
    subcateg: [],
  }],
  ["loinnR", {
    label: "Repay",
    sign: -1,
    placeholder: "Incurred loan repaid",
    subcateg: [],
  }],
  ["looutnF", {
    label: "Pardon",
    sign: 0,
    placeholder: " Debtors loan pardoned",
    subcateg: [],
  }],
  ["loinnF", {
    label: "Pardoned",
    sign: 0,
    placeholder: "Incurred loan pardoned",
    subcateg: [],
  }],
  ["Pledge out", {
    label: "Pledge Made",
    sign: 0,
    placeholder: "Pledge made",
    subcateg: [],
  }],
  ["Pledge in", {
    label: "Pledge Expecting",
    sign: 0,
    placeholder: "Pledge expecting",
    subcateg: [],
  }],
  ["guoutnR", {
    label: "Redeem",
    sign: 0,
    placeholder: "Redeemed pledge made",
    subcateg: [],
  }],
  ["guinnR", {
    label: "Redeemed",
    sign: 0,
    placeholder: "Expectant pledge redeemed",
    subcateg: [],
  }],
  ["guoutnF", {
    label: "Abandon",
    sign: 0,
    placeholder: "Abandoned pledge made",
    subcateg: [],
  }],
  ["guinnF", {
    label: "Abandoned",
    sign: 0,
    placeholder: "Expectant pledge abandoned",
    subcateg: [],
  }],
  ["Deposit out", {
    label: "Security-deposit Made",
    sign: -1,
    placeholder: "Out deposits",
    subcateg: [],
  }],
  ["Deposit in", {
    label: "Security-deposit Received",
    sign: 1,
    placeholder: "Accepted deposits",
    subcateg: [],
  }],
  ["sdoutnR", {
    label: "Exonerate",
    sign: 1,
    placeholder: "Out deposits retrieved",
    subcateg: [],
  }],
  ["sdinnR", {
    label: "Exonerated",
    sign: -1,
    placeholder: "Accepted deposits returned",
    subcateg: ["Returned", "Transferred"],
  }],
  ["sdoutnF", {
    label: "Forgo",
    sign: 0,
    placeholder: "Out deposits forgone",
    subcateg: [],
  }],
  ["sdinnF", {
    label: "Forgone",
    sign: 0,
    placeholder: "Accepted deposits forgone",
    subcateg: [],
  }],
])

const PENDING_TR_KEYS = ['o', 'eo', 'go', 'dt', 'edt', 'idt'];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];




const dregex = new RegExp(`[\\d\\D]{3}$`, 'ig');/* only digitcomma uses it */


function partyLabel (categ) {
  let value = '';
  switch (categ) {
    case "Loan out": value = "Recepient"; break;
    case "Loan in": value = "Administrator"; break;
    case "Pledge out": value = "Beneficiary"; break;
    case "Pledge in": value = "Benefactor"; break;
    case "Deposit out": value = "Trustee"; break;
    case "Deposit in": value = "Depositor"; break;
  }
  return value;
}

function toUTCms(num=Date.now()){
  let jsdate =  num - new Date(num).getTimezoneOffset() * 60000;
  let sqldate = Math.trunc(jsdate/1000);
  return sqldate;
}
//returns a date reflecting the time&date UTC timezone will have given the millisecs param
//ie used when on a differnt timiezone, but receiving timestamps generated on UTC time
//utcTimeDate without an argument is equiv to new Date()
function utcTimeDate(num=toUTCms()){
  let ofst = new Date(num).getTimezoneOffset() * 60000;
  return new Date(num+ofst);
}
/* getFirstTime processes the timestamp as if you were on UTC */
/* This func dont actually take a param. it causes confusion */
function getFirstTime(num) {
  let b = (!num) ? new Date() : utcTimeDate(num);
  let y = b.getFullYear(), m = b.getMonth(), d = b.getDate();
  return Date.UTC(y, m, d); //date0num;
};
function inputdefault(itsname, value) {
  if (itsname == 'nacc' || itsname == 'nFrmsg') {
    return ''
  } else if(value) {
    return value
  } else {
    return digitcomma(0);
  }
}
function formdefault(bal, value=digitcomma(0)) {
  let obj = {}; bal = digitcomma(bal);
  for (let key of labelmap.keys()) {
    obj[key] = value;
  }
  Object.assign(obj, {nFr: "", nacc: "", nFrmsg: "", wi: bal, wf: bal})
  return JSON.stringify(obj);
}
function digitcomma(num) {
  /* Helper to give num 3-placevalue commas for legibility */
  if (typeof num == 'string') num = Number(num);
  if(typeof num !== 'number' || isNaN(num)){
    throw new Error('argument must be a number!');
  } 
  if (num > maxamt) num = maxamt + 1;
  if (num < -maxamt) num = -maxamt - 1;/* Todo: why this! */

  let dot = '.', intnum = Math.trunc(num);/* parseInt is not suitable due to possibility of num presented in standard form */
  let kobo = num - intnum;
  kobo = Math.round(kobo * 100) / 100;/* incased  js IEE7 fl0ting point bullshit happens */
  if (delimeter == '.') dot = ',';
  if (kobo) {
    kobo = kobo.toString().replace(/-?0\./g, '');/* Todo: make it a onetime regex */
    kobo.length - 1 || (kobo += '0'); kobo = dot += kobo;
  } else {
    kobo = '';
  }

  let chunk = ''; let last3;
  let ve = (intnum >= 0) ? '' : '-';
  let val = Math.abs(intnum) + '';
  while (val.length > 3) {
    last3 = val.slice(-3);
    val = val.replace(dregex, '');
    chunk = delimeter + last3 + chunk;
  }
  chunk = val + chunk;
  switch (currindex) {
    case 0: case 1:
      chunk = ve + currency + chunk + kobo; break;
    case 2: case 3:
      chunk = ve + chunk + kobo + currency; break;
  }
  return chunk;
}
function filtercomma(str) {
  if(typeof str !== 'string') throw new Error('Argument to filtercomma must be of type string')
  str = str.trim(); if(!str) str = '0';
  let sign = (str.includes('-')) ? -1 : 1;
  let x = str.replace(sanitize, ''); x = x.replace(',', '.');/* for type $1.000,00 */
  x = parseFloat(x) * sign;
  if (x > maxamt) x = maxamt + 1;
  if (x < -maxamt) x = -maxamt - 1;
  return x;
}
function reset_currtokens(tokens) {
  ({currency, currindex, delimeter} = tokens);
}

module.exports.var = { maxamt, labelmap, trackermap, PENDING_TR_KEYS, DAYS, MONTHS };
module.exports.func = { toUTCms, partyLabel, utcTimeDate, getFirstTime, inputdefault, formdefault, digitcomma, filtercomma, reset_currtokens };
