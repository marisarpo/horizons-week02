"use strict";

describe("Render to DOM", function() {
  // TODO: Do we want selenium tests?

  describe("the board", function() {
    it("should exist in the DOM", function() {
      expect($('#boardAnchor').length).toEqual(1);
      expect($('#boardAnchor')[0].id).toEqual('boardAnchor');
      expect($('#boardAnchor')[0].children.length).toEqual(1);
      expect($('#boardAnchor')[0].children[0].id).toEqual('board');
    });

    it("should contain one list", function() {
      expect($('#boardAnchor')[0].children[0].children.length).toEqual(1);
      expect($('#boardAnchor')[0].children[0].children[0].className).toEqual('list-container');
      expect($('#boardAnchor')[0].children[0].children[0].children.length).toEqual(1);
      expect($('#boardAnchor')[0].children[0].children[0].children[0].className).toEqual('list');
      expect($('#boardAnchor')[0].children[0].children[0].children[0].id).toEqual(board.lists[0].getId());
    });
  });

  describe("the list", function() {
    var list;
    beforeAll(function() {
      var listContainer = $('#boardAnchor')[0].children[0].children[0];
      list = listContainer.children[0];
    });

    it("should contain a header and cards", function() {
      expect(list.children.length).toEqual(3);
      expect(list.children[0].className).toEqual("list-header");
      expect(list.children[1].className).toEqual("list-cards");
      expect(list.children[2].className).toEqual("list-footer");
      expect(list.children[1].children.length).toEqual(1);
      expect(list.children[1].children[0].className).toEqual("card");
      expect(list.children[1].children[0].id).toEqual(board.lists[0].cards[0].id);
    });
  });
});
