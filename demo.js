var putThousandsSeparators = function(value, sep) {
  if (sep == null) {
    sep = ',';
  }
  value = parseInt(value);
  // check if it needs formatting
  if (value.toString() === value.toLocaleString()) {
    // split decimals
    var parts = value.toString().split('.')
    // format whole numbers
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    // put them back together
    value = parts[1] ? parts.join('.') : parts[0];
  } else {
    value = value.toLocaleString();
  }
  return value;
};

Tangle.formats.currency = function(value) {
  return "$" + putThousandsSeparators(value);
};
Tangle.formats.percentDecimal = function (value) {
  return "" + (100 * value).round(1) + "%";
};

var element = document.getElementById("demo--wrapper");
var tangle = new Tangle(element, {
  initialize() {
    this.minSpending = 40000;
    this.maxSpending = 180000;
    this.spending = 60000;
  },
  update: function () {
    this.fioreNumber = (this.minSpending+this.maxSpending+(this.spending*4))/6;
  }
});
