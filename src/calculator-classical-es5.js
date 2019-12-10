import jQuery from 'jquery';

(function(){
  "use strict";

  const App = function() {
    this.brewMethod   = '';
    this.coffeeAmount = 0;
    this.waterAmount  = 0;
    this.errorMessages = new Map();
    this.errorMessages.set('brewMethod', 'Please select a brew method')
                      .set('coffeeWaterAmount', 'Enter a coffee or a water amount')
                      .set('coffeeAmount', 'Enter coffee amount greater than zero')
                      .set('waterAmount', 'Enter water amount greater than zero');

    this.init = function() {
      this.cacheDom();
      this.bindEvents();
    };

    this.cacheDom = function() {
      this.$el          = jQuery('.coffee-module');
      this.$brewSelect  = this.$el.find('#brew-method');
      this.$coffeeInput = this.$el.find('#coffee-amount');
      this.$waterInput  = this.$el.find('#water-amount');
      this.$submit      = this.$el.find('#submit');
    };

    this.bindEvents = function() {
      this.$brewSelect.on('change', this.setBrewMethod.bind(this));
      this.$coffeeInput.on('input', this.setCoffee.bind(this));
      this.$waterInput.on('input', this.setWater.bind(this));
      this.$submit.on('click', () => {
        this.handleSubmit(this.brewMethod, this.coffeeAmount, this.waterAmount);
      });
    };

    this.render = function() {
      this.$waterInput.val(this.waterAmount);
      this.$coffeeInput.val(this.coffeeAmount);
    };

    this.setBrewMethod = function() {
      this.brewMethod = this.$brewSelect.val();
    };

    this.setCoffee = function() {
      this.coffeeAmount = this.$coffeeInput.val();
      this.resetWater();
    };

    this.setWater = function() {
      this.waterAmount = this.$waterInput.val();
      this.resetCoffee();
    };

    this.resetCoffee = function() {
      this.coffeeAmount = 0;
      this.$coffeeInput.val('');
    };

    this.resetWater = function() {
      this.waterAmount = 0;
      this.$waterInput.val('');
    };

    this.calculate = function(brewMethod, coffeeAmount, waterAmount) {
      if (coffeeAmount) {
        this.waterAmount = coffeeAmount * 16;
      } else if (waterAmount) {
        this.coffeeAmount = waterAmount / 16;
      }
    };

    this.handleSubmit = function(brewMethod, coffeeAmount, waterAmount) {
      try {
        this.validateSubmit(brewMethod, coffeeAmount, waterAmount);
        this.calculate(brewMethod, coffeeAmount, waterAmount);
        this.render();
      } catch (e) {
        console.log(e.name, e.message);
      }
    };

    this.validateSubmit = function(brewMethod, coffeeAmount, waterAmount) {
      if (!brewMethod) {
        throw new Error(this.errorMessages.get('brewMethod'));
      } else if (!coffeeAmount && !waterAmount) {
        throw new Error(this.errorMessages.get('coffeeWaterAmount'));
      } else if (coffeeAmount && coffeeAmount > 0 === false) {
        throw new Error (this.errorMessages.get('coffeeAmount'));
      } else if (waterAmount && waterAmount > 0 === false) {
        throw new Error (this.errorMessages.get('waterAmount'));
      }
    };
  };

  const app = new App();
  app.init();
})()
