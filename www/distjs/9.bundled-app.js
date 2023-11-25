"use strict";
(globalThis["webpackChunkflaxa_green"] = globalThis["webpackChunkflaxa_green"] || []).push([[9],{

/***/ 288:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint no-control-regex: "off" */
const defaultDiacriticsRemovalap = [{
  base: 'A',
  letters: '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'
}, {
  base: 'AA',
  letters: '\uA732'
}, {
  base: 'AE',
  letters: '\u00C6\u01FC\u01E2'
}, {
  base: 'AO',
  letters: '\uA734'
}, {
  base: 'AU',
  letters: '\uA736'
}, {
  base: 'AV',
  letters: '\uA738\uA73A'
}, {
  base: 'AY',
  letters: '\uA73C'
}, {
  base: 'B',
  letters: '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'
}, {
  base: 'C',
  letters: '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'
}, {
  base: 'D',
  letters: '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779'
}, {
  base: 'DZ',
  letters: '\u01F1\u01C4'
}, {
  base: 'Dz',
  letters: '\u01F2\u01C5'
}, {
  base: 'E',
  letters: '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'
}, {
  base: 'F',
  letters: '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'
}, {
  base: 'G',
  letters: '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'
}, {
  base: 'H',
  letters: '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'
}, {
  base: 'I',
  letters: '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'
}, {
  base: 'J',
  letters: '\u004A\u24BF\uFF2A\u0134\u0248'
}, {
  base: 'K',
  letters: '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'
}, {
  base: 'L',
  letters: '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'
}, {
  base: 'LJ',
  letters: '\u01C7'
}, {
  base: 'Lj',
  letters: '\u01C8'
}, {
  base: 'M',
  letters: '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'
}, {
  base: 'N',
  letters: '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'
}, {
  base: 'NJ',
  letters: '\u01CA'
}, {
  base: 'Nj',
  letters: '\u01CB'
}, {
  base: 'O',
  letters: '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'
}, {
  base: 'OI',
  letters: '\u01A2'
}, {
  base: 'OO',
  letters: '\uA74E'
}, {
  base: 'OU',
  letters: '\u0222'
}, {
  base: 'OE',
  letters: '\u008C\u0152'
}, {
  base: 'oe',
  letters: '\u009C\u0153'
}, {
  base: 'P',
  letters: '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'
}, {
  base: 'Q',
  letters: '\u0051\u24C6\uFF31\uA756\uA758\u024A'
}, {
  base: 'R',
  letters: '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'
}, {
  base: 'S',
  letters: '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'
}, {
  base: 'T',
  letters: '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'
}, {
  base: 'TZ',
  letters: '\uA728'
}, {
  base: 'U',
  letters: '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'
}, {
  base: 'V',
  letters: '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'
}, {
  base: 'VY',
  letters: '\uA760'
}, {
  base: 'W',
  letters: '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'
}, {
  base: 'X',
  letters: '\u0058\u24CD\uFF38\u1E8A\u1E8C'
}, {
  base: 'Y',
  letters: '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'
}, {
  base: 'Z',
  letters: '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'
}, {
  base: 'a',
  letters: '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'
}, {
  base: 'aa',
  letters: '\uA733'
}, {
  base: 'ae',
  letters: '\u00E6\u01FD\u01E3'
}, {
  base: 'ao',
  letters: '\uA735'
}, {
  base: 'au',
  letters: '\uA737'
}, {
  base: 'av',
  letters: '\uA739\uA73B'
}, {
  base: 'ay',
  letters: '\uA73D'
}, {
  base: 'b',
  letters: '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'
}, {
  base: 'c',
  letters: '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'
}, {
  base: 'd',
  letters: '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'
}, {
  base: 'dz',
  letters: '\u01F3\u01C6'
}, {
  base: 'e',
  letters: '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'
}, {
  base: 'f',
  letters: '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'
}, {
  base: 'g',
  letters: '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'
}, {
  base: 'h',
  letters: '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'
}, {
  base: 'hv',
  letters: '\u0195'
}, {
  base: 'i',
  letters: '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'
}, {
  base: 'j',
  letters: '\u006A\u24D9\uFF4A\u0135\u01F0\u0249'
}, {
  base: 'k',
  letters: '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'
}, {
  base: 'l',
  letters: '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'
}, {
  base: 'lj',
  letters: '\u01C9'
}, {
  base: 'm',
  letters: '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'
}, {
  base: 'n',
  letters: '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'
}, {
  base: 'nj',
  letters: '\u01CC'
}, {
  base: 'o',
  letters: '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'
}, {
  base: 'oi',
  letters: '\u01A3'
}, {
  base: 'ou',
  letters: '\u0223'
}, {
  base: 'oo',
  letters: '\uA74F'
}, {
  base: 'p',
  letters: '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'
}, {
  base: 'q',
  letters: '\u0071\u24E0\uFF51\u024B\uA757\uA759'
}, {
  base: 'r',
  letters: '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'
}, {
  base: 's',
  letters: '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'
}, {
  base: 't',
  letters: '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'
}, {
  base: 'tz',
  letters: '\uA729'
}, {
  base: 'u',
  letters: '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'
}, {
  base: 'v',
  letters: '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'
}, {
  base: 'vy',
  letters: '\uA761'
}, {
  base: 'w',
  letters: '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'
}, {
  base: 'x',
  letters: '\u0078\u24E7\uFF58\u1E8B\u1E8D'
}, {
  base: 'y',
  letters: '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'
}, {
  base: 'z',
  letters: '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'
}];
const diacriticsMap = {};
for (let i = 0; i < defaultDiacriticsRemovalap.length; i += 1) {
  const letters = defaultDiacriticsRemovalap[i].letters;
  for (let j = 0; j < letters.length; j += 1) {
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
  }
}
function removeDiacritics(str) {
  return str.replace(/[^\u0000-\u007E]/g, a => diacriticsMap[a] || a);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (removeDiacritics);

/***/ }),

/***/ 287:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _shared_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var _shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _remove_diacritics_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(288);






class Searchbar extends _shared_class_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(app, params) {
    if (params === void 0) {
      params = {};
    }
    super(params, [app]);
    const sb = this;
    const defaults = {
      el: undefined,
      inputEl: undefined,
      inputEvents: 'change input compositionend',
      disableButton: true,
      disableButtonEl: undefined,
      backdropEl: undefined,
      searchContainer: undefined,
      // container to search, HTMLElement or CSS selector
      searchItem: 'li',
      // single item selector, CSS selector
      searchIn: undefined,
      // where to search in item, CSS selector
      searchGroup: '.list-group',
      searchGroupTitle: '.list-group-title',
      ignore: '.searchbar-ignore',
      foundEl: '.searchbar-found',
      notFoundEl: '.searchbar-not-found',
      hideOnEnableEl: '.searchbar-hide-on-enable',
      hideOnSearchEl: '.searchbar-hide-on-search',
      backdrop: true,
      removeDiacritics: true,
      customSearch: false,
      hideGroupTitles: true,
      hideGroups: true,
      disableOnBackdropClick: true,
      expandable: false,
      inline: false
    };

    // Extend defaults with modules params
    sb.useModulesParams(defaults);
    sb.params = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)(defaults, params);
    const $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sb.params.el);
    if ($el.length === 0) return sb;
    if ($el[0].f7Searchbar) return $el[0].f7Searchbar;
    $el[0].f7Searchbar = sb;
    let $pageEl;
    const $navbarEl = $el.parents('.navbar');
    if ($el.parents('.page').length > 0) {
      $pageEl = $el.parents('.page');
    } else if ($navbarEl.length > 0) {
      $pageEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(app.navbar.getPageByEl($navbarEl[0]));
      if (!$pageEl.length) {
        const $currentPageEl = $el.parents('.view').find('.page-current');
        if ($currentPageEl[0] && $currentPageEl[0].f7Page && $currentPageEl[0].f7Page.navbarEl === $navbarEl[0]) {
          $pageEl = $currentPageEl;
        }
      }
    }
    let $foundEl;
    if (params.foundEl) {
      $foundEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.foundEl);
    } else if (typeof sb.params.foundEl === 'string' && $pageEl) {
      $foundEl = $pageEl.find(sb.params.foundEl);
    }
    let $notFoundEl;
    if (params.notFoundEl) {
      $notFoundEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.notFoundEl);
    } else if (typeof sb.params.notFoundEl === 'string' && $pageEl) {
      $notFoundEl = $pageEl.find(sb.params.notFoundEl);
    }
    let $hideOnEnableEl;
    if (params.hideOnEnableEl) {
      $hideOnEnableEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.hideOnEnableEl);
    } else if (typeof sb.params.hideOnEnableEl === 'string' && $pageEl) {
      $hideOnEnableEl = $pageEl.find(sb.params.hideOnEnableEl);
    }
    let $hideOnSearchEl;
    if (params.hideOnSearchEl) {
      $hideOnSearchEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(params.hideOnSearchEl);
    } else if (typeof sb.params.hideOnSearchEl === 'string' && $pageEl) {
      $hideOnSearchEl = $pageEl.find(sb.params.hideOnSearchEl);
    }
    const expandable = sb.params.expandable || $el.hasClass('searchbar-expandable');
    const inline = sb.params.inline || $el.hasClass('searchbar-inline');
    if (typeof sb.params.backdrop === 'undefined') {
      sb.params.backdrop = !inline;
    }
    let $backdropEl;
    if (sb.params.backdrop) {
      if (sb.params.backdropEl) {
        $backdropEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sb.params.backdropEl);
      } else if ($pageEl && $pageEl.length > 0) {
        $backdropEl = $pageEl.find('.searchbar-backdrop');
      } else {
        $backdropEl = $el.siblings('.searchbar-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('<div class="searchbar-backdrop"></div>');
        if ($pageEl && $pageEl.length) {
          if ($el.parents($pageEl).length > 0 && $navbarEl && $el.parents($navbarEl).length === 0) {
            $backdropEl.insertBefore($el);
          } else {
            $backdropEl.insertBefore($pageEl.find('.page-content').eq(0));
          }
        } else {
          $backdropEl.insertBefore($el);
        }
      }
    }
    let $searchContainer;
    if (sb.params.searchContainer) {
      $searchContainer = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sb.params.searchContainer);
    }
    let $inputEl;
    if (sb.params.inputEl) {
      $inputEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sb.params.inputEl);
    } else {
      $inputEl = $el.find('input[type="search"]').eq(0);
    }
    let $disableButtonEl;
    if (sb.params.disableButton) {
      if (sb.params.disableButtonEl) {
        $disableButtonEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sb.params.disableButtonEl);
      } else {
        $disableButtonEl = $el.find('.searchbar-disable-button');
      }
    }
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)(sb, {
      app,
      view: app.views.get($el.parents('.view')),
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      $searchContainer,
      searchContainer: $searchContainer && $searchContainer[0],
      $inputEl,
      inputEl: $inputEl[0],
      $disableButtonEl,
      disableButtonEl: $disableButtonEl && $disableButtonEl[0],
      disableButtonHasMargin: false,
      $pageEl,
      pageEl: $pageEl && $pageEl[0],
      $navbarEl,
      navbarEl: $navbarEl && $navbarEl[0],
      $foundEl,
      foundEl: $foundEl && $foundEl[0],
      $notFoundEl,
      notFoundEl: $notFoundEl && $notFoundEl[0],
      $hideOnEnableEl,
      hideOnEnableEl: $hideOnEnableEl && $hideOnEnableEl[0],
      $hideOnSearchEl,
      hideOnSearchEl: $hideOnSearchEl && $hideOnSearchEl[0],
      previousQuery: '',
      query: '',
      isVirtualList: $searchContainer && $searchContainer.hasClass('virtual-list'),
      virtualList: undefined,
      enabled: false,
      expandable,
      inline
    });

    // Events
    function preventSubmit(e) {
      e.preventDefault();
    }
    function onInputFocus(e) {
      sb.enable(e);
      sb.$el.addClass('searchbar-focused');
    }
    function onInputBlur() {
      sb.$el.removeClass('searchbar-focused');
    }
    function onInputChange() {
      const value = sb.$inputEl.val().trim();
      if (sb.$searchContainer && sb.$searchContainer.length > 0 && (sb.params.searchIn || sb.isVirtualList || sb.params.searchIn === sb.params.searchItem) || sb.params.customSearch) {
        sb.search(value, true);
      }
    }
    function onInputClear(e, previousValue) {
      sb.$el.trigger('searchbar:clear', previousValue);
      sb.emit('local::clear searchbarClear', sb, previousValue);
    }
    function disableOnClick(e) {
      sb.disable(e);
    }
    function onPageBeforeOut() {
      if (!sb || sb && !sb.$el) return;
      if (sb.enabled) {
        sb.$el.removeClass('searchbar-enabled');
        if (sb.expandable) {
          sb.$el.parents('.navbar').removeClass('with-searchbar-expandable-enabled with-searchbar-expandable-enabled-no-transition');
        }
      }
    }
    function onPageBeforeIn() {
      if (!sb || sb && !sb.$el) return;
      if (sb.enabled) {
        sb.$el.addClass('searchbar-enabled');
        if (sb.expandable) {
          sb.$el.parents('.navbar').addClass('with-searchbar-expandable-enabled-no-transition');
        }
      }
    }
    sb.attachEvents = function attachEvents() {
      $el.on('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.on('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.on('click', disableOnClick);
      }
      if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl.length && sb.$pageEl) {
        sb.$pageEl.on('page:beforeout', onPageBeforeOut);
        sb.$pageEl.on('page:beforein', onPageBeforeIn);
      }
      sb.$inputEl.on('focus', onInputFocus);
      sb.$inputEl.on('blur', onInputBlur);
      sb.$inputEl.on(sb.params.inputEvents, onInputChange);
      sb.$inputEl.on('input:clear', onInputClear);
    };
    sb.detachEvents = function detachEvents() {
      $el.off('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.off('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.off('click', disableOnClick);
      }
      if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl.length && sb.$pageEl) {
        sb.$pageEl.off('page:beforeout', onPageBeforeOut);
        sb.$pageEl.off('page:beforein', onPageBeforeIn);
      }
      sb.$inputEl.off('focus', onInputFocus);
      sb.$inputEl.off('blur', onInputBlur);
      sb.$inputEl.off(sb.params.inputEvents, onInputChange);
      sb.$inputEl.off('input:clear', onInputClear);
    };

    // Install Modules
    sb.useModules();

    // Init
    sb.init();
    return sb;
  }
  clear(e) {
    const sb = this;
    if (!sb.query && e && (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).hasClass('searchbar-clear')) {
      sb.disable();
      return sb;
    }
    const previousQuery = sb.value;
    sb.$inputEl.val('').trigger('change').focus();
    sb.$el.trigger('searchbar:clear', previousQuery);
    sb.emit('local::clear searchbarClear', sb, previousQuery);
    return sb;
  }
  setDisableButtonMargin() {
    const sb = this;
    if (sb.expandable) return;
    const app = sb.app;
    sb.$disableButtonEl.transition(0).show();
    sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, `${-sb.disableButtonEl.offsetWidth}px`);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    sb._clientLeft = sb.$disableButtonEl[0].clientLeft;
    sb.$disableButtonEl.transition('');
    sb.disableButtonHasMargin = true;
  }
  enable(setFocus) {
    const sb = this;
    if (sb.enabled) return sb;
    const app = sb.app;
    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
    const device = (0,_shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__.getDevice)();
    sb.enabled = true;
    function enable() {
      if (sb.$backdropEl && (sb.$searchContainer && sb.$searchContainer.length || sb.params.customSearch) && !sb.$el.hasClass('searchbar-enabled') && !sb.query) {
        sb.backdropShow();
      }
      sb.$el.addClass('searchbar-enabled');
      if (!sb.$disableButtonEl || sb.$disableButtonEl && sb.$disableButtonEl.length === 0) {
        sb.$el.addClass('searchbar-enabled-no-disable-button');
      }
      if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme !== 'md') {
        if (!sb.disableButtonHasMargin) {
          sb.setDisableButtonMargin();
        }
        sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, '0px');
      }
      if (sb.expandable) {
        const $navbarEl = sb.$el.parents('.navbar');
        if ($navbarEl.hasClass('navbar-large') && sb.$pageEl) {
          const $pageContentEl = sb.$pageEl.find('.page-content');
          const $titleLargeEl = $navbarEl.find('.title-large');
          $pageContentEl.addClass('with-searchbar-expandable-enabled');
          if ($navbarEl.hasClass('navbar-large') && $navbarEl.hasClass('navbar-large-collapsed') && $titleLargeEl.length && $pageContentEl.length) {
            $pageContentEl.transition(0);
            $pageContentEl[0].scrollTop -= $titleLargeEl[0].offsetHeight;
            setTimeout(() => {
              $pageContentEl.transition('');
            }, 200);
          }
        }
        if (app.theme === 'md' && $navbarEl.length) {
          $navbarEl.addClass('with-searchbar-expandable-enabled');
        } else {
          $navbarEl.addClass('with-searchbar-expandable-enabled');
          if ($navbarEl.hasClass('navbar-large')) {
            $navbarEl.addClass('navbar-large-collapsed');
          }
        }
      }
      if (sb.$hideOnEnableEl) sb.$hideOnEnableEl.addClass('hidden-by-searchbar');
      sb.$el.trigger('searchbar:enable');
      sb.emit('local::enable searchbarEnable', sb);
    }
    let needsFocus = false;
    if (setFocus === true) {
      if (document.activeElement !== sb.inputEl) {
        needsFocus = true;
      }
    }
    const isIos = device.ios && app.theme === 'ios';
    if (isIos) {
      if (sb.expandable) {
        if (needsFocus) sb.$inputEl.focus();
        enable();
      } else {
        if (needsFocus) sb.$inputEl.focus();
        if (setFocus && (setFocus.type === 'focus' || setFocus === true)) {
          (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
            enable();
          }, 400);
        } else {
          enable();
        }
      }
    } else {
      if (needsFocus) sb.$inputEl.focus();
      if (app.theme === 'md' && sb.expandable) {
        sb.$el.parents('.page, .view, .navbar-inner, .navbar').scrollLeft(app.rtl ? 100 : 0);
      }
      enable();
    }
    return sb;
  }
  disable() {
    const sb = this;
    if (!sb.enabled) return sb;
    const app = sb.app;
    sb.$inputEl.val('').trigger('change');
    sb.$el.removeClass('searchbar-enabled searchbar-focused searchbar-enabled-no-disable-button');
    if (sb.expandable) {
      const $navbarEl = sb.$el.parents('.navbar');
      const $pageContentEl = sb.$pageEl && sb.$pageEl.find('.page-content');
      if ($navbarEl.hasClass('navbar-large') && $pageContentEl.length) {
        const $titleLargeEl = $navbarEl.find('.title-large');
        sb.$el.transitionEnd(() => {
          $pageContentEl.removeClass('with-searchbar-expandable-closing');
        });
        if ($navbarEl.hasClass('navbar-large') && $navbarEl.hasClass('navbar-large-collapsed') && $titleLargeEl.length) {
          const scrollTop = $pageContentEl[0].scrollTop;
          const titleLargeHeight = $titleLargeEl[0].offsetHeight;
          if (scrollTop > titleLargeHeight) {
            $pageContentEl.transition(0);
            $pageContentEl[0].scrollTop = scrollTop + titleLargeHeight;
            setTimeout(() => {
              $pageContentEl.transition('');
            }, 200);
          }
        }
        $pageContentEl.removeClass('with-searchbar-expandable-enabled').addClass('with-searchbar-expandable-closing');
      }
      if (app.theme === 'md' && $navbarEl.length) {
        $navbarEl.removeClass('with-searchbar-expandable-enabled with-searchbar-expandable-enabled-no-transition').addClass('with-searchbar-expandable-closing');
        sb.$el.transitionEnd(() => {
          $navbarEl.removeClass('with-searchbar-expandable-closing');
        });
      } else {
        $navbarEl.removeClass('with-searchbar-expandable-enabled with-searchbar-expandable-enabled-no-transition').addClass('with-searchbar-expandable-closing');
        sb.$el.transitionEnd(() => {
          $navbarEl.removeClass('with-searchbar-expandable-closing');
        });
        if (sb.$pageEl) {
          sb.$pageEl.find('.page-content').trigger('scroll');
        }
      }
    }
    if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme !== 'md') {
      sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, `${-sb.disableButtonEl.offsetWidth}px`);
    }
    if (sb.$backdropEl && (sb.$searchContainer && sb.$searchContainer.length || sb.params.customSearch)) {
      sb.backdropHide();
    }
    sb.enabled = false;
    sb.$inputEl.blur();
    if (sb.$hideOnEnableEl) sb.$hideOnEnableEl.removeClass('hidden-by-searchbar');
    sb.$el.trigger('searchbar:disable');
    sb.emit('local::disable searchbarDisable', sb);
    return sb;
  }
  toggle() {
    const sb = this;
    if (sb.enabled) sb.disable();else sb.enable(true);
    return sb;
  }
  backdropShow() {
    const sb = this;
    if (sb.$backdropEl) {
      sb.$backdropEl.addClass('searchbar-backdrop-in');
    }
    return sb;
  }
  backdropHide() {
    const sb = this;
    if (sb.$backdropEl) {
      sb.$backdropEl.removeClass('searchbar-backdrop-in');
    }
    return sb;
  }
  search(query, internal) {
    const sb = this;
    sb.previousQuery = sb.query || '';
    if (query === sb.previousQuery) return sb;
    if (!internal) {
      if (!sb.enabled) {
        sb.enable();
      }
      sb.$inputEl.val(query);
      sb.$inputEl.trigger('input');
    }
    sb.query = query;
    sb.value = query;
    const {
      $searchContainer,
      $el,
      $foundEl,
      $notFoundEl,
      $hideOnSearchEl,
      isVirtualList
    } = sb;

    // Hide on search element
    if (query.length > 0 && $hideOnSearchEl) {
      $hideOnSearchEl.addClass('hidden-by-searchbar');
    } else if ($hideOnSearchEl) {
      $hideOnSearchEl.removeClass('hidden-by-searchbar');
    }
    // Add active/inactive classes on overlay
    if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled') || sb.params.customSearch && $el.hasClass('searchbar-enabled')) {
      if (query.length === 0) {
        sb.backdropShow();
      } else {
        sb.backdropHide();
      }
    }
    if (sb.params.customSearch) {
      $el.trigger('searchbar:search', {
        query,
        previousQuery: sb.previousQuery
      });
      sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery);
      return sb;
    }
    let foundItems = [];
    let vlQuery;
    if (isVirtualList) {
      sb.virtualList = $searchContainer[0].f7VirtualList;
      if (query.trim() === '') {
        sb.virtualList.resetFilter();
        if ($notFoundEl) $notFoundEl.hide();
        if ($foundEl) $foundEl.show();
        $el.trigger('searchbar:search', {
          query,
          previousQuery: sb.previousQuery
        });
        sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery);
        return sb;
      }
      vlQuery = sb.params.removeDiacritics ? (0,_remove_diacritics_js__WEBPACK_IMPORTED_MODULE_5__["default"])(query) : query;
      if (sb.virtualList.params.searchAll) {
        foundItems = sb.virtualList.params.searchAll(vlQuery, sb.virtualList.items) || [];
      } else if (sb.virtualList.params.searchByItem) {
        for (let i = 0; i < sb.virtualList.items.length; i += 1) {
          if (sb.virtualList.params.searchByItem(vlQuery, sb.virtualList.items[i], i)) {
            foundItems.push(i);
          }
        }
      }
    } else {
      let values;
      if (sb.params.removeDiacritics) values = (0,_remove_diacritics_js__WEBPACK_IMPORTED_MODULE_5__["default"])(query.trim().toLowerCase()).split(' ');else {
        values = query.trim().toLowerCase().split(' ');
      }
      $searchContainer.find(sb.params.searchItem).removeClass('hidden-by-searchbar').each(itemEl => {
        const $itemEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(itemEl);
        let compareWithText = [];
        let $searchIn = sb.params.searchIn ? $itemEl.find(sb.params.searchIn) : $itemEl;
        if (sb.params.searchIn === sb.params.searchItem) {
          $searchIn = $itemEl;
        }
        $searchIn.each(searchInEl => {
          let itemText = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(searchInEl).text().trim().toLowerCase();
          if (sb.params.removeDiacritics) itemText = (0,_remove_diacritics_js__WEBPACK_IMPORTED_MODULE_5__["default"])(itemText);
          compareWithText.push(itemText);
        });
        compareWithText = compareWithText.join(' ');
        let wordsMatch = 0;
        for (let i = 0; i < values.length; i += 1) {
          if (compareWithText.indexOf(values[i]) >= 0) wordsMatch += 1;
        }
        if (wordsMatch !== values.length && !(sb.params.ignore && $itemEl.is(sb.params.ignore))) {
          $itemEl.addClass('hidden-by-searchbar');
        } else {
          foundItems.push($itemEl[0]);
        }
      });
      if (sb.params.hideGroupTitles) {
        $searchContainer.find(sb.params.searchGroupTitle).each(titleEl => {
          const $titleEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(titleEl);
          const $nextElements = $titleEl.nextAll(sb.params.searchItem);
          let hide = true;
          for (let i = 0; i < $nextElements.length; i += 1) {
            const $nextEl = $nextElements.eq(i);
            if ($nextEl.is(sb.params.searchGroupTitle)) break;
            if (!$nextEl.hasClass('hidden-by-searchbar')) {
              hide = false;
            }
          }
          const ignore = sb.params.ignore && $titleEl.is(sb.params.ignore);
          if (hide && !ignore) $titleEl.addClass('hidden-by-searchbar');else $titleEl.removeClass('hidden-by-searchbar');
        });
      }
      if (sb.params.hideGroups) {
        $searchContainer.find(sb.params.searchGroup).each(groupEl => {
          const $groupEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(groupEl);
          const ignore = sb.params.ignore && $groupEl.is(sb.params.ignore);
          // eslint-disable-next-line
          const notHidden = $groupEl.find(sb.params.searchItem).filter(el => {
            return !(0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(el).hasClass('hidden-by-searchbar');
          });
          if (notHidden.length === 0 && !ignore) {
            $groupEl.addClass('hidden-by-searchbar');
          } else {
            $groupEl.removeClass('hidden-by-searchbar');
          }
        });
      }
    }
    if (foundItems.length === 0) {
      if ($notFoundEl) $notFoundEl.show();
      if ($foundEl) $foundEl.hide();
    } else {
      if ($notFoundEl) $notFoundEl.hide();
      if ($foundEl) $foundEl.show();
    }
    if (isVirtualList && sb.virtualList) {
      sb.virtualList.filterItems(foundItems);
    }
    $el.trigger('searchbar:search', {
      query,
      previousQuery: sb.previousQuery,
      foundItems
    });
    sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery, foundItems);
    return sb;
  }
  init() {
    const sb = this;
    if (sb.expandable && sb.$el) sb.$el.addClass('searchbar-expandable');
    if (sb.inline && sb.$el) sb.$el.addClass('searchbar-inline');
    sb.attachEvents();
  }
  destroy() {
    const sb = this;
    sb.emit('local::beforeDestroy searchbarBeforeDestroy', sb);
    sb.$el.trigger('searchbar:beforedestroy');
    sb.detachEvents();
    if (sb.$el[0]) {
      sb.$el[0].f7Searchbar = null;
      delete sb.$el[0].f7Searchbar;
    }
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.deleteProps)(sb);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Searchbar);

/***/ }),

/***/ 286:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _searchbar_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(287);
/* harmony import */ var _shared_constructor_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'searchbar',
  static: {
    Searchbar: _searchbar_class_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  create() {
    const app = this;
    app.searchbar = (0,_shared_constructor_methods_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      defaultSelector: '.searchbar',
      constructor: _searchbar_class_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      app,
      domProp: 'f7Searchbar',
      addMethods: 'clear enable disable toggle search'.split(' ')
    });
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tabEl).find('.searchbar-init').each(searchbarEl => {
        const $searchbarEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(searchbarEl);
        app.searchbar.create((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)($searchbarEl.dataset(), {
          el: searchbarEl
        }));
      });
    },
    tabBeforeRemove(tabEl) {
      (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tabEl).find('.searchbar-init').each(searchbarEl => {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.searchbar-init').each(searchbarEl => {
        const $searchbarEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(searchbarEl);
        app.searchbar.create((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)($searchbarEl.dataset(), {
          el: searchbarEl
        }));
      });
      if (app.theme === 'ios' && page.view && page.view.router.dynamicNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(searchbarEl => {
          const $searchbarEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(searchbarEl);
          app.searchbar.create((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)($searchbarEl.dataset(), {
            el: searchbarEl
          }));
        });
      }
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.searchbar-init').each(searchbarEl => {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
      if (app.theme === 'ios' && page.view && page.view.router.dynamicNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(searchbarEl => {
          if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
            searchbarEl.f7Searchbar.destroy();
          }
        });
      }
    }
  },
  clicks: {
    '.searchbar-clear': function clear($clickedEl, data) {
      if (data === void 0) {
        data = {};
      }
      const app = this;
      const sb = app.searchbar.get(data.searchbar);
      if (sb) sb.clear();
    },
    '.searchbar-enable': function enable($clickedEl, data) {
      if (data === void 0) {
        data = {};
      }
      const app = this;
      const sb = app.searchbar.get(data.searchbar);
      if (sb) sb.enable(true);
    },
    '.searchbar-disable': function disable($clickedEl, data) {
      if (data === void 0) {
        data = {};
      }
      const app = this;
      const sb = app.searchbar.get(data.searchbar);
      if (sb) sb.disable();
    },
    '.searchbar-toggle': function toggle($clickedEl, data) {
      if (data === void 0) {
        data = {};
      }
      const app = this;
      const sb = app.searchbar.get(data.searchbar);
      if (sb) sb.toggle();
    }
  },
  vnode: {
    'searchbar-init': {
      insert(vnode) {
        const app = this;
        const searchbarEl = vnode.elm;
        const $searchbarEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(searchbarEl);
        app.searchbar.create((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)($searchbarEl.dataset(), {
          el: searchbarEl
        }));
      },
      destroy(vnode) {
        const searchbarEl = vnode.elm;
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      }
    }
  }
});

/***/ })

}]);