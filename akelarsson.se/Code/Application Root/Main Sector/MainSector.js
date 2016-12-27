class MainSector extends JABView {

	constructor (customId, projectDataBundles) {
		super(customId)


		// State
		this.state = {
			shouldStartLoading: false,
			pageIndex: 0,
			
			scrollable: false,
			
			selectedProject: null,
			closingProject: false,
			
		}
		
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,
		}

		// UI
		this.contactPage = new ContactPage('ContactPage')
		this.projectsPage = new ProjectsPage('ProjectsPage', projectDataBundles)
		this.homePage = new HomePage('HomePage')
		this.projectPage = new ProjectPage('ProjectPage', projectDataBundles)
		
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
		return [this.homePage, this.projectsPage, this.contactPage, this.projectPage]
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
		this.addProjectsPage()
		this.addHomePage()
		this.addProjectPage()
	}
	
	
	
	
	
	addContactPage () {
		this.addSubview(this.contactPage)
	}
	
	addProjectsPage () {
		this.addSubview(this.projectsPage)
	}
	
	addHomePage () {
		this.addSubview(this.homePage)
	}
	
	addProjectPage () {
		this.addSubview(this.projectPage)
	}
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureContactPage()
		this.positionContactPage()
		
		this.configureProjectsPage()
		this.positionProjectsPage()
		
		this.configureHomePage()
		this.positionHomePage()
		
		this.configureProjectPage()
		this.positionProjectPage()
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
			
			view.opacity = 1
		} else {
			view.opacity = 0
		}
		
		
		view.updateAllUI()
		
	}
	
	positionContactPage () {
		
		var view = this.contactPage
		var newFrame = this.bounds
		
		
		view.frame = newFrame
	}




	// Projects Page
	configureProjectsPage () {
		
		var view = this.projectsPage
		
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
			
			if (this.state.selectedProject != null) {
				view.blur = 20
			} else {
				view.blur = 0
			}

			
			
			
			view.opacity = 1
		} else {
			view.opacity = 0
		}
		
		
		view.updateAllUI()
		
		
		
		$(view.selector).css({
			'scroll-behavior': 'smooth'
		})
		
	}
	
	positionProjectsPage () {
		
		var view = this.projectsPage
		var newFrame = this.bounds
		
		
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
				view.currentlyActive = true
				view.scrollable = this.state.scrollable
			} else {
				view.currentlyActive = false
			}
			
			if (this.state.projectOpen) {
				view.blur = 20
			} else {
				view.blur = 0
			}
			
			view.opacity = 1
		} else {
			view.opacity = 0
			view.currentlyActive = false
		}
		
		view.updateAllUI()
		
	}
	
	positionHomePage () {
		
		
		var view = this.homePage
		var newFrame = this.bounds
		
		view.frame = newFrame
		
	}
	
	
	
	
	
	// Project Page
	configureProjectPage () {
		
		var view = this.projectPage
		
		view.clickable = true
		view.parameters.reservedTopBuffer = this.parameters.reservedTopBuffer
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		view.state = {
			shouldStartLoading: this.state.shouldStartLoading,
		}
		
		view.configureDuration = 200
		view.backgroundColor = 'rgba(0,0,0, 0.3)'
		
		if (this.state.selectedProject != null) {
			this.bringPageToFront(view)
			view.opacity = 1
			view.configureDelay = 0
			
			view.instantUpdate = true
			view.updateAllUI()
			view.instantUpdate = false
			
		} else {
			view.opacity = 0
			view.configureDelay = 200
		}
		
		this.projectPage.updateAllUI()
		
		
	}
	
	positionProjectPage () {
		
		var view = this.projectPage
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
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
			this.projectPage.spaceBarWasPressed()
		}
	}
	
	
	leftArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.leftArrowWasPressed()
		}
	}
	
	upArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.upArrowWasPressed()
		}
	}
	
	rightArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.rightArrowWasPressed()
		}
	}
	
	downArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.downArrowWasPressed()
		}
	}


	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		if (view == this.projectPage) {
			if (view.state.handlingClick) {
				view.state = {handlingClick: false}
			} else {
				this.state = {
					selectedProject: null,
					closingProject: true,
				}
				this.projectPage.state = {
					projectIndex: null,
					imageIndex: null,
				}
				var mainSector = this
				this.parent.mainSectorWantsToRelinquishFullScreen(this)
				this.animatedUpdate(null, function () {
					mainSector.state = {
						closingProject: false,
					}
					mainSector.updateAllUI()
				})
			}
		}
	}
	
	// Contact Page
	
	
	// Projects Page
	projectsPageWantsToOpenProject (projectsPage, projectDataBundle) {
		
		this.state = {
			selectedProject: projectDataBundle,
		}
		this.projectPage.loadProjectDataBundle(projectDataBundle)
		this.parent.mainSectorWantsToUseFullScreen(this)
		this.animatedUpdate()
	}
	
	
	// Home Page
	
	
	// Project Page
	projectPageDidChangeProjectIndexTo(projectPage, projectIndex) {
		this.state = {selectedProjectIndex: projectIndex}
	}
}