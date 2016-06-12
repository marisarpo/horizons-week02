layOutDay([ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ])

function layOutDay() {
	// var argArray = _.sortBy(arguments[0],function(elt) {return elt.end})
	var argArray = arguments[0]
	var eventList = makeEventList(argArray)
	var collGroups = collGroups(eventList)
	var columns = getColumns(eventList)
	console.log(eventList)
}
function makeEventList(argArray) {
	console.log(argArray)
	var collisions = []
	_.forEach(argArray, function(ev1, index) {

		collisions[index] = collisions[index] || []
		_.forEach(Object.keys(collisions), function(i2) {
			var ev2 = argArray[i2]
			if (collision(ev1,ev2)) {
				collisions[index].push(i2)
				collisions[i2].push(index)
			}
		})
	})
	return collisions
}
function collision(ev1,ev2) {
	if ((ev1.start<ev2.end && ev1.start>ev2.start) ||
		(ev1.end<ev2.end && ev1.end>ev2.start)) {
		console.log('collision detected!')
		return true
	}
	return false
}
function collGroups(list,checked) {
	var checked = checked || []
	if (list.length===0) {return list}
	if (list[0].length===0) {
		checked.push(list[0])
		return [list[0]].concat([list.slice(1)])
	}
	return
}
function interiorGroup(list,nums) { // assume nums already in, returns array

}




function getColumns(list) {
	var checked = []
	var rVal = []
	_.forEach(list, function(elt) {
		if (elt.length===0) {
			rVal.push(elt)
		} else {

		}
	})
}