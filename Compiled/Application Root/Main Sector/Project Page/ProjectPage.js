'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectPage = function (_JABView) {
	_inherits(ProjectPage, _JABView);

	function ProjectPage(customId, projectDataBundles) {
		_classCallCheck(this, ProjectPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectPage).call(this, customId));

		_this.state = {
			shouldStartLoading: false,

			projectDataBundles: projectDataBundles,
			projectIndex: null,
			imageIndex: null

		};

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			minimumDistanceFromImageViewToLogo: 15,

			imageAspectRatio: 2448.0 / 3264.0,

			sizeOfArrowButtons: 60,
			insetForArrowButtons: 20,
			innerBufferForArrowButtons: 20 };

		// UI
		_this.imageView = new JABImageView('ImageView');
		_this.prevButton = new JABEmbeddedImageView('PrevButton');
		_this.nextButton = new JABEmbeddedImageView('NextButton');

		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectPage.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addPrevButton();
			this.addNextButton();

			this.addImageView();
		}
	}, {
		key: 'addImageView',
		value: function addImageView() {
			this.addSubview(this.imageView);
		}
	}, {
		key: 'addPrevButton',
		value: function addPrevButton() {
			this.addSubview(this.prevButton);
		}
	}, {
		key: 'addNextButton',
		value: function addNextButton() {
			this.addSubview(this.nextButton);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectPage.prototype), 'updateAllUI', this).call(this);

			this.updateParameters();

			this.configureImageView();
			this.positionImageView();

			this.configurePrevButton();
			this.positionPrevButton();

			this.configureNextButton();
			this.positionNextButton();
		}

		// Parameters

	}, {
		key: 'updateParameters',
		value: function updateParameters() {
			if (sizeClass == 'xs' || sizeClass == 'xxs') {
				this.parameters.sizeOfArrowButtons = 40;
			} else {
				this.parameters.sizeOfArrowButtons = 60;
			}
		}

		// Image View

	}, {
		key: 'configureImageView',
		value: function configureImageView() {
			var view = this.imageView;

			view.clickable = true; // Check for clicks on the imageView because they should not close the project as clicking elsewhere would do

			// Safely retrieve correct image path from projectDataBundles and assign it to the image view
			if (this.state.projectIndex != null) {
				if (this.state.projectDataBundles.length > this.state.projectIndex) {
					var projectDataBundle = this.state.projectDataBundles[this.state.projectIndex];
					if (this.state.imageIndex != null) {
						if (projectDataBundle.imagePaths.length > this.state.imageIndex) {
							view.src = projectDataBundle.imagePaths[this.state.imageIndex];
						}
					}
				}
			}
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {
			var view = this.imageView;
			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth * 0.7;
			newFrame.size.height = newFrame.size.width * this.parameters.imageAspectRatio;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height) / 2;

			if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.minimumDistanceFromImageViewToLogo) {
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.minimumDistanceFromImageViewToLogo;
			}

			view.frame = newFrame;
		}

		// Prev Button

	}, {
		key: 'configurePrevButton',
		value: function configurePrevButton() {
			var view = this.prevButton;

			view.src = './Resources/Images/Project Page/Buttons/Left Arrow.png';
			view.clickable = true;

			if (this.state.projectIndex != null) {
				if (this.state.imageIndex == 0) {
					view.opacity = 0;
					view.cursor = '';
				} else {
					view.opacity = 1;
					view.cursor = 'pointer';
				}
			} else {
				view.opacity = 0;
			}
		}
	}, {
		key: 'positionPrevButton',
		value: function positionPrevButton() {
			var view = this.prevButton;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.sizeOfArrowButtons + this.parameters.insetForArrowButtons;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = this.imageView.left - newFrame.size.width - this.parameters.innerBufferForArrowButtons;
			newFrame.origin.y = this.imageView.top + (this.imageView.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Next Button

	}, {
		key: 'configureNextButton',
		value: function configureNextButton() {
			var view = this.nextButton;

			view.src = './Resources/Images/Project Page/Buttons/Right Arrow.png';
			view.clickable = true;
			view.cursor = 'pointer';

			if (this.state.projectIndex != null) {
				if (this.state.projectDataBundles.length > this.state.projectIndex) {
					var projectDataBundle = this.state.projectDataBundles[this.state.projectIndex];
					if (this.state.imageIndex == projectDataBundle.imagePaths.length - 1) {
						view.opacity = 0;
						view.cursor = '';
					} else {
						view.opacity = 1;
						view.cursor = 'pointer';
					}
				}
			} else {
				view.opacity = 0;
			}
		}
	}, {
		key: 'positionNextButton',
		value: function positionNextButton() {
			var view = this.nextButton;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.sizeOfArrowButtons + this.parameters.insetForArrowButtons;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = this.imageView.right + this.parameters.innerBufferForArrowButtons;
			newFrame.origin.y = this.imageView.top + (this.imageView.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Navigation

	}, {
		key: 'goToPreviousImage',
		value: function goToPreviousImage() {
			if (this.state.imageIndex != 0) {
				this.state.imageIndex -= 1;
			}

			this.updateAllUI();
		}
	}, {
		key: 'goToNextImage',
		value: function goToNextImage() {
			if (this.state.projectIndex != null) {
				if (this.state.projectDataBundles.length > this.state.projectIndex) {
					var projectDataBundle = this.state.projectDataBundles[this.state.projectIndex];
					if (this.state.imageIndex != projectDataBundle.imagePaths.length - 1) {
						this.state.imageIndex += 1;
					}
				}
			}

			this.updateAllUI();
		}

		// Load

	}, {
		key: 'loadProjectDataBundle',
		value: function loadProjectDataBundle(projectDataBundle) {
			for (var i = 0; i < this.state.projectDataBundles.length; i++) {
				if (this.state.projectDataBundles[i] == projectDataBundle) {
					this.state = {
						projectIndex: i,
						imageIndex: 0
					};
				}
			}

			this.updateAllUI();
		}

		// Swipe

	}, {
		key: 'leftSwipeDetected',
		value: function leftSwipeDetected() {
			this.goToNextImage();
		}
	}, {
		key: 'rightSwipeDetected',
		value: function rightSwipeDetected() {
			this.goToPreviousImage();
		}

		// Keys

	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {
			this.goToPreviousImage();
		}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {
			this.goToNextImage();
		}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.imageView) {
				this.state = {
					handlingClick: true
				};
			} else if (view == this.prevButton) {
				this.state.handlingClick = true;
				this.goToPreviousImage();
			} else if (view == this.nextButton) {
				this.state.handlingClick = true;
				this.goToNextImage();
			}
		}

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}
	}]);

	return ProjectPage;
}(JABView);