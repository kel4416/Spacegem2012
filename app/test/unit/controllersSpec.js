/* jasmine specs for controllers go here */
describe('Spacegem controllers', function() {

	beforeEach(function() {
		this.addMatchers({
			toEqualData : function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});

	describe('loginCtrl', function() {
		var scope, $browser, ctrl;

		beforeEach(function() {
			scope = angular.scope();
			$browser = scope.$service('$browser');

			ctrl = scope.$new(loginCtrl);
		});

		it('should create logoutUrl', function() {
			
		});
	});
});
