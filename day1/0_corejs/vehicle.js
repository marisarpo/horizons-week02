// Today we are going to do a quick recap on concepts you've already seen before.
// This will include prototype, using new, this and  many more.

// To start you have to build a "Vehicle" constructor that takes in 4 parameters:
// model, year, color, tyreType. The constructor should store the properties in
// an object whenever it is called with the new keyword.

// YOUR CODE HERE
var Vehicle = function(model, year, color, tyreType){
  this.model=model;
  this.year=year;
  this.color=color;
  this.tyreType=tyreType;
}

// Now, let's create a few vehicle objects using the Vehicle constructor. Use new
// and pass in any arguments for the instances. We have defined two types of tires
// for you to use when creating the vehicles.

var snowTires = {type: "snow"};
var allSeasonTires = {type: "all season"};

// Create a "teslaS" variable that contains a new vehicle called "teslaS" that has
// "snowTires" and a "red" color.
// YOUR CODE HERE
var teslaS = new Vehicle("TeslaS", 2016, "red", allSeasonTires);

// Create a "jeep" variable that contains a new vehicle called "jeep" that has "allSeasonTires" and a "white" color.
// YOUR CODE HERE
var jeep = new Vehicle("jeep", 2010, "yellow", allSeasonTires);

// Now that you have two instances of vehicles, you want to add a couple of methods
// to them. The first method is "changeColor". This one should take in a new color
// This method should be called in the following way:
// teslaS.changeColor("yellow")
// jeep.changeColor("blue")
// And it should change the object vehicles's color.
Vehicle.prototype.changeColor = function(newColor){
  this.color = newColor;
}

// The second method we want to add is "checkSnowTyres". This method should return
// true if the vehicle has snow tires on. And it should only be available to "jeep".
jeep.whichTyres = function(){
  return this.tires.type;
}
