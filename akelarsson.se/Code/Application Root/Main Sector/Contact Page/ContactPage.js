class ContactPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			readyToClose: true
		}
		this.subdued = false
		
		this.scrollable = false
		
		// Parameters
		
		this.parameters = {
			reservedTopBuffer: 0,
			
			fractionOfAvailableContentWidthForBioText: (5.0/7.0),
			bufferBetweenBioTextAndProfilePicture: 50,
			rightBufferForProfilePicture: 100,
			topBufferForProfilePicture: 180,
			sizeOfProfilePicture: 250,
			
			leftBufferForBioText: 200,
			topBufferForBioText: 180,
			
			profilePictureAspectRatio: (3264.0/2448.0),
		}
		
		this.reservedTopBuffer = 0
		this.topBufferForBioText = 103
		this.bottomBufferForEmailAddress = 60
		
		// UI
		this.scrollBuffer = new JABView('ScrollBuffer')
		
		
		this.profilePicture = new JABImageView('ProfilePicture')
		this.bioText = new UILabel('Bio')
		this.line = new JABView("Line")
		this.phoneNumberLabel = new UILabel('PhoneNumberLabel')
		this.emailAddressLabel = new UILabel('EmailAddressLabel')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.startEventListeners()
	}
	
	
	//
	// Getters and Setters
	//
	
	requiredHeightForWidth (width) {
		
		return this.footer.bottom
	}
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addScrollBuffer()
		
		
		this.addProfilePicture()
		this.addBioText()
		this.addLine()
		this.addPhoneNumberLabel()
		this.addEmailAddressLabel()
		
	}
	
	
	
	addScrollBuffer () {
		this.addSubview(this.scrollBuffer)
	}
	
	
	
	
	
	
	
	addProfilePicture () {
		this.addSubview(this.profilePicture)
	}
	
	addBioText () {
		this.addSubview(this.bioText)
	}
	
	addLine () {
		this.addSubview(this.line)
	}
	
	addPhoneNumberLabel () {
		this.addSubview(this.phoneNumberLabel)
	}
	
	addEmailAddressLabel () {
		this.addSubview(this.emailAddressLabel)
	}
	
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.updateParameters()
		
		
		
		this.configureScrollBuffer()
		this.positionScrollBuffer()
		
		
		
		
		this.configureProfilePicture()
		this.positionProfilePicture()
		
		this.configureBioText()
		this.positionBioText()
		
		this.configurePhoneNumberLabel()
		this.positionPhoneNumberLabel()
		
		this.configureEmailAddressLabel()
		this.positionEmailAddressLabel()
		
		this.configureLine()
		this.positionLine()
		
		
		
	}
	
	
	// Parameters
	updateParameters () {
		
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			this.parameters.topBufferForBioText = 70
			this.parameters.fractionOfAvailableContentWidthForBioText = (6.0/7.0)
		} else {
			this.parameters.fractionOfAvailableContentWidthForBioText = (5.0/7.0)
		}
		
	}
	
	
	
	
	// Scroll Buffer
	configureScrollBuffer () {
		
		var view = this.scrollBuffer
		
		view.backgroundColor = this.backgroundColor
		
	}
	
	positionScrollBuffer () {
		var view = this.scrollBuffer
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height + 50
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			newFrame.size.height = this.emailAddressLabel.bottom + 50
		}

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
		
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	
	
	
	// Profile Picture
	configureProfilePicture () {
		var view = this.profilePicture
		
		view.src = './Resources/Images/Contact Page/Profile Picture.jpg'
	}
	
	positionProfilePicture () {
		
		var view = this.profilePicture
		var newFrame = new CGRect()
							
		newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioTextAndProfilePicture) * (1 - this.parameters.fractionOfAvailableContentWidthForBioText)
		newFrame.size.height = newFrame.size.width * this.parameters.profilePictureAspectRatio

		newFrame.origin.x = this.width - newFrame.size.width - (this.width - applicationRoot.contentWidth)/2
		newFrame.origin.y = this.parameters.topBufferForProfilePicture
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			newFrame.size.width = applicationRoot.contentWidth * 0.5
			newFrame.size.height = newFrame.size.width * this.parameters.profilePictureAspectRatio
			
			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.parameters.topBufferForProfilePicture
		}
							
		view.frame = newFrame
	}
	
	
	// Bio
	configureBioText () {
		
		if (this.bioText.text == '') {
			this.bioText.text = upperCaseARing + "ke Larssons familj kom till Runmar" + lowerCaseODots + " redan 1965. N" + lowerCaseADots + "r han v" + lowerCaseADots + "xte upp byggde hela familjen huset sj" + lowerCaseADots + "lva och han blev invigd i hantverket av sin far som har arbetat som byggnadsingenj" + lowerCaseODots + "r under n" + lowerCaseADots + "stan ett halvsekel.\nMed tiden har det kommit att bli lite av en specialitet att g" + lowerCaseODots + "ra platsbyggda f" + lowerCaseODots + "rvaringsutrymmen av olika slag; hyllor och bokhyllor, garderober, skafferier m.m. " + upperCaseARing + "ke finner ett n" + lowerCaseODots + "je i att hitta bra l" + lowerCaseODots + "sningar f" + lowerCaseODots + "r utrymmen d" + lowerCaseADots + "r inga f" + lowerCaseADots + "rdigbyggda m" + lowerCaseODots + "bler passar in.\nRing f" + lowerCaseODots + "r att f" + lowerCaseARing + " ett f" + lowerCaseODots + "rslag och en offert!"
			
			
		}
		
		
		this.bioText.textColor = '#999999'
		this.bioText.fontSize = 14
		this.bioText.fontFamily = 'siteFont'
		this.bioText.fontWeight = 'normal'
		this.bioText.lineHeight = 1.7
		
		if (sizeClass == 'xxs') {
			this.bioText.textAlign = 'justify'
			$(this.bioText.selector).css({
				'text-justify': 'inter-word'
			})
			
			this.bioText.fontSize = 13
			this.bioText.lineHeight = 1.5
			
		} else if (sizeClass == 'xs') {
			this.bioText.textAlign = 'justify'
			$(this.bioText.selector).css({
				'text-justify': 'inter-word'
			})
			
			this.bioText.fontSize = 20
			this.bioText.lineHeight = 1.8
		}
		
		
		if (this.subdued) {
			this.bioText.opacity = 0
		} else {
			this.bioText.opacity = 1
		}
		
		if ($(this.bioText.selector).css('textIndent') != '40px') {
			$(this.bioText.selector).css({
				textIndent: '40px'
			})
		}
		
		
		
	}
	
	positionBioText () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioTextAndProfilePicture) * this.parameters.fractionOfAvailableContentWidthForBioText
				
		var size = this.bioText.font.sizeOfString(this.bioText.text, newFrame.size.width)
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2
		newFrame.origin.y = this.profilePicture.top
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.profilePicture.bottom + 20
		}
		
		
		this.bioText.frame = newFrame
	}
	
	
	//Line
	configureLine () {
		
		this.line.backgroundColor = 'white'
		
		if (this.subdued) {
			this.line.opacity = 0
		} else {
			this.line.opacity = 1
		}

	}

	positionLine () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = 60
		newFrame.size.height = 1

		newFrame.origin.x = this.emailAddressLabel.x
		newFrame.origin.y = this.emailAddressLabel.y - newFrame.size.height - 25
					
		this.line.frame = newFrame
	}
	
	
	
	// Phone Number Label
	configurePhoneNumberLabel () {
		var view = this.phoneNumberLabel
		if (view.text == '') {
			view.text = "telefon &nbsp;:: &nbsp;<span id='phoneNumber---" + this.id + "' style='color:black; cursor: pointer'>070-683-5708</span>"
		}
		
		view.textColor = '#999999'
		view.fontSize = 13
		view.fontFamily = 'siteFont'
		view.fontWeight = 'normal'
		
		
		if (sizeClass == 'xxs') {
			view.fontSize = 16
		} else if (sizeClass == 'xs') {
			view.fontSize = 20
		}
		
		
		if (this.subdued) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
	}
	
	positionPhoneNumberLabel () {
		var view = this.phoneNumberLabel
		var size = view.font.sizeOfString(view.text)
		var newFrame = new CGRect()
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.bioText.x
		newFrame.origin.y = this.bioText.bottom + 56
		
					
		view.frame = newFrame
	}
	
	
	// Email Address Label
	configureEmailAddressLabel () {
		
		var view = this.emailAddressLabel
		if (view.text == '') {
			view.text = "mejl &nbsp;:: &nbsp;<span id='emailAddress---" + this.id + "' style='color:black; cursor: pointer'>ake34an@gmail.com</span>"
			
		}
		
		view.textColor = '#999999'
		view.fontSize = 13
		view.fontFamily = 'siteFont'
		view.fontWeight = 'normal'
		
		
		if (sizeClass == 'xxs') {
			view.fontSize = 16
		} else if (sizeClass == 'xs') {
			view.fontSize = 20
		}
		
		
		if (this.subdued) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
	}
	
	positionEmailAddressLabel () {
		
		var view = this.emailAddressLabel
		var size = view.font.sizeOfString(view.text)
		var newFrame = new CGRect()
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.bioText.x
		newFrame.origin.y = this.phoneNumberLabel.bottom + 10
		
					
		view.frame = newFrame
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
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
	}
	
	
	//
	// Actions
	//
	
	
	//
	// Delegate
	//
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
}