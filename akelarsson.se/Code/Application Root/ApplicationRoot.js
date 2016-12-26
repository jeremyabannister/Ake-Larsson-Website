class ApplicationRoot extends JABApplicationRoot {

	constructor (customId) {

		super(customId)

		// State
		this.laboratoryEnabled = false
		this.contentWidth = {'xxs': 0, 'xs': 0, 's': 780, 'm': 1000, 'l': 1000, 'xl': 1450}
		this.state = {
			headerBackdropHidden: false,
			
			loadingGifInPlace: false,
			displayLoading: true,
			loadingInitialData: true,
			initialLoadingMinimumDurationHasBeenReached: false,
			imagesLeftToLoad: 4,
		}
		
		
		// Paths for required images
		this.imagePathStem = './Resources/Images'
		this.numberOfWorkPageImages = this.state.imagesLeftToLoad - 2
		
		this.imagePaths = ['/Home Page/Cover Photo.jpg']
		for (var i = 0; i < this.numberOfWorkPageImages; i++) {
			this.imagePaths.push('/Work Page/' + (i + 1) + '.jpg')
		}
		this.imagePaths.push('/Contact Page/Profile Picture.jpg')
	
		
		// Parameters
		this.parameters = {
			sizeOfLoadingGifWrapper: 50,
			initialLoadingMinimumDuration: 3000,
			
			heightOfHeader: 110,
		}
		
		
		if (this.laboratoryEnabled) {
			this.laboratory = new Laboratory('Laboratory')
		} else {
			
			// UI
			this.loadingGifWrapper = new JABGifWrapper('LoadingGifWrapper')
			
			var imagePathsCopy = this.imagePaths.slice(0)
			imagePathsCopy.splice(0, 1)
			imagePathsCopy.splice(-1, 1)
			
			this.mainSector = new MainSector('MainSector', this.imagePathStem, imagePathsCopy)
			this.headerBackdrop = new JABView('HeaderBackdrop')
			this.header = new Header('Header')
		}
		
	}
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.downloadImages()
		var app = this
	}
	
	
	//
	// Getters and Setters
	//
	
	get contentWidth () {
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			return this.width
		} else {
			return this._contentWidth[sizeClass]
		}
	}
	
	set contentWidth (newContentWidth) {
		this._contentWidth = newContentWidth
	}
	
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		if (this.laboratoryEnabled) {
			this.addLaboratory()
		} else {
			
			this.addLoadingGifWrapper()
			
			this.addMainSector()
			this.addHeaderBackdrop()
			this.addHeader()
		}
		
	}
	
	
	addLoadingGifWrapper () {
		this.addSubview(this.loadingGifWrapper)
	}
	
	
	
	addMainSector () {
		this.addSubview(this.mainSector)
	}
	
	addHeaderBackdrop () {
		this.addSubview(this.headerBackdrop)
	}
	
	
	addHeader () {
		this.addSubview(this.header)
	}
	
	
	
	
	
	addLaboratory () {
		this.addSubview(this.laboratory)
	}
	
	
	


	// Update

	updateAllUI () {
		super.updateAllUI()


		if (this.laboratoryEnabled) {
			this.configureLaboratory()
			this.positionLaboratory()
		} else {
			
			
			
			this.configureLoadingGifWrapper()
			this.positionLoadingGifWrapper()
			
			
			if (this.state.loadingGifInPlace) {
				this.configureMainSector()
				this.positionMainSector()
				
				this.configureHeaderBackdrop()
				this.positionHeaderBackdrop()
				
				
				this.configureHeader()
				this.positionHeader()
			}
			
		}

	}
	
	
	
	//  Loading Gif Wrapper
	configureLoadingGifWrapper () {
		
		var view = this.loadingGifWrapper
		view.configureDuration = 100
		
		
		if (this.state.displayLoading) {
			view.opacity = 1
			if (!(view.gif instanceof LoadingGif)) {
				view.gif = new LoadingGif()
			}
			
			if (!view.state.playing) {
				view.play()
				setTimeout(function() {
					applicationRoot.initialLoadingMinimumReached()
				}, this.parameters.initialLoadingMinimumDuration)
			}
		} else {
			if (view.state.playing) {
				view.stop()
			}
			view.opacity = 0
		}
		
	}
	
	positionLoadingGifWrapper () {
		var view = this.loadingGifWrapper
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfLoadingGifWrapper
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
		if (!this.state.loadingGifInPlace) {
			this.state.loadingGifInPlace = true
		}
	}
	
	
	
	
	



	// Main Sector
	configureMainSector () {
		var view = this.mainSector
		
		view.backgroundColor = 'white'
		view.parameters = {
			reservedTopBuffer: this.header.logo.bottom,
			heightOfHeader: this.parameters.heightOfHeader,
		}
		view.projectDataBundles = this.projectDataBundles
		
		view.state = {
			currentlyActive: true,
			shouldStartLoading: !this.state.loadingInitialData,
		}
		
		if (this.state.loadingInitialData) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		view.updateAllUI()
	}

	positionMainSector () {
		
		var verticalShift = 0
		if (this.state.loadingInitialData) {
			verticalShift = 70
		}
		
		this.mainSector.frame = new CGRect(0, verticalShift, this.width, this.height)
		
	}
	
	
	
	// Header Backdrop
	configureHeaderBackdrop () {
		
		var view = this.headerBackdrop
		view.backgroundColor = 'white'
		
		if (this.state.headerBackdropHidden || this.state.loadingInitialData) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
	}
	
	positionHeaderBackdrop () {
		
		var view = this.headerBackdrop
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.parameters.heightOfHeader

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
		view.frame = newFrame
		
	}
	


	
	
	
	// Header
	configureHeader () {
		
		var view = this.header
		
		view.websiteClosed = false
		view.selectedMenuIndex = this.mainSector.state.pageIndex
		view.clickable = true
		
		if (this.state.loadingInitialData) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		view.updateAllUI()
		
	}

	positionHeader () {
		this.header.frame = new CGRect(0, 0, this.width, this.parameters.heightOfHeader)
		
		this.configureMainSector() // This is done because the mainSector's heightOfHeader parameter is dependent on the logo in the header which doesn't get positioned until after the parameter is given to the mainSector
	}
	
	
	
	
	
	
	
	
	
	
	
	
	



	// Laboratory
	configureLaboratory () {

		this.laboratory.backgroundColor = 'white'
	}

	positionLaboratory () {
		if (this.laboratoryEnabled) {
			var newFrame = new CGRect()

			newFrame.size.width = this.width
			newFrame.size.height = this.height

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame

		} else {
			var newFrame = new CGRect()

			newFrame.size.width = 0
			newFrame.size.height = 0

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame
		}
	}


	//
	// Actions
	//
	
	// Navigation
	

	// Scrolling
	userDidScrollByAmount (amount) {
		
	}
	
	
	// Swipe
	leftSwipeDetected () {
		this.mainSector.leftSwipeDetected()
	}
	
	rightSwipeDetected () {
		this.mainSector.rightSwipeDetected()
	}
	
	upSwipeDetected () {
		this.mainSector.upSwipeDetected()
	}
	
	downSwipeDetected () {
		
	}
	
	
	// Keys
	spaceBarWasPressed () {
		this.mainSector.spaceBarWasPressed()
	}
	
	
	leftArrowWasPressed () {
		this.mainSector.leftArrowWasPressed()
	}
	
	upArrowWasPressed () {
		this.mainSector.upArrowWasPressed()
	}
	
	rightArrowWasPressed () {
		this.mainSector.rightArrowWasPressed()
	}
	
	downArrowWasPressed () {
		this.mainSector.downArrowWasPressed()
	}
	
	
	
	
	// Loading
	
	downloadImages () {
		
		for (var i = 0; i < this.imagePaths.length; i++) {
			imageBank.addToQueue(this.imagePathStem + this.imagePaths[i], this)
		}
		
	}
	
	
	initialLoadingMinimumReached () {
		if (this.state.loadingInitialData) {
			this.state = {
				initialLoadingMinimumDurationHasBeenReached: true,
			}
		} else {
			this.state = {
				initialLoadingMinimumDurationHasBeenReached: true,
				displayLoading: false,
			}
			this.animatedUpdate()
		}
	}
	
	
	//
	// Delegate
	//
	
	
	// Image Bank
	imageDidFinishLoading (src) {
		this.state.imagesLeftToLoad -= 1
		if (this.state.imagesLeftToLoad == 0) {
			if (this.state.initialLoadingMinimumDurationHasBeenReached) {
				this.state = {
					loadingInitialData: false,
					displayLoading: false,
				}
				this.animatedUpdate()
			} else {
				this.state = {
					loadingInitialData: false,
				}
			}
		}
	}
	
	
	// JABView
	viewWasClicked (view) {
		
	}
	
	
	// Main Sector
	mainSectorWantsToUseFullScreen (mainSector) {
		this.state = {headerBackdropHidden: true}
		this.animatedUpdate()
	}
	
	
	mainSectorWantsToRelinquishFullScreen (mainSector) {
		this.state = {headerBackdropHidden: false}
		this.animatedUpdate()
	}
	
	
	mainSectorWantsToOpenAboutPage (mainSector) {
		this.mainSector.state = {
			pageIndex: 2,
			projectOpen: false,
		}
		this.animatedUpdate()
	}
	
	
	

	// Header
	headerLogoWasClicked () {
		this.mainSector.state = {
			pageIndex: 0,
		}
		
		this.updateAllUI()
	}

	headerDidSelectPage (pageIndex) {
		
		this.mainSector.state = {
			pageIndex: pageIndex,
			projectOpen: false
		}
		
		this.updateAllUI() // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
		
	}

}
