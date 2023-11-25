"use strict";
(globalThis["webpackChunkflaxa_green"] = globalThis["webpackChunkflaxa_green"] || []).push([[16],{

/***/ 300:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var _shared_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);



class DataTable extends _shared_class_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(app, params) {
    if (params === void 0) {
      params = {};
    }
    super(params, [app]);
    const table = this;
    const defaults = {};

    // Extend defaults with modules params
    table.useModulesParams(defaults);
    table.params = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)(defaults, params);

    // El
    const $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(table.params.el);
    if ($el.length === 0) return undefined;
    table.$el = $el;
    table.el = $el[0];
    if (table.$el[0].f7DataTable) {
      const instance = table.$el[0].f7DataTable;
      table.destroy();
      return instance;
    }
    table.$el[0].f7DataTable = table;
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)(table, {
      collapsible: $el.hasClass('data-table-collapsible'),
      // Headers
      $headerEl: $el.find('.data-table-header'),
      $headerSelectedEl: $el.find('.data-table-header-selected')
    });

    // Events
    function handleChange(e) {
      if (e.detail && e.detail.sentByF7DataTable) {
        // Scripted event, don't do anything
        return;
      }
      const $inputEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this);
      const checked = $inputEl[0].checked;
      const columnIndex = $inputEl.parents('td,th').index();
      if ($inputEl.parents('thead').length > 0) {
        if (columnIndex === 0) {
          $el.find('tbody tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }
        $el.find(`tbody tr td:nth-child(${columnIndex + 1}) input`).prop('checked', checked).trigger('change', {
          sentByF7DataTable: true
        });
        $inputEl.prop('indeterminate', false);
      } else {
        if (columnIndex === 0) {
          $inputEl.parents('tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }
        const checkedRows = $el.find(`tbody .checkbox-cell:nth-child(${columnIndex + 1}) input[type="checkbox"]:checked`).length;
        const totalRows = $el.find('tbody tr').length;
        const $headCheckboxEl = $el.find(`thead .checkbox-cell:nth-child(${columnIndex + 1}) input[type="checkbox"]`);
        if (!checked) {
          $headCheckboxEl.prop('checked', false);
        } else if (checkedRows === totalRows) {
          $headCheckboxEl.prop('checked', true).trigger('change', {
            sentByF7DataTable: true
          });
        }
        $headCheckboxEl.prop('indeterminate', checkedRows > 0 && checkedRows < totalRows);
      }
      table.checkSelectedHeader();
    }
    function handleSortableClick() {
      const $cellEl = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this);
      const isActive = $cellEl.hasClass('sortable-cell-active');
      const currentSort = $cellEl.hasClass('sortable-desc') ? 'desc' : 'asc';
      let newSort;
      if (isActive) {
        newSort = currentSort === 'desc' ? 'asc' : 'desc';
        $cellEl.removeClass('sortable-desc sortable-asc').addClass(`sortable-${newSort}`);
      } else {
        $el.find('thead .sortable-cell-active').removeClass('sortable-cell-active');
        $cellEl.addClass('sortable-cell-active');
        newSort = currentSort;
      }
      $cellEl.trigger('datatable:sort', newSort);
      table.emit('local::sort dataTableSort', table, newSort);
    }
    table.attachEvents = function attachEvents() {
      table.$el.on('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').on('click', handleSortableClick);
    };
    table.detachEvents = function detachEvents() {
      table.$el.off('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').off('click', handleSortableClick);
    };

    // Install Modules
    table.useModules();

    // Init
    table.init();
    return table;
  }
  setCollapsibleLabels() {
    const table = this;
    if (!table.collapsible) return;
    table.$el.find('tbody td:not(.checkbox-cell)').each(el => {
      const $el = (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el);
      const elIndex = $el.index();
      const collapsibleTitle = $el.attr('data-collapsible-title');
      if (!collapsibleTitle && collapsibleTitle !== '') {
        $el.attr('data-collapsible-title', table.$el.find('thead th').eq(elIndex).text());
      }
    });
  }
  checkSelectedHeader() {
    const table = this;
    if (table.$headerEl.length > 0 && table.$headerSelectedEl.length > 0) {
      const checkedItems = table.$el.find('tbody .checkbox-cell input:checked').length;
      table.$el[checkedItems > 0 ? 'addClass' : 'removeClass']('data-table-has-checked');
      table.$headerSelectedEl.find('.data-table-selected-count').text(checkedItems);
    }
  }
  init() {
    const table = this;
    table.attachEvents();
    table.setCollapsibleLabels();
    table.checkSelectedHeader();
  }
  destroy() {
    let table = this;
    table.$el.trigger('datatable:beforedestroy');
    table.emit('local::beforeDestroy dataTableBeforeDestroy', table);
    table.detachEvents();
    if (table.$el[0]) {
      table.$el[0].f7DataTable = null;
      delete table.$el[0].f7DataTable;
    }
    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.deleteProps)(table);
    table = null;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataTable);

/***/ }),

/***/ 299:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _data_table_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(300);
/* harmony import */ var _shared_constructor_methods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'dataTable',
  static: {
    DataTable: _data_table_class_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  create() {
    const app = this;
    app.dataTable = (0,_shared_constructor_methods_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      defaultSelector: '.data-table',
      constructor: _data_table_class_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      app,
      domProp: 'f7DataTable'
    });
  },
  on: {
    tabBeforeRemove(tabEl) {
      const app = this;
      (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tabEl).find('.data-table-init').each(tableEl => {
        app.dataTable.destroy(tableEl);
      });
    },
    tabMounted(tabEl) {
      const app = this;
      (0,_shared_dom7_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tabEl).find('.data-table-init').each(tableEl => {
        app.dataTable.create({
          el: tableEl
        });
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.data-table-init').each(tableEl => {
        app.dataTable.destroy(tableEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.data-table-init').each(tableEl => {
        app.dataTable.create({
          el: tableEl
        });
      });
    }
  },
  vnode: {
    'data-table-init': {
      insert(vnode) {
        const app = this;
        const tableEl = vnode.elm;
        app.dataTable.create({
          el: tableEl
        });
      },
      destroy(vnode) {
        const app = this;
        const tableEl = vnode.elm;
        app.dataTable.destroy(tableEl);
      }
    }
  }
});

/***/ })

}]);