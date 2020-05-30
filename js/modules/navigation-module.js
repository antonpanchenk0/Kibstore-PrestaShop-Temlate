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
            cartSearchBtn: document.getElementById('cart'),
            collapseCartNode: document.getElementById('cartCollapse'),
            closeCartNodeBtn: document.querySelector('a.cart-collapse-btn-back'),
            closeXCartNodeBtn: document.querySelector('a.cart-collapse-close-btn'),
            isCollapsed: false,
            isSearchCollapsed: false,
            isCartCollapsed: false,
            animationDuration,
        }
        this.createNavigationsEvents();
    }

    wrapFadeOut = () => {
        $(this.config.collapseWrap).fadeOut(this.config.animationDuration / 10, () => document.body.classList.remove('scroll-disabled'));
        this.config.isCollapsed = false;
    }

    closeSingleRightModule = (module, isWrapFadeOut) => {
        const { collapseWrap, animationDuration } = this.config;
        switch (module) {
            case 'cart': {
                $('a.nav-link#cart').removeClass('active');
                $(this.config.collapseCartNode).animate({'right': '-320px'}, animationDuration * 0.75, () => {
                    isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                    document.body.classList.remove('scroll-disabled');
                });
                this.config.isCartCollapsed = false;
                break;
            }
            case 'search': {
                $('a.nav-link#search').removeClass('active');
                $(this.config.collapseSearchNode).animate({'right': '-320px'}, animationDuration * 0.75, () => {
                    isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                    document.body.classList.remove('scroll-disabled');
                });
                this.config.isSearchCollapsed = false;
                break;
            }
        }
    }

    closeAllRightModules = (isWrapFadeOut) => {
        const { isSearchCollapsed, isCartCollapsed } = this.config;
        if(isCartCollapsed) {
            this.closeSingleRightModule('cart', isWrapFadeOut);
        }
        if(isSearchCollapsed) {
            this.closeSingleRightModule('search', isWrapFadeOut);
        }
        return false;
    }

    createNavigationsEvents = () => {
        // Меню поиска
        this.config.navSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isSearchCollapsed, collapseWrap, animationDuration, collapseSearchNode } = this.config;
            if(isSearchCollapsed) return false;
            this.closeAllRightModules(false);
            document.body.classList.add('scroll-disabled');
            this.config.isSearchCollapsed = true;
            $('a.nav-link#search').addClass('active');
            collapseWrap.style.top = 40 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseSearchNode).animate({'right': isSearchCollapsed ? '-320px' : '0px'}, animationDuration);
        });

        // Корзина
        this.config.cartSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isCartCollapsed, collapseWrap, animationDuration, collapseCartNode } = this.config;
            if(isCartCollapsed) return false;
            this.closeAllRightModules(false);
            document.body.classList.add('scroll-disabled');
            this.config.isCartCollapsed = true;
            $('a.nav-link#cart').addClass('active');
            collapseWrap.style.top = 40 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseCartNode).animate({'right': isCartCollapsed ? '-320px' : '0px'}, animationDuration);
        })

        // Навигация
        this.config.toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isCollapsed, collapseNode, collapseWrap, animationDuration, isSearchCollapsed, isCartCollapsed } = this.config;
            if(isCollapsed) return false;
            this.closeAllRightModules(false);
            const waitTime = isSearchCollapsed || isCartCollapsed ? animationDuration * 0.75 : 0;
            setTimeout(() => {
                this.config.collapseWrap.style.top = 0 + 'px';
                $(collapseWrap).fadeIn(animationDuration/10);
                $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration);
                this.config.isCollapsed = true;
            }, waitTime)
        });

        // Закрытие по нажатию на overlay и кнопки закрытия
        this.config.collapseWrap.addEventListener('click', (e) => {
            if(e.target !== this.config.collapseWrap &&
               e.target !== this.config.closeNavigationBtn &&
               e.target !== this.config.closeSearchNodeBtn &&
               e.target.parentNode.parentNode !== this.config.closeSearchNodeBtn &&
               e.target !== this.config.closeCartNodeBtn &&
               e.target.parentNode.parentNode !== this.config.closeCartNodeBtn &&
               e.target.parentNode !== this.config.closeXCartNodeBtn &&
               e.target.parentNode.parentNode !== this.config.closeXCartNodeBtn &&
               e.target !== this.config.closeXCartNodeBtn ) return false;
            e.preventDefault();
            const { isCollapsed, isSearchCollapsed, isCartCollapsed, collapseNode, animationDuration } = this.config;
            if(isCollapsed) {
                $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration, this.wrapFadeOut);
            }
            if(isSearchCollapsed) {
                this.closeSingleRightModule('search', true);
            }
            if(isCartCollapsed) {
                this.closeSingleRightModule('cart', true);
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
