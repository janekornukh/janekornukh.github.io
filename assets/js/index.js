const projectImages = document.querySelectorAll('.projectImg');

if (projectImages.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('come-in', entry.isIntersecting);
      });
    },
    {
      threshold: 0.2
    }
  );

  projectImages.forEach((image) => observer.observe(image));
}
