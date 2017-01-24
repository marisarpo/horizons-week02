// Today we are going to do a quick recap on concepts you've already seen before.
// This will include prototype, using new, this and  many more.

// To start you have to build a "Vehicle" constructor that takes in 4 parameters:
// model, year, color, tireType. The constructor should store the properties in
// an object whenever it is called with the new keyword.

var Vehicle = function(model,year,color,tireType){
  this.model = model;
  this.year = year;
  this.color= color;
  this.tireType= tireType;
}

// Now, let's create a few vehicle objects using the Vehicle constructor. Use new
// and pass in any arguments for the instances. We have defined two types of tires
// for you to use when creating the vehicles.

var snowTires = {type: "snow"};
var allSeasonTires = {type: "all season"};

// Create a "teslaS" variable that contains a new vehicle called "teslaS" that has
// "snowTires" and a "red" color.

var teslaS = new Vehicle("teslaS",2016,"red",snowTires)

// Create a "jeep" variable that contains a new vehicle called "jeep" that has "allSeasonTires" and a "white" color.

var jeep = new Vehicle("jeep",2010,"yellow",allSeasonTires)

// Now that you have two instances of vehicles, you want to add a couple of methods
// to them. The first method is "changeColor", which receives a "color" argument.
// Make this object available for all cars.

// This method should be called in the following way:
// teslaS.changeColor("yellow")
// jeep.changeColor("blue")
// And it should change the object vehicles's color.

Vehicle.prototype.changeColor = function(newColor){
  this.color = newColor;
}

// The second method we want to add is "whichTires". This method should return
// the type of tires the vehicle has.
// It should only be available to "jeep".

jeep.whichTires =  function(){
  return this.tireType;
}
