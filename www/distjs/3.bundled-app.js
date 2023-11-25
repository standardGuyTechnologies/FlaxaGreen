"use strict";
(globalThis["webpackChunkflaxa_green"] = globalThis["webpackChunkflaxa_green"] || []).push([[3],{

/***/ 278:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var _modal_modal_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(103);
/* harmony import */ var _shared_$jsx_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(59);





/** @jsx $jsx */

class Dialog extends _modal_modal_class_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(app, params) {
    const extendedParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)({
      title: app.params.dialog.title,
      text: undefined,
      content: '',
      buttons: [],
      verticalButtons: false,
      onClick: undefined,
      cssClass: undefined,
      destroyOnClose: false,
      on: {}
    }, params);
    if (typeof extendedParams.closeByBackdropClick === 'undefined') {
      extendedParams.closeByBackdropClick = app.params.dialog.closeByBackdropClick;
    }
    if (typeof extendedParams.backdrop === 'undefined') {
      extendedParams.backdrop = app.params.dialog.backdrop;
    }

    // Extends with open/close Modal methods;
    super(app, extendedParams);
    const dialog = this;
    const device = (0,_shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__.getDevice)();
    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
    const {
      title,
      text,
      content,
      buttons,
      verticalButtons,
      cssClass,
      backdrop
    } = extendedParams;
    dialog.params = extendedParams;

    // Find Element
    let $el;
    if (!dialog.params.el) {
      const dialogClasses = ['dialog'];
      if (buttons.length === 0) dialogClasses.push('dialog-no-buttons');
      if (buttons.length > 0) dialogClasses.push(`dialog-buttons-${buttons.length}`);
      if (verticalButtons) dialogClasses.push('dialog-buttons-vertical');
      if (cssClass) dialogClasses.push(cssClass);
      let buttonsHTML = '';
      if (buttons.length > 0) {
        buttonsHTML = (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_5__["default"])("div", {
          class: "dialog-buttons"
        }, buttons.map(button => (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_5__["default"])("span", {
          class: `dialog-button${button.strong ? ' dialog-button-strong' : ''}${button.color ? ` color-${button.color}` : ''}${button.cssClass ? ` ${button.cssClass}` : ''}`
        }, button.text)));
      }
      const dialogHtml = (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_5__["default"])("div", {
        class: dialogClasses.join(' ')
      }, (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_5__["default"])("div", {
        class: "dialog-inner"
      }, title && (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_5__["default"])("div", {
        class: "dialog-title"
      }, title), text && (0,_shared_$jsx_js__WEBPACK_IMPORTED_MODULE_5__["default"])("div", {
        class: "dialog-text"
      }, text), content), buttonsHTML);
      $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dialogHtml);
    } else {
      $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dialog.params.el);
    }
    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }
    if ($el.length === 0) {
      return dialog.destroy();
    }
    let $backdropEl;
    if (backdrop) {
      $backdropEl = app.$el.children('.dialog-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('<div class="dialog-backdrop"></div>');
        app.$el.append($backdropEl);
      }
    }

    // Assign events
    function buttonOnClick(e) {
      const buttonEl = this;
      const index = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(buttonEl).index();
      const button = buttons[index];
      if (button.onClick) button.onClick(dialog, e);
      if (dialog.params.onClick) dialog.params.onClick(dialog, index);
      if (button.close !== false) dialog.close();
    }
    let addKeyboardHander;
    function onKeyDown(e) {
      const keyCode = e.keyCode;
      buttons.forEach((button, index) => {
        if (button.keyCodes && button.keyCodes.indexOf(keyCode) >= 0) {
          if (document.activeElement) document.activeElement.blur();
          if (button.onClick) button.onClick(dialog, e);
          if (dialog.params.onClick) dialog.params.onClick(dialog, index);
          if (button.close !== false) dialog.close();
        }
      });
    }
    if (buttons && buttons.length > 0) {
      dialog.on('open', () => {
        $el.find('.dialog-button').each((buttonEl, index) => {
          const button = buttons[index];
          if (button.keyCodes) addKeyboardHander = true;
          (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(buttonEl).on('click', buttonOnClick);
        });
        if (addKeyboardHander && !device.ios && !device.android && !device.cordova && !device.capacitor) {
          (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document).on('keydown', onKeyDown);
        }
      });
      dialog.on('close', () => {
        $el.find('.dialog-button').each(buttonEl => {
          (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(buttonEl).off('click', buttonOnClick);
        });
        if (addKeyboardHander && !device.ios && !device.android && !device.cordova && !device.capacitor) {
          (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document).off('keydown', onKeyDown);
        }
        addKeyboardHander = false;
      });
    }
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)(dialog, {
      app,
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'dialog',
      setProgress(progress, duration) {
        app.progressbar.set($el.find('.progressbar'), progress, duration);
        return dialog;
      },
      setText(newText) {
        let $textEl = $el.find('.dialog-text');
        if ($textEl.length === 0) {
          $textEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('<div class="dialog-text"></div>');
          if (typeof title !== 'undefined') {
            $textEl.insertAfter($el.find('.dialog-title'));
          } else {
            $el.find('.dialog-inner').prepend($textEl);
          }
        }
        $textEl.html(newText);
        dialog.params.text = newText;
        return dialog;
      },
      setTitle(newTitle) {
        let $titleEl = $el.find('.dialog-title');
        if ($titleEl.length === 0) {
          $titleEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('<div class="dialog-title"></div>');
          $el.find('.dialog-inner').prepend($titleEl);
        }
        $titleEl.html(newTitle);
        dialog.params.title = newTitle;
        return dialog;
      }
    });
    function handleClick(e) {
      const target = e.target;
      const $target = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target);
      if ($target.closest(dialog.el).length === 0) {
        if (dialog.params.closeByBackdropClick && dialog.backdropEl && dialog.backdropEl === target) {
          dialog.close();
        }
      }
    }
    dialog.on('opened', () => {
      if (dialog.params.closeByBackdropClick) {
        app.on('click', handleClick);
      }
    });
    dialog.on('close', () => {
      if (dialog.params.closeByBackdropClick) {
        app.off('click', handleClick);
      }
    });
    $el[0].f7Modal = dialog;
    if (dialog.params.destroyOnClose) {
      dialog.once('closed', () => {
        setTimeout(() => {
          dialog.destroy();
        }, 0);
      });
    }
    return dialog;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dialog);

/***/ }),

/***/ 277:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(278);
/* harmony import */ var _shared_modal_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'dialog',
  params: {
    dialog: {
      title: undefined,
      buttonOk: 'OK',
      buttonCancel: 'Cancel',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      preloaderTitle: 'Loading... ',
      progressTitle: 'Loading... ',
      backdrop: true,
      closeByBackdropClick: false,
      destroyPredefinedDialogs: true,
      keyboardActions: true,
      autoFocus: true
    }
  },
  static: {
    Dialog: _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  create() {
    const app = this;
    function defaultDialogTitle() {
      return app.params.dialog.title || app.name;
    }
    const destroyOnClose = app.params.dialog.destroyPredefinedDialogs;
    const keyboardActions = app.params.dialog.keyboardActions;
    const autoFocus = app.params.dialog.autoFocus;
    const autoFocusHandler = autoFocus ? {
      on: {
        opened(dialog) {
          dialog.$el.find('input').eq(0).focus();
        }
      }
    } : {};
    const isIosTheme = app.theme === 'ios';
    app.dialog = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.extend)((0,_shared_modal_methods_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      app,
      constructor: _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"],
      defaultSelector: '.dialog.modal-in'
    }), {
      // Shortcuts
      alert() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        let [text, title, callbackOk] = args;
        if (args.length === 2 && typeof args[1] === 'function') {
          [text, callbackOk, title] = args;
        }
        return new _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, {
          title: typeof title === 'undefined' ? defaultDialogTitle() : title,
          text,
          buttons: [{
            text: app.params.dialog.buttonOk,
            strong: isIosTheme,
            onClick: callbackOk,
            keyCodes: keyboardActions ? [13, 27] : null
          }],
          destroyOnClose
        }).open();
      },
      prompt() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        let [text, title, callbackOk, callbackCancel, defaultValue] = args;
        if (typeof args[1] === 'function') {
          [text, callbackOk, callbackCancel, defaultValue, title] = args;
        }
        defaultValue = typeof defaultValue === 'undefined' || defaultValue === null ? '' : defaultValue;
        return new _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, {
          title: typeof title === 'undefined' ? defaultDialogTitle() : title,
          text,
          content: `<div class="dialog-input-field input"><input type="text" class="dialog-input" value="${defaultValue}"></div>`,
          buttons: [{
            text: app.params.dialog.buttonCancel,
            keyCodes: keyboardActions ? [27] : null,
            color: null
          }, {
            text: app.params.dialog.buttonOk,
            strong: isIosTheme,
            keyCodes: keyboardActions ? [13] : null
          }],
          onClick(dialog, index) {
            const inputValue = dialog.$el.find('.dialog-input').val();
            if (index === 0 && callbackCancel) callbackCancel(inputValue);
            if (index === 1 && callbackOk) callbackOk(inputValue);
          },
          destroyOnClose,
          ...autoFocusHandler
        }).open();
      },
      confirm() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        let [text, title, callbackOk, callbackCancel] = args;
        if (typeof args[1] === 'function') {
          [text, callbackOk, callbackCancel, title] = args;
        }
        return new _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, {
          title: typeof title === 'undefined' ? defaultDialogTitle() : title,
          text,
          buttons: [{
            text: app.params.dialog.buttonCancel,
            onClick: callbackCancel,
            keyCodes: keyboardActions ? [27] : null,
            color: null
          }, {
            text: app.params.dialog.buttonOk,
            strong: isIosTheme,
            onClick: callbackOk,
            keyCodes: keyboardActions ? [13] : null
          }],
          destroyOnClose
        }).open();
      },
      login() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        let [text, title, callbackOk, callbackCancel] = args;
        if (typeof args[1] === 'function') {
          [text, callbackOk, callbackCancel, title] = args;
        }
        return new _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, {
          title: typeof title === 'undefined' ? defaultDialogTitle() : title,
          text,
          // prettier-ignore
          content: `
              <div class="dialog-input-field dialog-input-double input">
                <input type="text" name="dialog-username" placeholder="${app.params.dialog.usernamePlaceholder}" class="dialog-input">
              </div>
              <div class="dialog-input-field dialog-input-double input">
                <input type="password" name="dialog-password" placeholder="${app.params.dialog.passwordPlaceholder}" class="dialog-input">
              </div>`,
          buttons: [{
            text: app.params.dialog.buttonCancel,
            keyCodes: keyboardActions ? [27] : null,
            color: null
          }, {
            text: app.params.dialog.buttonOk,
            strong: isIosTheme,
            keyCodes: keyboardActions ? [13] : null
          }],
          onClick(dialog, index) {
            const username = dialog.$el.find('[name="dialog-username"]').val();
            const password = dialog.$el.find('[name="dialog-password"]').val();
            if (index === 0 && callbackCancel) callbackCancel(username, password);
            if (index === 1 && callbackOk) callbackOk(username, password);
          },
          destroyOnClose,
          ...autoFocusHandler
        }).open();
      },
      password() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
        let [text, title, callbackOk, callbackCancel] = args;
        if (typeof args[1] === 'function') {
          [text, callbackOk, callbackCancel, title] = args;
        }
        return new _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, {
          title: typeof title === 'undefined' ? defaultDialogTitle() : title,
          text,
          // prettier-ignore
          content: `
              <div class="dialog-input-field input">
                <input type="password" name="dialog-password" placeholder="${app.params.dialog.passwordPlaceholder}" class="dialog-input">
              </div>`,
          buttons: [{
            text: app.params.dialog.buttonCancel,
            keyCodes: keyboardActions ? [27] : null,
            color: null
          }, {
            text: app.params.dialog.buttonOk,
            strong: isIosTheme,
            keyCodes: keyboardActions ? [13] : null
          }],
          onClick(dialog, index) {
            const password = dialog.$el.find('[name="dialog-password"]').val();
            if (index === 0 && callbackCancel) callbackCancel(password);
            if (index === 1 && callbackOk) callbackOk(password);
          },
          destroyOnClose,
          ...autoFocusHandler
        }).open();
      },
      preloader(title, color) {
        const preloaders = {
          iosPreloaderContent: _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.iosPreloaderContent,
          mdPreloaderContent: _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.mdPreloaderContent
        };
        const preloaderInner = preloaders[`${app.theme}PreloaderContent`] || '';
        return new _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, {
          title: typeof title === 'undefined' || title === null ? app.params.dialog.preloaderTitle : title,
          // prettier-ignore
          content: `<div class="preloader${color ? ` color-${color}` : ''}">${preloaderInner}</div>`,
          cssClass: 'dialog-preloader',
          destroyOnClose
        }).open();
      },
      progress() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }
        let [title, progress, color] = args;
        if (args.length === 2) {
          if (typeof args[0] === 'number') {
            [progress, color, title] = args;
          } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
            [title, color, progress] = args;
          }
        } else if (args.length === 1) {
          if (typeof args[0] === 'number') {
            [progress, title, color] = args;
          }
        }
        const infinite = typeof progress === 'undefined';
        const dialog = new _dialog_class_js__WEBPACK_IMPORTED_MODULE_0__["default"](app, {
          title: typeof title === 'undefined' ? app.params.dialog.progressTitle : title,
          cssClass: 'dialog-progress',
          // prettier-ignore
          content: `
              <div class="progressbar${infinite ? '-infinite' : ''}${color ? ` color-${color}` : ''}">
                ${!infinite ? '<span></span>' : ''}
              </div>
            `,
          destroyOnClose
        });
        if (!infinite) dialog.setProgress(progress);
        return dialog.open();
      }
    });
  }
});

/***/ })

}]);