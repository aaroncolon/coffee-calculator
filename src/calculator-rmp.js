import jQuery from 'jquery';

"use strict";

// Revealing Module Pattern
var app = (function() {
  var _brewMethods = {
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
      RATIO         = 16,
      _brewMethod   = null,
      _coffeeAmount = 0,
      _waterAmount  = 0,
      _yieldAmount  = 0,
      _brewTime     = 0,
      $root         = null,
      $brewSelect   = null,
      $coffeeInput  = null,
      $table        = null,
      $form         = null;

  function init() {
    cacheDom();
    bindEvents();
  };

  function cacheDom() {
    $root        = jQuery('.coffee-module');
    $form        = $root.find('#form-coffee');
    $brewSelect  = $root.find('#brew-method');
    $coffeeInput = $root.find('#coffee-amount');
    $table       = $root.find('#results tbody');
  };

  function bindEvents() {
    $form.on('submit', handleSubmit);
  };

  function render() {
    resetTable();

    var tdData = [
      _coffeeAmount,
      _waterAmount,
      _yieldAmount,
      _brewTime,
      _brewMethods[_brewMethod].grind
    ];
    var tr = createTr(tdData);

    $table.append(tr);
  };

  function createTr(data) {
    var tr = document.createElement('tr');
    var tds = createTds(data);
    for (var i = 0; i < tds.length; i++) {
      tr.appendChild(tds[i]);
    }
    return tr;
  };

  function createTds(data) {
    return data.map(function(el, i) {
      var td = document.createElement('td');
      var t  = document.createTextNode(el);
      td.appendChild(t)
      return td;
    });
  };

  function resetTable() {
    $table.empty();
  };

  function setBrewMethod(brewMethod) {
    _brewMethod = brewMethod;
  };

  function handleSubmit(e) {
    e.preventDefault();

    setBrewMethod($brewSelect.val());
    calculate($coffeeInput.val());
    render();
  };

  function calculate(coffeeAmount) {
    setCoffee(coffeeAmount);
    setWater(calcWater(coffeeAmount));
    setYield(calcYield(_waterAmount, _brewMethod));
    setBrewTime(calcBrewTime(_brewMethod));
  };

  function setCoffee(coffeeAmount) {
    _coffeeAmount = coffeeAmount;
  };

  function resetCoffee() {
    _coffeeAmount = 0;
  };

  function calcWater(coffeeAmount) {
    return coffeeAmount * RATIO;
  };

  function setWater(waterAmount) {
    _waterAmount = waterAmount;
  };

  function resetWater() {
    _waterAmount = 0;
  };

  function calcYield(waterAmount, brewMethod) {
    return waterAmount * _brewMethods[brewMethod].yield;
  };

  function setYield(yieldAmount) {
    _yieldAmount = yieldAmount;
  };

  function calcBrewTime(brewMethod) {
    return _brewMethods[brewMethod].brewTime;
  };

  function setBrewTime(brewTime) {
    _brewTime = brewTime;
  };

  function resetBrewTime() {
    _brewTime = 0;
  };

  return {
    init: init
  };

})()

app.init();
