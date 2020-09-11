(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.jsdk = factory());
}(this, function () { 'use strict';

  function add(a, b) {
    console.log('加法');
    return a + b;
  }

  function jian(a, b) {
    console.log('减法');
    return a - b;
  }

  var index = {
    add: add,
    jian: jian
  };

  return index;

}));
