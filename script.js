const rangeInputs = document.querySelectorAll('.field__input--range');
const textInputs = document.querySelectorAll('.field__input--text');
const helpIcons = document.querySelectorAll('.section__icon--help');

const resultSection = document.querySelector('.section--result');
const resultHelp = document.querySelector('.section--help.section--help-result');

const productInp = document.querySelector('.field__input[name="product"]');
const feeInp = document.querySelector('.field__input[name="fee"]');
const shippingInp = document.querySelector('.field__input[name="shipping"]');
const taxInp = document.querySelector('.field__input[name="tax"]');
const marginInp = document.querySelector('.field__input[name="profit"]');

window.addEventListener('load',calc);

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
