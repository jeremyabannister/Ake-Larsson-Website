'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkPagePanel = function (_JABView) {
	_inherits(WorkPagePanel, _JABView);

	function WorkPagePanel(customId) {
		_classCallCheck(this, WorkPagePanel);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WorkPagePanel).call(this, customId));

		_this.state = {
			imagePanel: true, // Alternative to image is text - this variable tells whether to display image or text (not both)
			src: '',

			text: ''
		};

		// Parameters
		_this.parameters = {};

		// UI
		_this.imageView = new JABImageView('ImageView');

		_this.titleLabel = new UILabel('TitleLabel');
		_this.textLabel = new UILabel('TextLabel');

		return _this;
	}

	//
	// Init
	//

	_createClass(WorkPagePanel, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(WorkPagePanel.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addImageView();

			this.addTitleLabel();
			this.addTextLabel();
		}
	}, {
		key: 'addImageView',
		value: function addImageView() {
			this.addSubview(this.imageView);
		}
	}, {
		key: 'addTitleLabel',
		value: function addTitleLabel() {
			this.addSubview(this.titleLabel);
		}
	}, {
		key: 'addTextLabel',
		value: function addTextLabel() {
			this.addSubview(this.textLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(WorkPagePanel.prototype), 'updateAllUI', this).call(this);

			this.configureImageView();
			this.positionImageView();

			this.configureTitleLabel();
			this.positionTitleLabel();

			this.configureTextLabel();
			this.positionTextLabel();
		}

		// Image View

	}, {
		key: 'configureImageView',
		value: function configureImageView() {
			var view = this.imageView;

			if (this.state.imagePanel) {
				view.opacity = 1;
				view.src = this.state.src;
			} else {
				view.opacity = 0;
			}
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {

			var view = this.imageView;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Title Label

	}, {
		key: 'configureTitleLabel',
		value: function configureTitleLabel() {
			var view = this.textLabel;

			if (this.state.imagePanel) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
				view.text = this.state.text;
			}
		}
	}, {
		key: 'positionTitleLabel',
		value: function positionTitleLabel() {
			var view = this.titleLabel;
			var size = view.font.sizeOfString(view.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = 0;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Text Label

	}, {
		key: 'configureTextLabel',
		value: function configureTextLabel() {

			var view = this.textLabel;

			if (this.state.imagePanel) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
				view.text = this.state.text;
			}
		}
	}, {
		key: 'positionTextLabel',
		value: function positionTextLabel() {
			var view = this.textLabel;
			var size = view.font.sizeOfString(view.text);
			var newFrame = new CGRect();

			newFrame.size.width = 0;
			newFrame.size.height = 0;

			newFrame.origin.x = 0;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		//
		// Delegate
		//

	}]);

	return WorkPagePanel;
}(JABView);