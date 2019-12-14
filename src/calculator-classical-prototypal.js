import jQuery from 'jquery';

// Classical Inheiritance
(function() {
  "use strict";

  var App = function() {
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
    this.RATIO        = 16;
    this.brewMethod   = null;
    this.coffeeAmount = 0;
    this.waterAmount  = 0;
    this.yieldAmount  = 0;
    this.brewTime     = 0;
  };

  App.prototype.init = function() {
    this.cacheDom();
    this.bindEvents();
  };

  App.prototype.cacheDom = function() {
    this.$root        = jQuery('.coffee-module');
    this.$form        = this.$root.find('#form-coffee');
    this.$brewSelect  = this.$root.find('#brew-method');
    this.$coffeeInput = this.$root.find('#coffee-amount');
    this.$table       = this.$root.find('#results tbody');
  };

  App.prototype.bindEvents = function() {
    this.$form.on('submit', this.handleSubmit.bind(this));
  };

  App.prototype.render = function() {
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

  App.prototype.createTr = function(data) {
    var tr = document.createElement('tr');
    var tds = this.createTds(data);
    for (var i = 0; i < tds.length; i++) {
      tr.appendChild(tds[i]);
    }
    return tr;
  };

  App.prototype.createTds = function(data) {
    return data.map(function(el, i) {
      var td = document.createElement('td');
      var t  = document.createTextNode(el);
      td.appendChild(t)
      return td;
    });
  };

  App.prototype.resetTable = function() {
    this.$table.empty();
  };

  App.prototype.setBrewMethod = function(brewMethod) {
    this.brewMethod = brewMethod;
  };

  App.prototype.handleSubmit = function(e) {
    e.preventDefault();

    this.setBrewMethod(this.$brewSelect.val());
    this.calculate(this.$coffeeInput.val());
    this.render();
  };

  App.prototype.calculate = function(coffeeAmount) {
    this.setCoffee(coffeeAmount);
    this.setWater(this.calcWater(coffeeAmount));
    this.setYield(this.calcYield(this.waterAmount, this.brewMethod));
    this.setBrewTime(this.calcBrewTime(this.brewMethod));
  };

  App.prototype.setCoffee = function(coffeeAmount) {
    this.coffeeAmount = coffeeAmount;
  };

  App.prototype.resetCoffee = function() {
    this.coffeeAmount = 0;
  };

  App.prototype.calcWater = function(coffeeAmount) {
    return coffeeAmount * this.RATIO;
  };

  App.prototype.setWater = function(waterAmount) {
    this.waterAmount = waterAmount;
  };

  App.prototype.resetWater = function() {
    this.waterAmount = 0;
  };

  App.prototype.calcYield = function(waterAmount, brewMethod) {
    return waterAmount * this.brewMethods[brewMethod].yield;
  };

  App.prototype.setYield = function(yieldAmount) {
    this.yieldAmount = yieldAmount;
  };

  App.prototype.calcBrewTime = function(brewMethod) {
    return this.brewMethods[brewMethod].brewTime;
  };

  App.prototype.setBrewTime = function(brewTime) {
    this.brewTime = brewTime;
  };

  App.prototype.resetBrewTime = function() {
    this.brewTime = 0;
  };

  var app = new App();
  app.init();
})()
