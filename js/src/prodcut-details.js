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
        })
    }
}

const slider = new Slider(5000);
