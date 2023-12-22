import getDB from "./db";
import G from "./uiglobals"
const { maxamt, box, appmsgs } = G.V;
const {getFirstTime, aboveThreshold, digitcomma, } = G.F;
function onDeleted (rowid, props, type) {
  if (type === 'q') {
    getDB().transaction(function (tx) {
      tx.executeSql('DELETE FROM QUICK WHERE rowid = ?', [rowid], function (tx, result) {
        tx.executeSql('SELECT SUM(amt) AS qdiff FROM QUICK WHERE date = ? AND acc = ? GROUP BY date, acc', [props.date, props.acc], function (tx, result) {
          tx.executeSql('UPDATE QUICKDIFF SET qdiff = ? WHERE date = ? AND acc = ?', [result.rows.item(0).qdiff, props.date, props.acc]);
        });
      })
    }, function (e) { console.log(e) }, function () {  })
  } else if (type === 't') {
    getDB().transaction(function (tx) {
      tx.executeSql('DELETE FROM TRACKPHASE WHERE rowid = ?', [rowid], function (tx, result) {
        tx.executeSql('SELECT SUM(val) AS tdiff FROM TRACKPHASE WHERE date = ? AND acc = ? GROUP BY date, acc', [props.date, props.acc], function (tx, result) {
          tx.executeSql('UPDATE TRACKDIFF SET tdiff = ? WHERE date = ? AND acc = ?', [result.rows.item(0).tdiff, props.date, props.acc]);
        });
      })
    }, function (e) { console.log(e) }, function () {  })
  }
}
function makeinstances (props) {
  return new Promise ((resolve, reject) => {
    getDB().transaction(function (tx) {
      tx.executeSql('SELECT rowid, item, amt, qty, target, location, info FROM QUICK WHERE date = ? AND acc = ? AND categ = ? AND subcateg = ?', [props.date, props.acc, props.categ, props.subcateg], function (tx, result) {
        const res = result.rows, instances = [];
        for(let i=0; i<res.length; i++){
          instances.push(res.item(i));
        }; resolve(instances);
      })
    }, function (e) { reject(e) }, function () {  })
  })
}
function makeinstances2 (props) {
  return new Promise ((resolve, reject) => {
    getDB().transaction(function (tx) {
      tx.executeSql('SELECT tp.rwoid, party, categ, subcateg, type, val, info FROM TRACK INNER JOIN TRACKPHASE tp WHERE tp.date = ? AND tp.acc = ? AND categ = ? AND subcateg = ?', [props.date, props.acc, props.categ, props.subcateg], function (tx, result) {
        const res = result.rows, instances = [];
        for(let i=0; i<res.length; i++){
          instances.push(res.item(i));
        }; resolve(instances);
      })
    }, function (e) { reject(e) }, function () {  })
  })
}

function recordsItemSheet(props, { $h, $f7, $onMounted, $update }) {
  let instances = [];
  $onMounted(() => {
    makeinstances(props).then(i => {instances = i; $update()} )
  })
  $f7.on(props.key, () => { // todo this event don't exist yet.
    makeinstances(props).then(i => {instances = i; $update()} )
  })
  return () => $h`
  <div class="sheet-modal demo-sheet-swipe-to-close" key="${props.key}">
    <div class="sheet-modal-inner">
      <div class="swipe-handler"></div>
      <div class="page-content">
        <div class="list list-outline-ios list-dividers-ios">
          <ul>
            ${instances.map(obj => $h`
            <li class="swipeout" @swipeout:deleted=${() => onDeleted(obj.rowid, props, 'q')}>
              <div class="item-content swipeout-content">
                <div class="item-inner">
                  <div class="item-title">
                    ${obj.item}
                    <div class="item-footer">
                      <i class="icon f7-icons location">placemark</i>
                      <span>${obj.location}</span>
                    </div>
                  </div>
                  <div class="item-after">
                    <div class="card no-shadow">
                      <div class="card-header">
                        <strong>${digitcomma(obj.amt)}</strong>
                      </div>
                      <div class="card-content">
                        <small><small>Qty: ${obj.qty}</small></small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swipeout-actions-right">
                <a class="swipeout-delete"><i class="icon f7-icons">trash_fill</i></a>
              </div>
            </li>
            `)}
          </ul>
        </div>
      </div>
    </div>
  </div>`
};

function recordsTrackSheet(props, { $h, $f7, $onMounted, $update }) {
  let instances = [];
  $onMounted(() => {
    makeinstances2(props).then(i => {instances = i; $update()} )
  })
  $f7.on(props.key, () => { // todo this event don't exist yet.
    makeinstances2(props).then(i => {instances = i; $update()} )
  })
  return () => $h`
  <div class="sheet-modal demo-sheet-swipe-to-close" key="${props.key}">
    <div class="sheet-modal-inner">
      <div class="swipe-handler"></div>
      <div class="page-content">
        <div class="list list-outline-ios list-dividers-ios">
          <ul>
            ${instances.map(obj => $h`
            <li class="swipeout" @swipeout:deleted=${() => onDeleted(obj.rowid, props, 't')}>
              <div class="item-content swipeout-content">
                <div class="item-inner">
                  <div class="item-title">
                    ${obj.categ + obj.subcateg + obj.type}
                    <div class="item-footer">
                      <i class="icon f7-icons location">person</i>
                      <span>${obj.party}</span>
                    </div>
                  </div>
                  <div class="item-after">
                    <div class="card no-shadow">
                      <div class="card-header">
                        <strong>${digitcomma(obj.val)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swipeout-actions-right">
                <a class="swipeout-delete"><i class="icon f7-icons">trash_fill</i></a>
              </div>
            </li>
            `)}
          </ul>
        </div>
      </div>
    </div>
  </div>`
};

export { recordsItemSheet, recordsTrackSheet };
