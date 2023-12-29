import G from '../../js/uiglobals.js';
import Framework7 from "framework7";
const { maxamt, labelmap, trackermap, box, analyzerRexe, } = G.V;
const { digitcomma, filtercomma, computeInput, partyLabel, aboveThreshold, utcTimeDate, getFirstTime, } = G.F;

const comms = new Framework7.Events();
const Categories = (props, { $h, $f7, $, $on, $update, $onMounted }) => {
  const TOPG = {};
  $onMounted(() => {
    $(document).on('click', ".popover .item-content", 
    function (e) {
      TOPG.popcateg && TOPG.popcateg.close();
      TOPG.popsubcateg && TOPG.popsubcateg.close();
      if (this.dataset.code) {
        props.code = this.dataset.code
        props.categ = this.dataset.categ
        props.subcateg = labelmap.get(props.code).subcateg[0];
      } else if (this.dataset.subcateg) {
        props.subcateg = this.dataset.subcateg
      }
      comms.emit('update-details', props);
      $update();
    })
  })
  function openCateg () {
    TOPG.popcateg = $f7.popover.create({
      targetEl: ".open-categ",
      content: getPopover('categ'),
      closeByBackdropClick: true,
      closeByOutsideClick: true,
      closeOnEscape: true,
      verticalPosition: "bottom",
      on: {
        closed: function () {
          TOPG.popcateg.destroy();
          delete TOPG.popcateg;
        }
      }
    })
    TOPG.popcateg.open();
  }
  function openSubCateg () {
    TOPG.popsubcateg = $f7.popover.create({
      targetEl: ".open-subcateg",
      content: getPopover('hey'),
      closeByBackdropClick: true,
      closeByOutsideClick: true,
      closeOnEscape: true,
      verticalPosition: "bottom",
      on: {
        closed: function () {
          TOPG.popsubcateg.destroy();
          delete TOPG.popsubcateg;
        }
      }
    })
    TOPG.popsubcateg.open();
  }
  function getPopover (el) {
    if (el === 'categ') {
      return `
      <div class="popover subcateg">
        <div class="popover-inner">
          <div class="list simple-list">
            <ul>
            ${[...labelmap.entries()].map(arr => {
              const code = arr[0]; const {label, sign, placeholder} = arr[1];
              return `
              <li class="item-content" data-categ="${label}" data-code="${code}">
                <div class="item-media">
                  <img src="assets/${label}.png" width="28" />
                </div>
                <div class="item-inner">
                  <div class="item-title">${label}</div>
                </div>
              </li>
              `
            }).join('')}
            </ul>
          </div>
        </div>
      </div>
      `
    } else {
      return `
      <div class="popover subcateg">
        <div class="popover-inner">
          <div class="list simple-list">
            <ul>
            ${labelmap.get(props.code).subcateg.map(label => {
              return `
              <li class="item-content" data-subcateg="${label}">
                <div class="item-media">
                  <img src="assets/${props.categ}/${label}.png" width="28" />
                </div>
                <div class="item-inner">
                  <div class="item-title">${label}</div>
                </div>
              </li>
              `
            }).join('')}
            </ul>
          </div>
        </div>
      </div>
      `
    }
  }

    return () => $h`
  <div class="list list-strong list-outline-ios list-dividers-ios">
    <ul>
      <li class="list-group-title">Categories</li>
      <li>
        <a class="item-content">
          <div class="item-media">
            <img src="assets/${props.categ}.png" width="40" />
          </div>
          <div class="item-inner">
            <div class="item-title">${props.categ}</div>
            <div class="item-after open-categ" @click=${openCateg}>
              <i class="icon f7-icons">ellipsis_circle</i>
            </div>
          </div>
        </a>
      </li>
      ${props.type == "fast" && $h`
      <li>
        <a class="item-content">
          <div class="item-media">
            <i class="icon f7-icons invisible" style="font-size: 40px">app</i>
            <img src="assets/${props.categ}/${props.subcateg}.png" width="40" />
          </div>
          <div class="item-inner">
            <div class="item-title">${props.subcateg}</div>
            <div class="item-after open-subcateg" @click=${openSubCateg}>
              <i class="icon f7-icons">ellipsis_circle</i>
            </div>
          </div>
        </a>
      </li>
      `}
    </ul>
  </div>`;
}

const TrackerType = (props, { $h }) => {
    return () => $h`
  <form class="list list-strong list-outline-ios list-dividers-ios">
  <ul>
  <li class="list-group-title">Categories</li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="track" value="Loan out" checked />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Loan Administered</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="track" value="Loan in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Loan Received</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="track" value="Pledge out" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Pledge Made</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="track" value="Pledge in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Pledge Expecting</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="track" value="Deposit out" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Deposit Made</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="track" value="Deposit in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Deposit Received</div>
        </div>
      </label>
    </li>
  </ul>
  </form>`;
}

const RedeemIntent = (props, { $h, $f7, $onMounted, $update }) => {
  function getCateg(subtype) {
    if (subtype == "out") {
      return [
        {val:[
          ["Promise reimbursement", "Reimburse"], 
          ["Stake rewards", "Rewards"], 
          ["Promise tuition", "Tuition"],
          ["Promise grant", "Grant"], 
          ["Postponed Payroll", "Payroll"], 
        ], code: "p"}, 
        {val:[
          ["Promise gifts", "Gifts"], 
          ["Pledge philanthropy", "Philanthropy"],
          ["Pledge donation", "Donations"],
        ], code: "cg"},
      ];
    } else if (subtype == 'in') {
      return [
        {val:[
          ["Overdue wages (part time)", "Part time"], 
          ["Overdue wages (full time)", "Full time"], 
        ], code:"w"}, 
        {val:[
          ["Awaiting dues payment", "Membership"], 
        ], code:"tr"}, 
        {val:[
          ["Awaiting allowance", "Allowance"],
          ["Awaiting tuition", "Tuition"], 
          ["Pending prize", "Prize"], 
          ["Awaiting grant", "Grant"], 
          ["Pending bonus", "Bonuses"], 
          ["Pending donations", "Donations"], 
        ], code:"aw"}, 
        {val:[
          ["Awaiting sales payment", "Sales"],
        ], code:"d"}, 
        {val:[
          ["Awaiting reimbursement", "Reimbursed"],
        ], code:"f"}
      ];
    }
  }
  function createPicker(subtype) {
    let categ = getCateg(subtype);
    let colVal = [], dispVal = [];
    categ.forEach(obj => {
      colVal = [...colVal, ...obj.val.map(y => obj.code+","+y[1])]
      dispVal = [...dispVal, ...obj.val.map(y => y[0])];
    });
    return $f7.picker.create({
      inputEl: '#assign'+subtype,
      // cssClass: "gu-assign", //todo it dont work as in u cant select picker with this class
      toolbarCloseText: "Select",
      formatValue: function (values, displayValues) {
        return displayValues[0];
      },
      cols: [
        {
          values: colVal,
          displayValues: dispVal,
          cssClass: "Additional-CSS-class-name-to-be-set-on-column-HTML-container",
          textAlign: "center",
        },
      ],
    })
  }
  $onMounted(() => {
    $f7.on('checkredeem', () => {
      if (props.pledge) p = ''; else p = 'hide';
      if (props.pledge === 'in') pin = '', pout = 'hide';
      else if (props.pledge === 'out') pin = 'hide', pout = '';
      else pin = pout = 'hide';
      $update()
    });
    let pickerin = createPicker('in');
    let pickerout = createPicker('out');
    pickerin.on('change', (picker, value, displayValue) => {
      console.log(value);
      $('input[name="intent"]').val(value);
    })
    pickerout.on('change', (picker, value, displayValue) => {
      console.log(value);
      $('input[name="intent"]').val(value);
    })
  });
  let p = 'hide', pin = 'hide', pout = 'hide';
  return () => $h`
  <form id="redeem" class="list list-strong list-outline-ios list-dividers-ios">
  <ul>
    <li class="list-group-title ${p}">Redeem Intent</li>
    <li class="item-content item-input in ${pin}">
      <div class="item-inner">
        <div class="item-input-wrap">
          <input type="text" id="assignin" placeholder="Pick a category for this pledge" readonly="readonly" required />
        </div>
      </div>
    </li>
    <li class="item-content item-input out ${pout}">
      <div class="item-inner">
        <div class="item-input-wrap">
          <input type="text" id="assignout" placeholder="Pick a category for this pledge" readonly="readonly" required />
        </div>
      </div>
    </li>
    <li class="item-content item-input hide">
      <div class="item-inner">
        <div class="item-input-wrap">
          <input name="intent" type="text" readonly="readonly" />
        </div>
      </div>
    </li>
  </ul>
  </form>`;
}
const Details = (props, { $h, $f7, $onMounted, $store, $update }) => {
  $onMounted(() => {
    comms.on('update-details', (obj) => { /// todo off it
      Object.assign(props, obj); $update();
    })
  })
    return () => $h`
  <form id="details">
    <ul class="hide">
      <li><input name="code" type="text" value=${props.code} /></li>
      <li><input name="categ" type="text" value=${props.categ} /></li>
      <li><input name="subcateg" type="text" value=${props.subcateg} /></li>
    </ul>
    ${props.categ === "Money Transfer" && $h`
    <div class="list list-strong list-outline-ios list-dividers-ios">
    <ul>
      <li class="list-group-title">Target Account</li>
      ${$store.getters.getaccstr.value.map((acc, i) => $h`
      <li>
        <label class="item-radio item-content">
          <input type="radio" name="transfer" value="${acc}" checked=${i==0 && "checked"} />
          <i class="icon icon-radio"></i>
          <div class="item-inner">
            <div class="item-title">${acc}</div>
          </div>
        </label>
      </li>
      `)}
      ${!$store.getters.getaccstr.value.length && $h`
      <li class="item-content">
        <div class="item-inner">
          <div class="item-title">Opps! You don't have another account</div>
        </div>
      </li>`}
    </ul>
    </div>
    `}
    <div class="list list-strong list-outline-ios list-dividers-ios">
    <ul>
      <li class="list-group-title">Details</li>
      ${props.type === "fast" && $h`
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Specify Item</div>
          <div class="item-input-wrap">
            <input name="item" type="text" placeholder="e.g. Cheese Burger" />
            <span class="input-clear-button"></span>
          </div>
        </div>
      </li>
      `}
      ${props.type === "tracking" && $h`
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">${partyLabel(props.categ)}</div>
          <div class="item-input-wrap">
            <input name="party" type="text" placeholder="Enter name of "${partyLabel(props.categ)} />
            <span class="input-clear-button"></span>
          </div>
        </div>
      </li>
      `}
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Amount</div>
          <div class="item-input-wrap">
            <input name="amt" type="number" placeholder="Enter an amount" />
            <span class="input-clear-button"></span>
          </div>
        </div>
      </li>
      ${props.type === 'fast' && $h`
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Quantity</div>
          <div class="item-input-wrap">
            <input name="qty" type="number" placeholder="Enter quantity (optional)" />
            <span class="input-clear-button"></span>
          </div>
        </div>
      </li>
      `}
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Location</div>
          <div class="item-input-wrap">
            <span class="input-clear-button"></span>
            <input name="location" type="text" placeholder="e.g. Lekki Phase 1" id="typeahead" />
          </div>
        </div>
      </li>
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Additional Information</div>
          <div class="item-input-wrap">
            <textarea name="info" placeholder="Enter details"></textarea>
          </div>
        </div>
      </li>
    </ul>
    </div>
  </form>`;
}


export {Categories, RedeemIntent, TrackerType, Details};
export default Categories;