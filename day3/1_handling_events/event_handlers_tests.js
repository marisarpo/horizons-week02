describe("attachAlerts(className)", function() {
  var red = $('#red');
  var blue = $('#blue');
  var nope = $('#nope');
  var spy = [spyOnEvent(red, 'click'), 
             spyOnEvent(blue, 'click'), 
             spyOnEvent(nope, 'click')];
  //spyOn(window, 'alert');
  it("should alert when you cut the red wire", function() {
    red.click();
    expect(spy[0]).toHaveBeenTriggered();
    expect(window.alert).toHaveBeenCalledWith('Bad choice!');
  });
  it("should alert when you cut the blue wire", function() {
    blue.click();
    expect(spy[1]).toHaveBeenTriggered();
    expect(window.alert).toHaveBeenCalledWith('Bad choice!');
  });
  it("should alert when you (try to) run", function() {
    nope.click();
    expect(spy[2]).toHaveBeenTriggered();
    expect(window.alert).toHaveBeenCalledWith('Bad choice!');
  });
});