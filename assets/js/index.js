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

Tangle.classes.FIAdjustableNumber = {
  initialize: function (element, options, tangle, variable) {
    this.element = element;
    this.tangle = tangle;
    this.variable = variable;

    this.min = (options.min !== undefined) ? parseFloat(options.min) : 0;
    this.max = (options.max !== undefined) ? parseFloat(options.max) : 1e100;
    this.step = (options.step !== undefined) ? parseFloat(options.step) : 1;

    this.initializeHover();
    this.initializeDrag();
    this.initializeSlider();
    this.initializeSliderFill();
  },

  // hover
  initializeHover: function () {
    this.isHovering = false;
    this.element.addEvent("mouseenter", (function () {
      this.isHovering = true;
      this.updateRolloverEffects();
    }).bind(this));
    this.element.addEvent("mouseleave", (function () {
      this.isHovering = false;
      this.updateRolloverEffects();
    }).bind(this));
  },

  updateRolloverEffects: function () {
    this.updateStyle();
    this.updateCursor();
    this.updateSlider();
  },

  isActive: function () {
    return this.isDragging || (this.isHovering && !this.isAnyAdjustableNumberDragging);
  },

  updateStyle: function () {
    if (this.isDragging) { this.element.addClass("FIAdjustableNumberDown"); }
    else { this.element.removeClass("FIAdjustableNumberDown"); }

    if (!this.isDragging && this.isActive()) { this.element.addClass("FIAdjustableNumberHover"); }
    else { this.element.removeClass("FIAdjustableNumberHover"); }
  },

  updateCursor: function () {
    var body = document.getElement("body");
    if (this.isActive()) { body.addClass("FICursorDragHorizontal"); }
    else { body.removeClass("FICursorDragHorizontal"); }
  },

  // Slider
  initializeSlider: function() {
    this.slider = (new Element("div", { "class": "FIAdjustableNumberSlider" })).inject(this.element, "top");
    this.slider.setStyle("display", "none");
  },
  initializeSliderFill: function() {
    this.sliderFill = (new Element("div", { "class": "FIAdjustableNumberSliderFill" })).inject(this.slider);
  },

  updateSlider: function() {
    var display = (this.isActive()) ? "block" : "none";
		this.slider.setStyle("display", display);

    var value = this.tangle.getValue(this.variable) - this.min;
    var diff = this.max - this.min;
    var percent = (value/diff);
    this.sliderFill.setStyle("width", (134 * percent).round());
	},


  // drag

  initializeDrag: function () {
    this.isDragging = false;
    new BVTouchable(this.element, this);
  },

  touchDidGoDown: function (touches) {
    this.valueAtMouseDown = this.tangle.getValue(this.variable);
    this.isDragging = true;
    this.isAnyAdjustableNumberDragging = true;
    this.updateRolloverEffects();
    this.updateStyle();
  },

  touchDidMove: function (touches) {
    var value = this.valueAtMouseDown + touches.translation.x / 5 * this.step;
    value = ((value / this.step).round() * this.step).limit(this.min, this.max);
    this.tangle.setValue(this.variable, value);
    this.updateSlider();
  },

  touchDidGoUp: function (touches) {
    this.isDragging = false;
    this.isAnyAdjustableNumberDragging = false;
    this.updateRolloverEffects();
    this.updateStyle();
    this.slider.setStyle("display", touches.wasTap ? "block" : "none");
  }
};

Tangle.classes.BlockSwitch = {
  update: function (element, value) {
    element.getChildren().each(function (child, index) {
      child.style.display = (index != value) ? "none" : "block";
    });
  }
};


Tangle.formats.currency = function(value) {
  return "$" + putThousandsSeparators(value);
};
Tangle.formats.integerWithSeparator = function(value) {
  return putThousandsSeparators(parseInt(value));
};
Tangle.formats.percentDecimal = function (value) {
  return "" + (100 * value).round(1) + "%";
};

Tangle.formats.percentInteger = function (value) {
  return "" + (100 * value).round(0) + "%";
};
