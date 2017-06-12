var sentiment = require('sentiment');

var r1 = sentiment('Cats are stupid.');
console.log(r1);        // Score: -2, Comparative: -0.666

var r2 = sentiment('Cats are totally amazing!');
console.log(r2);        // Score: 4, Comparative: 1

var r3 = sentiment("This thing is the absolute worst. A family member bought it for my wife and I because they know we use amazon prime. The Alexa system is just plain bad. I tried voice training to improve it. Didn't help. It picks up random conversation, cant answer basic questions and is an overall disappointment. Why does it use Bing for web searches? Bing, really? I have since unplugged it. Its creepy that it records ALL the time. So happy I didn't pay for this. The technology is too far off from being useful.");
console.log(r3);
