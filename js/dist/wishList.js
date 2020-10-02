'use strict';

var checkAllProductBtn = document.querySelector('a.check-all-btn');
var allRenderedProducts = document.querySelectorAll('div.product-item');

checkAllProductBtn.addEventListener('click', function (e) {
    e.preventDefault();

    allRenderedProducts.forEach(function (item) {
        var checkbox = item.querySelector('input[type=checkbox]');
        if (checkbox) {
            checkbox.checked = true;
        }
    });
});