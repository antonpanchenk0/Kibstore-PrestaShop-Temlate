'use strict';

var _navigationModule = require('./modules/navigation-module.js');

var _navigationModule2 = _interopRequireDefault(_navigationModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navElements = document.querySelectorAll('.menu-link');
var overlay = document.getElementById('overlay');
var loadMore = document.getElementById('loadMore');

var navigation = new _navigationModule2.default(600);

var changeSub = function changeSub(e) {
    e.preventDefault();
    var target = e.target;

    var status = target.parentElement.getAttribute('data-collapse');
    if (status == 'true') {
        target.parentElement.setAttribute('data-collapse', 'false');
        loadMore.style.display = 'flex';
        $($(target).siblings('ul')[0]).fadeOut(500, function () {
            target.parentElement.classList.remove('collapse');
        });
        $(overlay).fadeOut(500);
    } else {
        target.parentElement.setAttribute('data-collapse', 'true');
        loadMore.style.display = 'none';
        target.parentElement.classList.add('collapse');
        $(overlay).fadeIn(500);
        $($(target).siblings('ul')[0]).fadeIn(500);
    }
};

navElements.forEach(function (e) {
    e.addEventListener('click', changeSub);
});

overlay.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector('.menu-item[data-collapse=true] .menu-link');
    target.parentElement.setAttribute('data-collapse', 'false');
    loadMore.style.display = 'flex';
    $($(target).siblings('ul')[0]).fadeOut(500, function () {
        target.parentElement.classList.remove('collapse');
    });
    $(overlay).fadeOut(500);
});