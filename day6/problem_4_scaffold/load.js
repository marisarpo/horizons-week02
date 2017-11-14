// this file is to use jquery to load the time labels

let merid = 'AM';
let time;
// loop from 9 back to 9
for (time = 9; !(time === 9 && merid === 'PM'); time ++) {
  // check for time rollover
  if (time === 13) { time = 1; merid = 'PM'; }
  // append on-hour label
  $('.times').append(`
    <span>
      <strong>${time}:00</strong> ${merid}
    </span>
  `);
  // append half-hour label
  $('.times').append(`<span>${time}:30</span>`);
}
// append final on-hour label
$('.times').append(`
  <span>
    <strong>${time}:00</strong> ${merid}
  </span>
`);
