
  // individual options for Scroll Reveal elements
      var contactReveal = {
        origin: 'left',
        distance: '200px',
        duration: 800
      },
      workH4Reveal = {
        origin: 'bottom',
        distance: '100px',
        duration: 500
      };

    window.sr = ScrollReveal();
    sr.reveal('.services');
    sr.reveal('#what h4');
    sr.reveal('#work h4', workH4Reveal);
    sr.reveal('#contact', contactReveal);


$(document).ready(function(){

  // Navigation Functionality
  // -------------------------------------------------

  // define navigation components as variables
  var $menuIcon = $('.menu-icon'),
    $navigation = $('.navigation'),
    $mainNavigation = $('.main-navigation'),
    $navigationLink = $('.main-navigation a');

  // add active class to clicked menu item to display nav
    $menuIcon.click(function(e) {
    e.preventDefault();
    $navigation.toggleClass('active');
  });

  // store target sections of index page in array
    var $targetArea = [
      $('#hero'),
      $('#about'),
      $('#services'),
      $('#what'),
      $('#work'),
      $('#contact')
    ];

  // click event for nav links, determine child index
  //        and use corresponding target array location
    $($navigationLink).click(function(){
      var $index = $($navigationLink).index(this);
      $.scrollTo($targetArea[$index], 1800);
      // hide navigation menu
      $navigation.removeClass('active');
      return false;
    });

});
