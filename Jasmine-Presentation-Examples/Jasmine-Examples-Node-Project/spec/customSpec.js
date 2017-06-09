describe("Button Click Event Tests using setFixtures covered 'spyOnEvent', 'toHaveBeenTriggeredOn', 'toHaveBeenTriggered' methods", function() {

  beforeEach(function() {
    setFixtures('<button id="btnShowMessage" type="button" onclick="showMessage()">Show Message</button>'
				+'<button id="btnHideMessage" type="button" onclick="hideMessage()">Hide Message</button>'
				+'<p id="pMsg"></p>'
				+'<input type="checkbox" id="testChecked" checked="checked"/>');
  });
      
  it ("should invoke the btnShowMessage click event.", function() {
    spyEvent = spyOnEvent('#btnShowMessage', 'click');
    $('#btnShowMessage').trigger( "click" );
       
    expect('click').toHaveBeenTriggeredOn('#btnShowMessage');
    expect(spyEvent).toHaveBeenTriggered();
  });
      
  it ("should invoke the btnHideMessage click event.", function() {
    spyEvent = spyOnEvent('#btnHideMessage', 'click');
    $('#btnHideMessage').trigger( "click" );
       
    expect('click').toHaveBeenTriggeredOn('#btnHideMessage');
    expect(spyEvent).toHaveBeenTriggered();
  });
  
  it ("Check if Input filed is checked", function() {
	expect($('#testChecked')).toBeChecked();
  });
  
});

/* 'spyOnEvent', 'toHaveBeenTriggeredOn', 'toHaveBeenTriggered' */

describe("JASMINE MATCHERS 'spyOnEvent', 'toHaveBeenTriggeredOn', 'toHaveBeenTriggered', 'toHaveText'", function() {

  beforeEach(function() {
    $fixture = loadTemplateToFixture('http://localhost/Jasmine-Examples-New/templates/hide-show.shtml');
  });
      
  it ("should invoke the btnShowMessage click event.", function() {
    spyEvent = spyOnEvent('#btnShowMessage', 'click');
    $('#btnShowMessage').trigger( "click" );
       
    expect('click').toHaveBeenTriggeredOn('#btnShowMessage');
    expect(spyEvent).toHaveBeenTriggered();
	expect($('#pMsg')).toHaveText('Hello World!');
  });
      
  it ("should invoke the btnHideMessage click event.", function() {
    spyEvent = spyOnEvent('#btnHideMessage', 'click');
    $('#btnHideMessage').trigger( "click" );
       
    expect('click').toHaveBeenTriggeredOn('#btnHideMessage');
    expect(spyEvent).toHaveBeenTriggered();
	expect($('#pMsg')).toHaveText('');
  });
  
});

/* JASMINE MATCHERS 'toBe', 'toEqual' */

describe("JASMINE MATCHERS 'toBe', 'toEqual' ", function() {

  it ("'toBe' matcher compares with ===", function() {
    var a = 12;
	var b = a;

	expect(a).toBe(b);
	expect(a).not.toBe(null);
  });
      
  it ("works for simple literals and variables", function() {
    var a = 12;
	expect(a).toEqual(12);
  });
  
  it("should work for objects", function() {
	  var foo = {
		a: 12,
		b: 34
	  };
	  var bar = {
		a: 12,
		b: 34
	  };
	  expect(foo).toEqual(bar);
  });
  
});

/* JASMINE MATCHERS 'toMatch' */
describe("JASMINE MATCHERS 'toMatch'", function() {

  it('compares the actual to the expected using a regular expression', function() {
		expect('Hello this is pavan').toMatch(/pavan/);
		expect('phone: 123-45-67').toMatch(/\d{3}-\d{2}-\d{2}/);
  });
  
});

/* JASMINE MATCHERS 'toBeDefined', 'toBeUndefined', 'toBeNull' */
describe("JASMINE MATCHERS 'toBeDefined', 'toBeUndefined', 'toBeNull'", function() {
 it("The 'toBeDefined' matcher compares against `undefined`", function() {
    var a = {
      foo: "foo"
    };

    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();
  });

  it("The `toBeUndefined` matcher compares against `undefined`", function() {
    var a = {
      foo: "foo"
    };

    expect(a.foo).not.toBeUndefined();
    expect(a.bar).toBeUndefined();
  });

  it("The 'toBeNull' matcher compares against null", function() {
    var a = null;
    var foo = "foo";

    expect(null).toBeNull();
    expect(a).toBeNull();
    expect(foo).not.toBeNull();
  });
});

/* JASMINE MATCHERS 'toBeFalsy', 'toBeTruthy' */
describe("JASMINE MATCHERS 'toBeTruthy', 'toBeFalsy'", function() {
 it("The 'toBeTruthy' matcher is for boolean casting testing", function() {
    var a, foo = "foo";

    expect(foo).toBeTruthy();
    expect(a).not.toBeTruthy();
  });

  it("The 'toBeFalsy' matcher is for boolean casting testing", function() {
    var a, foo = "foo";

    expect(a).toBeFalsy();
    expect(foo).not.toBeFalsy();
  });
});

/* JASMINE MATCHERS 'toContain' */
describe("JASMINE MATCHERS 'toContain'", function() {
    it("works for finding an item in an Array", function() {
      var a = ["foo", "bar", "baz"];

      expect(a).toContain("bar");
      expect(a).not.toContain("quux");
    });

    it("also works for finding a substring", function() {
      var a = "foo bar baz";

      expect(a).toContain("bar");
      expect(a).not.toContain("quux");
    });
});

/* JASMINE MATCHERS 'toBeLessThan', 'toBeGreaterThan' */
describe("JASMINE MATCHERS 'toBeLessThan', 'toBeGreaterThan'", function() {
 it("The 'toBeLessThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(e).toBeLessThan(pi);
    expect(pi).not.toBeLessThan(e);
  });

  it("The 'toBeGreaterThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).toBeGreaterThan(e);
    expect(e).not.toBeGreaterThan(pi);
  });
  
   it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).not.toBeCloseTo(e, 2);
    expect(pi).toBeCloseTo(e, 0);
  });

});

