'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logo = function (_JABView) {
	_inherits(Logo, _JABView);

	function Logo(customId) {
		_classCallCheck(this, Logo);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Logo).call(this, customId));

		_this.faded = true;
		_this.requiredHeight = 400;
		_this.requiredWidth = 400;

		// UI
		_this.akeLarssonLabel = new UILabel('AkeLarssonLabel');
		_this.carpentryLabel = new UILabel('CarpentryLabel');

		// Initialize
		return _this;
	}

	//
	// UI
	//

	// Add


	_createClass(Logo, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addAkeLarssonLabel();
			this.addCarpentryLabel();
		}
	}, {
		key: 'addAkeLarssonLabel',
		value: function addAkeLarssonLabel() {
			this.addSubview(this.akeLarssonLabel);
		}
	}, {
		key: 'addCarpentryLabel',
		value: function addCarpentryLabel() {
			this.addSubview(this.carpentryLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(Logo.prototype), 'updateAllUI', this).call(this);

			this.configureAkeLarssonLabel();
			this.positionAkeLarssonLabel();

			this.configureCarpentryLabel();
			this.positionCarpentryLabel();
		}

		// Ake Larsson Label

	}, {
		key: 'configureAkeLarssonLabel',
		value: function configureAkeLarssonLabel() {

			var view = this.akeLarssonLabel;

			view.text = upperCaseARing + "ke Larsson";
			view.fontFamily = 'siteFont';
			view.textColor = 'black';

			var fontSizes = { 'xxs': 24, 'xs': 24, 's': 32, 'm': 28, 'l': 28, 'xl': 28 };
			view.fontSize = fontSizes[sizeClass];
			view.fontWeight = 'normal';
			view.letterSpacing = 3.5;
		}
	}, {
		key: 'positionAkeLarssonLabel',
		value: function positionAkeLarssonLabel() {

			var view = this.akeLarssonLabel;

			var leftBufferForAkeLarssonLabel = 0;
			var topBufferForAkeLarssonLabel = 0;

			var size = view.font.sizeOfString(view.text);
			view.frame = new CGRect(leftBufferForAkeLarssonLabel, topBufferForAkeLarssonLabel, size.width, size.height);
		}

		// Carpentry Label

	}, {
		key: 'configureCarpentryLabel',
		value: function configureCarpentryLabel() {

			var view = this.carpentryLabel;

			view.text = "SNICKERI";
			view.textColor = 'black';

			var fontSizes = { 'xxs': 10, 'xs': 10, 's': 15, 'm': 12, 'l': 13, 'xl': 12 };
			view.fontSize = fontSizes[sizeClass];

			var letterSpacings = { 'xxs': 7.7, 'xs': 7.7, 's': 8.4, 'm': 8.4, 'l': 8.4, 'xl': 8.4 };
			view.letterSpacing = letterSpacings[sizeClass];
			view.fontWeight = 'normal';

			if (this.faded) {
				view.opacity = 0.6;
			} else {
				view.opacity = 0.8;
			}
		}
	}, {
		key: 'positionCarpentryLabel',
		value: function positionCarpentryLabel() {

			var view = this.carpentryLabel;

			var bufferBetweenAkeLarssonLabelAndCarpentryLabel = -1;
			var size = view.font.sizeOfString(view.text);

			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.akeLarssonLabel.x + (this.akeLarssonLabel.width - newFrame.size.width) / 2 + 2;
			newFrame.origin.y = this.akeLarssonLabel.bottom + bufferBetweenAkeLarssonLabelAndCarpentryLabel;

			view.frame = newFrame;

			this.requiredHeight = view.bottom - this.akeLarssonLabel.top;
			this.requiredWidth = this.akeLarssonLabel.width;
		}

		//
		// Actions
		//

	}]);

	return Logo;
}(JABView);