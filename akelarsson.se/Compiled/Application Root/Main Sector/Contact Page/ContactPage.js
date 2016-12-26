'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactPage = function (_JABView) {
	_inherits(ContactPage, _JABView);

	function ContactPage(customId) {
		_classCallCheck(this, ContactPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactPage).call(this, customId));

		_this.state = {
			readyToClose: true
		};
		_this.subdued = false;

		_this.scrollable = false;

		// Parameters

		_this.parameters = {
			reservedTopBuffer: 0,

			fractionOfAvailableContentWidthForBioText: 5.0 / 7.0,
			bufferBetweenBioTextAndProfilePicture: 50,
			rightBufferForProfilePicture: 100,
			topBufferForProfilePicture: 180,
			sizeOfProfilePicture: 250,

			leftBufferForBioText: 200,
			topBufferForBioText: 180,

			profilePictureAspectRatio: 3264.0 / 2448.0
		};

		_this.reservedTopBuffer = 0;
		_this.topBufferForBioText = 103;
		_this.bottomBufferForEmailAddress = 60;

		// UI
		_this.scrollBuffer = new JABView('ScrollBuffer');

		_this.profilePicture = new JABImageView('ProfilePicture');
		_this.bioText = new UILabel('Bio');
		_this.line = new JABView("Line");
		_this.phoneNumberLabel = new UILabel('PhoneNumberLabel');
		_this.emailAddressLabel = new UILabel('EmailAddressLabel');

		return _this;
	}

	//
	// Init
	//

	_createClass(ContactPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ContactPage.prototype), 'init', this).call(this);

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

			this.addProfilePicture();
			this.addBioText();
			this.addLine();
			this.addPhoneNumberLabel();
			this.addEmailAddressLabel();
		}
	}, {
		key: 'addScrollBuffer',
		value: function addScrollBuffer() {
			this.addSubview(this.scrollBuffer);
		}
	}, {
		key: 'addProfilePicture',
		value: function addProfilePicture() {
			this.addSubview(this.profilePicture);
		}
	}, {
		key: 'addBioText',
		value: function addBioText() {
			this.addSubview(this.bioText);
		}
	}, {
		key: 'addLine',
		value: function addLine() {
			this.addSubview(this.line);
		}
	}, {
		key: 'addPhoneNumberLabel',
		value: function addPhoneNumberLabel() {
			this.addSubview(this.phoneNumberLabel);
		}
	}, {
		key: 'addEmailAddressLabel',
		value: function addEmailAddressLabel() {
			this.addSubview(this.emailAddressLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ContactPage.prototype), 'updateAllUI', this).call(this);

			this.updateParameters();

			this.configureScrollBuffer();
			this.positionScrollBuffer();

			this.configureProfilePicture();
			this.positionProfilePicture();

			this.configureBioText();
			this.positionBioText();

			this.configurePhoneNumberLabel();
			this.positionPhoneNumberLabel();

			this.configureEmailAddressLabel();
			this.positionEmailAddressLabel();

			this.configureLine();
			this.positionLine();
		}

		// Parameters

	}, {
		key: 'updateParameters',
		value: function updateParameters() {

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				this.parameters.topBufferForBioText = 70;
			}
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

		// Profile Picture

	}, {
		key: 'configureProfilePicture',
		value: function configureProfilePicture() {
			var view = this.profilePicture;

			view.src = './Resources/Images/Contact Page/Profile Picture.jpg';
		}
	}, {
		key: 'positionProfilePicture',
		value: function positionProfilePicture() {

			var view = this.profilePicture;
			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioTextAndProfilePicture) * (1 - this.parameters.fractionOfAvailableContentWidthForBioText);
			newFrame.size.height = newFrame.size.width * this.parameters.profilePictureAspectRatio;

			newFrame.origin.x = this.width - newFrame.size.width - (this.width - applicationRoot.contentWidth) / 2;
			newFrame.origin.y = this.parameters.topBufferForProfilePicture;

			view.frame = newFrame;
		}

		// Bio

	}, {
		key: 'configureBioText',
		value: function configureBioText() {

			if (this.bioText.text == '') {
				this.bioText.text = upperCaseARing + "ke Larssons familj kom till Runmar" + lowerCaseODots + " redan 1965. N" + lowerCaseADots + "r han v" + lowerCaseADots + "xte upp byggde hela familjen huset sj" + lowerCaseADots + "lva och han blev invigd i hantverket av sin far som har arbetat som byggnadsingenj" + lowerCaseODots + "r under n" + lowerCaseADots + "stan ett halvsekel.\nMed tiden har det kommit att bli lite av en specialitet att g" + lowerCaseODots + "ra platsbyggda f" + lowerCaseODots + "rvaringsutrymmen av olika slag; hyllor och bokhyllor, garderober, skafferier m.m. " + upperCaseARing + "ke finner ett n" + lowerCaseODots + "je i att hitta bra l" + lowerCaseODots + "sningar f" + lowerCaseODots + "r utrymmen d" + lowerCaseADots + "r inga f" + lowerCaseADots + "rdigbyggda m" + lowerCaseODots + "bler passar in.\nRing f" + lowerCaseODots + "r att f" + lowerCaseARing + " ett f" + lowerCaseODots + "rslag och en offert!";
			}

			this.bioText.textColor = '#999999';
			this.bioText.fontSize = 14;
			this.bioText.fontFamily = 'siteFont';
			this.bioText.fontWeight = 'normal';
			this.bioText.lineHeight = 1.7;

			if (sizeClass == 'xxs') {
				this.bioText.textAlign = 'justify';
				$(this.bioText.selector).css({
					'text-justify': 'inter-word'
				});

				this.bioText.fontSize = 13;
				this.bioText.lineHeight = 1.5;
			} else if (sizeClass == 'xs') {
				this.bioText.textAlign = 'justify';
				$(this.bioText.selector).css({
					'text-justify': 'inter-word'
				});

				this.bioText.fontSize = 20;
				this.bioText.lineHeight = 1.8;
			}

			if (this.subdued) {
				this.bioText.opacity = 0;
			} else {
				this.bioText.opacity = 1;
			}

			if ($(this.bioText.selector).css('textIndent') != '40px') {
				$(this.bioText.selector).css({
					textIndent: '40px'
				});
			}
		}
	}, {
		key: 'positionBioText',
		value: function positionBioText() {

			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioTextAndProfilePicture) * this.parameters.fractionOfAvailableContentWidthForBioText;

			var size = this.bioText.font.sizeOfString(this.bioText.text, newFrame.size.width);
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2;
			newFrame.origin.y = this.profilePicture.top;

			this.bioText.frame = newFrame;
		}

		//Line

	}, {
		key: 'configureLine',
		value: function configureLine() {

			this.line.backgroundColor = 'white';

			if (this.subdued) {
				this.line.opacity = 0;
			} else {
				this.line.opacity = 1;
			}
		}
	}, {
		key: 'positionLine',
		value: function positionLine() {

			var newFrame = new CGRect();

			newFrame.size.width = 60;
			newFrame.size.height = 1;

			newFrame.origin.x = this.emailAddressLabel.x;
			newFrame.origin.y = this.emailAddressLabel.y - newFrame.size.height - 25;

			this.line.frame = newFrame;
		}

		// Phone Number Label

	}, {
		key: 'configurePhoneNumberLabel',
		value: function configurePhoneNumberLabel() {
			var view = this.phoneNumberLabel;
			if (view.text == '') {
				view.text = "telefon &nbsp;:: &nbsp;<span id='phoneNumber---" + this.id + "' style='color:black; cursor: pointer'>070-683-5708</span>";
			}

			view.textColor = '#999999';
			view.fontSize = 13;
			view.fontFamily = 'siteFont';
			view.fontWeight = 'normal';

			if (sizeClass == 'xxs') {
				view.fontSize = 16;
			} else if (sizeClass == 'xs') {
				view.fontSize = 20;
			}

			if (this.subdued) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionPhoneNumberLabel',
		value: function positionPhoneNumberLabel() {
			var view = this.phoneNumberLabel;
			var size = view.font.sizeOfString(view.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.bioText.x;
			newFrame.origin.y = this.bioText.bottom + 56;

			view.frame = newFrame;
		}

		// Email Address Label

	}, {
		key: 'configureEmailAddressLabel',
		value: function configureEmailAddressLabel() {

			var view = this.emailAddressLabel;
			if (view.text == '') {
				view.text = "mejl &nbsp;:: &nbsp;<span id='emailAddress---" + this.id + "' style='color:black; cursor: pointer'>ake34an@gmail.com</span>";

				var parent = this.parent;
				$('#emailAddress---' + this.id).click(function () {
					parent.aboutPageWantsToOpenMailForm(this);
				});
			}

			view.textColor = '#999999';
			view.fontSize = 13;
			view.fontFamily = 'siteFont';
			view.fontWeight = 'normal';

			if (sizeClass == 'xxs') {
				view.fontSize = 16;
			} else if (sizeClass == 'xs') {
				view.fontSize = 20;
			}

			if (this.subdued) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionEmailAddressLabel',
		value: function positionEmailAddressLabel() {

			var view = this.emailAddressLabel;
			var size = view.font.sizeOfString(view.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.bioText.x;
			newFrame.origin.y = this.phoneNumberLabel.bottom + 10;

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {}
		// var aboutPage = this

		// $(this.selector).bind('mousewheel', function(evt) {

		// 	if (!aboutPage.scrollable) {
		// 		evt.preventDefault()
		// 	}

		// 	clearTimeout(aboutPage.scrollFinishTimer)
		// 	if (aboutPage.scrollTop <= 0) {
		// 		aboutPage.scrollFinishTimer = setTimeout(function () {
		// 			aboutPage.state.readyToClose = true
		// 		}, 50)
		// 	} else {
		// 		aboutPage.state.readyToClose = false
		// 	}

		// 	if (aboutPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
		// 		evt.preventDefault()
		// 	}
		// })


		//
		// Actions
		//

		//
		// Delegate
		//

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}
	}]);

	return ContactPage;
}(JABView);