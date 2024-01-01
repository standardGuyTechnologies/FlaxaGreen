
var db;
function initDB(){
  return new Promise ((resolve, reject) => {
    if (window.sqlitePlugin) {
      db = window.sqlitePlugin.openDatabase({
        name: 'flaxadb', location: 'default'
      })
    } else if (window.openDatabase) {
      window.db = db = openDatabase('flaxadb', '1.0', 'Accounting application database', 5 * 1024 * 1024);
    } else {
      reject ('Not a supported platform for flaxa database')
    };
    if(!window.sqlitePlugin) {
      db.transaction(function (tx) {
        tx.executeSql('drop table if exists CONFIG')
        tx.executeSql('drop table if exists TRANSFER')
        tx.executeSql('drop table if exists QUICK')
        tx.executeSql('drop table if exists QUICKDIFF')
        tx.executeSql('drop table if exists TRACK')
        tx.executeSql('drop table if exists TRACKDIFF')
        tx.executeSql('drop table if exists TRACKPHASE')
        tx.executeSql('drop table if exists ACCOUNTS')
      }, function (e) {reject(e)}, function () {});
    }
    db.transaction(function (tx) {
      /* date is converted to Utcms before storage */
      tx.executeSql('CREATE TABLE IF NOT EXISTS CONFIG (currency, currindex, delimeter, mode)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS ACCOUNTS (acc, bal)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRANSFER (tid NOT NULL, date INT NOT NULL, acc NOT NULL, target NOT NULL)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS QUICK (date INT NOT NULL, acc NOT NULL, categ NOT NULL, subcateg NOT NULL, item NOT NULL, amt DEFAULT 0, qty, tid, location, info, search)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS QUICKDIFF (date INT NOT NULL, acc NOT NULL, qdiff DEFAULT 0)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRACK (id, categ, subcateg, state, party, intent)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRACKDIFF (date, acc, tdiff DEFAULT 0)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRACKPHASE (id, date, acc, val DEFAULT 0, type, location, info, search)'); // type is of amt, repaid, forfeit
    }, function(e) {reject(e)}, function(){resolve(db)})
  })
}
function importDb(db, json, opts) { 
  if (typeof cordova === 'undefined') return;
  return cordova.plugins.sqlitePorter.importJsonToDb(db, json, opts)
}
function exportDb(db, opts) { 
  if (typeof cordova === 'undefined') return;
  return cordova.plugins.sqlitePorter.exportDbToJson(db, opts)
}
function wipeDb(db, opts) { 
  if (typeof cordova === 'undefined') return;
  return cordova.plugins.sqlitePorter.wipeDb(db, opts)
}
function dBList() { 
  return ["ACCOUNTS", "TRANSFER", "QUICK", "QUICKDIFF", "TRACK","TRACDIFF", "TRACKPHASE"]
}
function getDB(){ return db }
export {initDB, importDb, exportDb, wipeDb, dBList};
export default getDB;