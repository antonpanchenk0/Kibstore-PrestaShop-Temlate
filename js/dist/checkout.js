'use strict';

var inputs = {
    userName: {
        node: document.getElementById('uname'),
        regExp: /[a-z\u017F\u0430-\u044F\u0454\u0456\u0457\u0491\u212A]/gmi
    },
    userPhone: {
        node: document.getElementById('uphone'),
        regExp: /^([+38|38]){0,3}([0-9]){10}$/mg
    },
    userEmail: {
        node: document.getElementById('uemail'),
        regExp: /^[a-z0-9._]+@[a-z]+\.+[a-z]{1,8}$/mgi
    },
    deliveryType: {
        nodes: document.querySelectorAll('input[name=delivery_type]'),
        delivery_mail_number: document.getElementById('mail_num'),
        delivery_mail_number_regExp: /^[0-9]{1,}$/g,
        delivery_address: document.getElementById('del_address'),
        delivery_address_regExp: /[a-zа-яґїієй\s.\/0-9]/gmi,
        isSelected: false
    },
    deliveryCity: {
        node: document.getElementById('dcity'),
        regExp: /^[A-Za-zА-Яа-яЁё]{1,}$/
    },
    paymentType: {
        nodes: document.querySelectorAll('input[name=payment]')
    }

};

$(user_phone).mask("+37(999)999-9999");