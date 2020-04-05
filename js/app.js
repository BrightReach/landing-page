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
const sectionElement = document.querySelectorAll('[data-nav]');
const mainPage = document.getElementsByName('main');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const Scroll = (target) => {
  for (const elem of sectionElement) {
    if (target === elem.getAttribute('id')) {
      console.log(target, elem.getAttribute('id'))
      const direct = elem.getBoundingClientRect()
      scrollTo(direct.x, direct.y)
    } else {
      return false
    }
  }
};

const InViewport = (elem) => {
  const bounding = elem.getBoundingClientRect();

  return (
    bounding.top >= -500 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

const ActiveLink = (index) => {
  const navLink = document.querySelectorAll('[data-target]');
  for (const link of navLink) {
    if (index === link.getAttribute('data-target')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const CreateLink = () => {
  const navMenu = document.getElementById('navbar__list');

  const home = document.createElement('li');
  home.innerHTML = '<a class="menu__link">Home</a>';
  navMenu.appendChild(home);

  for (const elem of sectionElement) {
    const navName = elem.getAttribute('data-nav');
    const navLink = elem.getAttribute('id');
    const link = document.createElement('li');
    link.innerHTML = `<a class='menu__link' data-target="${navLink}">${navName}</a>`;
    navMenu.appendChild(link);
  }
};

// Add class 'active' to section when near top of viewport

const ActiveScroll = () => {
  window.onscroll = function () {
    for (const elem of sectionElement) {
      if (InViewport(elem)) {
        elem.classList.add('active-section');
        ActiveLink(elem.getAttribute('id'));
      } else {
        elem.classList.remove('active-section');
      }
    }
  };
};

// Scroll to anchor ID using scrollTO event

const ClickScroll = () => {
  const navMenu = document.getElementById('navbar__list')
  navMenu.onclick = function (){
    //let target = this.childNodes

    console.log(this.childNodes)
    Scroll(this.getAttribute('data-target'))
    /*for (const link of navLink) {
      //Scroll(link.getAttribute('data-target'))
      
    }*/
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

CreateLink();

// Scroll to section on link click

ClickScroll();

// Set sections as active

ActiveScroll();
