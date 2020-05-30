import Navigation from './modules/navigation-module.js';
const navElements = document.querySelectorAll('.menu-link');
const overlay = document.getElementById('overlay');
const loadMore = document.getElementById('loadMore');

const navigation = new Navigation(800);

const changeSub = (e) => {
    e.preventDefault();
    const {target} = e;
    const status = target.parentElement.getAttribute('data-collapse');
    if(status == 'true') {
        target.parentElement.setAttribute('data-collapse', 'false');
        loadMore.style.display = 'flex';
        $($(target).siblings('ul')[0]).fadeOut(500, () =>{
            target.parentElement.classList.remove('collapse');
        });
        $(overlay).fadeOut(500);
    } else {
        target.parentElement.setAttribute('data-collapse', 'true');
        loadMore.style.display = 'none';
        target.parentElement.classList.add('collapse');
        $(overlay).fadeIn(500);
        $($(target).siblings('ul')[0]).fadeIn(500);
    }
};

navElements.forEach(e => {
    e.addEventListener('click', changeSub);
});

overlay.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('.menu-item[data-collapse=true] .menu-link');
    target.parentElement.setAttribute('data-collapse', 'false');
    loadMore.style.display = 'flex';
    $($(target).siblings('ul')[0]).fadeOut(500, () =>{
        target.parentElement.classList.remove('collapse');
    });
    $(overlay).fadeOut(500);
});
