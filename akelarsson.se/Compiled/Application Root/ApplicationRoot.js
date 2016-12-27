'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicationRoot = function (_JABApplicationRoot) {
	_inherits(ApplicationRoot, _JABApplicationRoot);

	function ApplicationRoot(customId) {
		_classCallCheck(this, ApplicationRoot);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationRoot).call(this, customId));

		_this.laboratoryEnabled = false;
		_this.contentWidth = { 'xxs': 0, 'xs': 0, 's': 780, 'm': 1000, 'l': 1000, 'xl': 1450 };
		_this.state = {
			headerBackdropHidden: false,

			loadingGifInPlace: false,
			displayLoading: true,
			loadingInitialData: true,
			initialLoadingMinimumDurationHasBeenReached: false,
			imagesLeftToLoad: 0
		};

		// Loading Images
		_this.imagePathStem = './Resources/Images';
		_this.assembleProjectDataBundles();

		// Parameters
		_this.parameters = {
			sizeOfLoadingGifWrapper: 50,
			initialLoadingMinimumDuration: 3000,

			heightOfHeader: 110
		};

		if (_this.laboratoryEnabled) {
			_this.laboratory = new Laboratory('Laboratory');
		} else {

			// UI
			_this.loadingGifWrapper = new JABGifWrapper('LoadingGifWrapper');

			_this.mainSector = new MainSector('MainSector', _this.projectDataBundles);
			_this.headerBackdrop = new JABView('HeaderBackdrop');
			_this.header = new Header('Header');
		}

		return _this;
	}

	//
	// Init
	//

	_createClass(ApplicationRoot, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ApplicationRoot.prototype), 'init', this).call(this);

			this.downloadImages();
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

			if (this.laboratoryEnabled) {
				this.addLaboratory();
			} else {

				this.addLoadingGifWrapper();

				this.addMainSector();
				this.addHeaderBackdrop();
				this.addHeader();
			}
		}
	}, {
		key: 'addLoadingGifWrapper',
		value: function addLoadingGifWrapper() {
			this.addSubview(this.loadingGifWrapper);
		}
	}, {
		key: 'addMainSector',
		value: function addMainSector() {
			this.addSubview(this.mainSector);
		}
	}, {
		key: 'addHeaderBackdrop',
		value: function addHeaderBackdrop() {
			this.addSubview(this.headerBackdrop);
		}
	}, {
		key: 'addHeader',
		value: function addHeader() {
			this.addSubview(this.header);
		}
	}, {
		key: 'addLaboratory',
		value: function addLaboratory() {
			this.addSubview(this.laboratory);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ApplicationRoot.prototype), 'updateAllUI', this).call(this);

			if (this.laboratoryEnabled) {
				this.configureLaboratory();
				this.positionLaboratory();
			} else {

				this.configureLoadingGifWrapper();
				this.positionLoadingGifWrapper();

				if (this.state.loadingGifInPlace) {
					this.configureMainSector();
					this.positionMainSector();

					this.configureHeaderBackdrop();
					this.positionHeaderBackdrop();

					this.configureHeader();
					this.positionHeader();
				}
			}
		}

		//  Loading Gif Wrapper

	}, {
		key: 'configureLoadingGifWrapper',
		value: function configureLoadingGifWrapper() {

			var view = this.loadingGifWrapper;
			view.configureDuration = 100;

			if (this.state.displayLoading) {
				view.opacity = 1;
				if (!(view.gif instanceof LoadingGif)) {
					view.gif = new LoadingGif();
				}

				if (!view.state.playing) {
					view.play();
					setTimeout(function () {
						applicationRoot.initialLoadingMinimumReached();
					}, this.parameters.initialLoadingMinimumDuration);
				}
			} else {
				if (view.state.playing) {
					view.stop();
				}
				view.opacity = 0;
			}
		}
	}, {
		key: 'positionLoadingGifWrapper',
		value: function positionLoadingGifWrapper() {
			var view = this.loadingGifWrapper;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.sizeOfLoadingGifWrapper;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;

			if (!this.state.loadingGifInPlace) {
				this.state.loadingGifInPlace = true;
			}
		}

		// Main Sector

	}, {
		key: 'configureMainSector',
		value: function configureMainSector() {
			var view = this.mainSector;

			view.backgroundColor = 'white';
			view.parameters = {
				reservedTopBuffer: this.header.logo.bottom,
				heightOfHeader: this.parameters.heightOfHeader
			};
			view.projectDataBundles = this.projectDataBundles;

			view.state = {
				currentlyActive: true,
				shouldStartLoading: !this.state.loadingInitialData
			};

			if (this.state.loadingInitialData) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionMainSector',
		value: function positionMainSector() {

			var verticalShift = 0;
			if (this.state.loadingInitialData) {
				verticalShift = 70;
			}

			this.mainSector.frame = new CGRect(0, verticalShift, this.width, this.height);
		}

		// Header Backdrop

	}, {
		key: 'configureHeaderBackdrop',
		value: function configureHeaderBackdrop() {

			var view = this.headerBackdrop;
			view.backgroundColor = 'white';

			if (this.state.headerBackdropHidden || this.state.loadingInitialData) {
				view.configureDuration = 100;
				view.opacity = 0;
			} else {
				view.configureDuration = defaultAnimationDuration;
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionHeaderBackdrop',
		value: function positionHeaderBackdrop() {

			var view = this.headerBackdrop;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.parameters.heightOfHeader;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Header

	}, {
		key: 'configureHeader',
		value: function configureHeader() {

			var view = this.header;

			view.websiteClosed = false;
			view.selectedMenuIndex = this.mainSector.state.pageIndex;
			view.clickable = true;

			if (this.state.loadingInitialData) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionHeader',
		value: function positionHeader() {
			this.header.frame = new CGRect(0, 0, this.width, this.parameters.heightOfHeader);

			this.configureMainSector(); // This is done because the mainSector's heightOfHeader parameter is dependent on the logo in the header which doesn't get positioned until after the parameter is given to the mainSector
		}

		// Laboratory

	}, {
		key: 'configureLaboratory',
		value: function configureLaboratory() {

			this.laboratory.backgroundColor = 'white';
		}
	}, {
		key: 'positionLaboratory',
		value: function positionLaboratory() {
			if (this.laboratoryEnabled) {
				var newFrame = new CGRect();

				newFrame.size.width = this.width;
				newFrame.size.height = this.height;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			} else {
				var newFrame = new CGRect();

				newFrame.size.width = 0;
				newFrame.size.height = 0;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			}
		}

		//
		// Actions
		//

		// Data

	}, {
		key: 'assembleProjectDataBundles',
		value: function assembleProjectDataBundles() {

			this.state.imagesLeftToLoad = 2; // Start the counter at 2 because we know that besides the photos added here we need to load the cover photo and the profile picture
			this.projectDataBundles = [];

			// Front Hall Closet
			var frontHallCloset = new ProjectDataBundle();
			frontHallCloset.title = 'Front Hall Closet';
			for (var i = 0; i < 6; i++) {
				frontHallCloset.imagePaths.push(this.imagePathStem + '/Projects Page/Front Hall Closet/' + (i + 1) + '.jpg');
				this.state.imagesLeftToLoad += 1;
			}

			// Sauna and Curved Closet
			var saunaAndCurvedCloset = new ProjectDataBundle();
			saunaAndCurvedCloset.title = 'Sauna and Curved Closet';
			for (var i = 0; i < 2; i++) {
				saunaAndCurvedCloset.imagePaths.push(this.imagePathStem + '/Projects Page/Sauna and Curved Closet/' + (i + 1) + '.jpg');
				this.state.imagesLeftToLoad += 1;
			}

			this.projectDataBundles.push(frontHallCloset);
			this.projectDataBundles.push(saunaAndCurvedCloset);
		}

		// Loading

	}, {
		key: 'downloadImages',
		value: function downloadImages() {

			imageBank.addToQueue(this.imagePathStem + '/Home Page/Cover Photo.jpg', this);
			imageBank.addToQueue(this.imagePathStem + '/Contact Page/Profile Picture.jpg', this);

			for (var i = 0; i < this.projectDataBundles.length; i++) {
				if (this.projectDataBundles[i].imagePaths.length > 0) {
					imageBank.addToQueue(this.projectDataBundles[i].imagePaths[0], this);
				}
			}

			for (var i = 0; i < this.projectDataBundles.length; i++) {
				for (var j = 1; j < this.projectDataBundles[i].imagePaths.length; j++) {
					imageBank.addToQueue(this.projectDataBundles[i].imagePaths[j], this);
				}
			}
		}
	}, {
		key: 'initialLoadingMinimumReached',
		value: function initialLoadingMinimumReached() {
			if (this.state.loadingInitialData) {
				this.state = {
					initialLoadingMinimumDurationHasBeenReached: true
				};
			} else {
				this.state = {
					initialLoadingMinimumDurationHasBeenReached: true,
					displayLoading: false
				};
				this.animatedUpdate();
			}
		}

		// Scrolling

	}, {
		key: 'userDidScrollByAmount',
		value: function userDidScrollByAmount(amount) {}

		// Swipe

	}, {
		key: 'leftSwipeDetected',
		value: function leftSwipeDetected() {
			this.mainSector.leftSwipeDetected();
		}
	}, {
		key: 'rightSwipeDetected',
		value: function rightSwipeDetected() {
			this.mainSector.rightSwipeDetected();
		}
	}, {
		key: 'upSwipeDetected',
		value: function upSwipeDetected() {
			this.mainSector.upSwipeDetected();
		}
	}, {
		key: 'downSwipeDetected',
		value: function downSwipeDetected() {}

		// Keys

	}, {
		key: 'spaceBarWasPressed',
		value: function spaceBarWasPressed() {
			this.mainSector.spaceBarWasPressed();
		}
	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {
			this.mainSector.leftArrowWasPressed();
		}
	}, {
		key: 'upArrowWasPressed',
		value: function upArrowWasPressed() {
			this.mainSector.upArrowWasPressed();
		}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {
			this.mainSector.rightArrowWasPressed();
		}
	}, {
		key: 'downArrowWasPressed',
		value: function downArrowWasPressed() {
			this.mainSector.downArrowWasPressed();
		}

		//
		// Delegate
		//

		// Image Bank

	}, {
		key: 'imageDidFinishLoading',
		value: function imageDidFinishLoading(src) {
			this.state.imagesLeftToLoad -= 1;
			if (this.state.imagesLeftToLoad == 0) {
				if (this.state.initialLoadingMinimumDurationHasBeenReached) {
					this.state = {
						loadingInitialData: false,
						displayLoading: false
					};
					this.animatedUpdate();
				} else {
					this.state = {
						loadingInitialData: false
					};
				}
			}
		}

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {}

		// Main Sector

	}, {
		key: 'mainSectorWantsToUseFullScreen',
		value: function mainSectorWantsToUseFullScreen(mainSector) {
			this.state = { headerBackdropHidden: true };
			this.animatedUpdate();
		}
	}, {
		key: 'mainSectorWantsToRelinquishFullScreen',
		value: function mainSectorWantsToRelinquishFullScreen(mainSector) {
			this.state = { headerBackdropHidden: false };
			this.animatedUpdate();
		}
	}, {
		key: 'mainSectorWantsToOpenAboutPage',
		value: function mainSectorWantsToOpenAboutPage(mainSector) {
			this.mainSector.state = {
				pageIndex: 2,
				projectOpen: false
			};
			this.animatedUpdate();
		}

		// Header

	}, {
		key: 'headerLogoWasClicked',
		value: function headerLogoWasClicked() {
			if (this.mainSector.state.selectedProject != null) {
				this.mainSector.state = {
					selectedProject: null
				};
				this.mainSectorWantsToRelinquishFullScreen(this.mainSector);

				var appRoot = this;
				this.animatedUpdate(null, function () {
					appRoot.mainSector.state = {
						pageIndex: 0
					};
					appRoot.updateAllUI(); // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
				});
			} else {
				this.mainSector.state = {
					pageIndex: 0
				};
			}

			this.updateAllUI();
		}
	}, {
		key: 'headerDidSelectPage',
		value: function headerDidSelectPage(pageIndex) {

			if (this.mainSector.state.selectedProject != null) {
				this.mainSector.state = {
					selectedProject: null
				};
				this.mainSectorWantsToRelinquishFullScreen(this.mainSector);

				var appRoot = this;
				this.animatedUpdate(null, function () {
					appRoot.mainSector.state = {
						pageIndex: pageIndex
					};
					appRoot.updateAllUI(); // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
				});
			} else {
				this.mainSector.state = {
					pageIndex: pageIndex
				};
				this.updateAllUI(); // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
			}
		}
	}, {
		key: 'contentWidth',
		get: function get() {
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				return this.width;
			} else {
				return this._contentWidth[sizeClass];
			}
		},
		set: function set(newContentWidth) {
			this._contentWidth = newContentWidth;
		}
	}]);

	return ApplicationRoot;
}(JABApplicationRoot);