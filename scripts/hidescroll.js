document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const globalNav = document.querySelector('.global-nav');
    const inpageNav = document.querySelector('.inpage-nav');
    const scrollThreshold = 200; //

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (!globalNav || !inpageNav) return;

        if (scrollTop < scrollThreshold) {
            // Scroll with page
            globalNav.style.transform = `translateY(-${scrollTop}px)`;
            inpageNav.style.transform = `translateY(-${scrollTop}px)`;
        } else {
            // Hide after past scrolling
            globalNav.style.transform = '';
            inpageNav.style.transform = '';

            if (scrollTop > lastScrollTop) {
                // Hide
                globalNav.classList.add('nav-hidden');
                inpageNav.classList.add('nav-hidden');
            } else {
                // Show
                globalNav.classList.remove('nav-hidden');
                inpageNav.classList.remove('nav-hidden');
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
