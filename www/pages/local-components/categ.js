import G from '../../js/uiglobals.js';
const { maxamt, labelmap, trackermap, box, analyzerRexe, } = G.V;
const { digitcomma, filtercomma, computeInput, save4analyzer, aboveThreshold, utcTimeDate, getFirstTime, } = G.F;


const Categories = (props, { $h, $f7, $, $on, $update, $onMounted }) => {
  const TOPG = {};
  $onMounted(() => {
    $(document).on('click', ".popover .item-content", 
    function (e) {
      TOPG.popover.close();
      const form = $('form#fast-details')[0];
      if (this.dataset.code) {
        props.code = this.dataset.code
        props.categ = form.categ.value = this.dataset.categ
        props.subcateg = form.subcateg.value = labelmap.get(props.code).subcateg[0];
      } else if (this.dataset.subcateg) {
        props.subcateg = form.subcateg.value = this.dataset.subcateg
      }
      $update();
    })
  })
  function openCateg () {
    TOPG.popover = $f7.popover.create({
      targetEl: ".open-categ",
      content: getPopover('categ'),
      closeByBackdropClick: true,
      closeByOutsideClick: true,
      closeOnEscape: true,
      verticalPosition: "bottom",
      on: {
        closed: function () {
          TOPG.popover.destroy();
        }
      }
    })
    TOPG.popover.open();
  }
  function openSubCateg () {
    TOPG.popover = $f7.popover.create({
      targetEl: ".open-subcateg",
      content: getPopover('hey'),
      closeByBackdropClick: true,
      closeByOutsideClick: true,
      closeOnEscape: true,
      verticalPosition: "bottom",
      on: {
        closed: function () {
          TOPG.popover.destroy();
        }
      }
    })
    TOPG.popover.open();
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
        <input type="radio" name="subtype" value="out" checked />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Loan Administered</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="subtype" value="in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Loan Received</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="subtype" value="in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Pledge Made</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="subtype" value="in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Pledge Expecting</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="subtype" value="in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Deposit Made</div>
        </div>
      </label>
    </li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="subtype" value="in" />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Deposit Received</div>
        </div>
      </label>
    </li>
  </ul>
  </form>`;
}

const RedeemIntent = (props, { $h }) => {
    return () => $h`
  <form class="list list-strong list-outline-ios list-dividers-ios">
  <ul>
  <li class="list-group-title">Redeem Intent</li>
    <li>
      <label class="item-radio item-content">
        <input type="radio" name="subtype" value="out" checked />
        <i class="icon icon-radio"></i>
        <div class="item-inner">
          <div class="item-title">Promise reimbursement</div>
        </div>
      </label>
    </li>
  </ul>
  </form>`;
}
const Details = (props, { $h }) => {
    return () => $h`
  <form id="fast-details" class="list list-strong list-outline-ios list-dividers-ios">
    <ul class="hide">
      <li><input name="categ" type="text" value=${props.categ} /></li>
      <li><input name="subcateg" type="text" value=${props.subcatg} /></li>
    </ul>
    <ul>
      <li class="list-group-title">Details</li>
      ${props.type === "fast" && $h`
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Specify Item</div>
          <div class="item-input-wrap">
            <input name="name" type="text" placeholder="e.g. Cheese Burger" />
            <span class="input-clear-button"></span>
          </div>
        </div>
      </li>
      `}
      ${props.type === "tracking" && $h`
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Recepient</div>
          <div class="item-input-wrap">
            <input name="name" type="text" placeholder="Enter name of Recepient" />
            <span class="input-clear-button"></span>
          </div>
        </div>
      </li>
      `}
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Amount</div>
          <div class="item-input-wrap">
            <input type="number" placeholder="Enter an amount" />
            <span class="input-clear-button"></span>
          </div>
        </div>
      </li>
      ${props.type === 'fast' && $h`
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Quantity</div>
          <div class="item-input-wrap">
            <input type="number" placeholder="Enter quantity (optional)" />
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
            <input type="text" placeholder="e.g. Lekki Phase 1" id="typeahead" />
          </div>
        </div>
      </li>
      ${props.type === 'tracking' && $h`
      <li class="item-content item-input">
        <div class="item-inner">
          <div class="item-title item-label">Additional Information</div>
          <div class="item-input-wrap">
            <textarea placeholder="Enter details"></textarea>
          </div>
        </div>
      </li>
      `}
    </ul>
  </form>`;
}


export {Categories, RedeemIntent, TrackerType, Details};
export default Categories;