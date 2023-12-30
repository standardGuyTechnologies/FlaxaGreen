import getDB from "./db";
import G from "./uiglobals"
import { updateQCHANGES, updateQTRANSFER, updateTCHANGES } from "./dbupdates.js"
const { maxamt, box, appmsgs } = G.V;
const {getFirstTime, aboveThreshold, digitcomma, } = G.F;
function onDeleted ($f7, id, props, type) {
  if (type === 'tr') {
    getDB().transaction(function (tx) {
      tx.executeSql('DELETE FROM QUICK WHERE tid = ?', [id])
      tx.executeSql('DELETE FROM TRANSFER WHERE tid = ?', [props.tid])
    }, function (e) { console.log(e) }, function () { updateQTRANSFER($f7, props); })
  } else if (type === 'q') {
    getDB().transaction(function (tx) {
      tx.executeSql('DELETE FROM QUICK WHERE rowid = ?', [id])
    }, function (e) { console.log(e) }, function () { updateQCHANGES($f7, props); })
  } else if (type === 't') {
    getDB().transaction(function (tx) {
      tx.executeSql('DELETE FROM TRACKPHASE WHERE rowid = ?', [id])
    }, function (e) { console.log(e) }, function () { updateTCHANGES($f7, props); })
  }
}
function makeinstances (props) {
  return new Promise ((resolve, reject) => {
    getDB().transaction(function (tx) {
      tx.executeSql('SELECT rowid, item, amt, qty, location, info FROM QUICK WHERE date = ? AND acc = ? AND categ = ? AND subcateg = ?', [props.date, props.acc, props.categ, props.subcateg], function (tx, result) {
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
      tx.executeSql('SELECT tp.rowid, party, categ, subcateg, type, val, info FROM TRACK INNER JOIN TRACKPHASE tp USING(id) WHERE date = ? AND acc = ? AND categ = ?', [props.date, props.acc, props.categ], function (tx, result) {
        const res = result.rows, instances = [];
        for(let i=0; i<res.length; i++){
          instances.push(res.item(i));
        }; resolve(instances);
      })
    }, function (e) { reject(e) }, function () {  })
  })
}
function makeinstances3 (props) {
  return new Promise ((resolve, reject) => {
    getDB().transaction(function (tx) {
      tx.executeSql('SELECT q.tid, item, amt, target, location, info FROM QUICK q INNER JOIN TRANSFER USING(date, acc) WHERE date = ? AND acc = ? AND categ = ? AND subcateg = ?', [props.date, props.acc, props.categ, props.subcateg], function (tx, result) {
        const res = result.rows, instances = [];
        for(let i=0; i<res.length; i++){
          instances.push(res.item(i));
        }; resolve(instances);
      })
    }, function (e) { reject(e) }, function () {  })
  })
}

function recordsItemSheet(props, { $h, $f7, $onUnmounted, $onMounted, $update }) {
  let instances = []; let sheet
  $onMounted(() => {
    makeinstances(props).then(i => {instances = i; $update()} )
    $f7.on('quick-sheet', (unique) => { // todo fix
      if (props.unique !== unique) return;
      makeinstances(props).then(i => {instances = i; $update()} )
    })
  })
  $onUnmounted(() => {
    // sheet.destroy();
  })
  return () => $h`
  <div class="sheet-modal ${props.unique}" key="${props.unique}" data-container-el=".page-master-detail" data-backdrop="true" data-swipe-to-close="true" data-swipe-handler=".swipe-handler" data-backdrop="true">
    <div class="sheet-modal-inner">
      <div class="swipe-handler"></div>
      <div class="page-content">
        <div class="list list-outline-ios list-dividers-ios">
          <ul>
            ${instances.map(obj => $h`
            <li class="swipeout" @swipeout:deleted=${() => onDeleted($f7, obj.rowid, props, 'q')}>
              <div class="item-content swipeout-content">
                <div class="item-inner">
                  <div class="item-title">
                    ${obj.item}
                    <div class="item-footer">
                      <i class="icon f7-icons location">placemark</i>
                      <span>${obj.location || "No location specified"}</span>
                    </div>
                  </div>
                  <div class="item-after">
                    <div class="card no-shadow">
                      <div class="card-header">
                        <strong>${digitcomma(obj.amt)}</strong>
                      </div>
                      <div class="card-content">
                        <small><small>Qty: ${obj.qty || 'N/A'}</small></small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swipeout-actions-right">
                <a class="color-green" @click=${()=> info($f7, props)}><i class="icon f7-icons">info_circle_fill</i></a>
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

function recordsTrackSheet(props, { $h, $f7, $onUnmounted, $onMounted, $update }) {
  let instances = []; let sheet;
  $onMounted(() => {
    makeinstances2(props).then(i => {instances = i; $update()} )
    $f7.on('track-sheet', (unique) => {
      if (props.unique !== unique) return;
      makeinstances2(props).then(i => {instances = i; $update()} )
    })
  })
  $onUnmounted(() => {
    // sheet.destroy();
  })
  return () => $h`
  <div class="sheet-modal ${props.unique}" key="${props.unique}" data-container-el=".page-master-detail" data-backdrop="true" data-swipe-to-close="true" data-swipe-handler=".swipe-handler" data-backdrop="true">
    <div class="sheet-modal-inner">
      <div class="swipe-handler"></div>
      <div class="page-content">
        <div class="list list-outline-ios list-dividers-ios">
          <ul>
            ${instances.map(obj => $h`
            <li class="swipeout" @swipeout:deleted=${() => onDeleted($f7, obj.rowid, props, 't')}>
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
                <a class="color-green" @click=${()=> info($f7, props)}><i class="icon f7-icons">info_circle_fill</i></a>
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

function recordsTransferSheet(props, { $h, $f7, $onUnmounted, $onMounted, $update }) {
  let instances = []; let sheet
  $onMounted(() => {
    makeinstances3(props).then(i => {instances = i; $update()} )
    $f7.on('transfer-sheet', (unique) => {
      if (props.unique !== unique) return;
      makeinstances3(props).then(i => {instances = i; $update()} )
    })
  })
  $onUnmounted(() => {
    // sheet.destroy();
  })
  return () => $h`
  <div class="sheet-modal ${props.unique}" key="${props.unique}" data-container-el=".page-master-detail" data-backdrop="true" data-swipe-to-close="true" data-swipe-handler=".swipe-handler" data-backdrop="true">
    <div class="sheet-modal-inner">
      <div class="swipe-handler"></div>
      <div class="page-content">
        <div class="list list-outline-ios list-dividers-ios">
          <ul>
            ${instances.map(obj => $h`
            <li class="swipeout" @swipeout:deleted=${() => onDeleted($f7, obj.tid, props, 'tr')}>
              <div class="item-content swipeout-content">
                <div class="item-inner">
                  <div class="item-title">
                    ${obj.item}
                    <div class="item-footer">
                      <i class="icon f7-icons location">placemark</i>
                      <span>${obj.location || "No location specified"}</span>
                    </div>
                  </div>
                  <div class="item-after">
                    <div class="card no-shadow">
                      <div class="card-header">
                        <strong>${digitcomma(obj.amt)}</strong>
                      </div>
                      <div class="card-content">
                        <small><small>
                          ${Math.sign(obj.amt)+1 ? "From":"To"}: ${obj.target}
                        </small></small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swipeout-actions-right">
                <a class="color-green" @click=${()=> info($f7, props)}><i class="icon f7-icons">info_circle_fill</i></a>
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
function info ($f7, props) {
  let info = props.info || 'No information available!';
  $f7.dialog.alert(info, "Info");
}

export { recordsTransferSheet, recordsItemSheet, recordsTrackSheet };
