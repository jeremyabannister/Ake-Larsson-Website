class WorkPagePanel extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			imagePanel: true, // Alternative to image is text - this variable tells whether to display image or text (not both)
			src: '',
			
			
			text: '',
		}
		
		// Parameters
		this.parameters = {
			
		}
		
		// UI
		this.imageView = new JABImageView('ImageView')
		
		this.titleLabel = new UILabel('TitleLabel')
		this.textLabel = new UILabel('TextLabel')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addImageView()
		
		this.addTitleLabel()
		this.addTextLabel()
	}
	
	
	addImageView () {
		this.addSubview(this.imageView)
	}
	
	
	
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	addTextLabel () {
		this.addSubview(this.textLabel)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureImageView()
		this.positionImageView()
		
		
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
		
		this.configureTextLabel()
		this.positionTextLabel()
	}
	
	
	
	// Image View
	configureImageView () {
		var view = this.imageView
		
		if (this.state.imagePanel) {
			view.opacity = 1
			view.src = this.state.src
		} else {
			view.opacity = 0
		}
		
		
	}
	
	positionImageView () {
		
		var view = this.imageView
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	// Title Label
	configureTitleLabel () {
		var view = this.textLabel
		
		if (this.state.imagePanel) {
			view.opacity = 0
		} else {
			view.opacity = 1
			view.text = this.state.text
		}
	}
	
	positionTitleLabel () {
		var view = this.titleLabel
		var size = view.font.sizeOfString(view.text)
		var newFrame = new CGRect()
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = 0
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
	
	
	// Text Label
	configureTextLabel () {
		
		var view = this.textLabel
		
		if (this.state.imagePanel) {
			view.opacity = 0
		} else {
			view.opacity = 1
			view.text = this.state.text
		}
		
	}
	
	positionTextLabel () {
		var view = this.textLabel
		var size = view.font.sizeOfString(view.text)
		var newFrame = new CGRect()
							
		newFrame.size.width = 0
		newFrame.size.height = 0

		newFrame.origin.x = 0
		newFrame.origin.y = 0
							
		view.frame = newFrame
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
	
}