'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function Slider(swipeTime) {
    var _this = this;

    _classCallCheck(this, Slider);

    this.slideTo = function (next_id) {
        var slidesControls = _this.slidesControls,
            id_prev = _this.activeNowId,
            slides = _this.slides,
            slidesShortCuts = _this.slidesShortCuts;

        var id_next = null;
        if (next_id === undefined) {
            id_next = id_prev + 1 < slides.length ? id_prev + 1 : id_prev * 0;
        } else {
            id_next = next_id;
            clearInterval(_this.interval);
            _this.interval = setInterval(function () {
                return _this.slideTo();
            }, _this.swipeTime);
        }
        slides[id_next].classList.add('show');
        slidesControls[id_prev].classList.remove('show');
        slidesControls[id_next].classList.add('show');
        slidesShortCuts[id_prev].classList.remove('show');
        slidesShortCuts[id_next].classList.add('show');
        slides[id_prev].classList.remove('show');
        slides[id_next].classList.add('show');
        _this.activeNowId = id_next;
    };

    this.onLoad = function () {
        // Start slider
        _this.interval = setInterval(function () {
            return _this.slideTo();
        }, _this.swipeTime);

        // Swipe control events
        _this.slidesControls.forEach(function (c) {
            var slideId = Number(c.getAttribute('data-slide')) - 1;
            c.addEventListener('click', function () {
                return _this.slideTo(slideId);
            });
            c.addEventListener('touchend', function () {
                return _this.slideTo(slideId);
            });
        });

        // Swipe shortcuts events
        _this.slidesShortCuts.forEach(function (c) {
            var slideId = Number(c.getAttribute('data-slide')) - 1;
            c.addEventListener('click', function () {
                return _this.slideTo(slideId);
            });
            c.addEventListener('touchend', function () {
                return _this.slideTo(slideId);
            });
        });
    };

    this.swipeTime = swipeTime >= 1000 ? swipeTime : 1000;
    this.slides = document.querySelectorAll('div.product-image-slider-image');
    this.slidesControls = document.querySelectorAll('li.product-image-slider-controls-item');
    this.slidesShortCuts = document.querySelectorAll('li.product-short-cuts-item');
    this.activeNowId = 0;
    this.interval = null;

    this.onLoad();
};

var ProductNavigation = function ProductNavigation(animationDuration) {
    var _this2 = this;

    _classCallCheck(this, ProductNavigation);

    this.createNavigationEvents = function () {
        // Product fieldset swipe
        _this2.navLinks.forEach(function (l) {
            l.addEventListener('click', _this2.changeViewProductFieldset);
            l.addEventListener('touchend', _this2.changeViewProductFieldset);
        });

        _this2.showMoreShortCutsBtn.addEventListener('click', _this2.showAllShortCuts);
    };

    this.showAllShortCuts = function (e) {
        e.preventDefault();
        $(_this2.showMoreShortCutsBtn).fadeOut(_this2.animationDuration / 3, function () {
            _this2.showMoreShortCutsBtn.previousElementSibling.classList.remove('short-list');
        });
    };

    this.changeViewProductFieldset = function (e) {
        e.preventDefault();
        var pageId = Number(e.target.getAttribute('data-toggle') || e.target.parentNode.getAttribute('data-toggle'));
        _this2.navLinks.forEach(function (l) {
            return l.classList.remove('active');
        });
        _this2.navLinks[pageId - 1].classList.add('active');
        _this2.productFieldsets[_this2.activeFielsetId - 1].classList.remove('show');
        _this2.productFieldsets[pageId - 1].classList.add('show');
        _this2.activeFielsetId = pageId;
        $('body,html').animate({ scrollTop: 0 }, _this2.animationDuration);
    };

    this.animationDuration = animationDuration;
    this.navLinks = document.querySelectorAll('li.product-about-section-header-navigation-item');
    this.productFieldsets = document.querySelectorAll('section.about-product-fieldset');
    this.activeFielsetId = 1;
    this.productAboutSection = document.querySelector('section.product-about-section');
    this.productAboutSectionTop = this.productAboutSection.offsetTop + this.productAboutSection.offsetHeight;
    this.productInfoBlock = document.querySelector('div.product-about-section-body');
    this.productBuyBlock = document.querySelector('div.buy-section');
    this.productControlBlock = document.querySelector('div.control-section');
    this.productNavigation = document.querySelector('div.product-about-section-header');
    this.showMoreShortCutsBtn = document.querySelector('a.show-more-short-cuts-btn');
    this.productNavigationTop = this.productNavigation.offsetTop;
    this.isSticky = false;

    this.createNavigationEvents();
};

var slider = new Slider(5000);

var productNavigation = new ProductNavigation(400);