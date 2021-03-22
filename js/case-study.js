let mainNavLinks = document.querySelectorAll(".case-study-nav .list-inline-item a");
let mainSections = document.querySelectorAll(".case-study-section");

let lastId;
let cur = [];

$(".case-study-section").css("--section-padding-top", "160px");

$(window).scroll(function() {
    let navHeight = $(".case-study-nav").height();

    let sectionPadding = navHeight > 76 ? 220 : 160;

    $(".case-study-section").css("--section-padding-top", sectionPadding + "px");
    
    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
      let section = document.querySelector(link.hash);
  
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight - sectionPadding > fromTop
      ) {
        link.classList.add("selected");
      } else {
        link.classList.remove("selected");
      }
    });
}).scroll();
