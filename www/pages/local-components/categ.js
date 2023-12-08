const Categories = (props, { $h }) => {
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
            <div class="item-after sheet-open" data-sheet=".switch-categ">
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
            <div class="item-after sheet-open" data-sheet=".switch-subcateg">
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
  <form class="list list-strong list-outline-ios list-dividers-ios">
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
            <input type="number" placeholder="Enter an anount" />
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