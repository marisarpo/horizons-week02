describe("Constructor", function() {
  it("Constructor builds an instance when calling it with new", function() {
    var sentra = new Vehicle("sentra", 2015, "white", allSeasonTires);
    expect(sentra.constructor).toEqual(Vehicle);
  });
  it("Check the newly created object builds an object with the correct arrtibutes", function() {
    var sentra = new Vehicle("sentra", 2015, "white", allSeasonTires);
    expect(Object.keys(sentra)).toEqual(['model', 'year', 'color', 'tyreType']);
  });
});

describe("Instance creation", function() {
  it("Nothing shoul be added to the window object", function() {
    expect(builtins.trim('  Horizons  ')).toEqual('Horizons');
  });
  it("Instances have the right attributes", function() {
    expect(builtins.trim('Hello World!    ')).toEqual('Hello World!');
  });
});

describe("Instance creation", function() {
  it("Nothing should be added to the window object", function() {
    expect(builtins.trim('  Horizons  ')).toEqual('Horizons');
  });
  it("Instances have the right attributes", function() {
    expect(builtins.trim('Hello World!    ')).toEqual('Hello World!');
  });
});

describe("Adding functions", function() {
  it("The function changeColor is available to all Vehicles.", function() {
    expect(builtins.trim('  Horizons  ')).toEqual('Horizons');
  });
  it("The function whichTyres is only on the correct object.", function() {
    expect(builtins.trim('Hello World!    ')).toEqual('Hello World!');
  });
});
