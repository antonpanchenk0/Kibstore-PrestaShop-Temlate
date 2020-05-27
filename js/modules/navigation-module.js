export default class Navigation {
    constructor(animationDuration){
        this.config = {
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
            goBack: document.querySelectorAll('.go-back-btn'),
            isCollapsed: false,
            isSearchCollapsed: false,
            animationDuration,
        }
        this.createNavigationsEvents();
    }

    closeSearch = (collapseSearchNode, collapseWrap, animationDuration, isSearchCollapsed, callback) => {
        $('a.nav-link#search').removeClass('active');
        $(collapseSearchNode).animate({'right': isSearchCollapsed ? '-320px' : '0px'}, animationDuration, callback);
    };

    wrapFadeOut = () => {
        $(this.config.collapseWrap).fadeOut(this.config.animationDuration / 10);
        this.config.isCollapsed = false;
    }

    wrapSearchFadeOut = () => {
        $(this.config.collapseWrap).fadeOut(this.config.animationDuration / 10);
        this.config.isSearchCollapsed = false;
    }

    wrapSearchOnNavOpen = () => {
        this.config.isSearchCollapsed = false;
        this.config.collapseWrap.style.top = 0 + 'px';
        $(this.config.collapseWrap).fadeIn(this.config.animationDuration/10);
        $(this.config.collapseNode).animate({'left': this.config.isCollapsed ? '-320px' : '0px'}, this.config.animationDuration);
        this.config.isCollapsed = true;
    }

    createNavigationsEvents = () => {
        // Меню поиска
        this.config.navSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isSearchCollapsed, collapseWrap, animationDuration, collapseSearchNode } = this.config;
            if(isSearchCollapsed) return false;
            document.body.classList.add('scroll-disabled');
            this.config.isSearchCollapsed = true;
            $('a.nav-link#search').addClass('active');
            collapseWrap.style.top = 40 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseSearchNode).animate({'right': isSearchCollapsed ? '-320px' : '0px'}, animationDuration);
        });

        // Навигация
        this.config.toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isCollapsed, isSearchCollapsed, collapseSearchNode, collapseNode, collapseWrap, animationDuration } = this.config;
            if(isCollapsed) return false;
            if(isSearchCollapsed) {
                this.closeSearch(collapseSearchNode, collapseWrap, animationDuration/2, isSearchCollapsed, this.wrapSearchOnNavOpen);
                return true;
            }
            collapseWrap.style.top = 0 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration);
            this.config.isCollapsed = true;
        });

        // Закрытие навигации и поиска
        this.config.collapseWrap.addEventListener('click', (e) => {
            if(e.target !== this.config.collapseWrap && e.target !== this.config.closeNavigationBtn && e.target !== this.config.closeSearchNodeBtn) return false;
            e.preventDefault();
            document.body.classList.remove('scroll-disabled');
            const { isCollapsed, isSearchCollapsed, collapseNode, collapseSearchNode, collapseWrap, animationDuration } = this.config;
            if(isCollapsed) {
                $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration, this.wrapFadeOut);
            }
            if(isSearchCollapsed) {
                this.closeSearch(collapseSearchNode, collapseWrap, animationDuration, isSearchCollapsed, this.wrapSearchFadeOut);
            }
        });

        //Переключение уровней меню
        this.config.navLinksWithSubNav.forEach(link=>{
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
                this.config.navFooterSocial.style.display = 'none';
                $(nextNav).fadeIn(500);
            })
        });

        this.config.goBack.forEach(btn=>{
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.cancelBubble = true;
                let backBtn = e.target;
                if(!e.target.matches('.go-back-btn')) {
                    backBtn = e.target.parentNode;
                }
                const prevMenu = backBtn.parentNode;
                if(prevMenu.getAttribute('data-level') == '2') {
                    this.config.navFooterSocial.style.display = 'flex';
                }
                $(prevMenu).fadeOut(500);
            })
        });
    }
}
