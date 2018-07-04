var completed = 0;

for (var i = 0; i < 3; i++) {
  setTimeout(
    function() {
      console.log(i);
      completed++;
    },
    i * 1000  // delay of 0 1, or 2 seconds
  );
}

while (completed < 3) {
  console.log("Blocking");
}
