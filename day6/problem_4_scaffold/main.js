var times = [{
  start: 30,
  end: 150
}, {
  start: 540,
  end: 600
}, {
  start: 560,
  end: 620
}, {
  start: 610,
  end: 670
}];
times = times.sort(function (a, b) {
  a.start - b.start
});

console.log(times)

// first make collision buckets
var buckets = {}

var bucketCount = 0;
var lastEnd = 0;
for (var i = 0; i < times.length; i++) {
  // debugger;
  console.log("time start", times[i].start);
  if (times[i].start < lastEnd) {
    console.log("im in");
    console.log("first colosion", times[i], "with", times[i - 1]);
    times[i].collision = 1;
    times[i - 1].collision = 1;
  }
  lastEnd = times[i].end;
  console.log("time end", lastEnd);
}

console.log(bucketCount);

console.log(buckets);
window.layOutDay = function () {
  console.log(times);
}
window.layOutDay();
