class HomePage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			scrollable: true,
			readyToClose: true,
			shouldStartLoading: false,
		}
		this.currentlyActive = null
		
		this.scrollFinishTimer
		
		// Parameters
		this.reservedTopBuffer = 0
		this.topBufferForCoverPhoto = 58
		
		// UI
		this.scrollBuffer = new JABView('ScrollBuffer')
		
		this.coverPhoto = new JABImageView('CoverPhoto')
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
	
	get currentlyActive () {
		return this._currentlyActive
	}
	
	set currentlyActive (newCurrentlyActive) {
		var changed = this.currentlyActive != newCurrentlyActive
		
		if (changed) {
			this._currentlyActive = newCurrentlyActive
			
		}
	}
	
	
	requiredHeightForWidth (width) {
		return this.footer.bottom
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addScrollBuffer()
		
		this.addCoverPhoto()
	}
	
	
	addScrollBuffer () {
		this.addSubview(this.scrollBuffer)
	}
	
	
	
	addCoverPhoto () {
		this.addSubview(this.coverPhoto)
	}
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureScrollBuffer()
		this.positionScrollBuffer()
		
		
		
		this.configureCoverPhoto()
		this.positionCoverPhoto()
		
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

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	
	// Cover Photo
	configureCoverPhoto () {
		
		var view = this.coverPhoto
		
		view.src = './Resources/Images/Home Page/Cover Photo.jpg'
		
		view.black()
	}
	
	positionCoverPhoto () {
		
		var view = this.coverPhoto
		var newFrame = new CGRect()
					
		newFrame.size.width = applicationRoot.contentWidth
		newFrame.size.height = newFrame.size.width * (840.0/1600.0)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.topBufferForCoverPhoto
				
		view.frame = newFrame
		
	}
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		var homePage = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!homePage.state.scrollable) {
				evt.preventDefault()
			}
			
			clearTimeout(homePage.scrollFinishTimer)
			if (homePage.scrollTop <= 0) {
				homePage.scrollFinishTimer = setTimeout(function () {
					homePage.state.readyToClose = true
				}, 50)
			} else {
				homePage.state.readyToClose = false
			}
			
			if (homePage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
				evt.preventDefault()
			}
		})
	}
	
	
	//
	// Actions
	//
	
	
	// Video
	
	
	// Keys
	spaceBarWasPressed () {
		
	}
	
	//
	// Delegate
	//
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
	// JABVimeoView
	vimeoViewDidFinishLoading (vimeoView) {
		
	}
	
}