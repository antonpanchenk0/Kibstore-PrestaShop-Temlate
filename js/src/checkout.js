const inputs = {
    userName: {
        node: document.getElementById('uname'),
        regExp: /[a-zа-яґїієй]/gmiu,
    },
    userPhone: {
        node: document.getElementById('uphone'),
        regExp: /^\+[0-9]{2}\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/mg,
    },
    userEmail: {
        node: document.getElementById('uemail'),
        regExp: /^[a-z0-9._]+@[a-z]+\.+[a-z]{1,8}$/mgi,
    },
    deliveryTypes: {
        delivery_mail_number_regExp: /^[0-9]{1,}$/g,
        delivery_address_regExp: /[a-zа-яґїієй\s.\/0-9]/gmi,
        isSelected: false,
    },
    deliveryCity: {
        node: document.getElementById('dcity'),
        regExp: /^[A-Za-zА-Яа-яЁё]{1,}$/,
    },

};

class OrderSumbiter {
    constructor() {
        this.inputs = {
            user_name: {
                regExp: /^[a-zа-яґїієй]{1,}$/gmiu,
            },
            user_phone: {
                regExp: /^[0-9]{10,12}$/mg,
            },
            user_email: {
                regExp: /^[a-z0-9._]+@[a-z]+\.+[a-z]{1,8}$/mgi,
            },
            delivery_city: {
                regExp: /^[A-Za-zА-Яа-яЁё]{1,}$/,
            },
            deliveryTypes: {
                delivery_mail_number_regExp: /^[0-9]{1,}$/g,
                delivery_address_regExp: /[a-zа-яґїієй\s.\/0-9]/gmi,
                isSelected: false,
            },
            paymentsTypes: {
                isSelected: false,
            },
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
    }

    onLoad = () => {
        this.confirmOrderButton.setAttribute('disabled', 'true');
        this.inputsNodes.forEach((node) => {
            node.addEventListener('input', (event) => this.validateInput(node, event.target.value));
        })
        this.nextButtons.forEach((btn) => {
            btn.addEventListener('click', (event) => this.checkIsPageValid(event, btn.dataset.id));
        })
        this.confirmOrderButton.addEventListener('mouseenter', () => {
            if(this.currentPage !== 3) {
                this.confirmOrderButton.setAttribute('disabled', 'true');
            }
        })
        this.deliveryInputNodes.forEach((deliveryNode) => {
            deliveryNode.addEventListener('change', this.isDeliveryCheck)
        })
        this.paymentInputNodes.forEach((paymentNode) => {
            paymentNode.addEventListener('change', this.isPaymentCheck)
        })
        this.deliveryAddressTextArea.addEventListener('input', (e) => {
            if(this.deliveryAddressTextArea.value.match(this.inputs.deliveryTypes.delivery_mail_number_regExp)) {
                this.deliveryAddressTextArea.classList.remove('has-error');
                this.deliveryAddressTextArea.classList.add('complete');
            } else {
                this.deliveryAddressTextArea.classList.add('has-error');
                this.deliveryAddressTextArea.classList.remove('complete');
            }
        })
        this.postNumberTextArea.addEventListener('input', (e) => {
            if(this.postNumberTextArea.value.match(this.inputs.deliveryTypes.delivery_address_regExp)) {
                this.postNumberTextArea.classList.remove('has-error');
                this.postNumberTextArea.classList.add('complete');
            } else {
                this.postNumberTextArea.classList.add('has-error');
                this.postNumberTextArea.classList.remove('complete');
            }
        })
    }

    validateInput = (node, value) => {

        if(value.match(this.inputs[node.id].regExp) && value !== '') {
            node.classList.remove('has-error');
            node.classList.add('complete');

        } else {
            node.classList.remove('complete');
            node.classList.add('has-error');
        }
    }

    checkIsPageValid = (event, id) => {
        event.preventDefault();
        switch (+id) {
            case 1: {
                if(user_name.value.match(this.inputs.user_name.regExp) &&
                    user_phone.value.match(this.inputs.user_phone.regExp) &&
                    user_email.value.match(this.inputs.user_email.regExp)) {
                    this.goToNextPage(id - 1);
                } else {
                    !user_name.value.match(this.inputs.user_name.regExp) && user_name.classList.add('has-error');
                    !user_phone.value.match(this.inputs.user_phone.regExp) && user_phone.classList.add('has-error');
                    !user_email.value.match(this.inputs.user_email.regExp) && user_email.classList.add('has-error');
                    this.shakeButton(event.target);
                }
            }
            case 2: {
                if(delivery_city.value.match(this.inputs.delivery_city.regExp) &&
                    this.inputs.deliveryTypes.isSelected) {
                    if(this.deliveryInputNodes[0].checked &&
                        this.postNumberTextArea.value.match(this.inputs.deliveryTypes.delivery_mail_number_regExp) &&
                        this.postNumberTextArea.value !== '') {
                        this.goToNextPage(id - 1);
                    }
                    if(this.deliveryInputNodes[2].checked &&
                        this.deliveryAddressTextArea.value.match(this.inputs.deliveryTypes.delivery_address_regExp) &&
                        this.deliveryAddressTextArea.value !== ''){
                        this.goToNextPage(id - 1);
                    }
                    if(this.deliveryInputNodes[1].checked) {
                        this.goToNextPage(id - 1);
                    } else {
                        this.postNumberTextArea.classList.remove('has-error');
                        this.deliveryAddressTextArea.classList.remove('has-error');
                        this.deliveryInputNodes[0].checked && this.postNumberTextArea.classList.add('has-error');
                        this.deliveryInputNodes[2].checked && this.deliveryAddressTextArea.classList.add('has-error');
                        this.shakeButton(event.target);
                    }
                } else {
                    !delivery_city.value.match(this.inputs.delivery_city.regExp) && delivery_city.classList.add('has-error');
                    this.shakeButton(event.target);
                }
            }
            default: {
                return null;
            }
        }
    }

    goToNextPage = (prevId) => {
        this.orderStepsBlocks[prevId].classList.remove('active');
        this.orderStepsBlocks[prevId].classList.add('complete');
        this.orderStepsBlocks[prevId + 1].classList.add('active');
        this.currentPage = prevId + 1;
    }

    isDeliveryCheck = () => {
        this.inputs.deliveryTypes.isSelected = true;
    }

    isPaymentCheck = () => {
        this.inputs.paymentsTypes.isSelected = true;
        this.confirmOrderButton.removeAttribute('disabled');
    }

    shakeButton = (btn) => {
        $(btn).removeClass('shake');
        setTimeout(()=> $(btn).addClass('shake'), 100);
    }
}

const submiter = new OrderSumbiter();

console.log(submiter.inputsNodes)
