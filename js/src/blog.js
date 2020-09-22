const subscribeToUpdates = document.querySelector('div.subscribe-to-updates');
const subNavigationWrapper = document.querySelector('div.sub-navigation-wrapper');
const wrapper = document.querySelector('section.sub-navigation-for-page-content');
const overlay = document.querySelector('div.sub-navigation-overlay');
let isCollapse = false;
let isAnimated = false;
const header = document.querySelector('div.sub-navigation-header');
const body = document.querySelector('ul.sub-navigation-list');
let topHeight = 124;

const switchMenu = () => {
    if(!isCollapse && !isAnimated) {
        isAnimated = true;
        overlay.style.height = document.body.clientHeight - 176 + 'px';
        $(body).fadeIn(400, () => {
            isAnimated = false;
            isCollapse = true;
        });
        $(overlay).fadeIn(200);
    }
    if(isCollapse && !isAnimated) {
        isAnimated = true;
        overlay.style.height = document.body.clientHeight - 176 + 'px';
        $(body).fadeOut(200, () => {
            isAnimated = false;
            isCollapse = false;
        });
        $(overlay).fadeOut(400);
    }
};

const onScroll = (e) => {
    if(window.innerWidth <= 860) {
        subNavigationWrapper.style.maxHeight = 'unset';
        if(window.scrollY >= topHeight) {
            wrapper.classList.add('fixed');
        }
        if(window.scrollY < topHeight) {
            wrapper.classList.remove('fixed');
        }
    } else {
        if(subscribeToUpdates.offsetTop < window.scrollY + window.innerHeight) {
            console.log('done')
            subNavigationWrapper.style.maxHeight = `calc(100vh - ${window.scrollY + window.innerHeight - subscribeToUpdates.offsetTop}px)`;
        } else {
            subNavigationWrapper.style.maxHeight = 'unset';
        }
    }
};

window.addEventListener('resize', (e) => {
    onScroll(e);
});

header.addEventListener('click', (e) => {
    switchMenu();
});

overlay.addEventListener('click', (e) => {
    switchMenu();
});

window.addEventListener('scroll', (e) => {
    onScroll(e);
});

document.addEventListener('DOMContentLoaded', (e) => {
    onScroll(e);
});
