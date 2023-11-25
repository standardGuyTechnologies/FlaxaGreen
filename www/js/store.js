function getRepeatMsg(key, msg){
  switch(key){
    case 'day1': msg = 'first day of the month'; break;
    case 'dayL': msg = 'last day of the month'; break;
    case 'xdays': msg = ' day(s) interval'; break;
    case 'hLD': msg = ' of the Month'; break;
    default: msg = 'BiG FaT ErRoR!';
  }
  return msg;
}

function processclub(code) {
  let ar = code.split(','); let token = '';
  switch (ar[0]) {
    case "0": token = "First"; break;
    case "1": token = "Second"; break;
    case "2": token = "Third"; break;
    case "3": token = "Fourth"; break;
  }
  switch (ar[1]) {
    case "1": token += " Monday"; break;
    case "2": token += " Tuesday"; break;
    case "3": token += " Wednesday"; break;
    case "4": token += " Thursday"; break;
    case "5": token += " Friday"; break;
    case "6": token += " Saturday"; break;
    case "7": token += " Sunday"; break;
    default: token = "Big Fat Error";
  }
  return token;
}


export default {
  state: {
    hasCurr: true,
    subs: new Map(),
    dat41sub: {},
  },
  getters: {
    hasCurr({ state }) {
      return state.hasCurr;
    },
    sublist ({ state }) {
      return [...state.subs]
    },
    data41sub({ state }) {
      return state.data41sub;
    }
  },
  actions: {
    accExists({ state }, val) {
      state.hasCurr = val;
    },
    data41({ state }, id) {
      state.data41sub = state.subs.get(id);
    },
    update41({ state }, arr) {
      state.subs.set(arr[0], arr[1]);
      state.subs = new Map([...state.subs]);
    },
    nusublist({ state }, setting) {
      const subscribe = setting.sub(); let subs = new Map(); let i = 0;
      Object.keys(subscribe).forEach(acc => {
        let y = subscribe[acc];
        Object.keys(y).forEach(rcode => {
          let z = y[rcode], recurmsg = getRepeatMsg(rcode);
          if (rcode == 'hLD')
          return z.forEach(obj => {
            let clubmsg = processclub(obj.club);
            let rmsg = clubmsg + recurmsg;
            Object.keys(obj.sub).forEach(categ => {
              if (obj.sub[categ].trim()) {
                let detail = obj.sub[categ];
                let data = Object.assign({categ, detail, acc, rmsg, rcode}, obj); delete data.sub;
                //data: {start, club, categ:'', detail: '', acc: '', rmsg: '', rcode: ''}
                let id = 'card'+i++; subs.set(id, data);
              }
            })
          })
          if (rcode == 'xdays')
          return z.forEach(obj => {
            let rmsg = obj.dLoop + recurmsg;
            Object.keys(obj.sub).forEach(categ => {
              if (obj.sub[categ].trim()) {
                let detail = obj.sub[categ];
                let data = Object.assign({categ, detail, acc, rmsg, rcode}, obj); delete data.sub;
                //data: {start, dloop, categ:'', detail: '', acc: '', rmsg: '', rcode: ''}
                let id = 'card'+i++; subs.set(id, data);
              }
            })
          })
          if (rcode === 'day1' || rcode == 'dayL')
          return z.forEach(obj => {
            Object.keys(obj.sub).forEach(categ => {
              if (obj.sub[categ].trim()) {
                let detail =  obj.sub[categ];
                let data = Object.assign({categ, detail, acc, rmsg: recurmsg, rcode}, obj); delete data.sub;
                //data: {start, categ:'', detail: '', acc: '', rmsg: '', rcode: ''}
                let id = 'card'+i++; subs.set(id, data);
              }
            });
          })
        })
      });
      state.subs = subs;
    },
  },
}