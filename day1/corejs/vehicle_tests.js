describe("Constructor", function() {
  it("Constructor builds an instance when calling it with new", function() {
    var sentra = new Vehicle("sentra", 2015, "white", allSeasonTires);
    expect(sentra.constructor).toEqual(Vehicle);
  });
  it("Check the newly created object builds an object with the correct arrtibutes", function() {
    var sentra = new Vehicle("sentra", 2015, "white", allSeasonTires);
    expect(Object.keys(sentra)).toEqual(['model', 'year', 'color', 'tireType']);
  });
});

describe("Instance creation:", function() {
  it("Nothing should be added to the window object", function() {
    expect(window.year).toEqual(undefined);
    expect(window.model).toEqual(undefined);

  });
  it("Instances have the right attributes", function() {
    expect(jeep.model).toEqual("jeep");
    expect(jeep.color).toEqual("white");
    expect(jeep.year).toEqual(2010);
    expect(jeep.tireType).toEqual(allSeasonTires);
  });
});

describe("Adding functions", function() {
  it("The function changeColor is available to all Vehicles.", function() {
    expect(jeep.changeColor).not.toEqual(undefined);
    expect(teslaS.changeColor).not.toEqual(undefined);
    expect(Vehicle.prototype.changeColor).not.toEqual(undefined);
    expect(jeep.color).toEqual("yellow");
  });
  it("The function whichTires only on the correct object.", function() {
    expect(jeep.whichTires).not.toEqual(undefined);
    expect(teslaS.whichTires).toEqual(undefined);
    expect(Vehicle.prototype.whichTires).toEqual(undefined);
  });
});
