describe("attachAlerts(className)", function() {
  var red = $('#red');
  var blue = $('#blue');
  var nope = $('#nope');
  var spy = [spyOnEvent(red, 'click'), 
             spyOnEvent(blue, 'click'), 
             spyOnEvent(nope, 'click')];
  console.log(spy)
  it("should alert when you cut the red wire", function() {
    red.click();
    expect(spy[0]).toHaveBeenTriggered();
  });
  it("should alert when you cut the blue wire", function() {
    blue.click();
    expect(spy[1]).toHaveBeenTriggered();
  });
  it("should alert when you (try to) run", function() {
    nope.click();
    expect(spy[2]).toHaveBeenTriggered();
  });
});