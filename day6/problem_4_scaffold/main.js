function layOutDay(events) {
	// clear the current container to allow for full rerender
	$('.cal').empty();

	// first make collision blocks
	events = toTimeBlocks(events);
	// divide blocks into non-colliding columns
	events = events.map(b => toColumns(b));
	// render html
	events.forEach(block => {
		$('.cal').append(`
			<div class="block" style="top:${block[0][0].start}">
				${block.map(column => (`
					<div class="column">
						${column.map(event => (`
							<span class="event" style="height:${event.end-event.start-4};top:${event.start-column[0].start}">
								Sample Text
							</span>
						`)).join('')}
					</div>
				`)).join('')}
			</div>
		`)
	})
}

//converts array of times to 2d array containing blocks of times that conflict
function toTimeBlocks(times) {
	let result = [];
	for (let i = 1; i <= times.length; i++) {
		let block = [times[i-1]];
		let trueEnd = times[i-1].end;
		while(i < times.length && times[i].start < trueEnd) {
			block.push(times[i]);
			i++;
			trueEnd = Math.max(trueEnd, times[i-1].end);
		}
		result.push(block);
	}
	return result;
}

// converts time blocks to 2d array of columns
function toColumns(block) {
	let result = [];
	for (let i = 0; i < block.length; i++) {
		let pushed = false;
		for (let j = 0; j < result.length; j++) {
			if (result[j][result[j].length - 1].end <= block[i].start) {
				result[j].push(block[i]);
				pushed = true;
				break;
			}
		}
		if (!pushed) {
			result.push([block[i]]);
		}
	}
	return result;
}

let times = [ {start: 0, end: 500}, {start: 0, end: 200}, {start: 300, end: 500}, {start: 600, end: 700} ];

times = times.sort(function(a,b){ a.start - b.start });

layOutDay(times);
