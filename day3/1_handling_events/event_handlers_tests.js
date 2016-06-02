describe("attachAlerts(className)", function() {
  console.log(spyOnEvents)
  var spy = [spyOnEvent('#red', 'click'), spyOnEvent('#blue', 'click'), spyOnEvent('#nope', 'click')];
  it("should alert when you cut the red wire", function() {
    expect(spy[0]).toHaveBeenTriggered();
  });
  it("should alert when you cut the blue wire", function() {
    expect(spy[1]).toHaveBeenTriggered();
  });
  it("should alert when you (try to) run", function() {
    expect(spy[2]).toHaveBeenTriggered();
  });
});