class Logo extends JABView {

	constructor (customId) {
		super(customId)

		// State
		this.faded = true
		this.requiredHeight = 400
		this.requiredWidth = 400

		// UI
		this.akeLarssonLabel = new UILabel('AkeLarssonLabel')
		this.carpentryLabel = new UILabel('CarpentryLabel')
		
		
		// Initialize
	}



	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addAkeLarssonLabel()
		this.addCarpentryLabel()
		
	}
	
	
	
	addAkeLarssonLabel () {
		this.addSubview(this.akeLarssonLabel)
	}
	
	addCarpentryLabel () {
		this.addSubview(this.carpentryLabel)
	}



	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureAkeLarssonLabel()
		this.positionAkeLarssonLabel()



		this.configureCarpentryLabel()
		this.positionCarpentryLabel()

	}



	// Ake Larsson Label

	configureAkeLarssonLabel () {
		
		var view = this.akeLarssonLabel

		view.text = upperCaseARing + "ke Larsson"
		view.fontFamily = 'siteFont'
		view.textColor = 'black'
		
		var fontSizes = {'xxs': 24, 'xs': 24, 's': 32, 'm': 28, 'l': 28, 'xl': 28};
		view.fontSize = fontSizes[sizeClass]
		view.fontWeight = 'normal'
		view.letterSpacing = 3.5

	}

	positionAkeLarssonLabel() {
		
		var view = this.akeLarssonLabel

		var leftBufferForAkeLarssonLabel = 0
		var topBufferForAkeLarssonLabel = 0

		var size = view.font.sizeOfString(view.text)
		view.frame = new CGRect(leftBufferForAkeLarssonLabel, topBufferForAkeLarssonLabel, size.width, size.height)
	}





	// Carpentry Label
	configureCarpentryLabel () {
		
		var view = this.carpentryLabel
		
		view.text = "SNICKERI"
		view.textColor = 'black'
		
		var fontSizes = {'xxs':10, 'xs': 10, 's': 15, 'm': 12, 'l': 13, 'xl': 12}
		view.fontSize = fontSizes[sizeClass]
		
		var letterSpacings = {'xxs': 7.7, 'xs': 7.7, 's': 8.4, 'm': 8.4, 'l': 8.4, 'xl': 8.4}
		view.letterSpacing = letterSpacings[sizeClass]
		view.fontWeight = 'normal'


		if (this.faded) {
			view.opacity = 0.6
		} else {
			view.opacity = 0.8
		}

	}

	positionCarpentryLabel () {
		
		var view = this.carpentryLabel

		var bufferBetweenAkeLarssonLabelAndCarpentryLabel = -1
		var size = view.font.sizeOfString(view.text)

		var newFrame = new CGRect()

		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.akeLarssonLabel.x + (this.akeLarssonLabel.width - newFrame.size.width)/2 + 2
		newFrame.origin.y = this.akeLarssonLabel.bottom + bufferBetweenAkeLarssonLabelAndCarpentryLabel

		view.frame = newFrame



		this.requiredHeight = view.bottom - this.akeLarssonLabel.top
		this.requiredWidth = this.akeLarssonLabel.width

	}



	//
	// Actions
	//

}
