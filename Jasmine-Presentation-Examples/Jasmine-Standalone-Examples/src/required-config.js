// configure jasmine-jquery framework fixturesPath
// this is used by tests when we call loadFixtures
jasmine.getFixtures().fixturesPath = '/fixtures';

// convenience methods for loading Handlebars templates into
// a test.
var loadTemplate = function(relativePath, compile) {
	var result = null;

	$.ajax({
		url: '/fixtures' + relativePath,
		// prevent test execution before the template has loaded.
		async: false,

		success: function(data) {
			result = compile ? Handlebars.compile(data) : data;
		}
	});

	return result;
};

// Template will be loaded into the div with ID of 'test-container'.
// context is the model used to construct the template if required.
var loadTemplateToFixture = function(relativePath, context) {
	var template = loadTemplate(relativePath, true);

	loadFixtures('test-container.html');
	var $fixture = $('#test-container');

	$fixture.append(template(context));

	return $fixture;
}