const rangeInputs = document.querySelectorAll('.field__input--range');
const textInputs = document.querySelectorAll('.field__input--text');
const helpIcons = document.querySelectorAll('.section__icon--help');

const helpSection = document.querySelector('.section--help');
const resultSection = document.querySelector('.section--result');
const resultHelp = document.querySelector('.section--help.section--help-result');

const product = document.querySelector('.field__input[name="product"]');
const fee = document.querySelector('.field__input[name="fee"]');
const shipping = document.querySelector('.field__input[name="shipping"]');
const tax = document.querySelector('.field__input[name="tax"]');
const margin = document.querySelector('.field__input[name="profit"]');

window.addEventListener('load',calc);

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

helpIcons.forEach(icon=>{

    icon.addEventListener('click',(e)=>{
        toggleDesc(e.target);
    })

})

textInputs.forEach(input=>{

    input.addEventListener('input',(e)=>{

        input.value = mask(e.target.value);
        calc();

    });
    input.addEventListener('focus',(e)=>{

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

    input.addEventListener('input',()=>{

        calc();
        updatePrefix(input);

    })

})

function calc() {

    let result = new Calc(product.value,fee.value,shipping.value,tax.value,margin.value)
    result.calcStart();
    result.price = document.querySelector('.result__text--price .result__value');
    result.costs = document.querySelector('.result__text--costs .result__value');
    result.income = document.querySelector('.result__text--income .result__value');
    result.prodCost = document.querySelector('.result__text--product .result__value');
    result.tax = document.querySelector('.result__text--tax .result__value');
    result.profit = document.querySelector('.result__text--profit .result__value');

}



