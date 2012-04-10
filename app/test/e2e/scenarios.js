/* jasmine-like end2end tests go here */
describe('Spacegem2012 App', function() {

	describe('quickstart view (only works when user is logged out)',
			function() {

				beforeEach(function() {
					browser().navigateTo('/');
				});

				it('should jump me to the landing page', function() {
					expect(browser().location().hash()).toBe('/quickstart');
				})

				it('should have "#" as href value for FEEDBACK link',
						function() {
							expect(element("a.fdbk_tab_left").attr('href'))
									.toBe('#');
						})

			})

	describe('login view (only works when user is logged out)', function() {

		beforeEach(function() {
			browser().navigateTo('/app/index.html#/login');
		});

		it('should jump me to the login page', function() {
			expect(browser().location().hash()).toBe('/login');
		})

		it('should jump me to the login page if login button is clicked',
				function() {
					var url = element("#loginButton").attr("href").value;
					element("#loginButton").click();
					expect(browser().location()).toBe(url);
				})

	});

	describe('shop view', function() {

		beforeEach(function() {
			browser().navigateTo('/app/index.html#/shop');
		});

		it('should jump me to the shop page', function() {
			expect(browser().location().hash()).toBe('/shop');
		})

		it('should not be able to check out without package', function() {
			element("#checkout").click();
			var currentUrl = browser().location().value;
			expect(browser().location()).toBe(currentUrl);

		})

	});

	describe('completequickstart view', function() {

		beforeEach(function() {
			browser().navigateTo('/app/index.html#/completequickstart');
		});

		it('should jump me to the shop page', function() {
			expect(browser().location().hash()).toBe('/completequickstart');
		})

	});

	describe('game view (only works if user is logged in)', function() {

		beforeEach(function() {
			browser().navigateTo('/app/index.html#/game');
		});

		it('should jump me to the game page', function() {
			expect(browser().location().hash()).toBe('/game');
		});

		it('should display user\'s email', function() {
			expect(binding('currentPlayer.email')).toBeDefined();
		});

		it('should not show production functions on landing', function() {
			expect(element('#produce:hidden').count()).toEqual(1);
		});

		it('should not show trade functions on landing', function() {
			expect(element('#trade:hidden').count()).toEqual(1);
		});

		it('should show production functions on click of button "Produce"',
				function() {
					element('#produceButton').click()
					expect(element('#produce:visible').count()).toEqual(1);
				});

		it('should show trade functions on click of button "Trade"',
				function() {
					element('#tradeButton').click()
					if (element('#trade:visible').count() == 1) {
						expect(element('#trade:visible').count()).toEqual(1);
					} else {
						expect(element('#noPlayer:visible').count()).toEqual(1);
					}
				});

	});
    describe('createqn view(only work for )',function() {

        beforeEach(function() {
            browser().navigateTo('/app/index.html#/question/createqn');
        });
        it('should jump me to the createqn page', function() {
            expect(browser().location().hash()).toBe('/question/createqn');
        });
        it('should not show creating crossword qn functions on landing', function() {
            expect(element('#createCrossQn:hidden').count()).toEqual(1);
        });
        it('should not show creating drag qn functions on landing', function() {
            expect(element('#createDragQn:hidden').count()).toEqual(1);
        });
        it('should show creating mcq qn functions on landing', function() {
            expect(element('#createMCQQn:hidden').count()).toEqual(0);
        });
        it('should not show preview cross qn functions on landing', function() {
            expect(element('#previewCrossQn:hidden').count()).toEqual(1);
        });
        it('should retrieve 4 mcq during start.', function()  {
            expect(repeater('.crossQnsCreate li').count()).toBe(5);
        });

    });
    describe('manageqn view(only work for users)',function() {
        beforeEach(function() {
            browser().navigateTo('/app/index.html#/question/manageqn');
        });
        it('should jump me to the manageqn page', function() {
            expect(browser().location().hash()).toBe('/question/manageqn');
        });
        it('should filter the manageqn page', function() {
            input('searchName').enter()
            expect(browser().location().hash()).toBe('/question/manageqn');
        });

    });

    describe('ranking view', function(){
        beforeEach(function() {
            browser().navigateTo('/app/index.html#/ranking');
        });
        it('should jump me to the ranking page', function() {
            expect(browser().location().hash()).toBe('/ranking');
        });
    });

    describe('share view', function(){
        beforeEach(function() {
            browser().navigateTo('/app/index.html#/share');
        });
        it('should jump me to the share page', function() {
            expect(browser().location().hash()).toBe('/share');
        });
        it('should show popup of fb share', function() {
            element('#shareButton').click();
            expect (browser().navigateTo('http://www.facebook.com/sharer.php?u=http://spacegem2012.appspot.com?&t='));
        });
    });

});
