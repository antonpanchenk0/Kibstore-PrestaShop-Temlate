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
            navContactsBtn: document.getElementById('phone'),
            collapseContactsNode: document.getElementById('contactsCollapse'),
            closeContactsNodeBtn: document.querySelector('a.contacts-collapse-btn-back'),
            closeXContactsNodeBtn: document.querySelector('a.contacts-collapse-close-btn'),
            navWishListBtn: document.getElementById('heart'),
            collapseWishListNode: document.getElementById('wishListCollapse'),
            closeWishListNodeBtn: document.querySelector('a.wish-list-collapse-btn-back'),
            closeXWishListNodeBtn: document.querySelector('a.wish-list-collapse-close-btn'),
            navComparisonBtn: document.getElementById('scales'),
            collapseComparisonNode: document.getElementById('comparisonCollapse'),
            closeComparisonNodeBtn: document.querySelector('a.comparison-collapse-btn-back'),
            closeXComparisonNodeBtn: document.querySelector('a.comparison-collapse-close-btn'),
            isCollapsed: false,
            isSearchCollapsed: false,
            isCartCollapsed: false,
            isContactsCollapsed: false,
            isWishListCollapsed: false,
            isComparisonCollapsed: false,
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
                    isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                });
                this.config.isCartCollapsed = false;
                break;
            }
            case 'search': {
                $('a.nav-link#search').removeClass('active');
                $(this.config.collapseSearchNode).animate({'right': '-320px'}, animationDuration * 0.75, () => {
                    isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                    isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                });
                this.config.isSearchCollapsed = false;
                break;
            }
            case 'contacts': {
                $('a.nav-link#phone').removeClass('active');
                $(this.config.collapseContactsNode).animate({'right': '-320px'}, animationDuration * 0.75, () => {
                    isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                    isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                });
                this.config.isContactsCollapsed = false;
                break;
            }
            case 'wishList': {
                $('a.nav-link#heart').removeClass('active');
                $(this.config.collapseWishListNode).animate({'right': '-110%'}, animationDuration * 0.75, () => {
                    isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                    isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                });
                this.config.isWishListCollapsed = false;
                break;
            }
            case 'comparison': {
                $('a.nav-link#scales').removeClass('active');
                $(this.config.collapseComparisonNode).animate({'right': '-110%'}, animationDuration * 0.75, () => {
                    isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                    isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                });
                this.config.isComparisonCollapsed = false;
                break;
            }
        }
    }

    closeAllRightModules = (isWrapFadeOut) => {
        const { isSearchCollapsed, isCartCollapsed, isContactsCollapsed, isWishListCollapsed, isComparisonCollapsed } = this.config;
        if(isCartCollapsed) {
            this.closeSingleRightModule('cart', isWrapFadeOut);
        }
        if(isSearchCollapsed) {
            this.closeSingleRightModule('search', isWrapFadeOut);
        }
        if(isContactsCollapsed) {
            this.closeSingleRightModule('contacts', isWrapFadeOut);
        }
        if(isWishListCollapsed) {
            this.closeSingleRightModule('wishList', isWrapFadeOut);
        }
        if(isComparisonCollapsed) {
            this.closeSingleRightModule('comparison', isWrapFadeOut);
        }
        return false;
    };

    wishListOnCheckedEvent = (e) => {
        const node = document.querySelector('.wish-list-item .form-check input:checked');
        node ? $('.wish-list-footer').addClass('selected') : $('.wish-list-footer').removeClass('selected');
    };

    wishListDeletePosEvent = (e) => {
        e.preventDefault();
        const node = e.target.parentElement.parentElement;
        $(node).animate({'left': '-110%'}, 300, () => {
            document.getElementById('wishListBody').removeChild(node);
        })
    };

    wishListUpdateEvents = () => {
        const checkboxes = document.querySelectorAll('.wish-list-item .form-check input');
        checkboxes.forEach(c => {
            c.removeEventListener('input', this.wishListOnCheckedEvent);
            c.addEventListener('input', this.wishListOnCheckedEvent);
        });
        const trashBtns = document.querySelectorAll('a.delete-wish-pos-btn');
        trashBtns.forEach(b => {
            b.removeEventListener('click', this.wishListDeletePosEvent);
            b.addEventListener('click', this.wishListDeletePosEvent);
        })
    };

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
        });

        // Контакты
        this.config.navContactsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isContactsCollapsed, collapseWrap, animationDuration, collapseContactsNode } = this.config;
            if(isContactsCollapsed) return false;
            this.closeAllRightModules(false);
            document.body.classList.add('scroll-disabled');
            this.config.isContactsCollapsed = true;
            $('a.nav-link#phone').addClass('active');
            collapseWrap.style.top = 40 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseContactsNode).animate({'right': isContactsCollapsed ? '-320px' : '0px'}, animationDuration);
        });

        // Список желаний
        this.config.navWishListBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isWishListCollapsed, collapseWrap, animationDuration, collapseWishListNode } = this.config;
            if(isWishListCollapsed) return false;
            this.wishListUpdateEvents();
            this.closeAllRightModules(false);
            document.body.classList.add('scroll-disabled');
            this.config.isWishListCollapsed = true;
            $('a.nav-link#heart').addClass('active');
            collapseWrap.style.top = 40 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseWishListNode).animate({'right': isWishListCollapsed ? '-105%' : '0px'}, animationDuration);
        });

        // Сравнения
        this.config.navComparisonBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isComparisonCollapsed, collapseWrap, animationDuration, collapseComparisonNode } = this.config;
            if(isComparisonCollapsed) return false;
            this.closeAllRightModules(false);
            document.body.classList.add('scroll-disabled');
            this.config.isComparisonCollapsed = true;
            $('a.nav-link#scales').addClass('active');
            collapseWrap.style.top = 40 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseComparisonNode).animate({'right': isComparisonCollapsed ? '-105%' : '0px'}, animationDuration);
        });

        // Навигация
        this.config.toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const { isCollapsed, collapseNode, collapseWrap, animationDuration, isSearchCollapsed, isCartCollapsed, isContactsCollapsed, isWishListCollapsed } = this.config;
            if(isCollapsed) return false;
            this.closeAllRightModules(false);
            const waitTime = isSearchCollapsed || isCartCollapsed || isContactsCollapsed || isWishListCollapsed ? animationDuration * 0.75 : 0;
            setTimeout(() => {
                this.config.collapseWrap.style.top = 0 + 'px';
                $(collapseWrap).fadeIn(animationDuration/10);
                $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration);
                this.config.isCollapsed = true;
            }, waitTime)
        });

        // Закрытие по нажатию на overlay и кнопки закрытия
        this.config.collapseWrap.addEventListener('click', (e) => {
            if( e.target !== this.config.collapseWrap &&
                e.target !== this.config.closeNavigationBtn &&
                e.target !== this.config.closeSearchNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeSearchNodeBtn &&
                e.target !== this.config.closeCartNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeCartNodeBtn &&
                e.target.parentNode !== this.config.closeXCartNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeXCartNodeBtn &&
                e.target !== this.config.closeXCartNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeContactsNodeBtn &&
                e.target.parentNode !== this.config.closeXContactsNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeXContactsNodeBtn &&
                e.target !== this.config.closeXContactsNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeWishListNodeBtn &&
                e.target.parentNode !== this.config.closeXWishListNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeXWishListNodeBtn &&
                e.target !== this.config.closeXWishListNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeComparisonNodeBtn &&
                e.target.parentNode !== this.config.closeXComparisonNodeBtn &&
                e.target.parentNode.parentNode !== this.config.closeXComparisonNodeBtn &&
                e.target !== this.config.closeXComparisonNodeBtn ) return false;
            e.preventDefault();
            const { isCollapsed, isSearchCollapsed, isCartCollapsed, isContactsCollapsed, isComparisonCollapsed, isWishListCollapsed, collapseNode, animationDuration } = this.config;
            if(isCollapsed) {
                $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration, this.wrapFadeOut);
            }
            if(isSearchCollapsed) {
                this.closeSingleRightModule('search', true);
            }
            if(isCartCollapsed) {
                this.closeSingleRightModule('cart', true);
            }
            if(isContactsCollapsed) {
                this.closeSingleRightModule('contacts', true);
            }
            if(isWishListCollapsed) {
                this.closeSingleRightModule('wishList', true);
            }
            if(isComparisonCollapsed) {
                this.closeSingleRightModule('comparison', true);
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
