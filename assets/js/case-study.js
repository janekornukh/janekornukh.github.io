const sectionNodes = Array.from(document.querySelectorAll('.case-study-section'));
const navLinks = Array.from(document.querySelectorAll('.case-study-nav .list-inline-item a'));
const navContainer = document.querySelector('.case-study-nav');

if (sectionNodes.length && navLinks.length && navContainer) {
  const updateLayout = () => {
    const navHeight = navContainer.offsetHeight;
    const sectionPadding = navHeight > 76 ? 220 : 160;

    sectionNodes.forEach((section) => {
      section.style.setProperty('--section-padding-top', `${sectionPadding}px`);
    });

    const fromTop = window.scrollY;

    navLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (!section) {
        return;
      }

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight - sectionPadding;
      const isActive = sectionTop <= fromTop && sectionBottom > fromTop;

      link.classList.toggle('selected', isActive);
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    requestAnimationFrame(() => {
      updateLayout();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateLayout);
  updateLayout();
}
