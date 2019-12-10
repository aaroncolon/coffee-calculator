import jQuery from 'jquery';

"use strict";

// Revealing Module Pattern
var app = (function() {
  var _brewMethod   = '',
      _coffeeAmount = 0,
      _waterAmount  = 0,
      $el           = null,
      $brewSelect   = null,
      $coffeeInput  = null,
      $waterInput   = null,
      $submit       = null;

  function init() {
    cacheDom();
    bindEvents();
  };

  function cacheDom() {
    $el          = jQuery('.coffee-module');
    $brewSelect  = $el.find('#brew-method');
    $coffeeInput = $el.find('#coffee-amount');
    $waterInput  = $el.find('#water-amount');
    $submit      = $el.find('#submit');
  };

  function bindEvents() {
    $brewSelect.on('change', setBrewMethod);
    $coffeeInput.on('input', setCoffee);
    $waterInput.on('input', setWater);
    $submit.on('click', function() {
      handleSubmit(_coffeeAmount, _waterAmount);
    });
  };

  function render() {
    if (_coffeeAmount > 0) {
      $waterInput.val(_waterAmount);
    }

    if (_waterAmount > 0) {
      $coffeeInput.val(_coffeeAmount);
    }
  };

  function setBrewMethod() {
    _brewMethod = $brewSelect.val();
  };

  function setCoffee() {
    _coffeeAmount = $coffeeInput.val();
    resetWater();
  };

  function setWater() {
    _waterAmount = $waterInput.val();
    resetCoffee();
  };

  function resetCoffee() {
    _coffeeAmount = 0;
    $coffeeInput.val('');
  };

  function resetWater() {
    _waterAmount = 0;
    $waterInput.val('');
  };

  function calculate(coffeeAmount, waterAmount) {
    if (coffeeAmount > 0) {
      _waterAmount = coffeeAmount * 16;
    }

    if (waterAmount > 0) {
      _coffeeAmount = waterAmount / 16;
    }
  };

  function handleSubmit(coffeeAmount, waterAmount) {
    calculate(coffeeAmount, waterAmount);
    render();
  };

  return {
    init: init
  };

})()

app.init();
