/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

//  const navMenu = document.getElementsByClassName('navbar__menu')
const sectionElement = document.querySelectorAll('[data-nav]')
const mainPage = document.getElementsByName('main')

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const Scroll = (target) => {

  scrollTo(target.x, target.y)

}

const InViewport = (elem) => {

  const bounding = elem.getBoundingClientRect()

  return (
    bounding.top >= -500 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const ActiveLink = (index) => {

  const navLink = document.querySelectorAll('[data-target]')
  console.log(index)
    for (const link of navLink) {
      let lastID
      if(index = link.getAttribute('data-target')){
     link.classList.add('active')
     //lastID = index.getAttribute('data-target'))
     //console.log(lastID)
      } else if (index != lastID) {
        lastID.classList.remove('active')
      }
  }
}

const RemoveLink = (index) => {

  const navLink = document.querySelectorAll('[data-target]')
  console.log(navLink)
    for (const link of navLink) {
      if(index != link.getAttribute('data-target')){
     link.classList.remove('active')
      }
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const CreateLink = () => {
  const navMenu = document.getElementById('navbar__list')

  const home = document.createElement('li')
  home.innerHTML = '<a class="menu__link">Home</a>'
  navMenu.appendChild(home)

 for (const elem of sectionElement) {
    const navName = elem.getAttribute('data-nav')
    const navLink = elem.getAttribute('id')
    const link = document.createElement('li')
    link.innerHTML = `<a class="menu__link" data-target="${navLink}">${navName}</a>`
    navMenu.appendChild(link)
  }
}

// Add class 'active' to section when near top of viewport

const ActiveScroll = () => {

  window.onscroll = function () {
   
    //const navLink = document.querySelectorAll('[data-id]')
    //console.log(navLink)
    for (const elem of sectionElement) {
      

      if (InViewport(elem)) {
        elem.classList.add('active-section')
        ActiveLink(elem.getAttribute('id'));
      } else {
        elem.classList.remove('active-section')
        //RemoveLink(elem.getAttribute('id'));
      }
    }

    /*for (let i = 0; i < sectionElement.length; i++) {
      console.log(i)
      if (InViewport(i)) {
        elem.classList.add('active-section')
      } else {
        elem.classList.remove('active-section')
      }
    }*/
  }
}

// Scroll to anchor ID using scrollTO event

const ClickScroll = () => {

}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

CreateLink()

// Scroll to section on link click

// Set sections as active

ActiveScroll()
