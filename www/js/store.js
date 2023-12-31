import getDB from './db.js'
export default {
  state: {
    mode: 'light',
    hasCurr: true,
    accounts: [],
    accountsobj: [],
    tldata: new Map(),
  },
  getters: {
    mode({ state }) {
      return state.mode;
    },
    hasCurr({ state }) {
      return state.hasCurr;
    },
    getaccstr({ state }) {
      return [...state.accounts];
    },
    getaccobj({ state }) {
      return [...state.accountsobj];
    },
    tlentries({ state }) {
      return [...state.tldata.values()];
    }
  },
  actions: {
    mode({ state }, val) {
      state.mode = val;
    },
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
    }, 
    settldata ({ state }, maparr) {
      maparr.sort((x, y) => y[1].date - x[1].date);
      state.tldata = new Map([...maparr, ...state.tldata]);
    },
    updatetl ({ state }, {key, data}) {
      let oldmap = state.tldata;
      if (oldmap.get(key)) {
        state.tldata = new Map([...oldmap.set(key, data)])
      } else {
        state.tldata = new Map([[key, data], ...oldmap])
      }
    },
  },
}