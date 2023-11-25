"use strict";
(globalThis["webpackChunkflaxa_green"] = globalThis["webpackChunkflaxa_green"] || []).push([[7],{

/***/ 284:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _modal_modal_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(103);
/* harmony import */ var _shared_$jsx_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59);




/** @jsx $jsx */

class Toast extends _modal_modal_class_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(app, params) {
    const extendedParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)({
      on: {}
    }, app.params.toast, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);
    const toast = this;
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
    toast.app = app;
    toast.params = extendedParams;
    const {
      closeButton,
      closeTimeout
    } = toast.params;
    let $el;
    if (!toast.params.el) {
      // Find Element
      const toastHtml = toast.render();
      $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(toastHtml);
    } else {
      $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(toast.params.el);
    }
    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }
    if ($el.length === 0) {
      return toast.destroy();
    }
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)(toast, {
      $el,
      el: $el[0],
      type: 'toast'
    });
    $el[0].f7Modal = toast;
    if (closeButton) {
      $el.find('.toast-button').on('click', () => {
        toast.emit('local::closeButtonClick toastCloseButtonClick', toast);
        toast.close();
      });
      toast.on('beforeDestroy', () => {
        $el.find('.toast-button').off('click');
      });
    }
    let timeoutId;
    toast.on('open', () => {
      (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('.toast.modal-in').each(openedEl => {
        const toastInstance = app.toast.get(openedEl);
        if (openedEl !== toast.el && toastInstance) {
          toastInstance.close();
        }
      });
      if (closeTimeout) {
        timeoutId = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
          toast.close();
        }, closeTimeout);
      }
    });
    toast.on('close', () => {
      window.clearTimeout(timeoutId);
    });
    if (toast.params.destroyOnClose) {
      toast.once('closed', () => {
        setTimeout(() => {
          toast.destroy();
        }, 0);
      });
    }
    return toast;
  }
  render() {
    const toast = this;
    if (toast.params.render) return toast.params.render.call(toast, toast);
    const {
      position,
      horizontalPosition,
      cssClass,
      icon,
      text,
      closeButton,
      closeButtonColor,
      closeButtonText
    } = toast.params;
    const horizontalClass = position === 'top' || position === 'bottom' ? `toast-horizontal-${horizontalPosition}` : '';
    return (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_4__["default"])("div", {
      class: `toast toast-${position} ${horizontalClass} ${cssClass || ''} ${icon ? 'toast-with-icon' : ''}`
    }, (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_4__["default"])("div", {
      class: "toast-content"
    }, icon && (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_4__["default"])("div", {
      class: "toast-icon"
    }, icon), (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_4__["default"])("div", {
      class: "toast-text"
    }, text), closeButton && !icon && (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_4__["default"])("a", {
      class: `toast-button button ${closeButtonColor ? `color-${closeButtonColor}` : ''}`
    }, closeButtonText)));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toast);

/***/ }),

/***/ 283:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _toast_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(284);
/* harmony import */ var _shared_modal_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'toast',
  static: {
    Toast: _toast_class_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  create() {
    const app = this;
    app.toast = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.extend)({}, (0,_shared_modal_methods_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      app,
      constructor: _toast_class_js__WEBPACK_IMPORTED_MODULE_0__["default"],
      defaultSelector: '.toast.modal-in'
    }), {
      // Shortcuts
      show(params) {
        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.extend)(params, {
          destroyOnClose: true
        });
        return new _toast_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, params).open();
      }
    });
  },
  params: {
    toast: {
      icon: null,
      text: null,
      position: 'bottom',
      horizontalPosition: 'left',
      closeButton: false,
      closeButtonColor: null,
      closeButtonText: 'Ok',
      closeTimeout: null,
      cssClass: null,
      render: null,
      containerEl: null
    }
  }
});

/***/ })

}]);