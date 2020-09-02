class Slider {
    constructor(swipeTime) {
        this.swipeTime = swipeTime >= 1000 ? swipeTime : 1000;
        this.slides = document.querySelectorAll('div.product-image-slider-image');
        this.slidesControls = document.querySelectorAll('li.product-image-slider-controls-item');
        this.slidesShortCuts = document.querySelectorAll('li.product-short-cuts-item');
        this.activeNowId = 0;
        this.interval = null;

        this.onLoad();
    }

    slideTo = (next_id) => {
        const { slidesControls, activeNowId: id_prev, slides, slidesShortCuts } = this;
        let id_next = null;
        if(next_id === undefined) {
            id_next = id_prev + 1 < slides.length ? id_prev + 1 : id_prev*0;
        } else {
            id_next = next_id;
            clearInterval(this.interval);
            this.interval = setInterval(() => this.slideTo(), this.swipeTime);
        }
        slides[id_next].classList.add('show');
        slidesControls[id_prev].classList.remove('show');
        slidesControls[id_next].classList.add('show');
        slidesShortCuts[id_prev].classList.remove('show');
        slidesShortCuts[id_next].classList.add('show');
        slides[id_prev].classList.remove('show');
        slides[id_next].classList.add('show');
        this.activeNowId = id_next;
    }

    onLoad = () => {
        // Start slider
        this.interval = setInterval(() => this.slideTo(), this.swipeTime);

        // Swipe control events
        this.slidesControls.forEach((c) => {
            const slideId = Number(c.getAttribute('data-slide')) - 1;
            c.addEventListener('click', () => this.slideTo(slideId));
            c.addEventListener('touchend', () => this.slideTo(slideId));
        });

        // Swipe shortcuts events
        this.slidesShortCuts.forEach((c) => {
            const slideId = Number(c.getAttribute('data-slide')) - 1;
            c.addEventListener('click', () => this.slideTo(slideId));
            c.addEventListener('touchend', () => this.slideTo(slideId));
        });
    }
}

class ProductNavigation {
    constructor(animationDuration){
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
    }

    createNavigationEvents = () => {
        // Product fieldset swipe
        this.navLinks.forEach((l) => {
            l.addEventListener('click', this.changeViewProductFieldset);
            l.addEventListener('touchend', this.changeViewProductFieldset);
        })

        this.showMoreShortCutsBtn.addEventListener('click', this.showAllShortCuts);
    }

    showAllShortCuts = (e) => {
        e.preventDefault();
        $(this.showMoreShortCutsBtn).fadeOut(this.animationDuration / 3, () => {
            this.showMoreShortCutsBtn.previousElementSibling.classList.remove('short-list');
        });
    }

    changeViewProductFieldset = (e) => {
        e.preventDefault();
        const pageId = Number(e.target.getAttribute('data-toggle') || e.target.parentNode.getAttribute('data-toggle'));
        this.navLinks.forEach(l => l.classList.remove('active'));
        this.navLinks[pageId - 1].classList.add('active');
        this.productFieldsets[this.activeFielsetId - 1].classList.remove('show');
        this.productFieldsets[pageId - 1].classList.add('show');
        this.activeFielsetId = pageId;
        $('body,html').animate({scrollTop: 0}, this.animationDuration);
    }

}

const slider = new Slider(5000);

const productNavigation = new ProductNavigation(400);
