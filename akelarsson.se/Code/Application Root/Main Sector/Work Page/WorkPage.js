class WorkPage extends JABView {

	constructor (customId, imagePathStem, imagePaths) {
		super(customId)
		
		
		// State
		this.state = {
			shouldStartLoading: false,
			
			magnified: false,
			
			imagePathStem: imagePathStem,
			imagePaths: imagePaths,
		}
		

		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,
			
			imageAspectRatio: (2448.0/3264.0),
			
			numberOfColumns: 2,
			topBufferForGrid: 58,
			betweenBufferForGridRows: 10,
			betweenBufferForGridColumns: 10,
			bottomBufferForGrid: 50,
			
			heightOfScrollBuffer: 100,
		}
		
		
		// Timers
		this.scrollFinishTimer
		
		
		
		// UI
		this.scrollBuffer = new JABView('ScrollBuffer')
		
		
		this.imageViews = []
		for (var i = 0; i < imagePaths.length; i++) {
			this.imageViews.push(new JABImageView('ImageView' + (i + 1)))
		}
		
		
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
		
		this.addImageViews()
		
	}
	
	
	addScrollBuffer () {
		this.addSubview(this.scrollBuffer)
	}
	
	
	
	
	
	addImageViews () {
		for (var i = 0; i < this.imageViews.length; i++) {
			this.addSubview(this.imageViews[i])
		}
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.updateParameters()
		
		
		this.configureScrollBuffer()
		this.positionScrollBuffer()
		
		
		this.configureImageViews()
		this.positionImageViews()
	}
	
	
	
	// Parameters
	updateParameters () {
		
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
	
	
	
	
	
	
	
	// Image Views
	configureImageViews () {
		for (var i = 0; i < this.imageViews.length; i++) {
			var view = this.imageViews[i]
			
			var src = this.state.imagePathStem + this.state.imagePaths[i]
			if (view.src != src) {
				view.src = src
			}
			
			view.clickable = true
			view.cursor = 'pointer'
		}
	}
	
	positionImageViews () {
		for (var i = 0; i < this.imageViews.length; i++) {
			var view = this.imageViews[i]
			var newFrame = new CGRect()
								
			newFrame.size.width = (applicationRoot.contentWidth - ((this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns))/this.parameters.numberOfColumns
			newFrame.size.height = newFrame.size.width * this.parameters.imageAspectRatio

			newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2 + (i % this.parameters.numberOfColumns) * (newFrame.size.width + this.parameters.betweenBufferForGridColumns)
			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForGrid + Math.floor(i/this.parameters.numberOfColumns) * (newFrame.size.height + this.parameters.betweenBufferForGridRows)
			
			view.frame = newFrame
		}
	}

	
	
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
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
	}




	//
	// Actions
	//
	
	
	
	
	
	
	// Keys
	spaceBarWasPressed () {
		
	}
	
	
	leftArrowWasPressed () {
		
	}
	
	upArrowWasPressed () {
		
	}
	
	rightArrowWasPressed () {
		
	}
	
	downArrowWasPressed () {
		
	}
	
	
	
	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		if (!this.state.magnified) {
			this.parameters = {
				numberOfColumns: 1,
			}
			
			this.state = {
				magnified: true,
			}
		} else {
			this.parameters = {
				numberOfColumns: 2,
			}
			
			this.state = {
				magnified: false,
			}
		}
		
		
		
		this.animatedUpdate()
		
		var workPage = this
		setTimeout(function() {
			var newScrollTop = view.top - (workPage.parameters.reservedTopBuffer + workPage.parameters.topBufferForGrid)
			workPage.scrollTo(newScrollTop, 600, 'swing')
		}, defaultAnimationDuration)
	}
	
	
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
	
	
}
