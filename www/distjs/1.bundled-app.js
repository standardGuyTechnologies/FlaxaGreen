"use strict";
(globalThis["webpackChunkflaxa_green"] = globalThis["webpackChunkflaxa_green"] || []).push([[1],{

/***/ 275:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);


const Accordion = {
  toggleClicked($clickedEl) {
    const app = this;
    let $accordionItemEl = $clickedEl.closest('.accordion-item').eq(0);
    if (!$accordionItemEl.length) $accordionItemEl = $clickedEl.parents('li').eq(0);
    const $accordionContent = $clickedEl.parents('.accordion-item-content').eq(0);
    if ($accordionContent.length) {
      if ($accordionContent.parents($accordionItemEl).length) return;
    }
    if ($clickedEl.parents('li').length > 1 && $clickedEl.parents('li')[0] !== $accordionItemEl[0]) return;
    app.accordion.toggle($accordionItemEl);
  },
  open(el) {
    const app = this;
    const $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el);
    let prevented = false;
    function prevent() {
      prevented = true;
    }
    $el.trigger('accordion:beforeopen', {
      prevent
    }, prevent);
    app.emit('accordionBeforeOpen', $el[0], prevent);
    if (prevented) return;
    const $list = $el.parents('.accordion-list').eq(0);
    let $contentEl = $el.children('.accordion-item-content');
    $contentEl.removeAttr('aria-hidden');
    if ($contentEl.length === 0) $contentEl = $el.find('.accordion-item-content');
    if ($contentEl.length === 0) return;
    const $openedItem = $list.length > 0 && $el.parent().children('.accordion-item-opened');
    if ($openedItem.length > 0) {
      app.accordion.close($openedItem);
    }
    $contentEl.transitionEnd(() => {
      if ($el.hasClass('accordion-item-opened')) {
        $contentEl.transition(0);
        $contentEl.css('height', 'auto');
        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextFrame)(() => {
          $contentEl.transition('');
          $el.trigger('accordion:opened');
          app.emit('accordionOpened', $el[0]);
        });
      } else {
        $contentEl.css('height', '');
        $el.trigger('accordion:closed');
        app.emit('accordionClosed', $el[0]);
      }
    });
    $contentEl.css('height', `${$contentEl[0].scrollHeight}px`);
    $el.trigger('accordion:open');
    $el.addClass('accordion-item-opened');
    app.emit('accordionOpen', $el[0]);
  },
  close(el) {
    const app = this;
    const $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el);
    let prevented = false;
    function prevent() {
      prevented = true;
    }
    $el.trigger('accordion:beforeclose', {
      prevent
    }, prevent);
    app.emit('accordionBeforeClose', $el[0], prevent);
    if (prevented) return;
    let $contentEl = $el.children('.accordion-item-content');
    if ($contentEl.length === 0) $contentEl = $el.find('.accordion-item-content');
    $el.removeClass('accordion-item-opened');
    $contentEl.attr('aria-hidden', true);
    $contentEl.transition(0);
    $contentEl.css('height', `${$contentEl[0].scrollHeight}px`);
    // Close
    $contentEl.transitionEnd(() => {
      if ($el.hasClass('accordion-item-opened')) {
        $contentEl.transition(0);
        $contentEl.css('height', 'auto');
        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextFrame)(() => {
          $contentEl.transition('');
          $el.trigger('accordion:opened');
          app.emit('accordionOpened', $el[0]);
        });
      } else {
        $contentEl.css('height', '');
        $el.trigger('accordion:closed');
        app.emit('accordionClosed', $el[0]);
      }
    });
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextFrame)(() => {
      $contentEl.transition('');
      $contentEl.css('height', '');
      $el.trigger('accordion:close');
      app.emit('accordionClose', $el[0]);
    });
  },
  toggle(el) {
    const app = this;
    const $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el);
    if ($el.length === 0) return;
    if ($el.hasClass('accordion-item-opened')) app.accordion.close(el);else app.accordion.open(el);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'accordion',
  create() {
    const app = this;
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.bindMethods)(app, {
      accordion: Accordion
    });
  },
  clicks: {
    '.accordion-item .item-link, .accordion-item-toggle, .links-list.accordion-list > ul > li > a': function open($clickedEl) {
      const app = this;
      Accordion.toggleClicked.call(app, $clickedEl);
    }
  }
});

/***/ })

}]);