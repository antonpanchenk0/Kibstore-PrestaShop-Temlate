class Filters {
    constructor(animationDuration) {
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
        this.isFixed = false;
        this.createFilterEvents();
        setTimeout(this.multiRange('range', 'rangeBetween', 'rangeButton1n', 'rangeButton2n', 'rangeInput1n', 'rangeInput2n'), 0);
    }

    createFilterEvents = () => {
        // Разворачивание фильтров в меню фильтров
        this.filters.forEach((f) => {
            f.addEventListener('click', (e) => this.switchFilter(e, f));
            f.addEventListener('touchend', (e) => this.switchFilter(e, f));
        })
        // Розворачивание и сворачивание меню фильтров
        this.openFilterBtn.addEventListener('click', this.toggleFilterCollapse);
        this.openFilterBtn.addEventListener('touchend', this.toggleFilterCollapse);
        this.overlay.addEventListener('click', this.handleCloseFilter);
        this.overlay.addEventListener('touchend', this.handleCloseFilter);

        // Смена отображения товара
        this.changeViewBtn.addEventListener('click', this.handleChangeView);
        this.changeViewBtn.addEventListener('touchend', this.handleChangeView);

        // Изменяем позицию меню фильтров
        document.addEventListener('scroll', this.filterFixed);
        this.filterFixed();
    }

    switchFilter = (e, f) => {
        e.preventDefault();
        e.cancelBubble = true;
        const filterNode = f.parentNode;
        if(filterNode.classList.contains('filter-collapse')) {
            filterNode.classList.remove('filter-collapse');
        } else {
            filterNode.classList.add('filter-collapse');
        }
    }

    toggleFilterCollapse = (e) => {
        e.preventDefault();
        const { isFilterCollapse } = this;
        isFilterCollapse ? this.handleCloseFilter(e) : this.handleOpenFilter(e);
    }

    handleOpenFilter = (e) => {
        e.preventDefault();
        const { filterCollapseBox, isFilterCollapse, isFilterAnimated, animationDuration, overlay } = this;
        if(!isFilterCollapse && !isFilterAnimated && window.innerWidth < 860) {
            this.isFilterAnimated = true;
            $(overlay).fadeIn(animationDuration * 0.75);
            overlay.style.zIndex = '400';
            $(filterCollapseBox).animate({'right': '0px'}, animationDuration * 0.5, () => {
                this.isFilterCollapse = true;
                this.isFilterAnimated = false;
            })
        }
    }

    handleCloseFilter = (e) => {
        e.preventDefault();
        const { filterCollapseBox, isFilterCollapse, isFilterAnimated, animationDuration, overlay } = this;
        if(isFilterCollapse && !isFilterAnimated && window.innerWidth < 860) {
            this.isFilterAnimated = true;
            $(overlay).fadeOut(animationDuration * 0.75);
            $(filterCollapseBox).animate({'right': '-400px'}, animationDuration * 0.5, () => {
                this.isFilterCollapse = false;
                this.isFilterAnimated = false;
                overlay.style.zIndex = '10';
            })
        }
    }

    handleChangeView = (e) => {
        e.preventDefault();
        const { view, filtersHeaderBox, productWrapBox } = this;
        switch (view) {
            case 'plate': {
                this.view = 'list';
                filtersHeaderBox.classList.add('view-list');
                productWrapBox.classList.add('view-list');
                break;
            }
            case 'list': {
                this.view = 'plate';
                filtersHeaderBox.classList.remove('view-list');
                productWrapBox.classList.remove('view-list');
                break;
            }
            default: {
                this.view = 'plate';
                filtersHeaderBox.classList.remove('view-list');
                productWrapBox.classList.remove('view-list');
            }
        }
    }

    filterFixed = () => {
        const { isFixed, filtersHeaderBox, productWrapBox } = this;
        if(window.scrollY >= 88) {
            if(!isFixed) {
                filtersHeaderBox.classList.add('f-fixed-top');
                productWrapBox.style.paddingTop = '43px';
                this.isFixed = true;
            }
        } else {
            if(isFixed) {
                filtersHeaderBox.classList.remove('f-fixed-top');
                productWrapBox.style.paddingTop = '0px';
                this.isFixed = false;
            }
        }
    }

    multiRange = (idX, btwX, btn1X, btn2X, input1, input2) => {
        let slider = document.getElementById(idX);
        let between = document.getElementById(btwX);
        let button1 = document.getElementById(btn1X);
        let button2 = document.getElementById(btn2X);
        let inpt1 = document.getElementById(input1);
        let inpt2 = document.getElementById(input2);

        let min = inpt1.min;
        let max = inpt1.max;

        /*init*/
        let sliderCoords = getCoords(slider);
        button1.style.marginLeft = '0px';
        button2.style.marginLeft = 190 + 'px';
        between.style.width = 190 + 'px';
        inpt1.value = min;
        inpt2.value = max;

        inpt1.onchange= function(evt)
        {
            if (parseInt(inpt1.value) < min)
                inpt1.value = min;
            if (parseInt(inpt1.value) > max)
                inpt1.value = max;
            if (parseInt(inpt1.value) > parseInt(inpt2.value))
            {
                let temp = inpt1.value;
                inpt1.value = inpt2.value;
                inpt2.value = temp;
            }


            let sliderCoords = getCoords(slider);
            let per1 = parseInt(inpt1.value-min)*100/(max-min);
            let per2 = parseInt(inpt2.value-min)*100/(max-min);
            let left1 = per1*(slider.offsetWidth-button1.offsetWidth)/100;
            let left2 = per2*(slider.offsetWidth-button1.offsetWidth)/100;

            button1.style.marginLeft = left1 + 'px';
            button2.style.marginLeft = left2 + 'px';

            if (left1 > left2)
            {
                between.style.width = (left1-left2) + 'px';
                between.style.marginLeft = left2 + 'px';
            }
            else
            {
                between.style.width = (left2-left1) + 'px';
                between.style.marginLeft = left1 + 'px';
            }
        }
        inpt2.onchange= function(evt)
        {
            if (parseInt(inpt2.value) < min)
                inpt2.value = min;
            if (parseInt(inpt2.value) > max)
                inpt2.value = max;
            if (parseInt(inpt1.value) > parseInt(inpt2.value))
            {
                var temp = inpt1.value;
                inpt1.value = inpt2.value;
                inpt2.value = temp;
            }

            let sliderCoords = getCoords(slider);
            let per1 = parseInt(inpt1.value-min)*100/(max-min);
            let per2 = parseInt(inpt2.value-min)*100/(max-min);
            let left1 = per1*(slider.offsetWidth-button1.offsetWidth)/100;
            let left2 = per2*(slider.offsetWidth-button1.offsetWidth)/100;

            button1.style.marginLeft = left1 + 'px';
            button2.style.marginLeft = left2 + 'px';

            if (left1 > left2)
            {
                between.style.width = (left1-left2) + 'px';
                between.style.marginLeft = left2 + 'px';
            }
            else
            {
                between.style.width = (left2-left1) + 'px';
                between.style.marginLeft = left1 + 'px';
            }
        }

        /*mouse*/
        button1.onmousedown = function(evt) {
            let sliderCoords = getCoords(slider);
            let betweenCoords = getCoords(between);
            let buttonCoords1 = getCoords(button1);
            let buttonCoords2 = getCoords(button2);
            let shiftX2 = evt.pageX - buttonCoords2.left;
            let shiftX1 = evt.pageX - buttonCoords1.left;

            document.onmousemove = function(evt) {
                let left1 = evt.pageX - shiftX1 - sliderCoords.left;
                let right1 = slider.offsetWidth - button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > right1) left1 = right1;
                button1.style.marginLeft = left1 + 'px';


                shiftX2 = evt.pageX - buttonCoords2.left;
                let left2 = evt.pageX - shiftX2 - sliderCoords.left;
                let right2 = slider.offsetWidth - button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > right2) left2 = right2;

                let per_min = 0;
                let per_max = 0;
                if (left1 > left2)
                {
                    between.style.width = (left1-left2) + 'px';
                    between.style.marginLeft = left2 + 'px';

                    per_min = left2*100/(slider.offsetWidth-button1.offsetWidth);
                    per_max = left1*100/(slider.offsetWidth-button1.offsetWidth);
                }
                else
                {
                    between.style.width = (left2-left1) + 'px';
                    between.style.marginLeft = left1 + 'px';

                    per_min = left1*100/(slider.offsetWidth-button1.offsetWidth);
                    per_max = left2*100/(slider.offsetWidth-button1.offsetWidth);
                }
                inpt1.value= (parseInt(min)+Math.round((max-min)*per_min/100));
                inpt2.value= (parseInt(min)+Math.round((max-min)*per_max/100));

            };
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };

        button2.onmousedown = function(evt) {
            let sliderCoords = getCoords(slider);
            let betweenCoords = getCoords(between);
            let buttonCoords1 = getCoords(button1);
            let buttonCoords2 = getCoords(button2);
            let shiftX2 = evt.pageX - buttonCoords2.left;
            let shiftX1 = evt.pageX - buttonCoords1.left;

            document.onmousemove = function(evt) {
                let left2 = evt.pageX - shiftX2 - sliderCoords.left;
                let right2 = slider.offsetWidth - button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > right2) left2 = right2;
                button2.style.marginLeft = left2 + 'px';


                shiftX1 = evt.pageX - buttonCoords1.left;
                let left1 = evt.pageX - shiftX1 - sliderCoords.left;
                let right1 = slider.offsetWidth - button1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > right1) left1 = right1;

                let per_min = 0;
                let per_max = 0;

                if (left1 > left2)
                {
                    between.style.width = (left1-left2) + 'px';
                    between.style.marginLeft = left2 + 'px';
                    per_min = left2*100/(slider.offsetWidth-button1.offsetWidth);
                    per_max = left1*100/(slider.offsetWidth-button1.offsetWidth);
                }
                else
                {
                    between.style.width = (left2-left1) + 'px';
                    between.style.marginLeft = left1 + 'px';
                    per_min = left1*100/(slider.offsetWidth-button1.offsetWidth);
                    per_max = left2*100/(slider.offsetWidth-button1.offsetWidth);
                }
                inpt1.value= (parseInt(min)+Math.round((max-min)*per_min/100));
                inpt2.value= (parseInt(min)+Math.round((max-min)*per_max/100));

            };
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };

        button1.ondragstart = function() {
            return false;
        };
        button2.ondragstart = function() {
            return false;
        };

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    }

}

const filters = new Filters(800);
