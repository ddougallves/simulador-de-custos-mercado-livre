
function mask(value) {

    return value.replace(/\D/g,'')
    .replace(/(\d{1})(\d)/,'$1,$2')
    .replace(/(\d{1})(,)(\d{1})(\d{2})/,'$1$3$2$4')
    .replace(/(\d{2})(,)(\d{1})(\d{2})/,'$1$3$2$4')
    .replace(/(\d{1})(\d{2})(,)(\d{1})(\d{2})/,'$1.$2$4$3$5')
    .replace(/(\d{1})(.)(\d{1})(\d{2})(,)(\d{1})(\d{2})/,'$1$3$2$4$6$5$7')
    .replace(/(\d{2})(.)(\d{1})(\d{2})(,)(\d{1})(\d{2})/,'$1$3$2$4$6$5$7')
    .replace(/(,\d{2})\d+?$/,'$1');

}

function toggleDesc(el) {
    
    if(el.dataset.target == 'disabled') return

    let target = document.querySelector(`.description[data-name="${el.dataset.target}"]`);
    let desc = target.querySelector('.description__text');
    let height = desc.offsetHeight;

    if(!el.classList.contains('section__icon--active')){
        
        target.style.height = `${height}px`;

        target.addEventListener('transitionend',()=>{

            target.style.height = 'auto';

        })

    }else {

        target.style.height = `${height}px`;

        setTimeout(()=>{
            target.style.height = '0';

        })

        target.addEventListener('transitionend',()=>{

            target.removeAttribute('style')

        })
        
    }
    
    el.classList.toggle('section__icon--active')

}

function toggleSection(section) {
    
    let content = section.querySelector('.section__content');
    let height = content.offsetHeight;
  
    if(section.classList.contains('section--collapsed')){
        
        section.style.height = `${height}px`;

        section.addEventListener('transitionend',()=>{

            section.style.height = 'auto';

        })

    }else {

        section.style.height = `${height}px`;

        setTimeout(()=>{

            section.style.height = '0';

        })

        section.addEventListener('transitionend',()=>{

            section.removeAttribute('style')

        })
    }
    
    section.classList.toggle('section--collapsed')

}

function updatePrefix(el) {

    let value = el.value;
    let prefix = el.parentElement.querySelector('.field__prefix');
    prefix.innerText = `${value} %`

}

const rangeInputs = document.querySelectorAll('.field__input--range');
const textInputs = document.querySelectorAll('.field__input--text');
const helpIcons = document.querySelectorAll('.section__icon--help');
const helpSection = document.querySelector('.section--help');
const resultSection = document.querySelector('.section--result');
const resultHelp = document.querySelector('.section--help.section--help-result');

helpIcons.forEach(icon=>{

    icon.addEventListener('click',(e)=>{
        toggleDesc(e.target)
    })

})

textInputs.forEach(input=>{

    input.addEventListener('input',(e)=>{

        input.value = mask(e.target.value);

    });
    input.addEventListener('focus',(e)=>{

        if(!resultSection.classList.contains('section--faded')){

            resultSection.classList.add('section--faded');
            resultHelp.classList.add('section--faded');

        }else if(!helpSection.classList.contains('section--collapsed')){

            toggleSection(helpSection);

        }

        e.target.parentElement.classList.add('field--focus')

    });
    input.addEventListener('blur',(e)=>{

        if(e.target.parentElement.classList.contains('field--focus')){

            e.target.parentElement.classList.remove('field--focus')

        }
    });
})

rangeInputs.forEach(input=>{

    updatePrefix(input);

    input.addEventListener('focus',()=>{

        if(!resultSection.classList.contains('section--faded')){

            resultSection.classList.add('section--faded');
            resultHelp.classList.add('section--faded');
        }

    })

    input.addEventListener('input',()=>{

        if(!helpSection.classList.contains('section--collapsed')){

            toggleSection(helpSection);

        }

        updatePrefix(input);

    })

})

function checkFields() {

    let status = true;

    textInputs.forEach(input=>{

        if(input.value == ''){

            input.parentElement.classList.add('field--focus');
            if(status != false) status = false;

        }

    })

    if(!status){

        toggleSection(helpSection);
        resultSection.classList.add('section--faded');
        resultHelp.classList.add('section--faded');

    }

    return status;

}

const product = document.querySelector('.field__input[name="product"]');
const fee = document.querySelector('.field__input[name="fee"]');
const shipping = document.querySelector('.field__input[name="shipping"]');
const tax = document.querySelector('.field__input[name="tax"]');
const margin = document.querySelector('.field__input[name="profit"]');

function calc() {

    if(!checkFields())return;

    let price = getPrice(product.value,fee.value,shipping.value,tax.value,margin.value);
    let costs = getCosts(price,fee.value,shipping.value)
    let income = getIncome(price,costs);
    let taxes = getTax(price,tax.value);
    let profit = getProfit(income,product.value,taxes);
    
    function getPrice(product,fee,shipping,tax,margin) {

        product = numberFormat(product);
        tax = numberFormat(tax);
        margin = numberFormat(margin);
        shipping = numberFormat(shipping);
        fee = numberFormat(fee);

        return ((product*margin/100+product+shipping)*100)/(100-(fee+tax));
    }

    function getTax(price,tax){
        tax = numberFormat(tax);
        return (price*tax)/100;
    };

    function numberFormat(value) {

        if(value.length > 6 ){
            value = value.replace('.','').replace(',','.')
            value = parseFloat(value)
        }else{
            value = value.replace(',','.')
            value = parseFloat(value)
        }

        return value;
    }

    function currencyFormat(number) {

        number = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(number);
        return number

    }

    function getCosts(price,fee,shipping){

        fee = numberFormat(fee);
        shipping = numberFormat(shipping);

        return (price * fee) / 100 + shipping;
    }

    function getIncome(price,costs) {

        return price - costs;

    }
    
    function getProfit(income,product,taxes) {
        product = numberFormat(product);
        return income - taxes - product;
    }

    document.querySelector('.result__text--price .result__value')
    .innerText = `${currencyFormat(price)}`;

    document.querySelector('.result__text--costs .result__value')
    .innerText = `-${currencyFormat(costs)}`;

    document.querySelector('.result__text--income .result__value')
    .innerText = `${currencyFormat(income)}`;

    document.querySelector('.result__text--product .result__value')
    .innerText = `-${currencyFormat(numberFormat(product.value))}`;

    document.querySelector('.result__text--tax .result__value')
    .innerText = `-${currencyFormat(taxes)}`;

    document.querySelector('.result__text--profit .result__value')
    .innerText = `${currencyFormat(profit)}`;

    resultSection.classList.remove('section--faded');
    resultHelp.classList.remove('section--faded');

}



