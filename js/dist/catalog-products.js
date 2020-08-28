'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function Filters(animationDuration) {
    _classCallCheck(this, Filters);

    _initialiseProps.call(this);

    this.animationDuration = animationDuration;
    this.filters = document.querySelectorAll('.catalog-products-filter-item-header');
    this.openFilterBtn = document.getElementById('filter_open');
    this.filterCollapseBox = document.getElementById('filterSection');
    this.isFilterCollapse = false;
    this.isFilterAnimated = false;
    this.overlay = document.querySelector('div.desktop-navigation-collapse-overlay');
    this.changeViewBtn = document.getElementById('vhange_view');
    this.view = 'plate';
    this.filtersHeaderBox = document.querySelector('div.sort-controls');
    this.productWrapBox = document.querySelector('div.catalog-products-items-wrap');
    this.backArrowFilterBtn = document.querySelector('span.back-arrow-mobile-filter');
    this.XCloseFilterBtn = document.querySelector('span.close-mobile-filter');
    this.isFixed = false;
    this.avaliableFilters = document.querySelectorAll('input[type=checkbox].form-check-input');
    this.prevCheck = null;
    this.createFilterEvents();
    setTimeout(this.multiRange('range', 'rangeBetween', 'rangeButton1n', 'rangeButton2n', 'rangeInput1n', 'rangeInput2n'), 0);
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.createFilterEvents = function () {
        // Разворачивание фильтров в меню фильтров
        _this.filters.forEach(function (f) {
            f.addEventListener('click', function (e) {
                return _this.switchFilter(e, f);
            });
            f.addEventListener('touchend', function (e) {
                return _this.switchFilter(e, f);
            });
        });
        // Розворачивание и сворачивание меню фильтров
        _this.openFilterBtn.addEventListener('click', _this.toggleFilterCollapse);
        _this.openFilterBtn.addEventListener('touchend', _this.toggleFilterCollapse);
        _this.overlay.addEventListener('click', _this.handleCloseFilter);
        _this.overlay.addEventListener('touchend', _this.handleCloseFilter);
        _this.backArrowFilterBtn.addEventListener('click', _this.handleCloseFilter);
        _this.backArrowFilterBtn.addEventListener('touchend', _this.handleCloseFilter);
        _this.XCloseFilterBtn.addEventListener('click', _this.handleCloseFilter);
        _this.XCloseFilterBtn.addEventListener('touchend', _this.handleCloseFilter);

        // Смена отображения товара
        _this.changeViewBtn.addEventListener('click', _this.handleChangeView);
        _this.changeViewBtn.addEventListener('touchend', _this.handleChangeView);

        // Изменяем позицию меню фильтров
        document.addEventListener('scroll', _this.filterFixed);
        _this.filterFixed();

        // События на filter check
        _this.avaliableFilters.forEach(function (c) {
            return c.addEventListener('change', _this.onCheck);
        });
    };

    this.switchFilter = function (e, f) {
        e.preventDefault();
        e.cancelBubble = true;
        var filterNode = f.parentNode;
        if (filterNode.classList.contains('filter-collapse')) {
            filterNode.classList.remove('filter-collapse');
        } else {
            filterNode.classList.add('filter-collapse');
        }
    };

    this.toggleFilterCollapse = function (e) {
        e.preventDefault();
        var isFilterCollapse = _this.isFilterCollapse;

        isFilterCollapse ? _this.handleCloseFilter(e) : _this.handleOpenFilter(e);
    };

    this.handleOpenFilter = function (e) {
        e.preventDefault();
        var filterCollapseBox = _this.filterCollapseBox,
            isFilterCollapse = _this.isFilterCollapse,
            isFilterAnimated = _this.isFilterAnimated,
            animationDuration = _this.animationDuration,
            overlay = _this.overlay;

        if (!isFilterCollapse && !isFilterAnimated && window.innerWidth < 860) {
            _this.isFilterAnimated = true;
            $(overlay).fadeIn(animationDuration * 0.75);
            overlay.style.zIndex = '400';
            $(filterCollapseBox).animate({ 'right': '0px' }, animationDuration * 0.5, function () {
                _this.isFilterCollapse = true;
                _this.isFilterAnimated = false;
            });
        }
    };

    this.handleCloseFilter = function (e) {
        e.preventDefault();
        var filterCollapseBox = _this.filterCollapseBox,
            isFilterCollapse = _this.isFilterCollapse,
            isFilterAnimated = _this.isFilterAnimated,
            animationDuration = _this.animationDuration,
            overlay = _this.overlay;

        if (isFilterCollapse && !isFilterAnimated && window.innerWidth < 860) {
            _this.isFilterAnimated = true;
            $(overlay).fadeOut(animationDuration * 0.75);
            $(filterCollapseBox).animate({ 'right': '-400px' }, animationDuration * 0.5, function () {
                _this.isFilterCollapse = false;
                _this.isFilterAnimated = false;
                overlay.style.zIndex = '10';
            });
        }
    };

    this.handleChangeView = function (e) {
        e.preventDefault();
        var view = _this.view,
            filtersHeaderBox = _this.filtersHeaderBox,
            productWrapBox = _this.productWrapBox;

        switch (view) {
            case 'plate':
                {
                    _this.view = 'list';
                    filtersHeaderBox.classList.add('view-list');
                    productWrapBox.classList.add('view-list');
                    break;
                }
            case 'list':
                {
                    _this.view = 'plate';
                    filtersHeaderBox.classList.remove('view-list');
                    productWrapBox.classList.remove('view-list');
                    break;
                }
            default:
                {
                    _this.view = 'plate';
                    filtersHeaderBox.classList.remove('view-list');
                    productWrapBox.classList.remove('view-list');
                }
        }
    };

    this.filterFixed = function () {
        var isFixed = _this.isFixed,
            filtersHeaderBox = _this.filtersHeaderBox,
            productWrapBox = _this.productWrapBox;

        if (window.scrollY >= productWrapBox.getBoundingClientRect().top + 10 && window.innerWidth <= 860) {
            if (!isFixed) {
                filtersHeaderBox.classList.add('f-fixed-top');
                productWrapBox.style.paddingTop = '43px';
                _this.isFixed = true;
            }
        } else {
            if (isFixed) {
                filtersHeaderBox.classList.remove('f-fixed-top');
                productWrapBox.style.paddingTop = '0px';
                _this.isFixed = false;
            }
        }
    };

    this.onCheck = function (e) {
        var input = e.target;
        var parent = input.parentNode;
        var tooltip = parent.querySelector('div');
        if (_this.prevCheck) {
            _this.prevCheck.style.display = 'none';
        }
        if (tooltip) {
            tooltip.style.display = 'flex';
            _this.prevCheck = tooltip;
        }
    };

    this.multiRange = function (idX, btwX, btn1X, btn2X, input1, input2) {
        var slider = document.getElementById(idX);
        var between = document.getElementById(btwX);
        var button1 = document.getElementById(btn1X);
        var button2 = document.getElementById(btn2X);
        var inpt1 = document.getElementById(input1);
        var inpt2 = document.getElementById(input2);

        var min = inpt1.min;
        var max = inpt1.max;

        /*init*/
        var sliderCoords = getCoords(slider);
        button1.style.marginLeft = '0px';
        button2.style.marginLeft = 190 + 'px';
        between.style.width = 190 + 'px';
        inpt1.value = min;
        inpt2.value = max;

        inpt1.onchange = function (evt) {
            if (parseInt(inpt1.value) < min) inpt1.value = min;
            if (parseInt(inpt1.value) > max) inpt1.value = max;
            if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
                var temp = inpt1.value;
                inpt1.value = inpt2.value;
                inpt2.value = temp;
            }

            var sliderCoords = getCoords(slider);
            var per1 = parseInt(inpt1.value - min) * 100 / (max - min);
            var per2 = parseInt(inpt2.value - min) * 100 / (max - min);
            var left1 = per1 * (slider.offsetWidth - button1.offsetWidth) / 100;
            var left2 = per2 * (slider.offsetWidth - button1.offsetWidth) / 100;

            button1.style.marginLeft = left1 + 'px';
            button2.style.marginLeft = left2 + 'px';

            if (left1 > left2) {
                between.style.width = left1 - left2 + 'px';
                between.style.marginLeft = left2 + 'px';
            } else {
                between.style.width = left2 - left1 + 'px';
                between.style.marginLeft = left1 + 'px';
            }
        };
        inpt2.onchange = function (evt) {
            if (parseInt(inpt2.value) < min) inpt2.value = min;
            if (parseInt(inpt2.value) > max) inpt2.value = max;
            if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
                var temp = inpt1.value;
                inpt1.value = inpt2.value;
                inpt2.value = temp;
            }

            var sliderCoords = getCoords(slider);
            var per1 = parseInt(inpt1.value - min) * 100 / (max - min);
            var per2 = parseInt(inpt2.value - min) * 100 / (max - min);
            var left1 = per1 * (slider.offsetWidth - button1.offsetWidth) / 100;
            var left2 = per2 * (slider.offsetWidth - button1.offsetWidth) / 100;

            button1.style.marginLeft = left1 + 'px';
            button2.style.marginLeft = left2 + 'px';

            if (left1 > left2) {
                between.style.width = left1 - left2 + 'px';
                between.style.marginLeft = left2 + 'px';
            } else {
                between.style.width = left2 - left1 + 'px';
                between.style.marginLeft = left1 + 'px';
            }
        };

        /*mouse*/
        button1.onmousedown = function (evt) {
            var sliderCoords = getCoords(slider);
            var betweenCoords = getCoords(between);
            var buttonCoords1 = getCoords(button1);
            var buttonCoords2 = getCoords(button2);
            var shiftX2 = evt.pageX - buttonCoords2.left;
            var shiftX1 = evt.pageX - buttonCoords1.left;

            document.onmousemove = function (evt) {
                var left1 = evt.pageX - shiftX1 - sliderCoords.left;
                var right1 = slider.offsetWidth - button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > right1) left1 = right1;
                button1.style.marginLeft = left1 + 'px';

                shiftX2 = evt.pageX - buttonCoords2.left;
                var left2 = evt.pageX - shiftX2 - sliderCoords.left;
                var right2 = slider.offsetWidth - button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > right2) left2 = right2;

                var per_min = 0;
                var per_max = 0;
                if (left1 > left2) {
                    between.style.width = left1 - left2 + 'px';
                    between.style.marginLeft = left2 + 'px';

                    per_min = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                    per_max = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                } else {
                    between.style.width = left2 - left1 + 'px';
                    between.style.marginLeft = left1 + 'px';

                    per_min = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                    per_max = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                }
                inpt1.value = parseInt(min) + Math.round((max - min) * per_min / 100);
                inpt2.value = parseInt(min) + Math.round((max - min) * per_max / 100);
            };
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };

        button2.onmousedown = function (evt) {
            var sliderCoords = getCoords(slider);
            var betweenCoords = getCoords(between);
            var buttonCoords1 = getCoords(button1);
            var buttonCoords2 = getCoords(button2);
            var shiftX2 = evt.pageX - buttonCoords2.left;
            var shiftX1 = evt.pageX - buttonCoords1.left;

            document.onmousemove = function (evt) {
                var left2 = evt.pageX - shiftX2 - sliderCoords.left;
                var right2 = slider.offsetWidth - button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > right2) left2 = right2;
                button2.style.marginLeft = left2 + 'px';

                shiftX1 = evt.pageX - buttonCoords1.left;
                var left1 = evt.pageX - shiftX1 - sliderCoords.left;
                var right1 = slider.offsetWidth - button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > right1) left1 = right1;

                var per_min = 0;
                var per_max = 0;

                if (left1 > left2) {
                    between.style.width = left1 - left2 + 'px';
                    between.style.marginLeft = left2 + 'px';
                    per_min = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                    per_max = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                } else {
                    between.style.width = left2 - left1 + 'px';
                    between.style.marginLeft = left1 + 'px';
                    per_min = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                    per_max = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                }
                inpt1.value = parseInt(min) + Math.round((max - min) * per_min / 100);
                inpt2.value = parseInt(min) + Math.round((max - min) * per_max / 100);
            };
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };

        button1.ondragstart = function () {
            return false;
        };
        button2.ondragstart = function () {
            return false;
        };

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    };
};

var filters = new Filters(800);