const Benchmark = require('benchmark');

var suite = new Benchmark.Suite;



suite.add('[new Date().getTime()]', function() {
    new Date().getTime();
  }).add('[Date.now()]', function() {
    Date.now();
  }).add('[Date.parse(new Date())]', function () {
    Date.parse(new Date());
  }).on('cycle', function(event) {
    console.log('Cycle: ', String(event.target));
  }).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  }).run({'async': true });