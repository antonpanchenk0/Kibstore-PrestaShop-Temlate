import Navigation from './modules/navigation-module.js';

const navigation = new Navigation(600);

const config = {
    slider: {
        duration: 5000,
        sliderNode: document.getElementById('slider'),
        progressNode: document.getElementById('sliderProgress'),
        progressInterval: null,
        currentProgress: 0,
    },

};

// Настройка слайдера
if(config.slider.sliderNode) {
    $(config.slider.sliderNode).carousel({interval: false});

    config.slider.progressInterval = setInterval(()=>{
        if(config.slider.currentProgress >= 100) {
            $(config.slider.sliderNode).carousel('next');
            config.slider.currentProgress = 0;
        }
        config.slider.progressNode.style.width = config.slider.currentProgress + '%';
        config.slider.currentProgress ++;
    }, config.slider.duration/100);
}
