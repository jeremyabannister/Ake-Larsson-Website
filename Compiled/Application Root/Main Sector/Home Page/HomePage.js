'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_JABView) {
	_inherits(HomePage, _JABView);

	function HomePage(customId) {
		_classCallCheck(this, HomePage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HomePage).call(this, customId));

		_this.state = {
			scrollable: true,
			readyToClose: true,
			shouldStartLoading: false
		};
		_this.currentlyActive = null;

		_this.scrollFinishTimer;

		// Parameters
		_this.reservedTopBuffer = 0;
		_this.topBufferForCoverPhoto = 58;

		// UI
		_this.scrollBuffer = new JABView('ScrollBuffer');

		_this.coverPhoto = new JABImageView('CoverPhoto');
		return _this;
	}

	//
	// Init
	//

	_createClass(HomePage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(HomePage.prototype), 'init', this).call(this);

			this.startEventListeners();
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'requiredHeightForWidth',
		value: function requiredHeightForWidth(width) {
			return this.footer.bottom;
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addScrollBuffer();

			this.addCoverPhoto();
		}
	}, {
		key: 'addScrollBuffer',
		value: function addScrollBuffer() {
			this.addSubview(this.scrollBuffer);
		}
	}, {
		key: 'addCoverPhoto',
		value: function addCoverPhoto() {
			this.addSubview(this.coverPhoto);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(HomePage.prototype), 'updateAllUI', this).call(this);

			this.configureScrollBuffer();
			this.positionScrollBuffer();

			this.configureCoverPhoto();
			this.positionCoverPhoto();
		}

		// Scroll Buffer

	}, {
		key: 'configureScrollBuffer',
		value: function configureScrollBuffer() {

			var view = this.scrollBuffer;

			view.backgroundColor = this.backgroundColor;
		}
	}, {
		key: 'positionScrollBuffer',
		value: function positionScrollBuffer() {
			var view = this.scrollBuffer;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height + 50;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Cover Photo

	}, {
		key: 'configureCoverPhoto',
		value: function configureCoverPhoto() {

			var view = this.coverPhoto;

			view.src = './Resources/Images/Home Page/Cover Photo.jpg';

			view.black();
		}
	}, {
		key: 'positionCoverPhoto',
		value: function positionCoverPhoto() {

			var view = this.coverPhoto;
			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth;
			newFrame.size.height = newFrame.size.width * (840.0 / 1600.0);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.reservedTopBuffer + this.topBufferForCoverPhoto;

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {
			var homePage = this;

			$(this.selector).bind('mousewheel', function (evt) {

				if (!homePage.state.scrollable) {
					evt.preventDefault();
				}

				clearTimeout(homePage.scrollFinishTimer);
				if (homePage.scrollTop <= 0) {
					homePage.scrollFinishTimer = setTimeout(function () {
						homePage.state.readyToClose = true;
					}, 50);
				} else {
					homePage.state.readyToClose = false;
				}

				if (homePage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
					evt.preventDefault();
				}
			});
		}

		//
		// Actions
		//

		// Video

		// Keys

	}, {
		key: 'spaceBarWasPressed',
		value: function spaceBarWasPressed() {}

		//
		// Delegate
		//

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}

		// JABVimeoView

	}, {
		key: 'vimeoViewDidFinishLoading',
		value: function vimeoViewDidFinishLoading(vimeoView) {}
	}, {
		key: 'currentlyActive',
		get: function get() {
			return this._currentlyActive;
		},
		set: function set(newCurrentlyActive) {
			var changed = this.currentlyActive != newCurrentlyActive;

			if (changed) {
				this._currentlyActive = newCurrentlyActive;
			}
		}
	}]);

	return HomePage;
}(JABView);