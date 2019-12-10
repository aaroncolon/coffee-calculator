import jQuery from 'jquery';

(function(){
  "use strict";

  var app = {
    brewMethod   : '',
    coffeeAmount : 0,
    waterAmount  : 0,

    init: function() {
      this.cacheDom();
      this.bindEvents();
    },

    cacheDom: function() {
      this.$el          = jQuery('.coffee-module');
      this.$brewSelect  = this.$el.find('#brew-method');
      this.$coffeeInput = this.$el.find('#coffee-amount');
      this.$waterInput  = this.$el.find('#water-amount');
      this.$submit      = this.$el.find('#submit');
    },

    bindEvents: function() {
      var _self = this;

      this.$brewSelect.on('change', this.setBrewMethod.bind(this));
      this.$coffeeInput.on('input', this.setCoffee.bind(this));
      this.$waterInput.on('input', this.setWater.bind(this));
      this.$submit.on('click', function() {
        _self.handleSubmit(_self.coffeeAmount, _self.waterAmount);
      });
    },

    render: function() {
      if (this.coffeeAmount > 0) {
        this.$waterInput.val(this.waterAmount);
      }

      if (this.waterAmount > 0) {
        this.$coffeeInput.val(this.coffeeAmount);
      }
    },

    setBrewMethod: function() {
      this.brewMethod = this.$brewSelect.val();
    },

    setCoffee: function() {
      this.coffeeAmount = this.$coffeeInput.val();
      this.resetWater();
    },

    setWater: function() {
      this.waterAmount = this.$waterInput.val();
      this.resetCoffee();
    },

    resetCoffee: function() {
      this.coffeeAmount = 0;
      this.$coffeeInput.val('');
    },

    resetWater: function() {
      this.waterAmount = 0;
      this.$waterInput.val('');
    },

    calculate: function(coffeeAmount, waterAmount) {
      if (coffeeAmount > 0) {
        this.waterAmount = coffeeAmount * 16;
      }

      if (waterAmount > 0) {
        this.coffeeAmount = waterAmount / 16;
      }
    },

    handleSubmit: function(coffeeAmount, waterAmount) {
      this.calculate(coffeeAmount, waterAmount);
      this.render();
    }

  };

  app.init();
})()
