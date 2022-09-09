const iconMobile = document.querySelector('.header-menu-icon');
const headerMenu = document.querySelector('.header-menu');

let isMenuOpen = false;

let mobileMenuDOM;

// to close menu, you have to remove the class
const closeMenu = () => {
  mobileMenuDOM.classList.remove('open');
};

// creation a 'div', and append the class 'mobile-menu'
// avoid closing menu on the click
// clone of links in the normal menu.
const createMobileMenu = () => {
  mobileMenuDOM = document.createElement('div');
  mobileMenuDOM.classList.add('mobile-menu');
  mobileMenuDOM.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector('ul').cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

// if the menu isn't created, it will create.
// in all cases, it will open with adding 'open' class.
const openMenu = () => {
  if (!mobileMenuDOM) {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add('open');
};

// allow to open or to close the menu depending on its status
const toggleMobileMenu = (event) => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

// one click on the icon will open or close the menu
// and stop the propagation on window
iconMobile.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

// collect clicks on the window to close the menu.
window.addEventListener('click', () => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

// if the width of the window > 480px
// then the menu is closing if the menu is open
window.addEventListener('resize', (event) => {
  if (window.innerWidth > 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});
