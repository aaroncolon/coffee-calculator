import jQuery from 'jquery';

(function(){
  "use strict";

  var app = {
    brewMethods : {
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
    },
    RATIO        : 16,
    brewMethod   : null,
    coffeeAmount : 0,
    waterAmount  : 0,
    yieldAmount  : 0,
    brewTime     : 0,

    init : function() {
      this.cacheDom();
      this.bindEvents();
    },

    cacheDom : function() {
      this.$root        = jQuery('.coffee-module');
      this.$form        = this.$root.find('#form-coffee');
      this.$brewSelect  = this.$root.find('#brew-method');
      this.$coffeeInput = this.$root.find('#coffee-amount');
      this.$table       = this.$root.find('#results tbody');
    },

    bindEvents : function() {
      this.$form.on('submit', this.handleSubmit.bind(this));
    },

    render : function() {
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
    },

    createTr : function(data) {
      var tr = document.createElement('tr');
      var tds = this.createTds(data);
      for (var i = 0; i < tds.length; i++) {
        tr.appendChild(tds[i]);
      }
      return tr;
    },

    createTds : function(data) {
      return data.map(function(el, i) {
        var td = document.createElement('td');
        var t  = document.createTextNode(el);
        td.appendChild(t)
        return td;
      });
    },

    resetTable : function() {
      this.$table.empty();
    },

    setBrewMethod : function(brewMethod) {
      this.brewMethod = brewMethod;
    },

    handleSubmit : function(e) {
      e.preventDefault();

      this.setBrewMethod(this.$brewSelect.val());
      this.calculate(this.$coffeeInput.val());
      this.render();
    },

    calculate : function(coffeeAmount) {
      this.setCoffee(coffeeAmount);
      this.setWater(this.calcWater(coffeeAmount));
      this.setYield(this.calcYield(this.waterAmount, this.brewMethod));
      this.setBrewTime(this.calcBrewTime(this.brewMethod));
    },

    setCoffee : function(coffeeAmount) {
      this.coffeeAmount = coffeeAmount;
    },

    resetCoffee : function() {
      this.coffeeAmount = 0;
    },

    calcWater : function(coffeeAmount) {
      return coffeeAmount * this.RATIO;
    },

    setWater : function(waterAmount) {
      this.waterAmount = waterAmount;
    },

    resetWater : function() {
      this.waterAmount = 0;
    },

    calcYield : function(waterAmount, brewMethod) {
      return waterAmount * this.brewMethods[brewMethod].yield;
    },

    setYield : function(yieldAmount) {
      this.yieldAmount = yieldAmount;
    },

    calcBrewTime : function(brewMethod) {
      return this.brewMethods[brewMethod].brewTime;
    },

    setBrewTime : function(brewTime) {
      this.brewTime = brewTime;
    },

    resetBrewTime : function() {
      this.brewTime = 0;
    }
  };

  app.init();
})()
