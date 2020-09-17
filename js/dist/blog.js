'use strict';

var wrapper = document.querySelector('section.sub-navigation-for-page-content');
var overlay = document.querySelector('div.sub-navigation-overlay');
var isCollapse = false;
var isAnimated = false;
var header = document.querySelector('div.sub-navigation-header');
var body = document.querySelector('ul.sub-navigation-list');
var topHeight = wrapper.getBoundingClientRect().top - 40;

var switchMenu = function switchMenu() {
    if (!isCollapse && !isAnimated) {
        isAnimated = true;
        overlay.style.height = document.body.getBoundingClientRect().height - 176 + 'px';
        $(body).fadeIn(400, function () {
            isAnimated = false;
            isCollapse = true;
        });
        $(overlay).fadeIn(200);
    }
    if (isCollapse && !isAnimated) {
        isAnimated = true;
        overlay.style.height = document.body.getBoundingClientRect().height - 176 + 'px';
        $(body).fadeOut(200, function () {
            isAnimated = false;
            isCollapse = false;
        });
        $(overlay).fadeOut(400);
    }
};

var onScroll = function onScroll(e) {
    if (window.innerWidth <= 860) {
        if (window.scrollY >= topHeight) {
            wrapper.classList.add('fixed');
        }
        if (window.scrollY < topHeight) {
            wrapper.classList.remove('fixed');
        }
    }
};

window.addEventListener('resize', function (e) {
    topHeight = wrapper.getBoundingClientRect().top - 40;
    onScroll(e);
});

header.addEventListener('click', function (e) {
    switchMenu();
});

overlay.addEventListener('click', function (e) {
    switchMenu();
});

window.addEventListener('scroll', function (e) {
    onScroll(e);
});

document.addEventListener('DOMContentLoaded', function (e) {
    topHeight = wrapper.getBoundingClientRect().top - 40;
    onScroll(e);
});