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


// sectionElement is used as a global variable to create iterations

const sectionElement = document.querySelectorAll('[data-nav]');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Used to direct the user to the section that matches with the link

const sectionDetect = (target) => {
  for (const elem of sectionElement) {

    /* If the function's parameter matches with the variable of the
     * iterated section, then the co-ordinates of the section's
     * bounding rectangle will be used to scroll towards section with
     * the page offset to prevent inconsistencies. */

    if (target === elem.getAttribute('id')) {
      const direct = elem.getBoundingClientRect()
      scrollTo(direct.x, direct.y + window.pageYOffset)
    } 
  }
}

// This is an event function used to scroll to the top of the page when clicked upon

const topButtonClick = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Whenever the 

const topScrollButton = () => {

  const button = document.getElementById('top_anchor');
  console.log(document.body.scrollTop);
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

const navBarDisappear = () => {
  
  const navMenu = document.querySelector('.navbar__menu');
  let vanish = () => setTimeout(() => navMenu.style.display = 'none', 5000);
  let cease = clearTimeout(vanish);
  let prevScrollPos = window.pageYOffset;

  window.onscroll = () => {const currentScrollPos = window.pageYOffset;
  
    if (prevScrollPos > currentScrollPos) {
      cease;
      navMenu.style.display = 'block';
    } else {
      vanish();
    }
    prevScrollPos = currentScrollPos;}
 
}

const inViewPort = (elem) => {
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

const activeLink = (index) => {
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

const createLink = () => {
  const navMenu = document.getElementById('navbar__list');

  const home = document.createElement('li');
  home.innerHTML = '<a class="menu__link" href="#">Home</a>';
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

const activeScroll = () => {
  window.onscroll = function () {
    topScrollButton();
    for (const elem of sectionElement) {
      if (inViewPort(elem)) {
        elem.classList.add('active-section');
        activeLink(elem.getAttribute('id'));
      } else {
        elem.classList.remove('active-section');
      }
    }
  };
};

// sectionDetect to anchor ID using scrollTO event

const clickScroll = () => {
  const navMenu = document.getElementById('navbar__list')
  let navLink = navMenu.childNodes
  navLink.forEach(element => {
    const link = element.childNodes[0]
    link.onclick = function (e) {
      console.log(e.target.getAttribute('data-target'))
      sectionDetect(e.target.getAttribute('data-target'))
    }  
  })
}


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

createLink();

// sectionDetect to section on link click

clickScroll();

// Set sections as active

activeScroll();

navBarDisappear();

