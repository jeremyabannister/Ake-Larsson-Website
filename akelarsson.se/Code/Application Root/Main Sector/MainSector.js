class MainSector extends JABView {

	constructor (customId, imagePathStem, workImagePaths) {
		super(customId)


		// State
		this.state = {
			currentlyActive: false,
			shouldStartLoading: false,
			pageIndex: 0,
			
			scrollable: false,
		}
		
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,
		}

		// UI
		this.contactPage = new ContactPage('ContactPage')
		this.workPage = new WorkPage('WorkPage', imagePathStem, workImagePaths)
		this.homePage = new HomePage('HomePage')
		
		
	}

	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
	}
	
	
	//
	// Getters and Setters
	//
	
	get websiteClosed () {
		return this._websiteClosed
	}
	
	set websiteClosed (newWebsiteClosed) {
		if (!this.websiteClosedLocked) {
			this._websiteClosed = newWebsiteClosed
		}
	}
	
	
	get currentlyActivePage () {
		return this.pages[this.state.pageIndex]
	}
	
	get pages () {
		return [this.homePage, this.workPage, this.contactPage]
	}
	
	
	get readyToClose () {
		return (this.currentlyActivePage.state.readyToClose)
	}
	

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addContactPage()
		this.addWorkPage()
		this.addHomePage()
		
	}
	
	
	
	
	
	addContactPage () {
		this.addSubview(this.contactPage)
	}
	
	addWorkPage () {
		this.addSubview(this.workPage)
	}
	
	addHomePage () {
		this.addSubview(this.homePage)
	}
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureContactPage()
		this.positionContactPage()
		
		this.configureWorkPage()
		this.positionWorkPage()
		
		this.configureHomePage()
		this.positionHomePage()
		

	}
	
	
	
	
	
	
	// Contact Page
	configureContactPage () {
		
		var view = this.contactPage
		
		view.backgroundColor = 'white'
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		view.scrollable = true
		
		
		view.reservedTopBuffer = this.parameters.reservedTopBuffer
		
		if (this.currentlyActivePage == view) {
			
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			if (this.state.projectOpen) {
				view.blur = 20
			} else {
				view.blur = 0
			}
			
			if (this.state.currentlyActive) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
		} else {
			view.opacity = 0
		}
		
		
		view.updateAllUI()
		
	}
	
	positionContactPage () {
		
		var view = this.contactPage
		var newFrame = this.bounds
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
	}




	// Work Page
	configureWorkPage () {
		
		var view = this.workPage
		
		view.backgroundColor = 'white'
		view.overflowX = 'hidden'
		view.state = {
			shouldStartLoading: this.state.shouldStartLoading,
		}
		
		view.overflowY = 'scroll'
		
		view.parameters = {
			reservedTopBuffer: this.parameters.reservedTopBuffer,
			heightOfHeader: this.parameters.heightOfHeader,
		}
		
		
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			view.state.scrollable = true
			
			if (this.state.projectOpen) {
				view.blur = 20
			} else {
				view.blur = 0
			}

			
			
			
			setComingSoon(view.state.comingSoon)
			
			if (this.state.currentlyActive) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
		} else {
			view.opacity = 0
		}
		
		
		view.updateAllUI()
		
		
		
		$(view.selector).css({
			'scroll-behavior': 'smooth'
		})
		
	}
	
	positionWorkPage () {
		
		var view = this.workPage
		var newFrame = this.bounds
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
		
	}
	
	
	
	
	
	
	
	
	
	// Home Page
	configureHomePage () {
		
		var view = this.homePage
		
		view.backgroundColor = 'white'
		view.overflow = 'scroll'
		view.reservedTopBuffer = this.parameters.reservedTopBuffer
		view.state = {
			shouldStartLoading: this.state.shouldStartLoading,
		}
		
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			if (!this.state.projectOpen) {
				view.currentlyActive = this.state.currentlyActive
				view.scrollable = this.state.scrollable
			} else {
				view.currentlyActive = false
			}
			
			if (this.state.projectOpen) {
				view.blur = 20
			} else {
				view.blur = 0
			}
			
			if (this.state.currentlyActive) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
		} else {
			view.opacity = 0
			view.currentlyActive = false
		}
		
		view.updateAllUI()
		
	}
	
	positionHomePage () {
		
		
		var view = this.homePage
		var newFrame = this.bounds
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
		
	}
	
	


	





	//
	// Actions
	//
	
	// Navigation
	bringPageToFront (page) {
		
		var otherPages = []
		for (var i = 0; i < this.pages.length; i++) {
			if (this.pages[i] != page) {
				otherPages.push(this.pages[i])
			}
		}
		
		if (!this.subviewIsAboveSubviews(page, otherPages)) {
			this.insertSubviewAboveSubviews(page, otherPages)
		}
	}

	
	
	
	// Swipe
	leftSwipeDetected () {
		
	}
	
	rightSwipeDetected () {
		
	}
	
	upSwipeDetected () {
		
	}
	
	
	
	// Keys
	spaceBarWasPressed () {
		if (this.state.pageIndex == 0) {
			this.homePage.spaceBarWasPressed()
		} else if (this.state.pageIndex == 1) {
			this.workPage.spaceBarWasPressed()
		}
	}
	
	
	leftArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.workPage.leftArrowWasPressed()
		}
	}
	
	upArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.workPage.upArrowWasPressed()
		}
	}
	
	rightArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.workPage.rightArrowWasPressed()
		}
	}
	
	downArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.workPage.downArrowWasPressed()
		}
	}


	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		
	}
	
	// About Page
	
	
	// Projects Page
	
	
	
	// Home Page
	
	
	// Project Page
	projectPageDidChangeProjectIndexTo(projectPage, projectIndex) {
		this.state = {selectedProjectIndex: projectIndex}
	}
}


function setComingSoon (newComingSoon) {
	
	if (newComingSoon != null) {
		var changed = (applicationRoot.mainSector.comingSoon != newComingSoon)
		applicationRoot.mainSector.comingSoon = newComingSoon
		
		if (changed) {
			applicationRoot.mainSector.updateAllUI()
		}
	}
	
}