'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainSector = function (_JABView) {
	_inherits(MainSector, _JABView);

	function MainSector(customId, projectDataBundles) {
		_classCallCheck(this, MainSector);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainSector).call(this, customId));

		_this.state = {
			shouldStartLoading: false,
			pageIndex: 0,

			scrollable: false,

			selectedProject: null,
			closingProject: false

		};

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0
		};

		// UI
		_this.contactPage = new ContactPage('ContactPage');
		_this.projectsPage = new ProjectsPage('ProjectsPage', projectDataBundles);
		_this.homePage = new HomePage('HomePage');
		_this.projectPage = new ProjectPage('ProjectPage', projectDataBundles);

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
			this.addProjectsPage();
			this.addHomePage();
			this.addProjectPage();
		}
	}, {
		key: 'addContactPage',
		value: function addContactPage() {
			this.addSubview(this.contactPage);
		}
	}, {
		key: 'addProjectsPage',
		value: function addProjectsPage() {
			this.addSubview(this.projectsPage);
		}
	}, {
		key: 'addHomePage',
		value: function addHomePage() {
			this.addSubview(this.homePage);
		}
	}, {
		key: 'addProjectPage',
		value: function addProjectPage() {
			this.addSubview(this.projectPage);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MainSector.prototype), 'updateAllUI', this).call(this);

			this.configureContactPage();
			this.positionContactPage();

			this.configureProjectsPage();
			this.positionProjectsPage();

			this.configureHomePage();
			this.positionHomePage();

			this.configureProjectPage();
			this.positionProjectPage();
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

				view.opacity = 1;
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

			view.frame = newFrame;
		}

		// Projects Page

	}, {
		key: 'configureProjectsPage',
		value: function configureProjectsPage() {

			var view = this.projectsPage;

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

				if (this.state.selectedProject != null) {
					view.blur = 20;
				} else {
					view.blur = 0;
				}

				view.opacity = 1;
			} else {
				view.opacity = 0;
			}

			view.updateAllUI();

			$(view.selector).css({
				'scroll-behavior': 'smooth'
			});
		}
	}, {
		key: 'positionProjectsPage',
		value: function positionProjectsPage() {

			var view = this.projectsPage;
			var newFrame = this.bounds;

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
					view.currentlyActive = true;
					view.scrollable = this.state.scrollable;
				} else {
					view.currentlyActive = false;
				}

				if (this.state.projectOpen) {
					view.blur = 20;
				} else {
					view.blur = 0;
				}

				view.opacity = 1;
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

			view.frame = newFrame;
		}

		// Project Page

	}, {
		key: 'configureProjectPage',
		value: function configureProjectPage() {

			var view = this.projectPage;

			view.clickable = true;
			view.parameters.reservedTopBuffer = this.parameters.reservedTopBuffer;
			view.overflowX = 'hidden';
			view.overflowY = 'scroll';
			view.state = {
				shouldStartLoading: this.state.shouldStartLoading
			};

			view.configureDuration = 200;
			view.backgroundColor = 'rgba(0,0,0, 0.3)';

			if (this.state.selectedProject != null) {
				this.bringPageToFront(view);
				view.opacity = 1;
				view.configureDelay = 0;

				view.instantUpdate = true;
				view.updateAllUI();
				view.instantUpdate = false;
			} else {
				view.opacity = 0;
				view.configureDelay = 200;
			}

			this.projectPage.updateAllUI();
		}
	}, {
		key: 'positionProjectPage',
		value: function positionProjectPage() {

			var view = this.projectPage;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

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
				this.projectPage.spaceBarWasPressed();
			}
		}
	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.projectPage.leftArrowWasPressed();
			}
		}
	}, {
		key: 'upArrowWasPressed',
		value: function upArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.projectPage.upArrowWasPressed();
			}
		}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.projectPage.rightArrowWasPressed();
			}
		}
	}, {
		key: 'downArrowWasPressed',
		value: function downArrowWasPressed() {
			if (this.state.pageIndex == 1) {
				this.projectPage.downArrowWasPressed();
			}
		}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.projectPage) {
				if (view.state.handlingClick) {
					view.state = { handlingClick: false };
				} else {
					this.state = {
						selectedProject: null,
						closingProject: true
					};
					this.projectPage.state = {
						projectIndex: null,
						imageIndex: null
					};
					var mainSector = this;
					this.parent.mainSectorWantsToRelinquishFullScreen(this);
					this.animatedUpdate(null, function () {
						mainSector.state = {
							closingProject: false
						};
						mainSector.updateAllUI();
					});
				}
			}
		}

		// Contact Page

		// Projects Page

	}, {
		key: 'projectsPageWantsToOpenProject',
		value: function projectsPageWantsToOpenProject(projectsPage, projectDataBundle) {

			this.state = {
				selectedProject: projectDataBundle
			};
			this.projectPage.loadProjectDataBundle(projectDataBundle);
			this.parent.mainSectorWantsToUseFullScreen(this);
			this.animatedUpdate();
		}

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
			return [this.homePage, this.projectsPage, this.contactPage, this.projectPage];
		}
	}, {
		key: 'readyToClose',
		get: function get() {
			return this.currentlyActivePage.state.readyToClose;
		}
	}]);

	return MainSector;
}(JABView);