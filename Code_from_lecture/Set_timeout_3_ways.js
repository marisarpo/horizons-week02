// SET TIMEOUT MISCHIEF, 3 SOLUTIONS

////1
for (var i = 0; i < 3; i++) {
  var IIFE=(function() {
    var x=i;
    return function() {
      console.log(i);
    }
  }());
  setTimeout(
    IIFE();
    i * 1000,  // delay of 0 1, or 2 second
  );
}

////2
for (var i = 0; i < 3; i++) {
  var f=function() {
    var x=i;
	  setTimeout(
        function() {
          console.log(x);
        },
        i * 1000  // delay of 0 1, or 2 seconds
  	);
  }
  f();
}

////3
for (var i = 0; i < 3; i++) {
  (function() {
    var x=i;
	  setTimeout(
        function() {
          console.log(x);
        },
        i * 1000  // delay of 0 1, or 2 seconds
  	);
  })();
}
