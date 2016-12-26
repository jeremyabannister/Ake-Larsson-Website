'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkPage = function (_JABView) {
	_inherits(WorkPage, _JABView);

	function WorkPage(customId, imagePathStem, imagePaths) {
		_classCallCheck(this, WorkPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WorkPage).call(this, customId));

		_this.state = {
			shouldStartLoading: false,

			magnified: false,

			imagePathStem: imagePathStem,
			imagePaths: imagePaths
		};

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,

			imageAspectRatio: 2448.0 / 3264.0,

			numberOfColumns: 2,
			topBufferForGrid: 58,
			betweenBufferForGridRows: 10,
			betweenBufferForGridColumns: 10,
			bottomBufferForGrid: 50,

			heightOfScrollBuffer: 100
		};

		// Timers
		_this.scrollFinishTimer;

		// UI
		_this.scrollBuffer = new JABView('ScrollBuffer');

		_this.imageViews = [];
		for (var i = 0; i < imagePaths.length; i++) {
			_this.imageViews.push(new JABImageView('ImageView' + (i + 1)));
		}

		return _this;
	}

	//
	// Init
	//

	_createClass(WorkPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(WorkPage.prototype), 'init', this).call(this);
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

			this.addImageViews();
		}
	}, {
		key: 'addScrollBuffer',
		value: function addScrollBuffer() {
			this.addSubview(this.scrollBuffer);
		}
	}, {
		key: 'addImageViews',
		value: function addImageViews() {
			for (var i = 0; i < this.imageViews.length; i++) {
				this.addSubview(this.imageViews[i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(WorkPage.prototype), 'updateAllUI', this).call(this);

			this.updateParameters();

			this.configureScrollBuffer();
			this.positionScrollBuffer();

			this.configureImageViews();
			this.positionImageViews();
		}

		// Parameters

	}, {
		key: 'updateParameters',
		value: function updateParameters() {}

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

		// Image Views

	}, {
		key: 'configureImageViews',
		value: function configureImageViews() {
			for (var i = 0; i < this.imageViews.length; i++) {
				var view = this.imageViews[i];

				var src = this.state.imagePathStem + this.state.imagePaths[i];
				if (view.src != src) {
					view.src = src;
				}

				view.clickable = true;
				view.cursor = 'pointer';
			}
		}
	}, {
		key: 'positionImageViews',
		value: function positionImageViews() {
			for (var i = 0; i < this.imageViews.length; i++) {
				var view = this.imageViews[i];
				var newFrame = new CGRect();

				newFrame.size.width = (applicationRoot.contentWidth - (this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns) / this.parameters.numberOfColumns;
				newFrame.size.height = newFrame.size.width * this.parameters.imageAspectRatio;

				newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2 + i % this.parameters.numberOfColumns * (newFrame.size.width + this.parameters.betweenBufferForGridColumns);
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForGrid + Math.floor(i / this.parameters.numberOfColumns) * (newFrame.size.height + this.parameters.betweenBufferForGridRows);

				view.frame = newFrame;
			}
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {}
		// var projectsPage = this

		// $(this.selector).bind('mousewheel', function(evt) {

		// 	if (!projectsPage.state.scrollable) {
		// 		evt.preventDefault()
		// 	} else {
		// 		projectsPage.configureProjectPanes()
		// 	}

		// 	clearTimeout(projectsPage.scrollFinishTimer)
		// 	if (projectsPage.scrollTop <= 0) {
		// 		projectsPage.scrollFinishTimer = setTimeout(function () {
		// 			// projectsPage.state.readyToClose = true // Uncomment this line make website closable from projects page
		// 		}, 50)
		// 	} else {
		// 		projectsPage.state.readyToClose = false
		// 	}

		// 	if (projectsPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
		// 		evt.preventDefault()
		// 	}

		// })


		//
		// Actions
		//

		// Keys

	}, {
		key: 'spaceBarWasPressed',
		value: function spaceBarWasPressed() {}
	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {}
	}, {
		key: 'upArrowWasPressed',
		value: function upArrowWasPressed() {}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {}
	}, {
		key: 'downArrowWasPressed',
		value: function downArrowWasPressed() {}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (!this.state.magnified) {
				this.parameters = {
					numberOfColumns: 1
				};

				this.state = {
					magnified: true
				};
			} else {
				this.parameters = {
					numberOfColumns: 2
				};

				this.state = {
					magnified: false
				};
			}

			this.animatedUpdate();

			var workPage = this;
			setTimeout(function () {
				var newScrollTop = view.top - (workPage.parameters.reservedTopBuffer + workPage.parameters.topBufferForGrid);
				workPage.scrollTo(newScrollTop, 600, 'swing');
			}, defaultAnimationDuration);
		}

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}
	}]);

	return WorkPage;
}(JABView);