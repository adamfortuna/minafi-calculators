var element = document.getElementById("inputs");
var tangle = new Tangle(element, {
  initialize() {
    this.discountRate = 0.15;
    this.taxRate = 0.22;

    this.lowStockPrice = 15.00;
    this.endStockPrice = 20.00;

    this.investment = 25000;
    this.returnDegree = 0;
  },
  update: function () {
    this.lowestStockPrice = (this.lowStockPrice > this.endStockPrice) ? this.endStockPrice : this.lowStockPrice;
    this.discountPrice = this.lowestStockPrice * (1-this.discountRate);

    this.shares = Math.floor(this.investment/this.discountPrice);
    this.investmentTotal = this.shares * this.discountPrice;

    this.valueInitial = this.shares * this.endStockPrice;
    this.beforeTaxProfit = this.valueInitial - this.investment;
    this.initialTaxes = this.beforeTaxProfit * this.taxRate;
    this.initialProfit = this.beforeTaxProfit - this.initialTaxes;
    this.initialReturn = this.initialProfit / this.investment;

    if(this.initialReturn >= 0.08) {
      this.returnDegree = 0;
    } else if(this.initialReturn >= 0.05) {
      this.returnDegree = 1;
    } else {
      this.returnDegree = 2;
    }
  }
});
