import getDB from './db.js';

function qbackupplan($f7, tx, props, key) {
  tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM TRACKDIFF LEFT JOIN QUICKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc], function (tx, result) {
    if (!result.rows.length) {
      const date = props.date, datestr = date.toISOString(), acc = props.acc;
      let x = {date, datestr,  acc, qdiff: 0, tdiff: 0}
        $f7.store.dispatch('updatetl', {key, data: x})
    } else {
      let x = result.rows.item(0); if (!x.qdiff) x.qdiff = 0;
      $f7.store.dispatch('updatetl', {key, data: x})
    }
  });
}
function tbackupplan($f7, tx, props, key) {
  tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc], function (tx, result) {
    if (!result.rows.length) {
      const date = props.date, datestr = date.toISOString(), acc = props.acc;
      let x = {date, datestr,  acc, qdiff: 0, tdiff: 0}
        $f7.store.dispatch('updatetl', {key, data: x})
    } else {
      let x = result.rows.item(0); if (!x.tdiff) x.tdiff = 0;
      $f7.store.dispatch('updatetl', {key, data: x})
    }
  });
}
function updateQCHANGES ($f7, props) {
  getDB().transaction(function(tx) {
    tx.executeSql('DELETE FROM QUICKDIFF', [], function (tx, result) {
      tx.executeSql('INSERT INTO QUICKDIFF SELECT date, acc, SUM(amt) AS qdiff FROM QUICK GROUP BY date, acc', [], function (tx, result) {
        tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc], function (tx, result) {
          let key = props.date+props.acc
          if (!result.rows.length) return qbackupplan($f7, tx, props, key);
          let x = result.rows.item(0); if (!x.tdiff) x.tdiff = 0;
          $f7.store.dispatch('updatetl', {key, data: x})
        });
      });
    });
    tx.executeSql('SELECT categ, subcateg, COUNT(*) AS instances, SUM(amt) AS sumamt FROM QUICK WHERE date = ? AND acc = ? AND categ <> ? GROUP BY categ, subcateg', [props.date, props.acc, "Money Transfer"], function (tx, result) {
      const res = result.rows, arr = []; 
      for(let i=0; i<res.length; i++){
        arr.push(res.item(i));
      }
      $f7.emit('refresh-quick', arr, props.categ, props.subcateg);
    });
  }, function (e) {}, function () {})
}
function updateQTRANSFER ($f7, props) {
  getDB().transaction(function(tx) {
  tx.executeSql('DELETE FROM QUICKDIFF', [], function (tx, result) {
    tx.executeSql('INSERT INTO QUICKDIFF SELECT date, acc, SUM(amt) AS qdiff FROM QUICK GROUP BY date, acc', [], function (tx, result) {
      tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc], function (tx, result) {
        let key = props.date+props.acc
        if (!result.rows.length) return qbackupplan($f7, tx, props, key);
        let x = result.rows.item(0); if (!x.tdiff) x.tdiff = 0;
        $f7.store.dispatch('updatetl', {key, data: x})
      });
      //Also update Transfer account TL
      tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc2], function (tx, result) {
        let key = props.date+props.acc2
        if (!result.rows.length) return qbackupplan($f7, tx, props, key);
        let x = result.rows.item(0); if (!x.tdiff) x.tdiff = 0;
        $f7.store.dispatch('updatetl', {key, data: x})
      });
    });
  });
  if (props.subcateg === 'Inbound Transfer') return;
  tx.executeSql('SELECT categ, subcateg, COUNT(*) AS instances, SUM(amt) AS sumamt FROM QUICK INNER JOIN TRANSFER USING(date, acc, tid) WHERE date = ? AND acc = ? AND categ = ? GROUP BY categ, subcateg', [props.date, props.acc, "Money Transfer"], function (tx, result) {
    const res = result.rows, arr = []; 
    for(let i=0; i<res.length; i++){
      arr.push(res.item(i));
    }
    $f7.emit('refresh-transfer', arr, props.categ, props.subcateg);
  })
  }, function (e) {}, function () {})
}

function updateTCHANGES ($f7, props) {
  getDB().transaction(function(tx) {
    tx.executeSql('DELETE FROM TRACKDIFF', [], function (tx, result) {
      tx.executeSql('INSERT INTO TRACKDIFF SELECT date, acc, SUM(val) AS tdiff FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE categ <> ? AND type <> ? GROUP BY date, acc', ["Pledge", "forfeit"], function (tx, result) {
        tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM TRACKDIFF LEFT JOIN QUICKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc], function (tx, result) {
          let key = props.date+props.acc
          if (!result.rows.length) return tbackupplan($f7, tx, props, key);
          let x = result.rows.item(0); if (!x.qdiff) x.qdiff = 0;
          $f7.store.dispatch('updatetl', {key, data: x})
        });
      });
    });
    tx.executeSql('SELECT categ, info, COUNT(*) AS instances, SUM(val) AS sumamt FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE categ <> ? AND type <> ? AND date = ? AND acc = ? GROUP BY categ', ["Pledge", "forfeit", props.date, props.acc], function (tx, result) {
      const res = result.rows, arr = []; 
      for(let i=0; i<res.length; i++){
        arr.push(res.item(i));
      }
      $f7.emit('refresh-track', arr, props.categ, props.subcateg);
    });
    tx.executeSql('SELECT id, date, acc, categ, party, SUM(val) AS pending FROM TRACK LEFT JOIN TRACKPHASE USING(id) WHERE state = ? GROUP BY categ, subcateg, party HAVING date <= ? ORDER BY date DESC', ["active", props.date], function (tx, result) {
      const res = result.rows, arr = []; 
      for(let i=0; i<res.length; i++){
        arr.push(res.item(i));
      }
      $f7.emit('refresh-tracklist', arr);
    });
  }, function(e) {console.log(e)}, function () {})
}

export { updateQCHANGES, updateQTRANSFER, updateTCHANGES };