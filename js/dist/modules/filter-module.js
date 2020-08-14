'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function Filters(animationDuration) {
    _classCallCheck(this, Filters);

    _initialiseProps.call(this);

    this.config = {
        prItemViewType: 'plate',
        sortHeaderNode: document.querySelector('.sort-header'),
        switchPrItemViewBtn: document.getElementById('switch-view-btn'),
        filterBtn: document.getElementById('filterBtn'),
        filterCollapseWrap: document.getElementById('filterCollapseWrap'),
        filterCollapseNode: document.getElementById('filterCollapse'),
        filterCollapseCloseBtn: document.querySelector('.filter-collapse-go-back-btn'),
        filterCollapseCloseSvg: document.querySelector('.close-filter-svg'),
        isFilterCollapse: false,
        animationDuration: animationDuration
    };
    this.heightToFilterBlock = this.config.sortHeaderNode.getBoundingClientRect().top - this.config.sortHeaderNode.parentElement.getBoundingClientRect().top;
    this.createFilterEvents();
    setTimeout(this.multiRange('range', 'rangeBetween', 'rangeButton1n', 'rangeButton2n', 'rangeInput1n', 'rangeInput2n'), 0);
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.createFilterEvents = function () {
        // Open event
        _this.config.filterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var _config = _this.config,
                isFilterCollapse = _config.isFilterCollapse,
                filterCollapseNode = _config.filterCollapseNode,
                filterCollapseWrap = _config.filterCollapseWrap,
                animationDuration = _config.animationDuration;

            if (isFilterCollapse) return false;
            _this.updateFilterEvents();
            document.body.classList.add('scroll-disabled');
            _this.config.isFilterCollapse = true;
            $(filterCollapseWrap).fadeIn(animationDuration / 10);
            $(filterCollapseNode).animate({ 'right': isFilterCollapse ? '-310px' : '0px' }, animationDuration);
        });

        //Close event
        _this.config.filterCollapseWrap.addEventListener('mousedown', function (e) {
            var _config2 = _this.config,
                filterCollapseWrap = _config2.filterCollapseWrap,
                filterCollapseCloseBtn = _config2.filterCollapseCloseBtn,
                filterCollapseCloseSvg = _config2.filterCollapseCloseSvg,
                isFilterCollapse = _config2.isFilterCollapse,
                animationDuration = _config2.animationDuration,
                filterCollapseNode = _config2.filterCollapseNode;

            if (e.target !== filterCollapseWrap && e.target !== filterCollapseCloseBtn && e.target !== filterCollapseCloseSvg) return false;
            e.preventDefault();
            if (!isFilterCollapse) return false;
            _this.config.isFilterCollapse = false;
            $(filterCollapseNode).animate({ 'right': isFilterCollapse ? '-310px' : '0px' }, animationDuration, function () {
                $(filterCollapseWrap).fadeOut(animationDuration / 10, function () {
                    document.body.classList.remove('scroll-disabled');
                });
            });
        });

        // Sticky filter event
        window.addEventListener('scroll', function (e) {
            if (window.pageYOffset >= _this.heightToFilterBlock) {
                _this.config.sortHeaderNode.classList.add('sticky');
                document.querySelector('div.catalog-positions').style.paddingTop = _this.config.sortHeaderNode.getBoundingClientRect().height + 'px';
            } else {
                _this.config.sortHeaderNode.classList.remove('sticky');
                document.querySelector('div.catalog-positions').style.paddingTop = 0;
            }
        });
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
        button2.style.marginLeft = 200 + 'px';
        between.style.width = 200 + 'px';
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

    this.updateFilterEvents = function () {
        var checks = document.querySelectorAll('.form-check input');
        checks.forEach(function (check) {
            check.removeEventListener('input', _this.renderActiveBrands);
            check.addEventListener('input', _this.renderActiveBrands);
        });
    };

    this.renderActiveBrands = function () {
        var checks = document.querySelectorAll('.form-check input:checked');
        document.querySelector('#selectedFilters').innerHTML = '';
        checks.forEach(function (e) {
            var value = e.getAttribute('id');
            var type = e.getAttribute('data-type');
            _this.renderSingleActiveBrand(type, value);
        });
    };

    this.renderSingleActiveBrand = function (type, value) {
        var wrap = document.querySelector('#selectedFilters');
        var node = document.createElement('div');
        node.classList.add('selected-item');
        switch (type) {
            case 'brand':
                {
                    node.innerHTML = '<h3>\u0411\u0440\u0435\u043D\u0434:<span>' + value + '</span></h3>';
                    break;
                }
            case 'form':
                {
                    node.innerHTML = '<h3>\u0424\u043E\u0440\u043C\u0444\u0430\u043A\u0442\u043E\u0440:<span>' + value + '</span></h3>';
                }
        }
        node.innerHTML += '<svg fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>';
        var svg = node.querySelector('svg');
        svg.addEventListener('click', function (e) {
            e.preventDefault();
            var node = e.currentTarget;
            var parent = node.parentElement;
            var value = parent.querySelector('h3 span').innerHTML;
            var input = document.getElementById(value);
            input.checked = false;
            wrap.removeChild(parent);
        });
        node.appendChild(svg);
        wrap.appendChild(node);
    };
};

exports.default = Filters;