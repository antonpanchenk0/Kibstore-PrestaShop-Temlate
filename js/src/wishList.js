const checkAllProductBtn = document.querySelector('a.check-all-btn');
const allRenderedProducts = document.querySelectorAll('div.product-item');

checkAllProductBtn.addEventListener('click', (e) => {
    e.preventDefault();

    allRenderedProducts.forEach((item) => {
        const checkbox = item.querySelector('input[type=checkbox]');
        if(checkbox) {
            checkbox.checked = true;
        }
    });
});
