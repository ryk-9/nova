/**
 * Nova Partners - Image Carousel
 * Simple carousel that automatically rotates through images
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initCarousel();
  });
  
  function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;
    
    // Get carousel elements
    const slidesContainer = carouselContainer.querySelector('.carousel-slides');
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const dotsContainer = carouselContainer.querySelector('.carousel-controls');
    
    if (!slides.length) return;
    
    let currentIndex = 0;
    let slideInterval;
    const intervalDuration = 5000; // 5 seconds per slide
    
    // Create navigation dots if they don't exist
    if (!dotsContainer.children.length) {
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        
        // Add click event to each dot
        dot.addEventListener('click', () => {
          goToSlide(index);
          resetInterval();
        });
        
        dotsContainer.appendChild(dot);
      });
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
      // Update current index
      currentIndex = index;
      
      // Update slide position
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update active dot
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Function to go to the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }
    
    // Function to reset the interval
    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalDuration);
    }
    
    // Initialize auto-sliding
    resetInterval();
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance to consider a swipe
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
        resetInterval();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
        resetInterval();
      }
    }
    
    // Pause carousel on hover
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    // Resume carousel on mouse leave
    carouselContainer.addEventListener('mouseleave', () => {
      resetInterval();
    });
  }