'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function Slider(swipeTime) {
    var _this = this;

    _classCallCheck(this, Slider);

    this.slideTo = function (next_id) {
        console.log(next_id);
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
    };

    this.swipeTime = swipeTime >= 1000 ? swipeTime : 1000;
    this.slides = document.querySelectorAll('div.product-image-slider-image');
    this.slidesControls = document.querySelectorAll('li.product-image-slider-controls-item');
    this.slidesShortCuts = document.querySelectorAll('li.product-short-cuts-item');
    this.activeNowId = 0;
    this.interval = null;

    this.onLoad();
};

var slider = new Slider(5000);