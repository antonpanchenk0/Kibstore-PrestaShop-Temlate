'use strict';

var _filterModule = require('./modules/filter-module.js');

var _filterModule2 = _interopRequireDefault(_filterModule);

var _navigationModule = require('./modules/navigation-module.js');

var _navigationModule2 = _interopRequireDefault(_navigationModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigation = new _navigationModule2.default(600);
var filters = new _filterModule2.default(800);

document.getElementById('goToCartModalBtn').addEventListener('click', function (e) {
    e.preventDefault();
    $('#addCartModal').modal('hide');
    navigation.openCart(e);
});