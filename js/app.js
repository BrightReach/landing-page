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
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const CreateLink = () => {
  const navMenu = document.getElementById('navbar__list')
  //  const navMenu = document.getElementsByClassName('navbar__menu')
  const sectionElement = document.querySelectorAll('[data-nav]')
  const home = document.createElement('li')

  home.innerHTML = '<a class="menu__link" href="#">Home</a>'
  navMenu.appendChild(home)

  for (const elem of sectionElement) {
    const navName = elem.getAttribute('data-nav')
    const navLink = elem.getAttribute('id')
    const link = document.createElement('li')
    link.innerHTML = `<a class="menu__link" href="#${navLink}">${navName}</a>`
    navMenu.appendChild(link)
  }
}

// Add class 'active' to section when near top of viewport

const ActiveScroll = () => {
  const sectionElement = document.querySelectorAll('[data-nav]')

  window.onscroll = function () {
    for (const elem of sectionElement) {
      if (InViewport(elem)) {
        elem.classList.add('active-section')
      } else {
        elem.classList.remove('active-section')
      }
    }
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
