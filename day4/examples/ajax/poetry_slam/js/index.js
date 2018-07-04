$.ajax({
           url: "https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt",
           type: 'GET',
           success: function(res) {
               var resArray = res.split(" ");
               $("#count").text(resArray.length);
           }
       });
