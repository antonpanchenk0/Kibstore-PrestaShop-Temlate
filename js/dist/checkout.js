'use strict';

var inputs = {
    user_name: {
        node: document.getElementById('uname'),
        regExp: /[a-z\u017F\u0430-\u044F\u0454\u0456\u0457\u0491\u212A]/gmi
    },
    user_phone: {
        node: document.getElementById('uphone'),
        regExp: /^([+38|38]){0,3}([0-9]){10}$/mg
    },
    user_email: {
        node: document.getElementById('uemail'),
        regExp: /^[a-z0-9._]+@[a-z]+\.+[a-z]{1,8}$/mgi
    },
    delivery_type: {
        nodes: document.querySelectorAll('input[name=delivery_type]'),
        delivery_mail_number: document.getElementById('mail_num'),
        delivery_mail_number_regExp: /^[0-9]{1,}$/g,
        delivery_address: document.getElementById('del_address'),
        delivery_address_regExp: /[a-zа-яґїієй\s.\/0-9]/gmi,
        isSelected: false
    },
    delivery_city: {
        node: document.getElementById('dcity'),
        regExp: /^[A-Za-zА-Яа-яЁё]{1,}$/
    },
    payment_type: {
        nodes: document.querySelectorAll('input[name=payment]')
    }

};