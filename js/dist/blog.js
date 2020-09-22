'use strict';

var subscribeToUpdates = document.querySelector('div.subscribe-to-updates');
var subNavigationWrapper = document.querySelector('div.sub-navigation-wrapper');
var wrapper = document.querySelector('section.sub-navigation-for-page-content');
var overlay = document.querySelector('div.sub-navigation-overlay');
var isCollapse = false;
var isAnimated = false;
var header = document.querySelector('div.sub-navigation-header');
var body = document.querySelector('ul.sub-navigation-list');
var topHeight = 124;

var switchMenu = function switchMenu() {
    if (!isCollapse && !isAnimated) {
        isAnimated = true;
        overlay.style.height = $(document).height() - 176 + 'px';
        subNavigationWrapper.style.height = $(document).height() - 176 + 'px';
        $(body).fadeIn(400, function () {
            isAnimated = false;
            isCollapse = true;
        });
        $(overlay).fadeIn(200);
    }
    if (isCollapse && !isAnimated) {
        isAnimated = true;
        overlay.style.height = $(document).height() - 176 + 'px';
        subNavigationWrapper.style.height = $(document).height() - 176 + 'px';
        $(body).fadeOut(200, function () {
            isAnimated = false;
            isCollapse = false;
        });
        $(overlay).fadeOut(400, function () {
            subNavigationWrapper.removeAttribute('style');
        });
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
    } else {
        if (subscribeToUpdates.offsetTop < window.scrollY + window.innerHeight) {
            console.log('done');
            subNavigationWrapper.style.maxHeight = 'calc(100vh - ' + (window.scrollY + window.innerHeight - subscribeToUpdates.offsetTop) + 'px)';
        } else {
            subNavigationWrapper.style.maxHeight = 'unset';
        }
    }
};

window.addEventListener('resize', function (e) {
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
    onScroll(e);
});