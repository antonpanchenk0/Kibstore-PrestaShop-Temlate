import Filters from './modules/filter-module.js';
import Navigation from './modules/navigation-module.js';

const navigation = new Navigation(600);
const filters = new Filters(800);

document.getElementById('goToCartModalBtn').addEventListener('click', (e) => {
    e.preventDefault();
    $('#addCartModal').modal('hide');
    navigation.openCart(e);
})
