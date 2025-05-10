document.addEventListener("DOMContentLoaded", () => {
    const globalNav = document.querySelector(".global-nav");
    const inpageNav = document.querySelector(".inpage-nav");
  
    if (!globalNav || !inpageNav) return;
  
    let lastScrollTop = window.scrollY || 0;
    const threshold = 160;
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", () => {
        globalNav.classList.add("nav-hidden");
        inpageNav.classList.add("nav-hidden");
      });
    });
  
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || 0;
  
      if (scrollTop < threshold) {
        // Scoll with page
        globalNav.style.transform = `translateY(-${scrollTop}px)`;
        inpageNav.style.transform = `translateY(-${scrollTop}px)`;
      } else {
        // Jump
        globalNav.style.transform = "";
        inpageNav.style.transform = "";
  
        const goingDown = scrollTop > lastScrollTop;
  
        globalNav.classList.toggle("nav-hidden", goingDown);
        inpageNav.classList.toggle("nav-hidden", goingDown);
      }
  
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  });
  