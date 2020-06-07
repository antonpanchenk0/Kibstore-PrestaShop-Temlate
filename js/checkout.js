const inputs = {
    user_name: {
        node: document.getElementById('uname'),
        regExp: /^[a-zа-яґїієй]{1,}\s[a-zа-яґїієй]{1,}$/gmi,
    },
    user_phone: {
        node: document.getElementById('uphone'),
        regExp: /^([+38|38]){0,3}([0-9]){10}$/mg,
    },
    user_email: {
        node: document.getElementById('uemail'),
        regExp: /^[a-z0-9._]+@[a-z]+\.+[a-z]{1,8}$/mgi,
    },
    delivery_type: {
        nodes: document.querySelectorAll('input[name=delivery_type]'),
        delivery_mail_number: document.getElementById('mail_num'),
        delivery_mail_number_regExp: /^[0-9]{1,}$/g,
        isSelected: false,
    },
    delivery_city: {
        node: document.getElementById('dcity'),
        regExp: /^[A-Za-zА-Яа-яЁё]{1,}$/,
    },
    payment_type: {
        nodes: document.querySelectorAll('input[name=payment]'),
    }

};
const nextBtns = document.querySelectorAll('input[type=button].next');
const fieldsSets = document.querySelectorAll('fieldset');
console.log(nextBtns)

const checkValidationOnPage = (pnumber) => {
    switch (pnumber) {
        case 1: {
                if( inputs.user_name.node.value.match(inputs.user_name.regExp) &&
                    inputs.user_phone.node.value.match(inputs.user_phone.regExp) &&
                    (inputs.user_email.node.value.match(inputs.user_email.regExp) || inputs.user_email.node.value == '')
                ) {
                    $(nextBtns[pnumber - 1]).prop('disabled', false);
                } else {
                    $(nextBtns[pnumber - 1]).prop('disabled', true);
                }
            break;
        }
        case 2: {
            if( inputs.delivery_type.isSelected &&
                inputs.delivery_city.node.value.match(inputs.delivery_city.regExp) &&
                !document.querySelector('input[data-id=newMail]:checked') )
            {
                $(nextBtns[pnumber - 1]).prop('disabled', false);
            } else {
                if( document.querySelector('input[data-id=newMail]:checked') &&
                    inputs.delivery_city.node.value.match(inputs.delivery_city.regExp) &&
                    inputs.delivery_type.delivery_mail_number.value.match(inputs.delivery_type.delivery_mail_number_regExp)
                )
                {
                    $(nextBtns[pnumber - 1]).prop('disabled', false);
                } else {
                    $(nextBtns[pnumber - 1]).prop('disabled', true);
                }
            }
        }
    }
}

let current_fs, next_fs, previous_fs; // Переменные для частей формы
let opacity;

// Событие кнопки вперед
$(".next").on('click',function(){
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    // Изменение состояний прогресс бара
    $(".progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    $(".progressbar li").eq($("fieldset").index(current_fs)).addClass("done");
    $(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    // Показ следующей части формы
    next_fs.show();
    // Скритие текущей части формы со стилем
    current_fs.animate({opacity: 0}, {
        step: function(now) {
            opacity = 1 - now;
            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({'opacity': opacity});
            },
        duration: 600
    });
});

// Событие для кнопки назад
$(".previous").on('click',function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    // Изменение состояний прогресс бара
    $(".progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    $(".progressbar li").eq($("fieldset").index(previous_fs)).removeClass("done");
    $(".progressbar li").eq($("fieldset").index(previous_fs)).removeClass("active");
    $('button.confirm-order').attr('disabled');
    // Показ предыдущей части формы
    previous_fs.show();
    // Скритие текущей части формы со стилем
    current_fs.animate({opacity: 0}, {
        step: function(now) {
            opacity = 1 - now;
            current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
            previous_fs.css({'opacity': opacity});
            },
        duration: 600
    });
});

$('.radio-group .radio').on('click', function(){
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
});

$(".submit").on('click', function(){
    return false;
});

inputs.user_name.node.addEventListener('input', (e) => {
    e.target.value.match(inputs.user_name.regExp) ? inputs.user_name.node.parentElement.setAttribute('class', 'input-box valid') : inputs.user_name.node.parentElement.setAttribute('class', 'input-box no-valid')
    checkValidationOnPage(1);
});
inputs.user_phone.node.addEventListener('input', (e) => {
    e.target.value.match(inputs.user_phone.regExp) ? inputs.user_phone.node.parentElement.setAttribute('class', 'input-box valid') : inputs.user_phone.node.parentElement.setAttribute('class', 'input-box no-valid')
    checkValidationOnPage(1);
});
inputs.user_email.node.addEventListener('input', (e) => {
    e.target.value.match(inputs.user_email.regExp) ? inputs.user_email.node.parentElement.setAttribute('class', 'input-box valid') : inputs.user_email.node.parentElement.setAttribute('class', 'input-box no-valid')
    checkValidationOnPage(1);
});
inputs.delivery_city.node.addEventListener('input', (e) => {
    e.target.value.match(inputs.delivery_city.regExp) ? inputs.delivery_city.node.parentElement.setAttribute('class', 'input-box valid') : inputs.delivery_city.node.parentElement.setAttribute('class', 'input-box no-valid')
    checkValidationOnPage(2);
});
inputs.delivery_type.delivery_mail_number.addEventListener('input', (e) => {
    checkValidationOnPage(2);
});
inputs.delivery_type.nodes.forEach(radio => {
    radio.addEventListener('change', (e) => {
        inputs.delivery_type.isSelected = true;
        checkValidationOnPage(2);
    });
});
inputs.payment_type.nodes.forEach(radio => {
    radio.addEventListener('change', (e) => {
        $('button.confirm-order').prop('disabled', false);
    });
});
