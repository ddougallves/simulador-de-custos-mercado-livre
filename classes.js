class Calc {
    
    _price = 0;
    _fee = 0;
    _tax = 0;
    _costs = 0;
    _margin = 0;
    _income = 0;
    _profit = 0;
    _prodCost = 0;

    constructor(prodInp,feeInp,shippingInp,taxInp,marginInp) {
        this.prodInp = this.numberFormat(prodInp);
        this.feeInp = this.numberFormat(feeInp);
        this.shippingInp = this.numberFormat(shippingInp);
        this.taxInp = this.numberFormat(taxInp);
        this.marginInp = this.numberFormat(marginInp);
    }

    calcStart() {

        this._price = this.price;
        this._fee = this.fee;
        this._tax = this.tax;
        this._costs = this.costs;
        this._income = this.income;
        this._prodCost = this.prodCost;
        this._profit = this.profit;
    }

    get price() {
        return ((this.prodInp*this.marginInp/100+this.prodInp+this.shippingInp)*100)/(100-(this.feeInp+this.taxInp));;
    }

    set price(el) {
        el.innerText = `${this.currencyFormat(this._price)}`;
    }

    get fee() {
        return (this._price*this.feeInp)/100;
    }

    get costs() {
        return this._fee+this.shippingInp;
    }

    set costs(el) {
        el.innerText = `-${this.currencyFormat(this._costs)}`;
    }

    get income() {
        return this._price - this._costs;
    }

    set income(el) {
        el.innerText = `${this.currencyFormat(this._income)}`;
    }

    get prodCost() {
        return this.prodInp;
    }

    set prodCost(el) {
        el.innerText = `-${this.currencyFormat(this._prodCost)}`;
    }

    get tax() {
        return (this._price*this.taxInp)/100;
    }

    set tax(el) {
        el.innerText = `-${this.currencyFormat(this._tax)}`;
    }

    get profit() {
        return this._income - this._tax - this._prodCost;
    }

    set profit(el) {
        el.innerText = `${this.currencyFormat(this._profit)}`;
    }

    numberFormat(value) {

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

    currencyFormat(number) {

        number = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(number);
        return number

    }
    

}