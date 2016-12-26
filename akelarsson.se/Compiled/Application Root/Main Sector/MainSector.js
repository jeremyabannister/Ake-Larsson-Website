'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainSector = function (_JABView) {
	_inherits(MainSector, _JABView);

	function MainSector(customId, imagePathStem, workImagePaths) {
		_classCallCheck(this, MainSector);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainSector).call(this, customId));

		_this.state = {
			currentlyActive: false,
			shouldStartLoading: false,
			pageIndex: 0,

			scrollable: false
		};

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0
		};

		// UI
		_this.contactPage = new ContactPage('ContactPage');
		_this.workPage = new WorkPage('WorkPage', imagePathStem, workImagePaths);
		_this.homePage = new HomePage('HomePage');

		return _this;
	}

	//
	// Init
	//

	_createClass(MainSector, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MainSector.prototype), 'init', this).call(this);
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			this.addContactPage();
			this.addWorkPage();
			this.addHomePage();
		}
	}, {
		key: 'addContactPage',
		value: function addContactPage() {
			this.addSubview(this.contactPage);
		}
	}, {
		key: 'addWorkPage',
		value: function addWorkPage() {
			this.addSubview(this.workPage);
		}
	}, {
		key: 'addHomePage',
		value: function addHomePage() {
			this.addSubview(this.homePage);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MainSector.prototype), 'updateAllUI', this).call(this);

			this.configureContactPage();
			this.positionContactPage();

			this.configureWorkPage();
			this.positionWorkPage();

			this.configureHomePage();
			this.positionHomePage();
		}

		// Contact Page

	}, {
		key: 'configureContactPage',
		value: function configureContactPage() {

			var view = this.contactPage;

			view.backgroundColor = 'white';
			view.overflowX = 'hidden';
			view.overflowY = 'scroll';
			view.scrollable = true;

			view.reservedTopBuffer = this.parameters.reservedTopBuffer;

			if (this.currentlyActivePage == view) {

				if (!this.state.closingProject) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}

				if (this.state.projectOpen) {
					view.blur = 20;
				} else {
					view.blur = 0;
				}

				if (this.state.currentlyActive) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionContactPage',
		value: function positionContactPage() {

			var view = this.contactPage;
			var newFrame = this.bounds;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			view.frame = newFrame;
		}

		// Work Page

	}, {
		key: 'configureWorkPage',
		value: function configureWorkPage() {

			var view = this.workPage;

			view.backgroundColor = 'white';
			view.overflowX = 'hidden';
			view.state = {
				shouldStartLoading: this.state.shouldStartLoading
			};

			view.overflowY = 'scroll';

			view.parameters = {
				reservedTopBuffer: this.parameters.reservedTopBuffer,
				heightOfHeader: this.parameters.heightOfHeader
			};

			if (this.currentlyActivePage == view) {
				if (!this.state.closingProject) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}

				view.state.scrollable = true;

				if (this.state.projectOpen) {
					view.blur = 20;
				} else {
					view.blur = 0;
				}

				setComingSoon(view.state.comingSoon);

				if (this.state.currentlyActive) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
			}

			view.updateAllUI();

			$(view.selector).css({
				'scroll-behavior': 'smooth'
			});
		}
	}, {
		key: 'positionWorkPage',
		value: function positionWorkPage() {

			var view = this.workPage;
			var newFrame = this.bounds;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			view.frame = newFrame;
		}

		// Home Page

	}, {
		key: 'configureHomePage',
		value: function configureHomePage() {

			var view = this.homePage;

			view.backgroundColor = 'white';
			view.overflow = 'scroll';
			view.reservedTopBuffer = this.parameters.reservedTopBuffer;
			view.state = {
				shouldStartLoading: this.state.shouldStartLoading
			};

			if (this.currentlyActivePage == view) {
				if (!this.state.closingProject) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}

				if (!this.state.projectOpen) {
					view.currentlyActive = this.state.currentlyActive;
					view.scrollable = this.state.scrollable;
				} else {
					view.currentlyActive = false;
				}

				if (this.state.projectOpen) {
					view.blur = 20;
				} else {
					view.blur = 0;
				}

				if (this.state.currentlyActive) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
				view.currentlyActive = false;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionHomePage',
		value: function positionHomePage() {

			var view = this.homePage;
			var newFrame = this.bounds;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			view.frame = newFrame;
		}

		//
		// Actions
		//

		// Navigation

	}, {
		key: 'bringPageToFront',
		value: function bringPageToFront(page) {

			var otherPages = [];
			for (var i = 0; i < this.pages.length; i++) {
				if (this.pages[i] != page) {
					otherPages.push(this.pages[i]);
				}
			}

			if (!this.subviewIsAboveSubviews(page, otherPages)) {
				this.insertSubviewAboveSubviews(page, otherPages);
			}
		}

		// Swipe

	}, {
		key: 'leftSwipeDetected',
		value: function leftSwipeDetected() {}
	}, {
		key: 'rightSwipeDetected',
		value: function rightSwipeDetected() {}
	}, {
		key: 'upSwipeDetected',
		value: function upSwipeDetected() {}

		// Keys

	}, {
		key: 'spaceBarWasPressed',
		value: function spaceBarWasPressed() {
			if (this.state.pageIndex == 0) {
				this.homePage.spaceBarWasPressed();
			} else if (this.state.pageIndex == 1) {
				this.workPage.spaceBarWasPressed();
			}
		}
	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.workPage.leftArrowWasPressed();
			}
		}
	}, {
		key: 'upArrowWasPressed',
		value: function upArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.workPage.upArrowWasPressed();
			}
		}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.workPage.rightArrowWasPressed();
			}
		}
	}, {
		key: 'downArrowWasPressed',
		value: function downArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.workPage.downArrowWasPressed();
			}
		}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {}

		// About Page

		// Projects Page

		// Home Page

		// Project Page

	}, {
		key: 'projectPageDidChangeProjectIndexTo',
		value: function projectPageDidChangeProjectIndexTo(projectPage, projectIndex) {
			this.state = { selectedProjectIndex: projectIndex };
		}
	}, {
		key: 'websiteClosed',
		get: function get() {
			return this._websiteClosed;
		},
		set: function set(newWebsiteClosed) {
			if (!this.websiteClosedLocked) {
				this._websiteClosed = newWebsiteClosed;
			}
		}
	}, {
		key: 'currentlyActivePage',
		get: function get() {
			return this.pages[this.state.pageIndex];
		}
	}, {
		key: 'pages',
		get: function get() {
			return [this.homePage, this.workPage, this.contactPage];
		}
	}, {
		key: 'readyToClose',
		get: function get() {
			return this.currentlyActivePage.state.readyToClose;
		}
	}]);

	return MainSector;
}(JABView);

function setComingSoon(newComingSoon) {

	if (newComingSoon != null) {
		var changed = applicationRoot.mainSector.comingSoon != newComingSoon;
		applicationRoot.mainSector.comingSoon = newComingSoon;

		if (changed) {
			applicationRoot.mainSector.updateAllUI();
		}
	}
}