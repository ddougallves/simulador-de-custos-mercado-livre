function calc() {

    let productCost = numberFormat(productInp.value);
    let fee = numberFormat(feeInp.value);
    let shipping = numberFormat(shippingInp.value);
    let tax = numberFormat(taxInp.value);
    let margin = numberFormat(marginInp.value);

    let price = getPrice();
    fee = getFee();
    tax = getTax();
    let costs = getCosts();
    let income = getIncome();
    let profit = getProfit();

    function getPrice() {
        return ((productCost*margin/100+productCost+shipping)*100)/(100-(fee+tax));
    }

    function getCosts() {
        return fee+shipping;
    }

    function getIncome() {
        return price - costs;
    }

    function getFee() {
        return (price*fee)/100;
    } 

    function getTax() {
        return (price*tax)/100;
    } 

    function getProfit() {
        return income - tax - productCost;
    }   

    document.querySelector('.result__text--price .result__value')
    .innerText = currencyFormat(price);
    document.querySelector('.result__text--costs .result__value')
    .innerText = `-${currencyFormat(costs)}`;
    document.querySelector('.result__text--income .result__value')
    .innerText = currencyFormat(income);
    document.querySelector('.result__text--product .result__value')
    .innerText = `-${currencyFormat(productCost)}`;
    document.querySelector('.result__text--tax .result__value')
    .innerText = `-${currencyFormat(tax)}`;
    document.querySelector('.result__text--profit .result__value')
    .innerText = currencyFormat(profit);

}

function numberFormat(value) {

    if(value == ''){
        value = '0';
    }

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

            section.removeAttribute('style');

        })
    }
    
    section.classList.toggle('section--collapsed')

}

function updatePrefix(el) {

    let value = el.value;
    let prefix = el.parentElement.querySelector('.field__prefix');
    prefix.innerText = `${value} %`;

}