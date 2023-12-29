function updateQCHANGES ($f7, tx, props) {
  tx.executeSql('DELETE FROM QUICKDIFF', [], function (tx, result) {
    tx.executeSql('INSERT INTO QUICKDIFF SELECT date, acc, SUM(amt) AS qdiff FROM QUICK GROUP BY date, acc', [], function (tx, result) {
      tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM QUICKDIFF LEFT JOIN TRACKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc], function (tx, result) {
        let x = result.rows.item(0); if (!x.tdiff) x.tdiff = 0;
        Object.assign(window.$tlEntry, x);
        window.$tlUpdate();
      });
    });
  });
  tx.executeSql('SELECT categ, subcateg, info, COUNT(*) AS instances, SUM(amt) AS sumamt FROM QUICK WHERE date = ? AND acc = ? GROUP BY categ, subcateg', [props.date, props.acc], function (tx, result) {
    const res = result.rows, arr = []; 
    for(let i=0; i<res.length; i++){
      arr.push(res.item(i));
    }
    $f7.emit('refresh-quick', arr, props.categ, props.subcateg);
  });
}

function updateTCHANGES ($f7, tx, props) {
  tx.executeSql('DELETE FROM TRACKDIFF', [], function (tx, result) {
    tx.executeSql('INSERT INTO TRACKDIFF SELECT date, acc, SUM(val) AS tdiff FROM TRACK INNER JOIN TRACKPHASE USING(id) WHERE categ <> ? AND type <> ? GROUP BY date, acc', ["Pledge", "forfeit"], function (tx, result) {
      tx.executeSql('SELECT date, datetime(date, "unixepoch") AS datestr, acc, qdiff, tdiff FROM TRACKDIFF LEFT JOIN QUICKDIFF USING(date, acc) WHERE date = ? AND acc = ?', [props.date, props.acc], function (tx, result) {
        let x = result.rows.item(0); if (!x.qdiff) x.qdiff = 0;
        Object.assign(window.$tlEntry, x);
        window.$tlUpdate();
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
}

export { updateQCHANGES, updateTCHANGES };