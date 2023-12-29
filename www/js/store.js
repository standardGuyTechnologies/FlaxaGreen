import getDB from './db.js'
export default {
  state: {
    hasCurr: true,
    accounts: [],
  },
  getters: {
    hasCurr({ state }) {
      return state.hasCurr;
    },
    getacc({ state }) {
      return [...state.accounts];
    },
  },
  actions: {
    accExists({ state }, val) {
      state.hasCurr = val;
    },
    accrefresh({ state }, active) {
      getDB().transactions(function(tx){
        tx.executeSql('SELECT acc FROM ACCOUNTS WHERE acc <> ?', [active], function (tx, result) {
          const res = result.rows, arr = [];
          for (let i = 0; i < res.length; i++) {
            arr.push(res.item(i).acc);
          }
          state.accounts = arr;
        })
      }, function (e) {console.log(e)}, function () {})
    }
  },
}