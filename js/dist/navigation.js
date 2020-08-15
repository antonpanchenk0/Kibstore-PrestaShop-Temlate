'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function Navigation(animationDuration) {
    _classCallCheck(this, Navigation);

    _initialiseProps.call(this);

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
        desktopCollapseDesktopOverlay: document.querySelector('div.desktop-navigation-collapse-overlay'),
        desktopSearchInput: document.getElementById('navSearchInp'),
        desktopSearchBlock: document.getElementById('navSearch'),
        desktopSearchResult: document.getElementById('navSearchResult'),
        desktopSearchForm: document.getElementById('navSearchForm'),
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
        animationDuration: animationDuration
    };
    this.wrapBlock = document.querySelector('div.wrap');
    this.navCartBtn = document.getElementById('navCart');
    this.navWishListBtn = document.getElementById('navWishList');
    this.navComparisonBtn = document.getElementById('navComparison');
    this.mobileResolution = 860;
    this.createNavigationsEvents();
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.wrapFadeOut = function () {
        $(_this.config.collapseWrap).fadeOut(_this.config.animationDuration / 10, function () {
            return document.body.classList.remove('scroll-disabled');
        });
        _this.config.isCollapsed = false;
    };

    this.closeSingleRightModule = function (module, isWrapFadeOut) {
        var _config = _this.config,
            collapseWrap = _config.collapseWrap,
            animationDuration = _config.animationDuration;

        switch (module) {
            case 'cart':
                {
                    $('a.nav-link#cart').removeClass('active');
                    $(_this.config.collapseCartNode).animate({ 'right': '-320px' }, animationDuration * 0.75, function () {
                        isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                        isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                    });
                    _this.config.isCartCollapsed = false;
                    break;
                }
            case 'search':
                {
                    $('a.nav-link#search').removeClass('active');
                    $(_this.config.collapseSearchNode).animate({ 'right': '-320px' }, animationDuration * 0.75, function () {
                        isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                        isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                    });
                    _this.config.isSearchCollapsed = false;
                    break;
                }
            case 'contacts':
                {
                    $('a.nav-link#phone').removeClass('active');
                    $(_this.config.collapseContactsNode).animate({ 'right': '-320px' }, animationDuration * 0.75, function () {
                        isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                        isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                    });
                    _this.config.isContactsCollapsed = false;
                    break;
                }
            case 'wishList':
                {
                    $('a.nav-link#heart').removeClass('active');
                    $(_this.config.collapseWishListNode).animate({ 'right': '-110%' }, animationDuration * 0.75, function () {
                        isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                        isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                    });
                    _this.config.isWishListCollapsed = false;
                    break;
                }
            case 'comparison':
                {
                    $('a.nav-link#scales').removeClass('active');
                    $(_this.config.collapseComparisonNode).animate({ 'right': '-110%' }, animationDuration * 0.75, function () {
                        isWrapFadeOut && $(collapseWrap).fadeOut(animationDuration / 10);
                        isWrapFadeOut && document.body.classList.remove('scroll-disabled');
                    });
                    _this.config.isComparisonCollapsed = false;
                    break;
                }
        }
    };

    this.closeAllRightModules = function (isWrapFadeOut) {
        var _config2 = _this.config,
            isSearchCollapsed = _config2.isSearchCollapsed,
            isCartCollapsed = _config2.isCartCollapsed,
            isContactsCollapsed = _config2.isContactsCollapsed,
            isWishListCollapsed = _config2.isWishListCollapsed,
            isComparisonCollapsed = _config2.isComparisonCollapsed;

        if (isCartCollapsed) {
            _this.closeSingleRightModule('cart', isWrapFadeOut);
        }
        if (isSearchCollapsed) {
            _this.closeSingleRightModule('search', isWrapFadeOut);
        }
        if (isContactsCollapsed) {
            _this.closeSingleRightModule('contacts', isWrapFadeOut);
        }
        if (isWishListCollapsed) {
            _this.closeSingleRightModule('wishList', isWrapFadeOut);
        }
        if (isComparisonCollapsed) {
            _this.closeSingleRightModule('comparison', isWrapFadeOut);
        }
        return false;
    };

    this.cartDeletePosEvent = function (e) {
        var node = e.currentTarget.parentElement.parentElement.parentElement;
        $(node).animate({ 'left': '-110%' }, 300, function () {
            var counterNode = document.querySelector('a.cart-collapse-btn-back~h2>span');
            var menuCounterNode = document.querySelector('span.cart-counter');
            counterNode.innerHTML = '' + (+counterNode.innerHTML - 1);
            menuCounterNode.innerHTML = '' + (+menuCounterNode.innerHTML - 1);
            document.getElementById('cartRender').removeChild(node);
        });
    };

    this.cartSwitchCountEvent = function (e) {
        e.preventDefault();
        var _do = e.currentTarget.getAttribute('data-do');
        switch (_do) {
            case 'add':
                {
                    var value = e.currentTarget.parentElement.querySelector('p.count').innerHTML;
                    e.currentTarget.parentElement.querySelector('p.count').innerHTML = '' + (Number(value) + 1);
                    break;
                }
            case 'remove':
                {
                    var _value = e.currentTarget.parentElement.querySelector('p.count').innerHTML;
                    if (_value - 1 >= 0) {
                        e.currentTarget.parentElement.querySelector('p.count').innerHTML = '' + (Number(_value) - 1);
                    }
                    break;
                }
            default:
                {
                    return;
                }
        }
    };

    this.cartUpdateEvents = function () {
        var deleteBtns = document.querySelectorAll('a.delete-position-btn');
        deleteBtns.forEach(function (btn) {
            btn.removeEventListener('click', _this.cartDeletePosEvent);
            btn.removeEventListener('touchend', _this.cartDeletePosEvent);
            btn.addEventListener('click', _this.cartDeletePosEvent);
            btn.addEventListener('touchend', _this.cartDeletePosEvent);
        });
        var switchersBtns = document.querySelectorAll('.switchers-count-btn');
        switchersBtns.forEach(function (_switch) {
            _switch.removeEventListener('click', _this.cartSwitchCountEvent);
            _switch.removeEventListener('touchend', _this.cartSwitchCountEvent);
            _switch.addEventListener('click', _this.cartSwitchCountEvent);
            _switch.addEventListener('touchend', _this.cartSwitchCountEvent);
        });
    };

    this.wishListOnCheckedEvent = function (e) {
        var node = document.querySelector('.wish-list-item .form-check input:checked');
        node ? $('.wish-list-footer').addClass('selected') : $('.wish-list-footer').removeClass('selected');
    };

    this.wishListDeletePosEvent = function (e) {
        e.preventDefault();
        var node = e.target.parentElement.parentElement;
        console.log(node);
        $(node).animate({ 'left': '-110%' }, 300, function () {
            var counterNode = document.querySelector('a.wish-list-collapse-btn-back~h2>span');
            var counter = +counterNode.innerHTML;
            counter = --counter;
            counterNode.innerHTML = '' + counter;
            document.getElementById('wishListBody').removeChild(node);
        });
    };

    this.wishListDeleteCheckedPosEvent = function (e) {
        e.preventDefault();
        var nodes = document.querySelectorAll('.wish-list-item .form-check input:checked');
        if (nodes.length != 0) {
            var _loop = function _loop(i) {
                var node = nodes[i].parentElement.parentElement;
                $(node).animate({ 'left': '-110%' }, 300, function () {
                    document.getElementById('wishListBody').removeChild(node);
                });
            };

            for (var i = 0; i < nodes.length; i++) {
                _loop(i);
            }
            var value = document.querySelector('a.wish-list-collapse-btn-back h2 span').innerHTML;
            document.querySelector('a.wish-list-collapse-btn-back h2 span').innerHTML = '' + (value - nodes.length);
        }
    };

    this.wishListAddToCartCheckedPosEvent = function (e) {
        e.preventDefault();
        var nodes = document.querySelectorAll('.wish-list-item .form-check input:checked');
        if (nodes.length != 0) {
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].parentElement.parentElement.querySelector('a.add-wish-pos-to-cart').classList.add('active');
            }
        }
    };

    this.wishListAddToCartPosEvent = function (e) {
        e.preventDefault();
        e.target.classList.contains('active') ? e.target.classList.remove('active') : e.target.classList.add('active');
    };

    this.wishListUpdateEvents = function () {
        var checkboxes = document.querySelectorAll('.wish-list-item .form-check input');
        checkboxes.forEach(function (c) {
            c.removeEventListener('input', _this.wishListOnCheckedEvent);
            c.addEventListener('input', _this.wishListOnCheckedEvent);
        });

        var trashBtns = document.querySelectorAll('a.delete-wish-pos-btn');
        trashBtns.forEach(function (b) {
            b.removeEventListener('click', _this.wishListDeletePosEvent);
            b.removeEventListener('touchend', _this.wishListDeletePosEvent);
            b.addEventListener('click', _this.wishListDeletePosEvent);
            b.addEventListener('touchend', _this.wishListDeletePosEvent);
        });

        var cartBtns = document.querySelectorAll('a.add-wish-pos-to-cart');
        cartBtns.forEach(function (b) {
            b.removeEventListener('click', _this.wishListAddToCartPosEvent);
            b.removeEventListener('touchend', _this.wishListAddToCartPosEvent);
            b.addEventListener('click', _this.wishListAddToCartPosEvent);
            b.addEventListener('touchend', _this.wishListAddToCartPosEvent);
        });

        var deleteChecked = document.querySelector('a.wish-control#toDelete');
        deleteChecked.removeEventListener('click', _this.wishListDeleteCheckedPosEvent);
        deleteChecked.removeEventListener('touchend', _this.wishListDeleteCheckedPosEvent);
        deleteChecked.addEventListener('click', _this.wishListDeleteCheckedPosEvent);
        deleteChecked.addEventListener('touchend', _this.wishListDeleteCheckedPosEvent);

        var addToCartChecked = document.querySelector('a.wish-control#toCart');
        addToCartChecked.removeEventListener('click', _this.wishListAddToCartCheckedPosEvent);
        addToCartChecked.removeEventListener('touchend', _this.wishListAddToCartCheckedPosEvent);
        addToCartChecked.addEventListener('click', _this.wishListAddToCartCheckedPosEvent);
        addToCartChecked.addEventListener('touchend', _this.wishListAddToCartCheckedPosEvent);
    };

    this.comparisonDeletePosEvent = function (e) {
        e.preventDefault();
        var node = e.target.parentElement.parentElement;
        $(node).animate({ 'left': '-110%' }, 300, function () {
            var counterNode = document.querySelector('a.comparison-collapse-btn-back~h2>span');
            var counter = +counterNode.innerHTML;
            counter = --counter;
            counterNode.innerHTML = '' + counter;
            _this.comparisonHeightCounter();
            document.querySelector('tbody').removeChild(node);
        });
    };

    this.comparisonAddToCartEvent = function (e) {
        e.preventDefault();
        e.target.classList.add('active');
    };

    this.comparisonHeightCounter = function () {
        var lastTR = document.querySelector('tr.last-table-row');
        var tableRows = document.querySelectorAll('tr');
        var height = 0;
        setTimeout(function () {
            height = +document.querySelector('table tbody').clientHeight;
            tableRows.forEach(function (row) {
                if (row != lastTR) {
                    height = height - row.clientHeight;
                }
            });
            lastTR.style.height = height + 'px';
            lastTR.querySelector('td').style.height = height + 'px';
        }, 0);
    };

    this.comparisonClearList = function (e) {
        e.preventDefault();
        var tableRows = document.querySelectorAll('tr');

        var _loop2 = function _loop2(i) {
            $(tableRows[i]).animate({ 'left': '-110%' }, 300, function () {
                var counterNode = document.querySelector('a.comparison-collapse-btn-back h2 span');
                var counter = +counterNode.innerHTML;
                counter = --counter;
                counterNode.innerHTML = '' + counter;
                document.querySelector('tbody').removeChild(tableRows[i]);
                _this.comparisonHeightCounter();
            });
        };

        for (var i = 1; i < tableRows.length - 1; i++) {
            _loop2(i);
        }
    };

    this.comparisonUpdateEvents = function () {
        var deleteBtns = document.querySelectorAll('a.comparison-del-pos-btn');
        deleteBtns.forEach(function (b) {
            b.removeEventListener('click', _this.comparisonDeletePosEvent);
            b.removeEventListener('touchend', _this.comparisonDeletePosEvent);
            b.addEventListener('click', _this.comparisonDeletePosEvent);
            b.addEventListener('touchend', _this.comparisonDeletePosEvent);
        });
        var addToCartBtns = document.querySelectorAll('a.comparison-add-to-cart-btn');
        addToCartBtns.forEach(function (add) {
            add.removeEventListener('click', _this.comparisonAddToCartEvent);
            add.removeEventListener('touchend', _this.comparisonAddToCartEvent);
            add.addEventListener('click', _this.comparisonAddToCartEvent);
            add.addEventListener('touchend', _this.comparisonAddToCartEvent);
        });
        _this.comparisonHeightCounter();
        document.querySelector('a.clear-comparison-list-btn').removeEventListener('click', _this.comparisonClearList);
        document.querySelector('a.clear-comparison-list-btn').removeEventListener('touchend', _this.comparisonClearList);
        document.querySelector('a.clear-comparison-list-btn').addEventListener('click', _this.comparisonClearList);
        document.querySelector('a.clear-comparison-list-btn').addEventListener('touchend', _this.comparisonClearList);
    };

    this.openCart = function (e) {
        if (window.innerWidth > _this.mobileResolution) {
            return false;
        }
        e.preventDefault();
        var _config3 = _this.config,
            isCartCollapsed = _config3.isCartCollapsed,
            collapseWrap = _config3.collapseWrap,
            animationDuration = _config3.animationDuration,
            collapseCartNode = _config3.collapseCartNode;

        if (isCartCollapsed) return false;
        _this.cartUpdateEvents();
        _this.closeAllRightModules(false);
        document.body.classList.add('scroll-disabled');
        _this.config.isCartCollapsed = true;
        $('a.nav-link#cart').addClass('active');
        collapseWrap.style.top = 40 + 'px';
        $(collapseWrap).fadeIn(animationDuration / 10);
        $(collapseCartNode).animate({ 'right': isCartCollapsed ? '-320px' : '0px' }, animationDuration);
    };

    this.openWishList = function (e) {
        if (window.innerWidth > _this.mobileResolution) {
            return false;
        }
        e.preventDefault();
        var _config4 = _this.config,
            isWishListCollapsed = _config4.isWishListCollapsed,
            collapseWrap = _config4.collapseWrap,
            animationDuration = _config4.animationDuration,
            collapseWishListNode = _config4.collapseWishListNode;

        if (isWishListCollapsed) return false;
        _this.wishListUpdateEvents();
        _this.closeAllRightModules(false);
        document.body.classList.add('scroll-disabled');
        _this.config.isWishListCollapsed = true;
        $('a.nav-link#heart').addClass('active');
        collapseWrap.style.top = 40 + 'px';
        $(collapseWrap).fadeIn(animationDuration / 10);
        $(collapseWishListNode).animate({ 'right': isWishListCollapsed ? '-105%' : '0px' }, animationDuration);
    };

    this.openComparison = function (e) {
        if (window.innerWidth > _this.mobileResolution) {
            return false;
        }
        e.preventDefault();
        var _config5 = _this.config,
            isComparisonCollapsed = _config5.isComparisonCollapsed,
            collapseWrap = _config5.collapseWrap,
            animationDuration = _config5.animationDuration,
            collapseComparisonNode = _config5.collapseComparisonNode;

        if (isComparisonCollapsed) return false;
        _this.comparisonUpdateEvents();
        _this.closeAllRightModules(false);
        document.body.classList.add('scroll-disabled');
        _this.config.isComparisonCollapsed = true;
        $('a.nav-link#scales').addClass('active');
        collapseWrap.style.top = 40 + 'px';
        $(collapseWrap).fadeIn(animationDuration / 10);
        $(collapseComparisonNode).animate({ 'right': isComparisonCollapsed ? '-105%' : '0px' }, animationDuration);
    };

    this.openRightNavigationFromMainNavigation = function (e, type) {
        e.preventDefault();
        var _config6 = _this.config,
            collapseNode = _config6.collapseNode,
            animationDuration = _config6.animationDuration,
            isCollapsed = _config6.isCollapsed;

        $(collapseNode).animate({ 'left': isCollapsed ? '-320px' : '0px' }, animationDuration * 0.75, function () {
            _this.config.isCollapsed = false;
            switch (type) {
                case 'cart':
                    {
                        _this.openCart(e);
                        break;
                    }
                case 'wishList':
                    {
                        _this.openWishList(e);
                        break;
                    }
                case 'comparison':
                    {
                        _this.openComparison(e);
                        break;
                    }
            }
        });
    };

    this.squeezeNavigationOnScroll = function (windowTop) {
        if (windowTop > 0 && window.innerWidth > 860) {
            _this.config.navigationBlock.style.top = '-60px';
            _this.wrapBlock.style.marginTop = '65px';
            _this.config.logotype.style.top = window.innerWidth >= 1600 ? '55px' : '0px';
            return 0;
        }
        if (windowTop == 0 && window.innerWidth > 860) {
            _this.config.navigationBlock.style.top = '0';
            _this.wrapBlock.style.marginTop = '120px';
            _this.config.logotype.style.top = '0px';
            return 0;
        }
        _this.wrapBlock.style.marginTop = '40px';
        return 1;
    };

    this.searchEvent = function (e) {
        e.preventDefault();
        var _config7 = _this.config,
            isSearchCollapsed = _config7.isSearchCollapsed,
            collapseWrap = _config7.collapseWrap,
            animationDuration = _config7.animationDuration,
            collapseSearchNode = _config7.collapseSearchNode;

        if (isSearchCollapsed) return false;
        _this.closeAllRightModules(false);
        document.body.classList.add('scroll-disabled');
        _this.config.isSearchCollapsed = true;
        $('a.nav-link#search').addClass('active');
        collapseWrap.style.top = 40 + 'px';
        $(collapseWrap).fadeIn(animationDuration / 10);
        $(collapseSearchNode).animate({ 'right': isSearchCollapsed ? '-320px' : '0px' }, animationDuration);
    };

    this.contactsEvent = function (e) {
        e.preventDefault();
        var _config8 = _this.config,
            isContactsCollapsed = _config8.isContactsCollapsed,
            collapseWrap = _config8.collapseWrap,
            animationDuration = _config8.animationDuration,
            collapseContactsNode = _config8.collapseContactsNode;

        if (isContactsCollapsed) return false;
        _this.closeAllRightModules(false);
        document.body.classList.add('scroll-disabled');
        _this.config.isContactsCollapsed = true;
        $('a.nav-link#phone').addClass('active');
        collapseWrap.style.top = 40 + 'px';
        $(collapseWrap).fadeIn(animationDuration / 10);
        $(collapseContactsNode).animate({ 'right': isContactsCollapsed ? '-320px' : '0px' }, animationDuration);
    };

    this.navigationEvent = function (e) {
        e.preventDefault();
        var _config9 = _this.config,
            isCollapsed = _config9.isCollapsed,
            collapseNode = _config9.collapseNode,
            collapseWrap = _config9.collapseWrap,
            animationDuration = _config9.animationDuration,
            isSearchCollapsed = _config9.isSearchCollapsed,
            isCartCollapsed = _config9.isCartCollapsed,
            isContactsCollapsed = _config9.isContactsCollapsed,
            isWishListCollapsed = _config9.isWishListCollapsed;

        if (isCollapsed) return false;
        _this.closeAllRightModules(false);
        var waitTime = isSearchCollapsed || isCartCollapsed || isContactsCollapsed || isWishListCollapsed ? animationDuration * 0.75 : 0;
        document.body.classList.add('scroll-disabled');
        setTimeout(function () {
            _this.config.collapseWrap.style.top = 0 + 'px';
            $(collapseWrap).fadeIn(animationDuration / 10);
            $(collapseNode).animate({ 'left': isCollapsed ? '-320px' : '0px' }, animationDuration * 0.75);
            _this.config.isCollapsed = true;
        }, waitTime);
    };

    this.navigationCloseEvent = function (e) {
        if (e.target !== _this.config.collapseWrap && e.target !== _this.config.closeNavigationBtn && e.target !== _this.config.closeSearchNodeBtn && e.target !== _this.config.closeCartNodeBtn && e.target !== _this.config.closeXCartNodeBtn && e.target !== _this.config.closeContactsNodeBtn && e.target !== _this.config.closeXContactsNodeBtn && e.target !== _this.config.closeWishListNodeBtn && e.target !== _this.config.closeXWishListNodeBtn && e.target !== _this.config.closeComparisonNodeBtn && e.target !== _this.config.closeXComparisonNodeBtn) return false;
        e.preventDefault();
        var _config10 = _this.config,
            isCollapsed = _config10.isCollapsed,
            isSearchCollapsed = _config10.isSearchCollapsed,
            isCartCollapsed = _config10.isCartCollapsed,
            isContactsCollapsed = _config10.isContactsCollapsed,
            isComparisonCollapsed = _config10.isComparisonCollapsed,
            isWishListCollapsed = _config10.isWishListCollapsed,
            collapseNode = _config10.collapseNode,
            animationDuration = _config10.animationDuration;

        if (isCollapsed) {
            $(collapseNode).animate({ 'left': isCollapsed ? '-320px' : '0px' }, animationDuration * 0.75, _this.wrapFadeOut);
        }
        if (isSearchCollapsed) {
            _this.closeSingleRightModule('search', true);
        }
        if (isCartCollapsed) {
            _this.closeSingleRightModule('cart', true);
        }
        if (isContactsCollapsed) {
            _this.closeSingleRightModule('contacts', true);
        }
        if (isWishListCollapsed) {
            _this.closeSingleRightModule('wishList', true);
        }
        if (isComparisonCollapsed) {
            _this.closeSingleRightModule('comparison', true);
        }
        document.body.classList.remove('scroll-disabled');
    };

    this.switchMenuLevelEvent = function (e) {
        e.preventDefault();
        e.cancelBubble = true;
        var li = e.target;
        if (!e.target.matches('.navigation-collapse-list-item-with-sub-navigation')) {
            if (e.target.matches('.navigation-collapse-list-link')) {
                li = e.target.parentNode;
            } else {
                li = e.target.parentNode.parentNode;
            }
        }
        var nextNav = li.querySelector('.sub-navigation-collapse');
        _this.config.navFooterSocial.style.display = 'none';
        $(nextNav).fadeIn(500);
    };

    this.backSwitchMenuLevelEvent = function (e) {
        e.preventDefault();
        e.cancelBubble = true;
        var backBtn = e.target;
        if (!e.target.matches('.go-back-btn')) {
            backBtn = e.target.parentNode;
        }
        var prevMenu = backBtn.parentNode;
        if (prevMenu.getAttribute('data-level') == '2') {
            _this.config.navFooterSocial.style.display = 'flex';
        }
        $(prevMenu).fadeOut(500);
    };

    this.desktopNavigationEvent = function (e) {
        e.preventDefault();
        if (!_this.config.isDesktopAnimated) {
            var _config11 = _this.config,
                isDesktopMenuCollapsed = _config11.isDesktopMenuCollapsed,
                desktopNavigationCollapseMenu = _config11.desktopNavigationCollapseMenu,
                animationDuration = _config11.animationDuration;

            _this.config.isDesktopAnimated = !_this.config.isDesktopAnimated;
            $(desktopNavigationCollapseMenu).animate({ 'top': isDesktopMenuCollapsed ? '-100rem' : '50px' }, animationDuration * .75, function () {
                _this.config.isDesktopMenuCollapsed = !isDesktopMenuCollapsed;
                _this.config.isDesktopAnimated = !_this.config.isDesktopAnimated;
            });
        }
    };

    this.createNavigationsEvents = function () {

        // Меню поиска
        _this.config.navSearchBtn.addEventListener('click', _this.searchEvent);
        _this.config.navSearchBtn.addEventListener('touchend', _this.searchEvent);

        // Корзина
        _this.config.cartSearchBtn.addEventListener('click', _this.openCart);
        _this.config.cartSearchBtn.addEventListener('touchend', _this.openCart);
        _this.navCartBtn.addEventListener('click', function (e) {
            _this.openRightNavigationFromMainNavigation(e, 'cart');
        });
        _this.navCartBtn.addEventListener('touchend', function (e) {
            _this.openRightNavigationFromMainNavigation(e, 'cart');
        });

        // Контакты
        _this.config.navContactsBtn.addEventListener('click', _this.contactsEvent);
        _this.config.navContactsBtn.addEventListener('touchend', _this.contactsEvent);

        // Список желаний
        _this.config.navWishListBtn.addEventListener('click', _this.openWishList);
        _this.config.navWishListBtn.addEventListener('touchend', _this.openWishList);
        _this.navWishListBtn.addEventListener('click', function (e) {
            _this.openRightNavigationFromMainNavigation(e, 'wishList');
        });
        _this.navWishListBtn.addEventListener('touchend', function (e) {
            _this.openRightNavigationFromMainNavigation(e, 'wishList');
        });

        // Сравнения
        _this.config.navComparisonBtn.addEventListener('click', _this.openComparison);
        _this.config.navComparisonBtn.addEventListener('touchend', _this.openComparison);
        _this.navComparisonBtn.addEventListener('click', function (e) {
            _this.openRightNavigationFromMainNavigation(e, 'comparison');
        });
        _this.navComparisonBtn.addEventListener('touchend', function (e) {
            _this.openRightNavigationFromMainNavigation(e, 'comparison');
        });

        // Навигация
        _this.config.toggleBtn.addEventListener('click', _this.navigationEvent);
        _this.config.toggleBtn.addEventListener('touchend', _this.navigationEvent);

        // Закрытие по нажатию на overlay и кнопки закрытия
        _this.config.collapseWrap.addEventListener('click', _this.navigationCloseEvent);
        _this.config.collapseWrap.addEventListener('touchend', _this.navigationCloseEvent);

        //Переключение уровней меню
        _this.config.navLinksWithSubNav.forEach(function (link) {
            link.addEventListener('click', _this.switchMenuLevelEvent);
            link.addEventListener('touchend', _this.switchMenuLevelEvent);
        });

        _this.config.goBack.forEach(function (btn) {
            btn.addEventListener('click', _this.backSwitchMenuLevelEvent);
            btn.addEventListener('touchend', _this.backSwitchMenuLevelEvent);
        });

        // События по загрузке страницы
        document.addEventListener('DOMContentLoaded', function (e) {
            var pageTop = window.pageYOffset;
            _this.squeezeNavigationOnScroll(pageTop);
            document.querySelector('footer.main-footer').style.zIndex = window.innerWidth > 860 ? '200' : '50';
            // Десктоп переключение меню при скроле
            document.addEventListener('scroll', function (e) {
                var pageTop = window.pageYOffset;
                _this.squeezeNavigationOnScroll(pageTop);
            });
            window.addEventListener('resize', function (e) {
                var pageTop = window.pageYOffset;
                _this.squeezeNavigationOnScroll(pageTop);
                document.querySelector('footer.main-footer').style.zIndex = window.innerWidth > 860 ? '200' : '50';
            });
        });

        // Открытие и закрытие меню Desktop
        _this.config.desktopNavigationBtn.addEventListener('click', _this.desktopNavigationEvent);
        _this.config.desktopNavigationBtn.addEventListener('touchend', _this.desktopNavigationEvent);

        // Overlay при hover
        _this.config.desktopNavigationCollapseMenu.addEventListener('mouseenter', function (e) {
            if (!_this.config.isOverlayShow) {
                $(_this.config.desktopCollapseDesktopOverlay).fadeIn(100, function () {
                    _this.config.isOverlayShow = !_this.config.isOverlayShow;
                });
            }
        });
        _this.config.desktopNavigationCollapseMenu.addEventListener('mouseleave', function (e) {
            $(_this.config.desktopCollapseDesktopOverlay).fadeOut(100);
            _this.config.isOverlayShow = !_this.config.isOverlayShow;
        });

        // Поиск в навигации
        _this.config.desktopSearchInput.addEventListener('input', function (e) {
            var value = e.target.value;
            var _config12 = _this.config,
                isSearchResultAnimated = _config12.isSearchResultAnimated,
                desktopSearchResult = _config12.desktopSearchResult,
                desktopSearchBlock = _config12.desktopSearchBlock;

            if (value.length > 0) {
                desktopSearchBlock.classList.add('is-searching');
                if (!isSearchResultAnimated) {
                    _this.config.isSearchResultAnimated = !isSearchResultAnimated;
                    $(desktopSearchResult).fadeIn(100, function () {
                        _this.config.isSearchResultAnimated = !_this.config.isSearchResultAnimated;
                        _this.config.isSearchResultVisible = !_this.config.isSearchResultVisible;
                    });
                }
            } else {
                desktopSearchBlock.classList.remove('is-searching');
                _this.config.isSearchResultAnimated = !isSearchResultAnimated;
                $(desktopSearchResult).fadeOut(100, function () {
                    _this.config.isSearchResultAnimated = !_this.config.isSearchResultAnimated;
                    _this.config.isSearchResultVisible = !_this.config.isSearchResultVisible;
                });
            }
        });
        _this.config.desktopSearchForm.addEventListener('reset', function () {
            var _config13 = _this.config,
                isSearchResultAnimated = _config13.isSearchResultAnimated,
                desktopSearchResult = _config13.desktopSearchResult,
                desktopSearchBlock = _config13.desktopSearchBlock;

            desktopSearchBlock.classList.remove('is-searching');
            _this.config.isSearchResultAnimated = !isSearchResultAnimated;
            $(desktopSearchResult).fadeOut(100, function () {
                _this.config.isSearchResultAnimated = !_this.config.isSearchResultAnimated;
                _this.config.isSearchResultVisible = !_this.config.isSearchResultVisible;
            });
        });
    };
};

var navigation = new Navigation(400);