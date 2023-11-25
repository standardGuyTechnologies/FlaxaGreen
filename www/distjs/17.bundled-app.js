"use strict";
(globalThis["webpackChunkflaxa_green"] = globalThis["webpackChunkflaxa_green"] || []).push([[17],{

/***/ 302:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _shared_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
/* harmony import */ var _shared_get_support_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);




class Toggle extends _shared_class_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(app, params) {
    if (params === void 0) {
      params = {};
    }
    super(params, [app]);
    const toggle = this;
    const support = (0,_shared_get_support_js__WEBPACK_IMPORTED_MODULE_2__.getSupport)();
    const defaults = {};

    // Extend defaults with modules params
    toggle.useModulesParams(defaults);
    toggle.params = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)(defaults, params);
    const el = toggle.params.el;
    if (!el) return toggle;
    const $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el);
    if ($el.length === 0) return toggle;
    if ($el[0].f7Toggle) return $el[0].f7Toggle;
    const $inputEl = $el.children('input[type="checkbox"]');
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)(toggle, {
      app,
      $el,
      el: $el[0],
      $inputEl,
      inputEl: $inputEl[0],
      disabled: $el.hasClass('disabled') || $inputEl.hasClass('disabled') || $inputEl.attr('disabled') || $inputEl[0].disabled
    });
    Object.defineProperty(toggle, 'checked', {
      enumerable: true,
      configurable: true,
      set(checked) {
        if (!toggle || typeof toggle.$inputEl === 'undefined') return;
        if (toggle.checked === checked) return;
        $inputEl[0].checked = checked;
        toggle.$inputEl.trigger('change');
      },
      get() {
        return $inputEl[0].checked;
      }
    });
    $el[0].f7Toggle = toggle;
    let isTouched;
    const touchesStart = {};
    let isScrolling;
    let touchesDiff;
    let toggleWidth;
    let touchStartTime;
    let touchStartChecked;
    function handleTouchStart(e) {
      if (isTouched || toggle.disabled) return;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchesDiff = 0;
      isTouched = true;
      isScrolling = undefined;
      touchStartTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.now)();
      touchStartChecked = toggle.checked;
      toggleWidth = $el[0].offsetWidth;
      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
        if (isTouched) {
          $el.addClass('toggle-active-state');
        }
      });
    }
    function handleTouchMove(e) {
      if (!isTouched || toggle.disabled) return;
      const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      const inverter = app.rtl ? -1 : 1;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();
      touchesDiff = pageX - touchesStart.x;
      let changed;
      if (touchesDiff * inverter < 0 && Math.abs(touchesDiff) > toggleWidth / 3 && touchStartChecked) {
        changed = true;
      }
      if (touchesDiff * inverter > 0 && Math.abs(touchesDiff) > toggleWidth / 3 && !touchStartChecked) {
        changed = true;
      }
      if (changed) {
        touchesStart.x = pageX;
        toggle.checked = !touchStartChecked;
        touchStartChecked = !touchStartChecked;
      }
    }
    function handleTouchEnd() {
      if (!isTouched || toggle.disabled) {
        if (isScrolling) $el.removeClass('toggle-active-state');
        isTouched = false;
        return;
      }
      const inverter = app.rtl ? -1 : 1;
      isTouched = false;
      $el.removeClass('toggle-active-state');
      let changed;
      if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.now)() - touchStartTime < 300) {
        if (touchesDiff * inverter < 0 && touchStartChecked) {
          changed = true;
        }
        if (touchesDiff * inverter > 0 && !touchStartChecked) {
          changed = true;
        }
        if (changed) {
          toggle.checked = !touchStartChecked;
        }
      }
    }
    function handleInputChange() {
      toggle.$el.trigger('toggle:change');
      toggle.emit('local::change toggleChange', toggle);
    }
    toggle.attachEvents = function attachEvents() {
      const passive = support.passiveListener ? {
        passive: true
      } : false;
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      toggle.$inputEl.on('change', handleInputChange);
    };
    toggle.detachEvents = function detachEvents() {
      const passive = support.passiveListener ? {
        passive: true
      } : false;
      $el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
      toggle.$inputEl.off('change', handleInputChange);
    };

    // Install Modules
    toggle.useModules();

    // Init
    toggle.init();
  }
  toggle() {
    const toggle = this;
    toggle.checked = !toggle.checked;
  }
  init() {
    const toggle = this;
    toggle.attachEvents();
  }
  destroy() {
    let toggle = this;
    toggle.$el.trigger('toggle:beforedestroy');
    toggle.emit('local::beforeDestroy toggleBeforeDestroy', toggle);
    delete toggle.$el[0].f7Toggle;
    toggle.detachEvents();
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.deleteProps)(toggle);
    toggle = null;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toggle);

/***/ }),

/***/ 301:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _shared_constructor_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var _toggle_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(302);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'toggle',
  create() {
    const app = this;
    app.toggle = (0,_shared_constructor_methods_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      defaultSelector: '.toggle',
      constructor: _toggle_class_js__WEBPACK_IMPORTED_MODULE_2__["default"],
      app,
      domProp: 'f7Toggle'
    });
  },
  static: {
    Toggle: _toggle_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tabEl).find('.toggle-init').each(toggleEl => app.toggle.create({
        el: toggleEl
      }));
    },
    tabBeforeRemove(tabEl) {
      (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tabEl).find('.toggle-init').each(toggleEl => {
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.toggle-init').each(toggleEl => app.toggle.create({
        el: toggleEl
      }));
    },
    pageBeforeRemove(page) {
      page.$el.find('.toggle-init').each(toggleEl => {
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      });
    }
  },
  vnode: {
    'toggle-init': {
      insert(vnode) {
        const app = this;
        const toggleEl = vnode.elm;
        app.toggle.create({
          el: toggleEl
        });
      },
      destroy(vnode) {
        const toggleEl = vnode.elm;
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      }
    }
  }
});

/***/ })

}]);