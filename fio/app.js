var element = document.getElementById("demo--wrapper");
var tangle = new Tangle(element, {
  initialize() {
    this.minSpending = 40000;
    this.maxSpending = 185000;
    this.spending = 60000;
  },
  update: function () {
    this.fioreNumber = (this.minSpending+this.maxSpending+(this.spending*4))/6;
  }
});
