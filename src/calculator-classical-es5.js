import jQuery from 'jquery';

(function(){
  "use strict";

  const App = function() {
    this.brewMethods = {
      'french-press' : {
        'brewTime' : '5:00',
        'grind'    : 'Coarse',
        'name'     : 'French Press',
        'yield'    : 0.875
      },
      'pourover' : {
        'brewTime' : '3:15',
        'grind'    : 'Sand',
        'name'     : 'Pourover',
        'yield'    : 0.875
      }
    };
    this.RATIO         = 16;
    this.brewMethod    = null;
    this.coffeeAmount  = 0;
    this.waterAmount   = 0;
    this.yieldAmount   = 0;
    this.brewTime      = 0;
    this.errorMessages = new Map();
    this.errorMessages
      .set('brewMethod', 'Please select a brew method')
      .set('coffeeAmount', 'Enter coffee amount greater than zero');

    this.init = function() {
      this.cacheDom();
      this.bindEvents();
    };

    this.cacheDom = function() {
      this.$root        = jQuery('.coffee-module');
      this.$form        = this.$root.find('#form-coffee');
      this.$brewSelect  = this.$root.find('#brew-method');
      this.$coffeeInput = this.$root.find('#coffee-amount');
      this.$table       = this.$root.find('#results tbody');
    };

    this.bindEvents = function() {
      this.$form.on('submit', this.handleSubmit.bind(this));
    };

    this.render = function() {
      this.resetTable();

      var tdData = [
        this.coffeeAmount,
        this.waterAmount,
        this.yieldAmount,
        this.brewTime,
        this.brewMethods[this.brewMethod].grind
      ];
      var tr = this.createTr(tdData);

      this.$table.append(tr);
    };

    this.createTr = function(data) {
      var tr = document.createElement('tr');
      var tds = this.createTds(data);
      for (var i = 0; i < tds.length; i++) {
        tr.appendChild(tds[i]);
      }
      return tr;
    };

    this.createTds = function(data) {
      return data.map(function(el, i) {
        var td = document.createElement('td');
        var t  = document.createTextNode(el);
        td.appendChild(t)
        return td;
      });
    };

    this.resetTable = function() {
      this.$table.empty();
    };

    this.setBrewMethod = function(brewMethod) {
      this.brewMethod = brewMethod;
    };

    this.handleSubmit = function(e) {
      e.preventDefault();

      try {
        this.validateSubmit(this.$brewSelect.val(), this.$coffeeInput.val());
        this.setBrewMethod(this.$brewSelect.val());
        this.calculate(this.$coffeeInput.val());
        this.render();
      }
      catch(e) {
        console.log(e.name, e.message);
      }
    };

    this.validateSubmit = function(brewMethod, coffeeAmount) {
      if (!brewMethod) {
        throw new Error(this.errorMessages.get('brewMethod'));
      } else if (!coffeeAmount && !waterAmount) {
        throw new Error(this.errorMessages.get('coffeeWaterAmount'));
      } else if (coffeeAmount && coffeeAmount > 0 === false) {
        throw new Error (this.errorMessages.get('coffeeAmount'));
      }
    };

    this.calculate = function(coffeeAmount) {
      this.setCoffee(coffeeAmount);
      this.setWater(this.calcWater(coffeeAmount));
      this.setYield(this.calcYield(this.waterAmount, this.brewMethod));
      this.setBrewTime(this.calcBrewTime(this.brewMethod));
    };

    this.setCoffee = function(coffeeAmount) {
      this.coffeeAmount = coffeeAmount;
    };

    this.resetCoffee = function() {
      this.coffeeAmount = 0;
    };

    this.calcWater = function(coffeeAmount) {
      return coffeeAmount * this.RATIO;
    };

    this.setWater = function(waterAmount) {
      this.waterAmount = waterAmount;
    };

    this.resetWater = function() {
      this.waterAmount = 0;
    };

    this.calcYield = function(waterAmount, brewMethod) {
      return waterAmount * this.brewMethods[brewMethod].yield;
    };

    this.setYield = function(yieldAmount) {
      this.yieldAmount = yieldAmount;
    };

    this.calcBrewTime = function(brewMethod) {
      return this.brewMethods[brewMethod].brewTime;
    };

    this.setBrewTime = function(brewTime) {
      this.brewTime = brewTime;
    };

    this.resetBrewTime = function() {
      this.brewTime = 0;
    };
  };

  const app = new App();
  app.init();
})()
