'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inputs = {
    userName: {
        node: document.getElementById('uname'),
        regExp: /[a-z\u017F\u0430-\u044F\u0454\u0456\u0457\u0491\u212A]/gmi
    },
    userPhone: {
        node: document.getElementById('uphone'),
        regExp: /^\+[0-9]{2}\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/mg
    },
    userEmail: {
        node: document.getElementById('uemail'),
        regExp: /^[a-z0-9._]+@[a-z]+\.+[a-z]{1,8}$/mgi
    },
    deliveryTypes: {
        delivery_mail_number_regExp: /^[0-9]{1,}$/g,
        delivery_address_regExp: /[a-zа-яґїієй\s.\/0-9]/gmi,
        isSelected: false
    },
    deliveryCity: {
        node: document.getElementById('dcity'),
        regExp: /^[A-Za-zА-Яа-яЁё]{1,}$/
    }

};

var OrderSumbiter = function OrderSumbiter() {
    var _this = this;

    _classCallCheck(this, OrderSumbiter);

    this.onLoad = function () {
        _this.confirmOrderButton.setAttribute('disabled', 'true');
        _this.inputsNodes.forEach(function (node) {
            node.addEventListener('input', function (event) {
                return _this.validateInput(node, event.target.value);
            });
        });
        _this.nextButtons.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                return _this.checkIsPageValid(event, btn.dataset.id);
            });
        });
        _this.confirmOrderButton.addEventListener('mouseenter', function () {
            if (_this.currentPage !== 3) {
                _this.confirmOrderButton.setAttribute('disabled', 'true');
            }
        });
        _this.deliveryInputNodes.forEach(function (deliveryNode) {
            deliveryNode.addEventListener('change', _this.isDeliveryCheck);
        });
        _this.paymentInputNodes.forEach(function (paymentNode) {
            paymentNode.addEventListener('change', _this.isPaymentCheck);
        });
        _this.deliveryAddressTextArea.addEventListener('input', function (e) {
            if (_this.deliveryAddressTextArea.value.match(_this.inputs.deliveryTypes.delivery_mail_number_regExp)) {
                _this.deliveryAddressTextArea.classList.remove('has-error');
                _this.deliveryAddressTextArea.classList.add('complete');
            } else {
                _this.deliveryAddressTextArea.classList.add('has-error');
                _this.deliveryAddressTextArea.classList.remove('complete');
            }
        });
        _this.postNumberTextArea.addEventListener('input', function (e) {
            if (_this.postNumberTextArea.value.match(_this.inputs.deliveryTypes.delivery_address_regExp)) {
                _this.postNumberTextArea.classList.remove('has-error');
                _this.postNumberTextArea.classList.add('complete');
            } else {
                _this.postNumberTextArea.classList.add('has-error');
                _this.postNumberTextArea.classList.remove('complete');
            }
        });
    };

    this.validateInput = function (node, value) {

        if (value.match(_this.inputs[node.id].regExp) && value !== '') {
            node.classList.remove('has-error');
            node.classList.add('complete');
        } else {
            node.classList.remove('complete');
            node.classList.add('has-error');
        }
    };

    this.checkIsPageValid = function (event, id) {
        event.preventDefault();
        switch (+id) {
            case 1:
                {
                    if (user_name.value.match(_this.inputs.user_name.regExp) && user_phone.value.match(_this.inputs.user_phone.regExp) && user_email.value.match(_this.inputs.user_email.regExp)) {
                        _this.goToNextPage(id - 1);
                    } else {
                        !user_name.value.match(_this.inputs.user_name.regExp) && user_name.classList.add('has-error');
                        !user_phone.value.match(_this.inputs.user_phone.regExp) && user_phone.classList.add('has-error');
                        !user_email.value.match(_this.inputs.user_email.regExp) && user_email.classList.add('has-error');
                        _this.shakeButton(event.target);
                    }
                }
            case 2:
                {
                    if (delivery_city.value.match(_this.inputs.delivery_city.regExp) && _this.inputs.deliveryTypes.isSelected) {
                        if (_this.deliveryInputNodes[0].checked && _this.postNumberTextArea.value.match(_this.inputs.deliveryTypes.delivery_mail_number_regExp) && _this.postNumberTextArea.value !== '') {
                            _this.goToNextPage(id - 1);
                        }
                        if (_this.deliveryInputNodes[2].checked && _this.deliveryAddressTextArea.value.match(_this.inputs.deliveryTypes.delivery_address_regExp) && _this.deliveryAddressTextArea.value !== '') {
                            _this.goToNextPage(id - 1);
                        }
                        if (_this.deliveryInputNodes[1].checked) {
                            _this.goToNextPage(id - 1);
                        } else {
                            _this.postNumberTextArea.classList.remove('has-error');
                            _this.deliveryAddressTextArea.classList.remove('has-error');
                            _this.deliveryInputNodes[0].checked && _this.postNumberTextArea.classList.add('has-error');
                            _this.deliveryInputNodes[2].checked && _this.deliveryAddressTextArea.classList.add('has-error');
                            _this.shakeButton(event.target);
                        }
                    } else {
                        !delivery_city.value.match(_this.inputs.delivery_city.regExp) && delivery_city.classList.add('has-error');
                        _this.shakeButton(event.target);
                    }
                }
            default:
                {
                    return null;
                }
        }
    };

    this.goToNextPage = function (prevId) {
        _this.orderStepsBlocks[prevId].classList.remove('active');
        _this.orderStepsBlocks[prevId].classList.add('complete');
        _this.orderStepsBlocks[prevId + 1].classList.add('active');
        _this.currentPage = prevId + 1;
    };

    this.isDeliveryCheck = function () {
        _this.inputs.deliveryTypes.isSelected = true;
    };

    this.isPaymentCheck = function () {
        _this.inputs.paymentsTypes.isSelected = true;
        _this.confirmOrderButton.removeAttribute('disabled');
    };

    this.shakeButton = function (btn) {
        $(btn).removeClass('shake');
        setTimeout(function () {
            return $(btn).addClass('shake');
        }, 100);
    };

    this.inputs = {
        user_name: {
            regExp: /^[a-z\u017F\u0430-\u044F\u0454\u0456\u0457\u0491\u212A]+$/gmi
        },
        user_phone: {
            regExp: /^[0-9]{10,12}$/mg
        },
        user_email: {
            regExp: /^[a-z0-9._]+@[a-z]+\.+[a-z]{1,8}$/mgi
        },
        delivery_city: {
            regExp: /^[A-Za-zА-Яа-яЁё]{1,}$/
        },
        deliveryTypes: {
            delivery_mail_number_regExp: /^[0-9]{1,}$/g,
            delivery_address_regExp: /[a-zа-яґїієй\s.\/0-9]/gmi,
            isSelected: false
        },
        paymentsTypes: {
            isSelected: false
        }
    };

    this.currentPage = 1;
    this.confirmOrderButton = document.querySelector('button.confirm-order-btn');

    this.orderStepsBlocks = document.querySelectorAll('div.checkout-step');

    this.nextButtons = document.querySelectorAll('a.go-next-step-btn');

    this.postNumberTextArea = document.querySelector('textarea[name=post_number]');
    this.deliveryAddressTextArea = document.querySelector('textarea[name=delivery_address]');
    this.deliveryInputNodes = document.querySelectorAll('input[type=radio][name=delivery]');
    this.paymentInputNodes = document.querySelectorAll('input[type=radio][name=payment]');
    this.inputsNodes = document.querySelectorAll('input:not([type=radio]):not([type=checkbox])');
    this.onLoad();
};

var submiter = new OrderSumbiter();

console.log(submiter.inputsNodes);