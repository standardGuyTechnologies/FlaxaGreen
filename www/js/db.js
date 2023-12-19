
var db;
function initDB(){
  return new Promise ((resolve, reject) => {
    if (process.env.ENVIRON === 'electron') {
      db = openDatabase('flaxadb', '1.0', 'Accounting pplication database', 5 * 1024 * 1024);
    } else if (process.env.ENVIRON === 'cordova') {
      db = window.sqlitePlugin.openDatabase({
        name: 'flaxadb', location: 'default'
      })
    }
    db.transaction(function (tx) {
      /* date is converted to Utcms before storage */
      tx.executeSql('CREATE TABLE IF NOT EXISTS  ACC (acc, bal)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS  QUICK (date INT NOT NULL, acc NOT NULL, categ NOT NULL, subcateg NOT NULL, item NOT NULL, amt DEFAULT 0, qty, location, info)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS  QUICKDIFF (date INT NOT NULL, acc NOT NULL, qdiff DEFAULT 0)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRACK (id, categ, subcateg, state, party, assign)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRACKDIFF (id, date, acc, tdiff DEFAULT 0)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRACKPHASE (id, info, phase DEFAULT 1, amt DEFAULT 0, repaid DEFAULT 0, forfeit DEFAULT 0)');
    }, function(e) {reject(e)}, function(){resolve()})
  })
}
function importDb(db, json, opts) { 
  if (process.env.ENVIRON == 'electron') return;
  return cordova.plugins.sqlitePorter.importJsonToDb(db, json, opts)
}
function exportDb(db, opts) { 
  if (process.env.ENVIRON == 'electron') return;
  return cordova.plugins.sqlitePorter.exportDbToJson(db, opts)
}
function wipeDb(db, opts) { 
  if (process.env.ENVIRON == 'electron') return;
  return cordova.plugins.sqlitePorter.wipeDb(db, opts)
}
function dBList() { 
  return ["ACC","QUICK", "QUICKDIFF", "TRACK","TRACDIFF", "TRACKPHASE"]
}
function getDB(){ return db }
export {initDB, importDb, exportDb, wipeDb, dBList};
export default getDB;