const config = {
    navigation: {
        toggleBtn: document.getElementById('navToggleBtn'),
        collapseNode: document.getElementById('navCollapse'),
        collapseWrap: document.getElementById('navCollapseWrap'),
        isCollapsed: false,
        animationDuration: 1000,
    },
    slider: {
        duration: 5000,
        sliderNode: document.getElementById('slider'),
        progressNode: document.getElementById('sliderProgress'),
        progressInterval: null,
        currentProgress: 0,
    }
};

$(config.slider.sliderNode).carousel({interval: false});

config.slider.progressInterval = setInterval(()=>{
    if(config.slider.currentProgress >= 100) {
        $(config.slider.sliderNode).carousel('next');
        config.slider.currentProgress = 0;
    }
    config.slider.progressNode.style.width = config.slider.currentProgress + '%';
    config.slider.currentProgress ++;
}, config.slider.duration/100);

config.navigation.toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { isCollapsed, collapseNode, collapseWrap, animationDuration } = config.navigation;
    if(isCollapsed) return false;
    config.navigation.isCollapsed = true;
    $(collapseWrap).fadeIn(animationDuration/10);
    $(collapseNode).animate({'left': isCollapsed ? '-290px' : '0px'}, animationDuration);
});

config.navigation.collapseWrap.addEventListener('click', (e) => {
    e.preventDefault();
    const { isCollapsed, collapseNode, collapseWrap, animationDuration } = config.navigation;
    if(!isCollapsed) return false;
    config.navigation.isCollapsed = false;
    $(collapseNode).animate({'left': isCollapsed ? '-290px' : '0px'}, animationDuration, function () {
        $(collapseWrap).fadeOut(animationDuration/10);
    });
});

