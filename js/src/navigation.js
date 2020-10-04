class Navigation {
    constructor(animationDuration){
        this.config = {
            logotype: document.getElementById('mainLogo'),
            navigationBlock: document.querySelector('header'),
            desktopNavigationHeader: document.querySelector('div.desktop-navigation-header'),
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
            desktopNavigationBtn: document.getElementById('dmenu'),
            desktopNavigationCollapseMenu: document.querySelector('div.desktop-navigation-collapse'),
            desktopNavigationCollapseMenuWrap: document.querySelector('div.desktop-navigation-collapse-wrap'),
            desktopCollapseDesktopOverlay: document.querySelector('div.desktop-navigation-collapse-overlay'),
            desktopSearchInput: document.getElementById('navSearchInp'),
            desktopSearchBlock: document.getElementById('navSearch'),
            desktopSearchResult: document.getElementById('navSearchResult'),
            desktopSearchForm :document.getElementById('navSearchForm'),
            isCollapsed: false,
            isSearchCollapsed: false,
            isCartCollapsed: false,
            isContactsCollapsed: false,
            isWishListCollapsed: false,
            isComparisonCollapsed: false,
            isDesktopMenuCollapsed: false,
            isDesktopAnimated: false,
            isOverlayShow: false,
            isSearchResultVisible: false,
            isSearchResultAnimated: false,
            animationDuration,
        }
        this.wrapBlock = document.querySelector('div.wrap');
        this.navCartBtn = document.getElementById('navCart');
        this.navWishListBtn = document.getElementById('navWishList');
        this.navComparisonBtn = document.getElementById('navComparison');
        this.mobileResolution = 860;
        this.footer = document.getElementById('s_footer');
        this.isMainPage = document.getElementById('content-slider') ? true : false;
        this.desktopCartModal = document.getElementById('cartModalWindow');
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

    cartDeletePosEvent = (e) => {
        const node = e.currentTarget.parentElement.parentElement.parentElement;
        $(node).animate({'left': '-110%'}, 300, () => {
            const counterNode = document.querySelector('a.cart-collapse-btn-back~h2>span');
            const menuCounterNode = document.querySelector('span.cart-counter');
            counterNode.innerHTML = `${+counterNode.innerHTML - 1}`;
            menuCounterNode.innerHTML = `${+menuCounterNode.innerHTML - 1}`;
            document.getElementById('cartRender').removeChild(node);
        })
    }

    cartSwitchCountEvent = (e) => {
        e.preventDefault();
        const _do = e.currentTarget.getAttribute('data-do');
        switch (_do) {
            case 'add': {
                const value = e.currentTarget.parentElement.querySelector('p.count').innerHTML;
                e.currentTarget.parentElement.querySelector('p.count').innerHTML = `${Number(value) + 1}`;
                break;
            }
            case 'remove': {
                const value = e.currentTarget.parentElement.querySelector('p.count').innerHTML;
                if((value - 1) >= 0) {
                    e.currentTarget.parentElement.querySelector('p.count').innerHTML = `${Number(value) - 1}`;
                }
                break;
            }
            default: {
                return;
            }
        }
    }

    cartUpdateEvents = () => {
        const deleteBtns = document.querySelectorAll('a.delete-position-btn');
        deleteBtns.forEach(btn => {
            btn.removeEventListener('click', this.cartDeletePosEvent);
            btn.removeEventListener('touchend', this.cartDeletePosEvent);
            btn.addEventListener('click', this.cartDeletePosEvent);
            btn.addEventListener('touchend', this.cartDeletePosEvent);
        });
        const switchersBtns = document.querySelectorAll('.switchers-count-btn');
        switchersBtns.forEach( _switch => {
            _switch.removeEventListener('click', this.cartSwitchCountEvent);
            _switch.removeEventListener('touchend', this.cartSwitchCountEvent);
            _switch.addEventListener('click', this.cartSwitchCountEvent);
            _switch.addEventListener('touchend', this.cartSwitchCountEvent);
        })
    }

    wishListOnCheckedEvent = (e) => {
        const node = document.querySelector('.wish-list-item .form-check input:checked');
        node ? $('.wish-list-footer').addClass('selected') : $('.wish-list-footer').removeClass('selected');
    };

    wishListDeletePosEvent = (e) => {
        e.preventDefault();
        const node = e.target.parentElement.parentElement;
        console.log(node)
        $(node).animate({'left': '-110%'}, 300, () => {
            const counterNode = document.querySelector('a.wish-list-collapse-btn-back~h2>span');
            let counter = +counterNode.innerHTML;
            counter = --counter;
            counterNode.innerHTML = `${counter}`;
            document.getElementById('wishListBody').removeChild(node);
        })
    };

    wishListDeleteCheckedPosEvent = (e) => {
        e.preventDefault();
        const nodes = document.querySelectorAll('.wish-list-item .form-check input:checked');
        if(nodes.length != 0) {
            for(let i = 0; i < nodes.length; i++) {
                const node = nodes[i].parentElement.parentElement;
                $(node).animate({'left': '-110%'}, 300, () => {
                    document.getElementById('wishListBody').removeChild(node);
                })
            }
            const value = document.querySelector('a.wish-list-collapse-btn-back h2 span').innerHTML;
            document.querySelector('a.wish-list-collapse-btn-back h2 span').innerHTML = `${value - nodes.length}`
        }
    }

    wishListAddToCartCheckedPosEvent = (e) => {
        e.preventDefault();
        const nodes = document.querySelectorAll('.wish-list-item .form-check input:checked');
        if(nodes.length != 0) {
            for(let i = 0; i < nodes.length; i++) {
                nodes[i].parentElement.parentElement.querySelector('a.add-wish-pos-to-cart').classList.add('active');
            }
        }
    }

    wishListAddToCartPosEvent = (e) => {
        e.preventDefault();
        e.target.classList.contains('active') ?  e.target.classList.remove('active') : e.target.classList.add('active');
    }

    wishListUpdateEvents = () => {
        const checkboxes = document.querySelectorAll('.wish-list-item .form-check input');
        checkboxes.forEach(c => {
            c.removeEventListener('input', this.wishListOnCheckedEvent);
            c.addEventListener('input', this.wishListOnCheckedEvent);
        });

        const trashBtns = document.querySelectorAll('a.delete-wish-pos-btn');
        trashBtns.forEach(b => {
            b.removeEventListener('click', this.wishListDeletePosEvent);
            b.removeEventListener('touchend', this.wishListDeletePosEvent);
            b.addEventListener('click', this.wishListDeletePosEvent);
            b.addEventListener('touchend', this.wishListDeletePosEvent);
        })

        const cartBtns = document.querySelectorAll('a.add-wish-pos-to-cart');
        cartBtns.forEach(b => {
            b.removeEventListener('click', this.wishListAddToCartPosEvent);
            b.removeEventListener('touchend', this.wishListAddToCartPosEvent);
            b.addEventListener('click', this.wishListAddToCartPosEvent);
            b.addEventListener('touchend', this.wishListAddToCartPosEvent);
        })

        const deleteChecked = document.querySelector('a.wish-control#toDelete');
        deleteChecked.removeEventListener('click', this.wishListDeleteCheckedPosEvent);
        deleteChecked.removeEventListener('touchend', this.wishListDeleteCheckedPosEvent);
        deleteChecked.addEventListener('click', this.wishListDeleteCheckedPosEvent);
        deleteChecked.addEventListener('touchend', this.wishListDeleteCheckedPosEvent);

        const addToCartChecked = document.querySelector('a.wish-control#toCart');
        addToCartChecked.removeEventListener('click', this.wishListAddToCartCheckedPosEvent);
        addToCartChecked.removeEventListener('touchend', this.wishListAddToCartCheckedPosEvent);
        addToCartChecked.addEventListener('click', this.wishListAddToCartCheckedPosEvent);
        addToCartChecked.addEventListener('touchend', this.wishListAddToCartCheckedPosEvent);
    };

    comparisonDeletePosEvent = (e) => {
        e.preventDefault();
        const node = e.target.parentElement.parentElement;
        $(node).animate({'left': '-110%'}, 300, () => {
            const counterNode = document.querySelector('a.comparison-collapse-btn-back~h2>span');
            let counter = +counterNode.innerHTML;
            counter = --counter;
            counterNode.innerHTML = `${counter}`;
            this.comparisonHeightCounter();
            document.querySelector('tbody').removeChild(node);
        })
    }

    comparisonAddToCartEvent = (e) => {
        e.preventDefault();
        e.target.classList.add('active');
    }

    comparisonHeightCounter = () => {
        const lastTR = document.querySelector('tr.last-table-row');
        const tableRows = document.querySelectorAll('tr');
        let height = 0;
        setTimeout(() => {
            height = +document.querySelector('table tbody').clientHeight;
            tableRows.forEach(row => {
                if(row != lastTR) {
                    height = height - row.clientHeight;
                }
            })
            lastTR.style.height = height + 'px';
            lastTR.querySelector('td').style.height = height + 'px';
        }, 0)
    }

    comparisonClearList = (e) => {
        e.preventDefault();
        const tableRows = document.querySelectorAll('tr');
        for (let i = 1; i < tableRows.length - 1; i ++) {
            $(tableRows[i]).animate({'left': '-110%'}, 300, () => {
                const counterNode = document.querySelector('a.comparison-collapse-btn-back h2 span');
                let counter = +counterNode.innerHTML;
                counter = --counter;
                counterNode.innerHTML = `${counter}`;
                document.querySelector('tbody').removeChild(tableRows[i]);
                this.comparisonHeightCounter();
            })
        }
    }

    comparisonUpdateEvents = () => {
        const deleteBtns = document.querySelectorAll('a.comparison-del-pos-btn');
        deleteBtns.forEach(b => {
            b.removeEventListener('click', this.comparisonDeletePosEvent);
            b.removeEventListener('touchend', this.comparisonDeletePosEvent);
            b.addEventListener('click', this.comparisonDeletePosEvent);
            b.addEventListener('touchend', this.comparisonDeletePosEvent);
        });
        const addToCartBtns = document.querySelectorAll('a.comparison-add-to-cart-btn');
        addToCartBtns.forEach(add => {
            add.removeEventListener('click', this.comparisonAddToCartEvent);
            add.removeEventListener('touchend', this.comparisonAddToCartEvent);
            add.addEventListener('click', this.comparisonAddToCartEvent);
            add.addEventListener('touchend', this.comparisonAddToCartEvent);
        })
        this.comparisonHeightCounter();
        document.querySelector('a.clear-comparison-list-btn').removeEventListener('click', this.comparisonClearList);
        document.querySelector('a.clear-comparison-list-btn').removeEventListener('touchend', this.comparisonClearList);
        document.querySelector('a.clear-comparison-list-btn').addEventListener('click', this.comparisonClearList);
        document.querySelector('a.clear-comparison-list-btn').addEventListener('touchend', this.comparisonClearList);
    }

    openCart = (e) => {
        if(window.innerWidth > this.mobileResolution) {
            $(this.desktopCartModal).modal('show');
            $(document.body).css({
                padding: '0',
            });
            return false;
        }
        e.preventDefault();
        const { isCartCollapsed, collapseWrap, animationDuration, collapseCartNode } = this.config;
        if(isCartCollapsed) return false;
        this.cartUpdateEvents();
        this.closeAllRightModules(false);
        document.body.classList.add('scroll-disabled');
        this.config.isCartCollapsed = true;
        $('a.nav-link#cart').addClass('active');
        collapseWrap.style.top = 40 + 'px';
        $(collapseWrap).fadeIn(animationDuration/10);
        $(collapseCartNode).animate({'right': isCartCollapsed ? '-320px' : '0px'}, animationDuration);
    }

    openWishList = (e) => {
        if(window.innerWidth > this.mobileResolution) {
            return false;
        }
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
    }

    openComparison = (e) => {
        if(window.innerWidth > this.mobileResolution) {
            return false;
        }
        e.preventDefault();
        const { isComparisonCollapsed, collapseWrap, animationDuration, collapseComparisonNode } = this.config;
        if(isComparisonCollapsed) return false;
        this.comparisonUpdateEvents()
        this.closeAllRightModules(false);
        document.body.classList.add('scroll-disabled');
        this.config.isComparisonCollapsed = true;
        $('a.nav-link#scales').addClass('active');
        collapseWrap.style.top = 40 + 'px';
        $(collapseWrap).fadeIn(animationDuration/10);
        $(collapseComparisonNode).animate({'right': isComparisonCollapsed ? '-105%' : '0px'}, animationDuration);
    }

    openRightNavigationFromMainNavigation = (e, type) => {
        e.preventDefault();
        const { collapseNode, animationDuration, isCollapsed } = this.config;
        $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration * 0.75 , () => {
            this.config.isCollapsed = false;
            switch (type) {
                case 'cart': {
                    this.openCart(e);
                    break;
                }
                case 'wishList': {
                    this.openWishList(e);
                    break
                }
                case 'comparison': {
                    this.openComparison(e);
                    break;
                }
            }
        });
    }

    squeezeNavigationOnScroll = (windowTop) => {

        const { navigationBlock, logotype } = this.config;

        if(windowTop > 0 && window.innerWidth > 860) {
            navigationBlock.style.top = '-60px';
            this.wrapBlock.style.marginTop = '65px';
            logotype.style.top = window.innerWidth >= 1650 ? '55px' : '0px';
            return 0;
        }
        if(windowTop == 0 && window.innerWidth > 860) {
            navigationBlock.style.top = '0';
            this.wrapBlock.style.marginTop = '120px';
            logotype.style.top = '0px';
            return 0;
        }
        this.config.navigationBlock.style.top = '0';
        this.wrapBlock.style.marginTop = '40px';
        return 1;
    }

    searchEvent = (e) => {
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
    }

    contactsEvent = (e) => {
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
    }

    navigationEvent = (e) => {
        e.preventDefault();
        const { isCollapsed, collapseNode, collapseWrap, animationDuration, isSearchCollapsed, isCartCollapsed, isContactsCollapsed, isWishListCollapsed } = this.config;
        if(isCollapsed) return false;
        this.closeAllRightModules(false);
        const waitTime = isSearchCollapsed || isCartCollapsed || isContactsCollapsed || isWishListCollapsed ? animationDuration * 0.75 : 0;
        document.body.classList.add('scroll-disabled');
        setTimeout(() => {
            this.config.collapseWrap.style.top = 0 + 'px';
            $(collapseWrap).fadeIn(animationDuration/10);
            $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration * 0.75);
            this.config.isCollapsed = true;
        }, waitTime)
    }

    navigationCloseEvent = (e) => {
        if( e.target !== this.config.collapseWrap &&
            e.target !== this.config.closeNavigationBtn &&
            e.target !== this.config.closeSearchNodeBtn &&
            e.target !== this.config.closeCartNodeBtn &&
            e.target !== this.config.closeXCartNodeBtn &&
            e.target !== this.config.closeContactsNodeBtn &&
            e.target !== this.config.closeXContactsNodeBtn &&
            e.target !== this.config.closeWishListNodeBtn &&
            e.target !== this.config.closeXWishListNodeBtn &&
            e.target !== this.config.closeComparisonNodeBtn &&
            e.target !== this.config.closeXComparisonNodeBtn ) return false;
        e.preventDefault();
        const { isCollapsed, isSearchCollapsed, isCartCollapsed, isContactsCollapsed, isComparisonCollapsed, isWishListCollapsed, collapseNode, animationDuration } = this.config;
        if(isCollapsed) {
            $(collapseNode).animate({'left': isCollapsed ? '-320px' : '0px'}, animationDuration * 0.75, this.wrapFadeOut);
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
        document.body.classList.remove('scroll-disabled');
    }

    switchMenuLevelEvent = (e) => {
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
    }

    backSwitchMenuLevelEvent = (e) => {
        // e.preventDefault();
        e.cancelBubble = true;
        let backBtn = e.target;
        if(!e.target.matches('.go-back-btn')) {
            return true;
        }
        const prevMenu = backBtn.parentNode;
        if(prevMenu.getAttribute('data-level') == '2') {
            this.config.navFooterSocial.style.display = 'flex';
        }
        $(prevMenu).fadeOut(500);
    }

    desktopNavigationEvent = (e) => {
        e && e.preventDefault();
        if(!this.config.isDesktopAnimated) {
            const { isDesktopMenuCollapsed, desktopNavigationCollapseMenu, animationDuration } = this.config;
            this.config.isDesktopAnimated = !this.config.isDesktopAnimated;
            this.footer.style.zIndex = !isDesktopMenuCollapsed && !this.isMainPage && '50';
            $(desktopNavigationCollapseMenu).animate( {'height': isDesktopMenuCollapsed ? `0px` : `100vh`} , animationDuration * .75, ()=> {
                this.config.isDesktopMenuCollapsed = !isDesktopMenuCollapsed;
                this.config.isDesktopAnimated = !this.config.isDesktopAnimated;
                this.footer.style.zIndex = isDesktopMenuCollapsed && '200';
            });
            if(!this.isMainPage) {
                if(!this.config.isOverlayShow) {
                    $(this.config.desktopCollapseDesktopOverlay).fadeIn(100, () => {
                        this.config.isOverlayShow = !this.config.isOverlayShow;
                        document.body.classList.add('scroll-disabled');
                    });
                } else {
                    $(this.config.desktopCollapseDesktopOverlay).fadeOut(100, () => {
                        this.config.isOverlayShow = !this.config.isOverlayShow;
                        document.body.classList.remove('scroll-disabled');
                    });
                }
            }
        }
    }

    handleDesktopCloseNavigation = () => {
        if(!this.config.isDesktopAnimated) {
            const { isDesktopMenuCollapsed } = this.config;
            return isDesktopMenuCollapsed ? this.desktopNavigationEvent() : null;
            this.footer.style.zIndex = '200';
        }
    }

    createNavigationsEvents = () => {

        // Меню поиска
        this.config.navSearchBtn.addEventListener('click', this.searchEvent);
        this.config.navSearchBtn.addEventListener('touchend', this.searchEvent);

        // Корзина
        this.config.cartSearchBtn.addEventListener('click', this.openCart);
        this.config.cartSearchBtn.addEventListener('touchend', this.openCart);
        this.navCartBtn.addEventListener('click', (e) => {
            this.openRightNavigationFromMainNavigation(e, 'cart');
        });
        this.navCartBtn.addEventListener('touchend', (e) => {
            this.openRightNavigationFromMainNavigation(e, 'cart');
        });


        // Контакты
        this.config.navContactsBtn.addEventListener('click', this.contactsEvent);
        this.config.navContactsBtn.addEventListener('touchend', this.contactsEvent);

        // Список желаний
        this.config.navWishListBtn.addEventListener('click', this.openWishList);
        this.config.navWishListBtn.addEventListener('touchend', this.openWishList);
        this.navWishListBtn.addEventListener('click', (e) => {
            this.openRightNavigationFromMainNavigation(e, 'wishList');
        });
        this.navWishListBtn.addEventListener('touchend', (e) => {
            this.openRightNavigationFromMainNavigation(e, 'wishList');
        });

        // Сравнения
        this.config.navComparisonBtn.addEventListener('click', this.openComparison);
        this.config.navComparisonBtn.addEventListener('touchend', this.openComparison);
        this.navComparisonBtn.addEventListener('click', (e) => {
            this.openRightNavigationFromMainNavigation(e, 'comparison');
        });
        this.navComparisonBtn.addEventListener('touchend', (e) => {
            this.openRightNavigationFromMainNavigation(e, 'comparison');
        });

        // Навигация
        this.config.toggleBtn.addEventListener('click', this.navigationEvent);
        this.config.toggleBtn.addEventListener('touchend', this.navigationEvent);

        // Закрытие по нажатию на overlay и кнопки закрытия
        this.config.collapseWrap.addEventListener('click', this.navigationCloseEvent);
        this.config.collapseWrap.addEventListener('touchend', this.navigationCloseEvent);

        //Переключение уровней меню
        this.config.navLinksWithSubNav.forEach(link => {
            link.addEventListener('click', this.switchMenuLevelEvent)
            link.addEventListener('touchend', this.switchMenuLevelEvent)
        });

        this.config.goBack.forEach(btn => {
            btn.addEventListener('click', this.backSwitchMenuLevelEvent)
            btn.addEventListener('touchend', this.backSwitchMenuLevelEvent)
        });

        // События по загрузке страницы
        document.addEventListener('DOMContentLoaded', (e) => {
            const pageTop = window.pageYOffset;
            this.squeezeNavigationOnScroll(pageTop);

            this.config.desktopNavigationCollapseMenuWrap.addEventListener('mouseenter', () => {
                this.config.desktopNavigationCollapseMenu.style.width = '100vw';
                if(this.isMainPage) {
                    if(!this.config.isOverlayShow) {
                        $(this.config.desktopCollapseDesktopOverlay).fadeIn(100, () => {
                            this.config.isOverlayShow = !this.config.isOverlayShow;
                            this.footer.style.zIndex = '50';
                        });
                    }
                }
            }, false)

            this.config.desktopNavigationCollapseMenuWrap.addEventListener('mouseleave', () => {
                this.config.desktopNavigationCollapseMenu.style.width = '255px';
                if(this.isMainPage) {
                    $(this.config.desktopCollapseDesktopOverlay).fadeOut(100);
                    this.config.isOverlayShow = !this.config.isOverlayShow;
                    this.footer.style.zIndex = '200';
                }
            }, false)

            // Разворачивание навигации если это main страница и добавление эвентов главной страницы
            if(this.isMainPage && window.innerWidth > 860) {
                this.desktopNavigationEvent();
            }
            // Добавление эвентов если не главная страница
            else {
                this.config.desktopCollapseDesktopOverlay.addEventListener('click', this.handleDesktopCloseNavigation);
                this.config.desktopCollapseDesktopOverlay.addEventListener('touchend', this.handleDesktopCloseNavigation);
            }
            // Десктоп переключение меню при скроле
            window.addEventListener('scroll', (e) => {
                const pageTop = window.pageYOffset;
                this.squeezeNavigationOnScroll(pageTop);

                if(this.footer.offsetTop < window.scrollY + window.innerHeight && this.config.isDesktopMenuCollapsed) {
                    $(this.config.desktopNavigationCollapseMenu).css('max-height',`calc(100vh + 5px - ${window.scrollY + window.innerHeight - this.footer.offsetTop}px)`);
                } else {
                    if(this.config.isDesktopMenuCollapsed) {
                        this.config.desktopNavigationCollapseMenu.removeAttribute('style');
                        this.config.desktopNavigationCollapseMenu.style.height = '100vh';
                    }
                }
            })
            window.addEventListener('resize', (e) => {
                const pageTop = window.pageYOffset;
                this.squeezeNavigationOnScroll(pageTop);

                // if(this.footer.offsetTop < window.scrollY + window.innerHeight) {
                //     $(this.config.desktopNavigationCollapseMenu).css('max-height',`calc(100vh - ${window.scrollY + window.innerHeight - this.footer.offsetTop}px)`);
                // } else {
                //     this.config.desktopNavigationCollapseMenu.removeAttribute('style');
                //     this.config.desktopNavigationCollapseMenu.style.height = '100vh';
                // }
            })
        })

        // Открытие и закрытие меню Desktop
        this.config.desktopNavigationBtn.addEventListener('click', this.desktopNavigationEvent);
        this.config.desktopNavigationBtn.addEventListener('touchend', this.desktopNavigationEvent);

        // Поиск в навигации
        this.config.desktopSearchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            const { isSearchResultAnimated, desktopSearchResult, desktopSearchBlock } = this.config;
            if(value.length > 0) {
                desktopSearchBlock.classList.add('is-searching');
                if(!isSearchResultAnimated) {
                    this.config.isSearchResultAnimated = !isSearchResultAnimated;
                    $(desktopSearchResult).fadeIn(100, () => {
                        this.config.isSearchResultAnimated = !this.config.isSearchResultAnimated;
                        this.config.isSearchResultVisible = !this.config.isSearchResultVisible;
                    });
                }
            } else {
                desktopSearchBlock.classList.remove('is-searching');
                this.config.isSearchResultAnimated = !isSearchResultAnimated;
                $(desktopSearchResult).fadeOut(100, () => {
                    this.config.isSearchResultAnimated = !this.config.isSearchResultAnimated;
                    this.config.isSearchResultVisible = !this.config.isSearchResultVisible;
                });
            }
        })
        this.config.desktopSearchForm.addEventListener('reset', () => {
            const { isSearchResultAnimated, desktopSearchResult, desktopSearchBlock } = this.config;
            desktopSearchBlock.classList.remove('is-searching');
            this.config.isSearchResultAnimated = !isSearchResultAnimated;
            $(desktopSearchResult).fadeOut(100, () => {
                this.config.isSearchResultAnimated = !this.config.isSearchResultAnimated;
                this.config.isSearchResultVisible = !this.config.isSearchResultVisible;
            });
        })
    }
}

const navigation = new Navigation(400);
