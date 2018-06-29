var times = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];

for (var i = 0; i < times.length; i++) {
	times[i]['key'] = i;
}

times = times.sort(function(a,b){ a.start - b.start });

var chain = [];

for (var i = 0; i < times.length; i++) {
	var obj1 = times[i];
	var found = false;
	chain.forEach(function(item) {
		item.forEach(function(elem) {
			if (elem !== null && elem.start === obj1.start && elem.end === obj1.end) {
				found = true;
			}
		});
	});
	if (!found) {
		chain.push([obj1]);
	} 
	for (var a = i+1; a < times.length; a++) {
		var obj2 = times[a];

		if (obj1.start < obj2.end && obj1.end > obj2.start) {
			var pos = getPositions(chain, obj1);
			var tArr = chain[pos[0]];

			if (obj2.key === 3) {
				console.log("4");
				console.log(pos);
				console.log(obj1);
				console.log(chain);
				debugger;
			}

			if (pos[1] > 1 && obj2.start > tArr[pos[1]-2].end) {
				chain.push([obj2, null]);
			}  else if (pos[1] > 0 && obj2.start > tArr[0].end) {
				chain.push([obj2, null]);
			} else if (!isInArray(tArr, obj2)) {
				chain[pos[0]].push(obj2);
			}
		}
	}
}

function getPositions(arr, obj) {
	var returnArr = null;
	arr.forEach(function(item, index) {
				for (var x = item.length-1; x >= 0; x--) {
					var elem = item[x];
					if (elem !== null && elem.key === obj.key) {
						returnArr = [index, x];
					}
				}
			});
	return returnArr;
}

function isInArray(arr, obj) {
	var wasFound = false;
	arr.forEach(function(item) {
		if (item !== null && item.key === obj.key) {
			wasFound = true;
		}
	});
	return wasFound;
}

function createTime(timeNum) {
	var hoursAfter9 = 9+Math.floor(timeNum/60);
	var minutes = timeNum % 60;
	hoursAfter9 = hoursAfter9 % 12;
	if (hoursAfter9 === 0) {
		hoursAfter9 = 12;
	}
	var time = `${hoursAfter9}:${minutes}`;
	if (minutes === 0) {
		time += "0";
	}

	if (time.substring(time.length-2) === "00") {
		return `<p class="time-text"><span class="bold-big-text">${time}</span>&nbsp;AM</p>`;
	} else {
		return `<p class="time-text">${time}</p>`;
	}
}

function generateCalId(event) {
	return "calid-" + String(event.start) + "-" + String(event.end)+ "-" + String(event.key);
}

function appendCalDiv(event) {
	var eventId = generateCalId(event);
	var calDiv = `<div class="calendar-item" id="${eventId}">
				
				<p class="blue-title">
					Example Title
				</p>

				<p class="gray-text">
					Example Location
				</p>

			</div>`;

	$('#calendar').append(calDiv);
	$('#'+eventId).height(event.end-event.start-10);
	$('#'+eventId).css('top', event.start);

	return calDiv;
}

$(document).ready(function() {
	for (var i = 0; i < 721; i += 30) {
		$('#time-container').append(createTime(i));
	}

	layOutDay(times);
});

function eventItem(event) {
	return $('#' + generateCalId(event));
}

function layOutDay(events) {
	$('#calendar').empty();

	events.forEach(function(item) {
		appendCalDiv(item);
	});

	debugger;

	chain.forEach(function(item) {

		var sectionWidth = $('#calendar').width() / item.length;
		item.forEach(function(obj, index) {

			if (obj !== null) {
				eventItem(obj).css('left', 
					index*sectionWidth+(index > 0 ? 11 : 5)
				);
				eventItem(obj).width(sectionWidth);
			}

		});

	});
}
