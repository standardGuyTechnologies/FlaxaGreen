import getDB from './db.js'
export default {
  state: {
    hasCurr: true,
    accounts: [],
    accountsobj: [],
  },
  getters: {
    hasCurr({ state }) {
      return state.hasCurr;
    },
    getaccstr({ state }) {
      return [...state.accounts];
    },
    getaccobj({ state }) {
      return [...state.accountsobj];
    },
  },
  actions: {
    accExists({ state }, val) {
      state.hasCurr = val;
    },
    accrefresh({ state }, active) {
      getDB().transaction(function(tx){
        tx.executeSql('SELECT * FROM ACCOUNTS WHERE acc <> ?', [active], function (tx, result) {
          const res = result.rows, accobj = [];
          for (let i = 0; i < res.length; i++) {
            accobj.push(res.item(i));
          }
          state.accountsobj = accobj;
          state.accounts = accobj.map(x => x.acc);
        })
      }, function (e) {console.log(e)}, function () {})
    }
  },
}