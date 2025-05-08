/**
 * Nova Partners - Advanced Responsive Layout Engine
 */
document.addEventListener('DOMContentLoaded', function() {
    // Init responsive layout
    setupResponsiveLayout();
    
    // Listen for resize with debouncing
    let resizeTimer;
    window.addEventListener('resize', function() {
      document.body.classList.add('resizing');
      
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        refreshLayout();
        document.body.classList.remove('resizing');
      }, 150);
    });
    
    // Setup scroll performance handler
    let scrollTimer;
    window.addEventListener('scroll', function() {
      if (!document.body.classList.contains('scrolling')) {
        document.body.classList.add('scrolling');
      }
      
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function() {
        document.body.classList.remove('scrolling');
      }, 100);
    });
  });
  
  /**
   * Initialize responsive layout system
   */
  function setupResponsiveLayout() {
    // Add transition base class to body
    document.body.classList.add('desktop-transition');
    
    // Add ARIA attributes for accessibility
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section, index) {
      section.setAttribute('aria-label', section.classList[0] + ' section');
    });
    
    // Set initial layout state
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    document.body.classList.add(isDesktop ? 'desktop' : 'mobile');
    
    // Apply initial layout adjustments
    refreshLayout();
    
    // Add element transitions with delay for smoother initial load
    setTimeout(function() {
      const transitionElements = document.querySelectorAll('.hero, .services, .service, .carousel-container, .footer');
      transitionElements.forEach(function(el) {
        el.classList.add('desktop-transition');
      });
    }, 100);
  }
  
  /**
   * Refresh the layout based on current viewport size
   */
  function refreshLayout() {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const wasDesktop = document.body.classList.contains('desktop');
    
    // Only run layout changes when crossing breakpoint
    if ((isDesktop && !wasDesktop) || (!isDesktop && wasDesktop)) {
      document.body.classList.toggle('desktop', isDesktop);
      document.body.classList.toggle('mobile', !isDesktop);
      
      if (isDesktop) {
        applyDesktopLayout();
      } else {
        applyMobileLayout();
      }
    }
    
    // Always adjust carousel height based on current viewport
    adjustCarouselHeight();
  }
  
  /**
   * Apply desktop-specific layout adjustments
   */
  function applyDesktopLayout() {
    // Adjust carousel to proper height
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.style.height = '927.43px';
    }
    
    // Adjust carousel position for proper layout
    const servicesSection = document.querySelector('#header + .services');
    if (servicesSection) {
      if (!servicesSection.classList.contains('desktop-processed')) {
        servicesSection.classList.add('desktop-processed');
        
        // Create Nova logo for footer if needed
        createNovaFooterLogo();
      }
    }
    
    // Make sure securities links are in one row
    const securitiesLinks = document.querySelector('.securities-links');
    if (securitiesLinks) {
      securitiesLinks.style.display = 'flex';
      securitiesLinks.style.flexDirection = 'row';
    }
  }
  
  /**
   * Apply mobile-specific layout adjustments
   */
  function applyMobileLayout() {
    // Reset carousel height for mobile
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.style.height = '600px';
    }
    
    // Reset services section classes
    const servicesSection = document.querySelector('#header + .services');
    if (servicesSection) {
      servicesSection.classList.remove('desktop-processed');
    }
    
    // Reset securities links to column layout
    const securitiesLinks = document.querySelector('.securities-links');
    if (securitiesLinks) {
      securitiesLinks.style.display = 'flex';
      securitiesLinks.style.flexDirection = 'column';
    }
  }
  
  /**
   * Add Nova logo to footer for desktop
   */
  function createNovaFooterLogo() {
    // Already implemented in HTML, just needs styling in CSS
  }
  
  /**
   * Adjust carousel height for smooth responsive behavior
   */
  function adjustCarouselHeight() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;
    
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    
    if (isDesktop) {
      carouselContainer.style.height = '927.43px';
    } else {
      carouselContainer.style.height = '600px';
    }
  }