const config = {
    navigation: {
        toggleBtn: document.getElementById('navToggleBtn'),
        collapseNode: document.getElementById('navCollapse'),
        collapseWrap: document.getElementById('navCollapseWrap'),
        collapseNavList: document.querySelector('.navigation-collapse-list'),
        navLinksWithSubNav: document.querySelectorAll('.navigation-collapse-list-item-with-sub-navigation'),
        closeNavigationBtn: document.querySelector('a.navigation-collapse-close-btn'),
        navFooterSocial: document.querySelector('.mobile-app-row'),
        navSearchBtn: document.getElementById('search'),
        collapseSearchNode: document.getElementById('searchCollapse'),
        closeSearchNodeBtn: document.querySelector('a.search-collapse-btn-back'),
        isCollapsed: false,
        isSearchCollapsed: false,
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

const closeSearch = (collapseSearchNode, collapseWrap, animationDuration, isSearchCollapsed, callback) => {
    $('a.nav-link#search').removeClass('active');
    $(collapseSearchNode).animate({'right': isSearchCollapsed ? '-320px' : '0px'}, animationDuration, callback);
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

// Меню поиска
config.navigation.navSearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { isSearchCollapsed, collapseWrap, animationDuration, collapseSearchNode } = config.navigation;
    if(isSearchCollapsed) return false;
    config.navigation.isSearchCollapsed = true;
    $('a.nav-link#search').addClass('active');
    collapseWrap.style.top = 40 + 'px';
    $(collapseWrap).fadeIn(animationDuration/10);
    $(collapseSearchNode).animate({'right': isSearchCollapsed ? '-320px' : '0px'}, animationDuration);
});

// Навигация
config.navigation.toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { isCollapsed, isSearchCollapsed, collapseSearchNode, collapseNode, collapseWrap, animationDuration } = config.navigation;
    if(isCollapsed) return false;
    if(isSearchCollapsed) {
        closeSearch(collapseSearchNode, collapseWrap, animationDuration/2, isSearchCollapsed, function () {
            config.navigation.isSearchCollapsed = false;
            collapseWrap.style.top = 0 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration);
        });
        return true;
    }
    collapseWrap.style.top = 0 + 'px';
    $(collapseWrap).fadeIn(animationDuration/10);
    $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration);
    config.navigation.isCollapsed = true;

});

// Навигация и поиска закрытие
config.navigation.collapseWrap.addEventListener('click', (e) => {
    if(e.target !== config.navigation.collapseWrap && e.target !== config.navigation.closeNavigationBtn && e.target !== config.navigation.closeSearchNodeBtn) return false;
    e.preventDefault();
    const { isCollapsed, isSearchCollapsed, collapseNode, collapseSearchNode, collapseWrap, animationDuration } = config.navigation;
    if(isCollapsed) {
        $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration, function () {
            $(collapseWrap).fadeOut(animationDuration / 10);
            config.navigation.isCollapsed = false;
        });
    }
    if(isSearchCollapsed) {
        closeSearch(collapseSearchNode, collapseWrap, animationDuration, isSearchCollapsed, function () {
            $(collapseWrap).fadeOut(animationDuration / 10);
            config.navigation.isSearchCollapsed = false;
        });
    }
});

// Переключение уровней меню
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
});
