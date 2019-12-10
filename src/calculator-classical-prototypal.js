import jQuery from 'jquery';

// Classical Inheiritance
(function() {
  "use strict";

  var App = function() {
    this.brewMethod   = '';
    this.coffeeAmount = 0;
    this.waterAmount  = 0;
  };

  App.prototype.init = function() {
    this.cacheDom();
    this.bindEvents();
  };

  App.prototype.cacheDom = function() {
    this.$el          = jQuery('.coffee-module');
    this.$brewSelect  = this.$el.find('#brew-method');
    this.$coffeeInput = this.$el.find('#coffee-amount');
    this.$waterInput  = this.$el.find('#water-amount');
    this.$submit      = this.$el.find('#submit');
  };

  App.prototype.bindEvents = function() {
    var _self = this;

    this.$brewSelect.on('change', this.setBrewMethod.bind(this));
    this.$coffeeInput.on('input', this.setCoffee.bind(this));
    this.$waterInput.on('input', this.setWater.bind(this));
    this.$submit.on('click', function() {
      _self.handleSubmit(_self.coffeeAmount, _self.waterAmount);
    });
  };

  App.prototype.render = function() {
    if (this.coffeeAmount > 0) {
      this.$waterInput.val(this.waterAmount);
    }

    if (this.waterAmount > 0) {
      this.$coffeeInput.val(this.coffeeAmount);
    }
  };

  App.prototype.setBrewMethod = function() {
    this.brewMethod = this.$brewSelect.val();
  };

  App.prototype.setCoffee = function() {
    this.coffeeAmount = this.$coffeeInput.val();
    this.resetWater();
  };

  App.prototype.setWater = function() {
    this.waterAmount = this.$waterInput.val();
    this.resetCoffee();
  };

  App.prototype.resetCoffee = function() {
    this.coffeeAmount = 0;
    this.$coffeeInput.val('');
  };

  App.prototype.resetWater = function() {
    this.waterAmount = 0;
    this.$waterInput.val('');
  };

  App.prototype.calculate = function(coffeeAmount, waterAmount) {
    if (coffeeAmount > 0) {
      this.waterAmount = coffeeAmount * 16;
    }

    if (waterAmount > 0) {
      this.coffeeAmount = waterAmount / 16;
    }
  };

  App.prototype.handleSubmit = function(coffeeAmount, waterAmount) {
    this.calculate(coffeeAmount, waterAmount);
    this.render();
  };

  var app = new App();
  app.init();
})()
