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
     * the page offset to prevent inconsistencies.
     */

    if (target === elem.getAttribute('id')) {
      const direct = elem.getBoundingClientRect()
      scrollTo(direct.x, direct.y + window.pageYOffset)
    } 
  }
}

// This is an event function used to scroll to the top of the page when clicked upon.

const topButtonClick = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Whenever the user has scrolled from top, the Top button will appear.

const topScrollButton = () => {
  const button = document.getElementById('top_anchor');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

/* Detects each section that is within the viewport and returns the bounding
 * rectangle with its variables as a boolean function
 */

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

// Adds the "active" class into the Navigation bar's anchor based on section within the viewport
 

const activeLink = (index) => {
  const navLink = document.querySelectorAll('[data-target]');
  for (const link of navLink) {

    /* If the function's parameter matches with the target link of the iterated
     * object, the "active" class will be added into the specified link.
     * Otherwise, the "active" class of the that link will be removed.
     */

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

// Builds the links within the navigation bar

const createLink = () => {
  const navMenu = document.getElementById('navbar__list');
   for (const elem of sectionElement) {

  /* The title and ID of the sections are declared as variables to identify the links' titles and its data-targets
   * while creating list-item elements as a declared variable
  */

    const navName = elem.getAttribute('data-nav');
    const navLink = elem.getAttribute('id');
    const link = document.createElement('li');
  
    /* Adds the html within the list-item as an anchor before using the navLink as the data-target
     * and appends the list-item as a child into the navigation menu.
    */

    link.innerHTML = `<a class='menu__link' data-target="${navLink}">${navName}</a>`;
    navMenu.appendChild(link);
  }
};

/* Adds the "active-section" class into the specified section whenever the
 * it is in the user's viewport. This is also accompanied with the activeLink function
 * for the specified anchor and the topScrollButton function that can detect whenever the
 * Top Anchor button is in view.
 */

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

// Whenever the user clicks on the specified link, it will scroll the user to the specified section.
  
const clickScroll = () => {

  // Declares a variable to create an array of the navigation menu from the created links
  let navLink = document.getElementById('navbar__list').childNodes


  navLink.forEach(element => {
    // Declares another variable to retrieve the anchors within the navigation bar
    const link = element.childNodes[0]

    /* Whenever the user clicks on the specific link, the data-target of the specified link will be
     * used as a parameter for the sectionDetect function to scroll the user's page to that specified 
     * section.
      */ 

    link.onclick = function (e) {
      sectionDetect(e.target.getAttribute('data-target'))
    }  
  })
}

/**
 * End Main Functions
 * Begin Events
 *
 */

createLink();
clickScroll();
activeScroll();


