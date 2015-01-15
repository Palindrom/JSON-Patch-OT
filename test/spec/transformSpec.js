var obj;

describe("JSONPatchOT when `.transform`s", function(){

  describe("given JSON Patch sequence, and", function(){
    var sequence = ([
      {op: 'replace', path: '/some/where/a', value: 'a'}
    ]);
    var against = {op: 'replace', path: '/some/where/b', value: 'b'};
    it("single operation object",function(){
      expect(JSONPatchOT.transform((sequence), against)).toEqual(sequence);
    });
    it("JSON Patch sequence",function(){
      expect(JSONPatchOT.transform((sequence), [against,against])).toEqual(sequence);
    });
    it("array of JSON Patch sequences",function(){
      expect(JSONPatchOT.transform((sequence), [[against,against],[against,against]])).toEqual(sequence);
    });
  });

describe("against `replace` operation, ", function () {
  var noop = function(){};
  var againstReplace = {op: 'replace', path: '/some/where', value: 5};

  describe("another operation, with separated `path` (and `from` if applicable)", function () {
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
      {op: 'add', path: '/separated/path/b', value: 'b'},
      {op: 'replace', path: '/separated/path/c', value: 'c'},
      {op: 'remove', path: '/separated/path/d'},
      {op: 'move', path: '/separated/path/e', from: '/separated/path/f'},
      {op: 'copy', path: '/separated/path/g', from: '/separated/path/h'}
    ]);
    it("nothing should be changed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstReplace])).toEqual((sequenceJSON));
    });
  });

  // ET
  describe("an `test`, `add`, `replace`, or `remove` operation with `path` that was descendant of replaced object", function () {
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
        {op: 'test', path: '/some/where/a', value: 'a'},
        {op: 'test', path: '/some/where/deeper/a', value: 'a'},
        {op: 'add', path: '/some/where/b', value: 'b'},
        {op: 'add', path: '/some/where/deeper/b', value: 'b'},
        {op: 'replace', path: '/some/where/c', value: 'c'},
        {op: 'replace', path: '/some/where/deeper/c', value: 'c'},
        {op: 'remove', path: '/some/where/d'},
        {op: 'remove', path: '/some/where/deeper/d'},
      {op: 'move', path: '/separated/path/e', from: '/separated/path/f'},
      {op: 'copy', path: '/separated/path/g', from: '/separated/path/h'}
    ]);
    it("operation object should be removed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstReplace]))
        .toEqual([
          {op: 'test', path: '/separated/path/a', value: 'a'},
          {op: 'move', path: '/separated/path/e', from: '/separated/path/f'},
          {op: 'copy', path: '/separated/path/g', from: '/separated/path/h'}
        ]);
    });
  });

  describe("an `test`, `add`, `replace`, or `remove` operation with `path` that equal to replaced object", function () {
    var sequenceJSON = ([
      {op: 'add', path: '/some/where', value: 'a'},
      {op: 'test', path: '/some/where', value: 'a'},
      {op: 'replace', path: '/some/where', value: 'b'},
      {op: 'remove', path: '/some/where'}
    ]);
    it("nothing should be changed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstReplace]))
        .toEqual([
          {op: 'add', path: '/some/where', value: 'a'},
          {op: 'test', path: '/some/where', value: 'a'},
          {op: 'replace', path: '/some/where', value: 'b'},
          {op: 'remove', path: '/some/where'}
        ]);
    });
  });

  describe("an `move`, or `copy` operation with `from` that was equal, or descendant of replaced object", function () {
    console.warn("may lead to trouble");
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
        {op: 'copy', path: '/separated/path/g', from: '/some/where'},
        {op: 'copy', path: '/separated/path/g', from: '/some/where/deeper'},
        {op: 'move', path: '/separated/path/e', from: '/some/where'},
        {op: 'move', path: '/separated/path/e', from: '/some/where/deeper'}
    ]);
    it("operation object should be removed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstReplace]))
        .toEqual([
          {op: 'test', path: '/separated/path/a', value: 'a'}
        ]);
    });
  });

  describe("an `move`, or `copy` operation with `path` that was equal of replaced object", function () {
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
      {op: 'copy', path: '/some/where', from: '/separated/path/b'},
      {op: 'move', path: '/some/where', from: '/separated/path/c'},
    ]);
    it("nothing should be changed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstReplace]))
        .toEqual([
          {op: 'test', path: '/separated/path/a', value: 'a'},
          {op: 'copy', path: '/some/where', from: '/separated/path/b'},
          {op: 'move', path: '/some/where', from: '/separated/path/c'},
        ]);
    });
  });

  describe("an `move`, or `copy` operation with `path` that was descendant of replaced object", function () {
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
      {op: 'copy', path: '/some/where/deeper', from: '/separated/path/b'},
      {op: 'move', path: '/some/where/deeper', from: '/separated/path/c'}
    ]);
    it("operation object should be removed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstReplace]))
        .toEqual([
          {op: 'test', path: '/separated/path/a', value: 'a'}
        ]);
    });
  });

});

// Remove

describe("against `remove` operation, ", function () {
  var againstRemove = {op: 'remove', path: '/some/where'};

  describe("another operation, with separated `path` (and `from` if applicable)", function () {
    var sequenceJSON = ([
      {op: 'test', path: '/some/path/a', value: 'a'},
      {op: 'add', path: '/some/path/b', value: 'b'},
      {op: 'replace', path: '/some/path/c', value: 'c'},
      {op: 'remove', path: '/separated/path/d'},
      {op: 'move', path: '/separated/path/e', from: '/separated/path/f'},
      {op: 'copy', path: '/separated/path/g', from: '/separated/path/h'}
    ]);
    it("nothing should be changed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstRemove])).toEqual((sequenceJSON));
    });
  });

  // ET
  describe("an `test`, `add`, `replace`, or `remove` operation with `path` that was descendant of removed object", function () {
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
        {op: 'test', path: '/some/where/a', value: 'a'},
        {op: 'test', path: '/some/where/deeper/a', value: 'a'},
        {op: 'add', path: '/some/where/b', value: 'b'},
        {op: 'add', path: '/some/where/deeper/b', value: 'b'},
        {op: 'replace', path: '/some/where/c', value: 'c'},
        {op: 'replace', path: '/some/where/deeper/c', value: 'c'},
        {op: 'remove', path: '/some/where/d'},
        {op: 'remove', path: '/some/where/deeper/d'},
      {op: 'move', path: '/separated/path/e', from: '/separated/path/f'},
      {op: 'copy', path: '/separated/path/g', from: '/separated/path/h'}
    ]);
    it("operation object should be removed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstRemove]))
        .toEqual([
          {op: 'test', path: '/separated/path/a', value: 'a'},
          {op: 'move', path: '/separated/path/e', from: '/separated/path/f'},
          {op: 'copy', path: '/separated/path/g', from: '/separated/path/h'}
        ]);
    });
  });

  describe("a `test`, or `add` operation with `path` that equal to removed object", function () {
    var sequenceJSON = ([
      {op: 'add', path: '/some/where', value: 'a'},
      {op: 'test', path: '/some/where', value: 'a'}
    ]);
    it("nothing should be changed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstRemove]))
        .toEqual([
          {op: 'add', path: '/some/where', value: 'a'},
          {op: 'test', path: '/some/where', value: 'a'},
        ]);
    });
  });

  describe("a `replace`, or `remove` operation with `path` that equal to removed object", function () {
    var sequenceJSON = ([
      {op: 'add', path: '/smth/else', value: 'a'},
        {op: 'replace', path: '/some/where', value: 'b'},
        {op: 'remove', path: '/some/where'}
    ]);
    it("operation object should be removed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstRemove]))
        .toEqual([
          {op: 'add', path: '/smth/else', value: 'a'},
        ]);
    });
  });

  describe("an `move`, or `copy` operation with `from` that was equal, or descendant of replaced object", function () {
    console.warn("may lead to trouble");
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
        {op: 'copy', path: '/separated/path/g', from: '/some/where'},
        {op: 'copy', path: '/separated/path/g', from: '/some/where/deeper'},
        {op: 'move', path: '/separated/path/e', from: '/some/where'},
        {op: 'move', path: '/separated/path/e', from: '/some/where/deeper'}
    ]);
    it("operation object should be removed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstRemove]))
        .toEqual([
          {op: 'test', path: '/separated/path/a', value: 'a'}
        ]);
    });
  });

  describe("an `move`, or `copy` operation with `path` that was equal, or descendant of replaced object", function () {
    var sequenceJSON = ([
      {op: 'test', path: '/separated/path/a', value: 'a'},
        {op: 'copy', path: '/some/where', from: '/separated/path/b'},
        {op: 'copy', path: '/some/where/deeper', from: '/separated/path/b'},
        {op: 'move', path: '/some/where', from: '/separated/path/c'},
        {op: 'move', path: '/some/where/deeper', from: '/separated/path/c'}
    ]);
    it("operation object should be removed",function(){
      expect(JSONPatchOT.transform((sequenceJSON), [againstRemove]))
        .toEqual([
          {op: 'test', path: '/separated/path/a', value: 'a'}
        ]);
    });
  });
  //arrays
  describe("of array item,", function(){
    console.info("All numeric paths are handled as array indexes");
    var againstRemove = {op: 'remove', path: '/some/where/1'};
    describe("another operation, with `path` or `from` equal or descendant to item above removed one", function () {
      var sequenceJSON = ([
        {op: 'test', path: '/some/where/0', value: 'a'},
          {op: 'test', path: '/some/where/2', value: {smth:'a'}},
          {op: 'test', path: '/some/where/2/smth', value: 'a'},
        {op: 'add', path: '/some/where/0', value: 'b'},
          {op: 'add', path: '/some/where/2', value: {}},
          {op: 'add', path: '/some/where/2/smth', value: 'b'},
        {op: 'replace', path: '/some/where/0', value: 'c'},
          {op: 'replace', path: '/some/where/2/smth', value: 'c'},
          {op: 'replace', path: '/some/where/2', value: 'c'},
        {op: 'remove', path: '/some/where/0'},
          {op: 'remove', path: '/some/where/2/smth'},
          {op: 'remove', path: '/some/where/2/'},
        {op: 'move', path: '/some/where/0', from: '/other/path/a'},
          {op: 'move', path: '/some/where/2', from: '/other/path/b'},
          {op: 'move', path: '/some/where/2/smth', from: '/other/path/c'},
        {op: 'move', path: '/other/else/a', from: '/some/where/0'},
          {op: 'move', path: '/other/else/b', from: '/some/where/2/smth'},
          {op: 'move', path: '/other/else/c', from: '/some/where/2'},
        {op: 'copy', path: '/some/where/0', from: '/other/path/a'},
          {op: 'copy', path: '/some/where/2', from: '/other/path/b'},
          {op: 'copy', path: '/some/where/2/smth', from: '/other/path/c'},
        {op: 'copy', path: '/other/else/a', from: '/some/where/0'},
          {op: 'copy', path: '/other/else/b', from: '/some/where/2/smth'},
          {op: 'copy', path: '/other/else/c', from: '/some/where/2'}
      ]);
      it("paths should get shifted down",function(){
        expect(JSONPatchOT.transform((sequenceJSON), [againstRemove])).toEqual([
          {op: 'test', path: '/some/where/0', value: 'a'},
            {op: 'test', path: '/some/where/1', value: {smth:'a'}},
            {op: 'test', path: '/some/where/1/smth', value: 'a'},
          {op: 'add', path: '/some/where/0', value: 'b'},
            {op: 'add', path: '/some/where/1', value: {}},
            {op: 'add', path: '/some/where/1/smth', value: 'b'},
          {op: 'replace', path: '/some/where/0', value: 'c'},
            {op: 'replace', path: '/some/where/1/smth', value: 'c'},
            {op: 'replace', path: '/some/where/1', value: 'c'},
          {op: 'remove', path: '/some/where/0'},
            {op: 'remove', path: '/some/where/1/smth'},
            {op: 'remove', path: '/some/where/1/'},
          {op: 'move', path: '/some/where/0', from: '/other/path/a'},
            {op: 'move', path: '/some/where/1', from: '/other/path/b'},
            {op: 'move', path: '/some/where/1/smth', from: '/other/path/c'},
          {op: 'move', path: '/other/else/a', from: '/some/where/0'},
            {op: 'move', path: '/other/else/b', from: '/some/where/1/smth'},
            {op: 'move', path: '/other/else/c', from: '/some/where/1'},
          {op: 'copy', path: '/some/where/0', from: '/other/path/a'},
            {op: 'copy', path: '/some/where/1', from: '/other/path/b'},
            {op: 'copy', path: '/some/where/1/smth', from: '/other/path/c'},
          {op: 'copy', path: '/other/else/a', from: '/some/where/0'},
            {op: 'copy', path: '/other/else/b', from: '/some/where/1/smth'},
            {op: 'copy', path: '/other/else/c', from: '/some/where/1'}
          ]);
      });
    });
  });
});
});
