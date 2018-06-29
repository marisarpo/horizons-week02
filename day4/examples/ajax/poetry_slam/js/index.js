// YOUR CODE HERE
// See poetry_slam/index.html for instructions

// https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt

$.ajax(
  {
    url: 'https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt',
    success: function(resp)
    {
      var toApp = `<pre> ${resp} </pre>`
      $('body').append(toApp)

      let count = resp.split(" ")

      $('#count').replaceWith(count.length);
    }



  }
)
