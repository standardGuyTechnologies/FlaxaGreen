"use strict";
(globalThis["webpackChunkflaxa_green"] = globalThis["webpackChunkflaxa_green"] || []).push([[4],{

/***/ 280:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _shared_get_support_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47);
/* harmony import */ var _shared_get_device_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(48);
/* harmony import */ var _modal_modal_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(103);






class Popup extends _modal_modal_class_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(app, params) {
    const extendedParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)({
      on: {}
    }, app.params.popup, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);
    const popup = this;
    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();
    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();
    const support = (0,_shared_get_support_js__WEBPACK_IMPORTED_MODULE_4__.getSupport)();
    const device = (0,_shared_get_device_js__WEBPACK_IMPORTED_MODULE_5__.getDevice)();
    popup.params = extendedParams;

    // Find Element
    let $el;
    if (!popup.params.el) {
      $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popup.params.content).filter(node => node.nodeType === 1).eq(0);
    } else {
      $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popup.params.el).eq(0);
    }
    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }
    if ($el.length === 0) {
      return popup.destroy();
    }
    let $backdropEl;
    if (popup.params.backdrop && popup.params.backdropEl) {
      $backdropEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popup.params.backdropEl);
    } else if (popup.params.backdrop) {
      if (popup.params.backdropUnique) {
        $backdropEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('<div class="popup-backdrop popup-backdrop-unique"></div>');
        popup.$containerEl.append($backdropEl);
      } else {
        $backdropEl = popup.$containerEl.children('.popup-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('<div class="popup-backdrop"></div>');
        popup.$containerEl.append($backdropEl);
      }
    }
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.extend)(popup, {
      app,
      push: $el.hasClass('popup-push') || popup.params.push,
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popup',
      $htmlEl: (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])('html')
    });
    if (popup.params.push) {
      $el.addClass('popup-push');
    }
    function handleClick(e) {
      const target = e.target;
      const $target = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target);
      const keyboardOpened = !device.desktop && device.cordova && (window.Keyboard && window.Keyboard.isVisible || window.cordova.plugins && window.cordova.plugins.Keyboard && window.cordova.plugins.Keyboard.isVisible);
      if (keyboardOpened) return;
      if ($target.closest(popup.el).length === 0) {
        if (popup.params && popup.params.closeByBackdropClick && popup.params.backdrop && popup.backdropEl && popup.backdropEl === target) {
          let needToClose = true;
          popup.$el.nextAll('.popup.modal-in').each(popupEl => {
            const popupInstance = popupEl.f7Modal;
            if (!popupInstance) return;
            if (popupInstance.params.closeByBackdropClick && popupInstance.params.backdrop && popupInstance.backdropEl === popup.backdropEl) {
              needToClose = false;
            }
          });
          if (needToClose) {
            popup.close();
          }
        }
      }
    }
    function onKeyDown(e) {
      const keyCode = e.keyCode;
      if (keyCode === 27 && popup.params.closeOnEscape) {
        popup.close();
      }
    }
    let pushOffset;
    let isPush;
    function pushViewScale(offset) {
      return (app.height - offset * 2) / app.height;
    }
    let allowSwipeToClose = true;
    let isTouched = false;
    let startTouch;
    let currentTouch;
    let isScrolling;
    let touchStartTime;
    let touchesDiff;
    let isMoved = false;
    let pageContentEl;
    let pageContentScrollTop;
    let pageContentOffsetHeight;
    let pageContentScrollHeight;
    let popupHeight;
    let $pushEl;
    function handleTouchStart(e) {
      if (isTouched || !allowSwipeToClose || !popup.params.swipeToClose || !e.isTrusted) return;
      if (popup.params.swipeHandler && (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest(popup.params.swipeHandler).length === 0) {
        return;
      }
      if ((0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest('.sortable-handler').length > 0) return;
      isTouched = true;
      isMoved = false;
      startTouch = {
        x: e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX,
        y: e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY
      };
      touchStartTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.now)();
      isScrolling = undefined;
      if (!popup.params.swipeHandler && e.type === 'touchstart') {
        pageContentEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest('.page-content')[0];
      }
    }
    function handleTouchMove(e) {
      if (!isTouched || !e.isTrusted) return;
      currentTouch = {
        x: e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX,
        y: e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY
      };
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(currentTouch.x - startTouch.x) > Math.abs(currentTouch.y - startTouch.y));
      }
      if (isScrolling) {
        isTouched = false;
        isMoved = false;
        return;
      }
      touchesDiff = startTouch.y - currentTouch.y;
      if (isPush && pushOffset && touchesDiff > 0) {
        touchesDiff = 0;
      }
      const direction = touchesDiff < 0 ? 'to-bottom' : 'to-top';
      $el.transition(0);
      if (typeof popup.params.swipeToClose === 'string' && direction !== popup.params.swipeToClose) {
        $el.transform('');
        $el.transition('');
        return;
      }
      if (!isMoved) {
        if (isPush && pushOffset) {
          popupHeight = $el[0].offsetHeight;
          $pushEl = $el.prevAll('.popup.modal-in').eq(0);
          if ($pushEl.length === 0) {
            $pushEl = app.$el.children('.view, .views');
          }
        }
        if (pageContentEl) {
          pageContentScrollTop = pageContentEl.scrollTop;
          pageContentScrollHeight = pageContentEl.scrollHeight;
          pageContentOffsetHeight = pageContentEl.offsetHeight;
          if (!(pageContentScrollHeight === pageContentOffsetHeight) && !(direction === 'to-bottom' && pageContentScrollTop === 0) && !(direction === 'to-top' && pageContentScrollTop === pageContentScrollHeight - pageContentOffsetHeight)) {
            $el.transform('');
            $el.transition('');
            isTouched = false;
            isMoved = false;
            return;
          }
        }
        isMoved = true;
        popup.emit('local::swipeStart popupSwipeStart', popup);
        popup.$el.trigger('popup:swipestart');
      } else {
        popup.emit('local::swipeMove popupSwipeMove', popup);
        popup.$el.trigger('popup:swipemove');
      }
      e.preventDefault();
      if (isPush && pushOffset) {
        const pushProgress = 1 - Math.abs(touchesDiff / popupHeight);
        const scale = 1 - (1 - pushViewScale(pushOffset)) * pushProgress;
        if ($pushEl.hasClass('popup')) {
          if ($pushEl.hasClass('popup-push')) {
            $pushEl.transition(0).forEach(el => {
              el.style.setProperty('transform', `translate3d(0, calc(-1 * ${pushProgress} * (var(--f7-popup-push-offset) + 10px)) , 0px) scale(${scale})`, 'important');
            });
          } else {
            $pushEl.transition(0).forEach(el => {
              el.style.setProperty('transform', `translate3d(0, 0px , 0px) scale(${scale})`, 'important');
            });
          }
        } else {
          $pushEl.transition(0).forEach(el => {
            el.style.setProperty('transform', `translate3d(0,0,0) scale(${scale})`, 'important');
          });
        }
      }
      $el.transition(0).transform(`translate3d(0,${-touchesDiff}px,0)`);
    }
    function handleTouchEnd(e) {
      if (!e.isTrusted) return;
      isTouched = false;
      if (!isMoved) {
        return;
      }
      popup.emit('local::swipeEnd popupSwipeEnd', popup);
      popup.$el.trigger('popup:swipeend');
      isMoved = false;
      allowSwipeToClose = false;
      $el.transition('');
      if (isPush && pushOffset) {
        $pushEl.transition('').transform('');
      }
      const direction = touchesDiff <= 0 ? 'to-bottom' : 'to-top';
      if (typeof popup.params.swipeToClose === 'string' && direction !== popup.params.swipeToClose) {
        $el.transform('');
        allowSwipeToClose = true;
        return;
      }
      const diff = Math.abs(touchesDiff);
      const timeDiff = new Date().getTime() - touchStartTime;
      if (timeDiff < 300 && diff > 20 || timeDiff >= 300 && diff > 100) {
        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
          if (direction === 'to-bottom') {
            $el.addClass('swipe-close-to-bottom');
          } else {
            $el.addClass('swipe-close-to-top');
          }
          $el.transform('');
          popup.emit('local::swipeclose popupSwipeClose', popup);
          popup.$el.trigger('popup:swipeclose');
          popup.close();
          allowSwipeToClose = true;
        });
        return;
      }
      allowSwipeToClose = true;
      $el.transform('');
    }
    const passive = support.passiveListener ? {
      passive: true
    } : false;
    if (popup.params.swipeToClose) {
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      popup.once('popupDestroy', () => {
        $el.off(app.touchEvents.start, handleTouchStart, passive);
        app.off('touchmove', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      });
    }
    let hasPreviousPushPopup;
    const updatePushOffset = () => {
      const wasPush = isPush;
      if (popup.push) {
        isPush = popup.push && (app.width < 630 || app.height < 630 || $el.hasClass('popup-tablet-fullscreen'));
      }
      if (isPush && !wasPush) {
        // eslint-disable-next-line
        setPushOffset();
      } else if (isPush && wasPush) {
        popup.$htmlEl[0].style.setProperty('--f7-popup-push-scale', pushViewScale(pushOffset));
      } else if (!isPush && wasPush) {
        popup.$htmlEl.removeClass('with-modal-popup-push');
        popup.$htmlEl[0].style.removeProperty('--f7-popup-push-scale');
      }
    };
    const setPushOffset = () => {
      app.off('resize', updatePushOffset);
      if (popup.push) {
        isPush = popup.push && (app.width < 630 || app.height < 630 || $el.hasClass('popup-tablet-fullscreen'));
      }
      if (isPush) {
        pushOffset = parseInt($el.css('--f7-popup-push-offset'), 10);
        if (Number.isNaN(pushOffset)) {
          pushOffset = 0;
        }
        if (!pushOffset) pushOffset = app.theme === 'ios' ? 44 : 48;
        popup.$htmlEl[0].style.setProperty('--f7-popup-push-offset', `${pushOffset}px`);
        $el.addClass('popup-push');
        popup.$htmlEl.addClass('with-modal-popup-push');
        popup.$htmlEl[0].style.setProperty('--f7-popup-push-scale', pushViewScale(pushOffset));
      }
      app.on('resize', updatePushOffset);
    };
    popup.on('open', () => {
      hasPreviousPushPopup = false;
      if (popup.params.closeOnEscape) {
        (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document).on('keydown', onKeyDown);
      }
      $el.prevAll('.popup.modal-in').addClass('popup-behind');
      setPushOffset();
    });
    popup.on('opened', () => {
      $el.removeClass('swipe-close-to-bottom swipe-close-to-top');
      if (popup.params.closeByBackdropClick) {
        app.on('click', handleClick);
      }
    });
    popup.on('close', () => {
      hasPreviousPushPopup = popup.$el.prevAll('.popup-push.modal-in').length > 0;
      if (popup.params.closeOnEscape) {
        (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document).off('keydown', onKeyDown);
      }
      if (popup.params.closeByBackdropClick) {
        app.off('click', handleClick);
      }
      $el.prevAll('.popup.modal-in').eq(0).removeClass('popup-behind');
      if (isPush && pushOffset && !hasPreviousPushPopup) {
        popup.$htmlEl.removeClass('with-modal-popup-push');
        popup.$htmlEl.addClass('with-modal-popup-push-closing');
      }
      app.off('resize', updatePushOffset);
    });
    popup.on('closed', () => {
      $el.removeClass('popup-behind');
      if (isPush && pushOffset && !hasPreviousPushPopup) {
        popup.$htmlEl.removeClass('with-modal-popup-push-closing');
        popup.$htmlEl[0].style.removeProperty('--f7-popup-push-scale');
        popup.$htmlEl[0].style.removeProperty('--f7-popup-push-offset');
      }
    });
    $el[0].f7Modal = popup;
    return popup;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);

/***/ }),

/***/ 279:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _popup_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(280);
/* harmony import */ var _shared_modal_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popup',
  params: {
    popup: {
      backdrop: true,
      backdropEl: undefined,
      backdropUnique: false,
      closeByBackdropClick: true,
      closeOnEscape: false,
      swipeToClose: false,
      swipeHandler: null,
      push: false,
      containerEl: null
    }
  },
  static: {
    Popup: _popup_class_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  create() {
    const app = this;
    app.popup = (0,_shared_modal_methods_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      app,
      constructor: _popup_class_js__WEBPACK_IMPORTED_MODULE_0__["default"],
      defaultSelector: '.popup.modal-in',
      parentSelector: '.popup'
    });
  },
  clicks: {
    '.popup-open': function openPopup($clickedEl, data) {
      if (data === void 0) {
        data = {};
      }
      const app = this;
      app.popup.open(data.popup, data.animate, $clickedEl);
    },
    '.popup-close': function closePopup($clickedEl, data) {
      if (data === void 0) {
        data = {};
      }
      const app = this;
      app.popup.close(data.popup, data.animate, $clickedEl);
    }
  }
});

/***/ })

}]);