// Variable constants to be used throughout program
const header = document.querySelector('header');
const main = document.querySelector('main');
const scrollToTop = document.getElementById('scrollToTop');
const navSidebar = document.getElementById('navSidebar');
const hamburgerBtn = document.getElementById('hamburgerBtn');

// Eaten from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// If scrollToTop element is found, run this code
if (scrollToTop) {
  // When the user scrolls down 400px(?) from the top of the document, show the
  // button

  scrollToTop.style.display = 'none';  // Fix button showing when page is loaded

  const showButton = () => {
    scrollToTop.style.display = (window.scrollY > 400) ? 'block' : 'none';
  };

  window.addEventListener('scroll', showButton);

  // When the user clicks on the button, scroll to the top of the page
  scrollToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}

// Add the sticky class to header when user scrolls
// Created by matt
const scrollDetect = () => {
  header.classList.toggle('sticky', main.getBoundingClientRect().top <= 0);
  navSidebar.classList.toggle('sticky', main.getBoundingClientRect().top <= 0);

  // Check if user has scrolled a certain amount of pixels to the top
  // Used to be 200 then 198
  if (window.scrollY <= 222) {
    header.classList.remove('sticky');
    navSidebar.classList.remove('sticky')
  }
};

window.addEventListener('scroll', scrollDetect);

// Select all h2 elements within the cardContents class and apply the cardHeader
// class
const h2Elements = document.querySelectorAll('.cardContents h2');
h2Elements.forEach((h2) => {
  const div = document.createElement('div');
  div.classList.add('cardHeader');
  h2.parentNode.insertBefore(div, h2);
  div.appendChild(h2);
});


// Look for images within a "p" element, give them a figure and figcaption
// element. the alt text will display as figcaption
// We will also look for images within figures, if the image is wider than
// 370 pixels, it will remove the float and margins.
const images = document.querySelectorAll('p > img');

if (images) {
  images.forEach((image) => {
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = image.alt;
    figure.appendChild(image.cloneNode(true));
    figure.appendChild(figcaption);

    // Event listener so this runs *after* the page is loaded, a bit hacky but
    // oh well
    window.addEventListener('load', () => {
      figure.classList.add(image.width > 370 ? 'centerImage' : 'floatImage');
    });

    image.replaceWith(figure);
  });
}

// searchbar code for hiding and showing search container
// made by papertek and reinoblassed
const searchInput = document.querySelector('#search-input');
const resultsUnfuck = document.getElementById(
    'results-unfuck');  // Get the results-unfuck element by its id
const resultsContainer = document.getElementById('results-container');

searchInput.addEventListener('keyup', () => {
  console.log('keyup');

  // Get all li elements inside the results-container
  const resultListedItems = resultsContainer.innerHTML;

  // Check if there are any li elements
  if (!resultListedItems == '') {
    // If there are li elements, show the results-unfuck element
    resultsUnfuck.style.display = 'flex';
  } else {
    // If there are no li elements, hide the results-unfuck element
    resultsUnfuck.style.display = 'none';
  }
});

// better ux(?) for the search container
// made by papertek

/* this is pretty jank, i know. one issue im having is when the user still
 * clicks results-unfuck, the container still hides. i have tried other methods
 * but i think this one is the one that works best if theres any other
 * contributor willing to take this please do, lol */

// add event listener to show results-unfuck when the user clicks inside it
resultsUnfuck.addEventListener('click', () => {
  resultsUnfuck.style.display = 'flex';
});

// add event listener to hide results-unfuck when search input loses focus
searchInput.addEventListener('blur', () => {
  // delay hiding results-unfuck. this is to allow time for click events being
  // processed
  setTimeout(() => {
    // check if clicked element is not within search input or results
    // container
    if (!searchInput.contains(document.activeElement) &&
        !resultsUnfuck.contains(document.activeElement)) {
      resultsUnfuck.style.display = 'none';
    }
  }, 100);
});

/* add functionality to the navigation sidebar */
// made by papertek

/* add event listener to toggle 'active' class when clicking the hamburger
 * button */
hamburgerBtn.addEventListener('click', function(event) {
  console.log('Button clicked!');
  navSidebar.classList.toggle('active');
  // stop click event from propagating to the document body
  event.stopPropagation();
});

/* add global click event listener to hide navSidebar when clicking outside of
 * it */
document.addEventListener('click', function(event) {
  // Check if clicked element is not inside the navSidebar or is not the
  // hamburgerBtn
  if (!navSidebar.contains(event.target) && event.target !== hamburgerBtn) {
    navSidebar.classList.remove('active');
  }
});

// Test code
// const IMAGES = document.querySelectorAll('img');

// for (let i = 0; i < IMAGES.length; i++) {
//   let imgSrc = IMAGES[i].getAttribute('src');
//   imgSrc = imgSrc.slice(0, -8)

//   console.log(imgSrc);
// }

// function makeSrcset(imgSrc) {
//   let markup = [];
// }