//@ts-check
const maxamt = Math.pow(10, 15);/* 1000 trillion */
let currency = '', currindex = 0, delimeter = '', sanitize = /\D/g;

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
    subcateg: ["Allowance", "Gifts", "Tuition", "Prize", "Grant", "Bonuses", "Pension", "Donations"], 
  }],
  ['x', {
    label: "Expenses", 
    sign: -1, 
    placeholder: "Cash spent", 
    subcateg: ["Travel", "Public Transport", "Meals", "Fast Food", "Snacks", "Drinks", "Fruits", "Checkup", "Treatment", "Connectivity", "Clothes", "Ornaments", "Provisions", "Confectionary", "News", "Books", "Printing", "Furniture", "Devices", "Security", "Tuition", "Housing", "Bills", "Maintenance", "Repairs", "Saloon", "Toys", "Art", "Photos", "Movie", "Music", "Games", "Leisure", "Artifact", "Registration", "Membership", "Refuel", "Vehicle"], 
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
    subcateg: ["Gifts", "Donations", "Philanthropy"], 
  }],
  ['i', {
    label: "Investments", 
    sign: -1, 
    placeholder: "Cash invested", 
    subcateg: ["Bets", "Office Building", "Office Decor", "Office Equipment", "Advertisements", "Logistics", "Goods", "Corporate" ], 
  }],
  ['n', {
    label: "Money Transfer", 
    sign: -1, 
    placeholder: "Transfers to domicile", 
    subcateg: ["Outbound Transfer" ], 
  }],
]);

const trackermap = new Map([
  ["Loan out amt", {
    label: "Loan Administered",
    sign: -1,
    placeholder: "Loan administered",
    subcateg: [],
  }],
  ["Loan in amt", {
    label: "Loan Received",
    sign: 1,
    placeholder: "Loan received",
    subcateg: [],
  }],
  ["Loan out repaid", {
    label: "Debtors Repaid",
    sign: 1,
    placeholder: "Debtors loan payments",
    subcateg: [],
  }],
  ["Loan in repaid", {
    label: "Repay Loan received",
    sign: -1,
    placeholder: "Incurred loan repaid",
    subcateg: [],
  }],
  ["Loan out forfeit", {
    label: "Pardon Debtors",
    sign: 1,
    placeholder: " Debtors loan pardoned",
    subcateg: [],
  }],
  ["Loan in forfeit", {
    label: "My Debts Pardoned",
    sign: -1,
    placeholder: "Incurred loan pardoned",
    subcateg: [],
  }],
  ["Deposit out amt", {
    label: "Deposit Made",
    sign: -1,
    placeholder: "Out deposits",
    subcateg: [],
  }],
  ["Deposit in amt", {
    label: "Deposit Received",
    sign: 1,
    placeholder: "Accepted deposits",
    subcateg: [],
  }],
  ["Deposit out repaid", {
    label: "Retrieved my deposits",
    sign: 1,
    placeholder: "Out deposits retrieved",
    subcateg: [],
  }],
  ["Deposit in repaid", {
    label: "Returned entrusted deposits",
    sign: -1,
    placeholder: "Accepted deposits returned",
    subcateg: ["Returned", "Transferred"],
  }],
  ["Deposit out forfeit", {
    label: "Forgo",
    sign: 1,
    placeholder: "Out deposits forgone",
    subcateg: [],
  }],
  ["Deposit in forfeit", {
    label: "Forgone",
    sign: -1,
    placeholder: "Accepted deposits forgone",
    subcateg: [],
  }],
])






function partyLabel (categ) {
  let value = '';
  switch (categ) {
    case "Loan out": value = "Recepient"; break;
    case "Loan in": value = "Administrator"; break;
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
function digitcomma(num) {
  /* Helper to give num 3-placevalue commas for legibility */
  if (typeof num === 'string') num = Number(num);
  if(typeof num !== 'number' || isNaN(num)) throw new Error('argument must be a number!');
  if (num > maxamt) num = maxamt;
  if (num < -maxamt) num = -maxamt;
  
  let intnum = Math.trunc(num);
  let kobo = Math.round(Math.abs(num - intnum) * 100) / 100;
  let kobostr = '', dot = '';
  if (kobo) {
    (delimeter === '.') ? dot = ',' : dot = '.';
    kobostr = ((kobo+'').length == 1) ? kobo+'0' : kobo+''
  };
  
  let chunk = ''; let last3 = '';
  let val = ( Math.abs(intnum) + '').split('');
  while (val.length > 3) {
    last3 = [val.pop(),val.pop(),val.pop()].reverse().join('');
    chunk = delimeter + last3 + chunk;
  }
  chunk = val.join('') + chunk;
  switch (currindex) {
    case 0: case 1:
      chunk = currency + chunk + dot + kobostr; break;
    case 2: case 3:
      chunk = chunk + dot + kobostr + currency; break;
  }
  return chunk;
}
function reset_currtokens(tokens) {
  ({currency, currindex, delimeter} = tokens);
}

module.exports.var = { maxamt, labelmap, trackermap };
module.exports.func = { toUTCms, partyLabel, utcTimeDate, getFirstTime, digitcomma, reset_currtokens };
