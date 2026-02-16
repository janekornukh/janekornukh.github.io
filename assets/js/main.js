const HEADER_SELECTOR = "#header";
const MOBILE_NAV_CLASS = "mobile-nav-active";

function onWindowLoad(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback, { once: true });
  }
}

function getHeaderOffset() {
  const header = document.querySelector(HEADER_SELECTOR);
  return header ? header.offsetHeight : 0;
}

function scrollToTarget(target) {
  const extraOffset = 20;
  const headerOffset = getHeaderOffset();
  const y = target.getBoundingClientRect().top + window.scrollY - headerOffset + extraOffset;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

function initPreloader() {
  onWindowLoad(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader) {
      return;
    }

    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 250ms ease";
      setTimeout(() => preloader.remove(), 250);
    }, 100);
  });
}

function initSmoothScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest(".nav-menu a, .mobile-nav a, .scrollto");
    if (!link || !link.hash) {
      return;
    }

    const samePath = location.pathname.replace(/^\//, "") === link.pathname.replace(/^\//, "");
    const sameHost = location.hostname === link.hostname;
    if (!samePath || !sameHost) {
      return;
    }

    const target = document.querySelector(link.hash);
    if (!target) {
      return;
    }

    event.preventDefault();

    if (link.getAttribute("href") === "#header") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToTarget(target);
    }

    const navItem = link.closest("li");
    if (navItem) {
      document.querySelectorAll(".nav-menu .active, .mobile-nav .active").forEach((item) => {
        item.classList.remove("active");
      });
      navItem.classList.add("active");
    }

    closeMobileNav();
  });
}

function closeMobileNav() {
  document.body.classList.remove(MOBILE_NAV_CLASS);

  const toggleIcon = document.querySelector(".mobile-nav-toggle i");
  if (toggleIcon) {
    toggleIcon.classList.add("icofont-navigation-menu");
    toggleIcon.classList.remove("icofont-close");
  }

  const overlay = document.querySelector(".mobile-nav-overly");
  if (overlay) {
    overlay.style.display = "none";
  }
}

function openMobileNav() {
  document.body.classList.add(MOBILE_NAV_CLASS);

  const toggleIcon = document.querySelector(".mobile-nav-toggle i");
  if (toggleIcon) {
    toggleIcon.classList.remove("icofont-navigation-menu");
    toggleIcon.classList.add("icofont-close");
  }

  const overlay = document.querySelector(".mobile-nav-overly");
  if (overlay) {
    overlay.style.display = "block";
  }
}

function initMobileNavigation() {
  const navMenu = document.querySelector(".nav-menu");
  if (!navMenu) {
    return;
  }

  const mobileNav = navMenu.cloneNode(true);
  mobileNav.className = "mobile-nav d-lg-none";
  document.body.appendChild(mobileNav);

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "mobile-nav-toggle d-lg-none";
  toggleButton.innerHTML = '<i class="icofont-navigation-menu"></i>';
  document.body.prepend(toggleButton);

  const overlay = document.createElement("div");
  overlay.className = "mobile-nav-overly";
  overlay.style.display = "none";
  document.body.appendChild(overlay);

  toggleButton.addEventListener("click", () => {
    if (document.body.classList.contains(MOBILE_NAV_CLASS)) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNav.addEventListener("click", (event) => {
    const dropdownLink = event.target.closest(".drop-down > a");
    if (!dropdownLink) {
      return;
    }

    event.preventDefault();
    const dropdownContent = dropdownLink.nextElementSibling;
    const dropdownItem = dropdownLink.parentElement;

    if (dropdownContent) {
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    }
    if (dropdownItem) {
      dropdownItem.classList.toggle("active");
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = event.target.closest(".mobile-nav, .mobile-nav-toggle");
    if (!clickedInsideNav && document.body.classList.contains(MOBILE_NAV_CLASS)) {
      closeMobileNav();
    }
  });
}

function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) {
    return;
  }

  const toggleVisibility = () => {
    button.style.display = window.scrollY > 100 ? "block" : "none";
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initSkillsProgress() {
  const container = document.querySelector(".skills-content");
  if (!container || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        document.querySelectorAll(".progress .progress-bar").forEach((bar) => {
          const value = bar.getAttribute("aria-valuenow");
          if (value) {
            bar.style.width = `${value}%`;
          }
        });

        instance.disconnect();
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(container);
}

function initCounterAnimation() {
  const counters = document.querySelectorAll("[data-toggle='counter-up']");
  if (!counters.length || !("IntersectionObserver" in window)) {
    return;
  }

  const animateCounter = (counter) => {
    const raw = counter.textContent.trim();
    const target = Number(raw.replace(/,/g, ""));
    if (Number.isNaN(target)) {
      return;
    }

    const duration = 1000;
    const start = performance.now();

    const frame = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initSimpleCarousel(containerSelector, itemSelector) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const items = Array.from(container.querySelectorAll(itemSelector));
    if (items.length <= 1) {
      return;
    }

    let activeIndex = 0;

    const showItem = (index) => {
      items.forEach((item, itemIndex) => {
        item.style.display = itemIndex === index ? "block" : "none";
      });
    };

    showItem(activeIndex);

    setInterval(() => {
      activeIndex = (activeIndex + 1) % items.length;
      showItem(activeIndex);
    }, 4500);
  });
}

function initPortfolioFilters() {
  const filterItems = document.querySelectorAll("#portfolio-flters li");
  const portfolioItems = document.querySelectorAll(".portfolio-container .portfolio-item");

  if (!filterItems.length || !portfolioItems.length) {
    return;
  }

  filterItems.forEach((filter) => {
    filter.addEventListener("click", () => {
      filterItems.forEach((item) => item.classList.remove("filter-active"));
      filter.classList.add("filter-active");

      const targetFilter = filter.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (!targetFilter || targetFilter === "*") {
          item.style.display = "block";
          return;
        }

        const filterClass = targetFilter.replace(".", "");
        item.style.display = item.classList.contains(filterClass) ? "block" : "none";
      });
    });
  });
}

function initVenoboxFallback() {
  document.querySelectorAll("a.venobox[data-vbtype='iframe']").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function initAos() {
  if (window.AOS && typeof window.AOS.init === "function") {
    window.AOS.init({
      duration: 1000,
      once: true
    });
  }
}

initPreloader();
initSmoothScroll();
initMobileNavigation();
initBackToTop();
initSkillsProgress();
initCounterAnimation();
initSimpleCarousel(".testimonials-carousel", ".testimonial-item");
initSimpleCarousel(".portfolio-details-carousel", "img");
initPortfolioFilters();
initVenoboxFallback();
onWindowLoad(initAos);
