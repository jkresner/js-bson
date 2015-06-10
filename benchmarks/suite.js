var Benchmark = require('benchmark'),
  suite = new Benchmark.Suite,
  colors = require('colors'),
  f = require('util').format;

// Get all the benchmarks
var legacyBenchmarks = require('./legacy/benchmarks'),
  nativeBenchmarks = require('./native/benchmarks'),
  candidate1Benchmarks = require('./candidate1/benchmarks');

// Shared functions
var start = function(event) {
  console.log(f("\nStart Suite: %s", this.name).underline.green);
}

var cycle = function(event) {
  console.log(event.target.toString().bold);
}

// Benchmark suites
var legacySuite = new Benchmark.Suite('legacy js parser');
var nativeSuite = new Benchmark.Suite('legacy c++ parser');
var candidate1Suite = new Benchmark.Suite('candidate 1 js parser');

// Legacy parser
legacyBenchmarks.forEach(function(bench) {
  legacySuite.add(bench);
});

legacySuite.on('start', start);
legacySuite.on('cycle', cycle);

// C++ Legacy parser
nativeBenchmarks.forEach(function(bench) {
  nativeSuite.add(bench);
});

nativeSuite.on('start', start);
nativeSuite.on('cycle', cycle);

// Legacy parser
candidate1Benchmarks.forEach(function(bench) {
  candidate1Suite.add(bench);
});

candidate1Suite.on('start', start);
candidate1Suite.on('cycle', cycle);

// Chain the suites
legacySuite.on('complete', function() {
  nativeSuite.run({async: false});
});

nativeSuite.on('complete', function() {
  candidate1Suite.run({async: false});
});

// Start execution
legacySuite.run({async: false});


