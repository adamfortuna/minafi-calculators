var element = document.getElementById("inputs");
var tangle = new Tangle(element, {
  initialize() {
    this.bonusAmount = 10000;
    this.bonusTaxRate = 0.25;
    this.taxRate = 0.22;

    this.stateTaxRate = 0.04;
    this.medicareTaxRate = 0.062;
    this.ssTaxRate = 0.0145;

    this.higherTaxesNow = this.areTaxesHigherLater();

    this.laterTaxes = this.bonusAmount * (this.taxRate-this.bonusTaxRate);
  },
  update: function () {
    this.bonusTaxAmount = this.bonusAmount * this.bonusTaxRate;
    this.stateTaxAmount = this.bonusAmount * this.stateTaxRate;
    this.medicareTaxAmount = this.bonusAmount * this.medicareTaxRate;
    this.ssTaxAmount = this.bonusAmount * this.ssTaxRate;


    this.taxAmount = this.bonusTaxAmount + this.stateTaxAmount + this.medicareTaxAmount + this.ssTaxAmount;


    this.afterTaxBonusAmount = this.bonusAmount - this.taxAmount;

    this.taxPercent = this.taxAmount / this.afterTaxBonusAmount;

    this.higherTaxesNow = this.areTaxesHigherLater();
    this.laterTaxes = this.bonusAmount * (this.taxRate-this.bonusTaxRate);
  },
  areTaxesHigherLater: function() {
    return (this.bonusTaxRate > this.taxRate) ? 0 : 1;
  }
});
