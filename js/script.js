const config = {
    navigation: {
        toggleBtn: document.getElementById('navToggleBtn'),
        collapseNode: document.getElementById('navCollapse'),
        collapseWrap: document.getElementById('navCollapseWrap'),
        collapseNavList: document.querySelector('.navigation-collapse-list'),
        navLinksWithSubNav: document.querySelectorAll('.navigation-collapse-list-item-with-sub-navigation'),
        closeNavigationBtn: document.querySelector('a.navigation-collapse-close-btn'),
        navFooterSocial: document.querySelector('.mobile-app-row'),
        isCollapsed: false,
        animationDuration: 1000,
    },
    subNavigation: {
        goBack: document.querySelectorAll('.go-back-btn'),
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
    $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration);
});

config.navigation.collapseWrap.addEventListener('click', (e) => {
    if(e.target !== config.navigation.collapseWrap) return false;
    e.preventDefault();
    const { isCollapsed, collapseNode, collapseWrap, animationDuration } = config.navigation;
    if(!isCollapsed) return false;
    config.navigation.isCollapsed = false;
    $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration, function () {
        $(collapseWrap).fadeOut(animationDuration/10);
    });
});

config.navigation.closeNavigationBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const { isCollapsed, collapseNode, collapseWrap, animationDuration } = config.navigation;
    if(!isCollapsed) return false;
    config.navigation.isCollapsed = false;
    $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration, function () {
        $(collapseWrap).fadeOut(animationDuration/10);
    });
});

config.navigation.navLinksWithSubNav.forEach(link=>{
    link.addEventListener('click', (e)=> {
        e.preventDefault();
        e.cancelBubble = true;
        let li = e.target;
        if(!e.target.matches('.navigation-collapse-list-item-with-sub-navigation')) {
            if(e.target.matches('.navigation-collapse-list-link')) {
                li = e.target.parentNode;
            }
            else {
                li = e.target.parentNode.parentNode;
            }
        }
        const nextNav = li.querySelector('.sub-navigation-collapse');
        config.navigation.navFooterSocial.style.display = 'none';
        $(nextNav).fadeIn(500);
    })
});

config.subNavigation.goBack.forEach(btn=>{
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.cancelBubble = true;
        let backBtn = e.target;
        if(!e.target.matches('.go-back-btn')) {
            backBtn = e.target.parentNode;
        }
        const prevMenu = backBtn.parentNode;
        if(prevMenu.getAttribute('data-level') == '2') {
            config.navigation.navFooterSocial.style.display = 'flex';
        }
        $(prevMenu).fadeOut(500);
    })
})
