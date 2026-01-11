// Performance optimization utilities following performance_config guidelines

// Lazy loading utility
export const lazyLoad = (element: HTMLElement, callback: () => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    },
    {
      rootMargin: "50px", // Load 50px before element is visible
      threshold: 0.1,
    },
  );

  observer.observe(element);
  return observer;
};

// Debounce utility for search and input
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Image lazy loading with placeholder
export const createImageLoader = () => {
  const loadImage = (img: HTMLImageElement, src: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        img.src = src;
        img.classList.add("loaded");
        resolve(image);
      };
      image.onerror = reject;
      image.src = src;
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.classList.add("loading");
            loadImage(img, src)
              .then(() => {
                img.classList.remove("loading");
                observer.unobserve(img);
              })
              .catch(() => {
                img.classList.remove("loading");
                img.classList.add("error");
              });
          }
        }
      });
    },
    {
      rootMargin: "100px",
    },
  );

  return {
    observe: (img: HTMLImageElement) => observer.observe(img),
    disconnect: () => observer.disconnect(),
  };
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Font loading optimization
export const loadFonts = () => {
  if ("fonts" in document) {
    document.fonts.ready.then(() => {
      document.body.classList.add("fonts-loaded");
    });
  }
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("SW registered: ", registration);
    } catch (registrationError) {
      console.log("SW registration failed: ", registrationError);
    }
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ("memory" in performance) {
    const memory = (performance as any).memory;
    console.log("Memory Usage:", {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
    });
  }
};

// Critical CSS loading
export const loadCriticalCSS = (css: string) => {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};

// Non-critical CSS loading
export const loadNonCriticalCSS = (href: string) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.media = "print";
  link.onload = () => {
    link.media = "all";
  };
  document.head.appendChild(link);
};

// Connection speed detection
export const getConnectionSpeed = (): string => {
  const connection = (navigator as any).connection;
  if (connection) {
    if (connection.effectiveType) {
      return connection.effectiveType; // '4g', '3g', '2g', 'slow-2g'
    }
    if (connection.downlink) {
      if (connection.downlink >= 10) return "4g";
      if (connection.downlink >= 1.5) return "3g";
      if (connection.downlink >= 0.4) return "2g";
      return "slow-2g";
    }
  }
  return "unknown";
};

// Adaptive loading based on connection
export const adaptiveLoad = (
  fastContent: () => void,
  slowContent: () => void,
) => {
  const speed = getConnectionSpeed();
  if (speed === "4g" || speed === "unknown") {
    fastContent();
  } else {
    slowContent();
  }
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === "development") {
    try {
      const scripts = Array.from(document.scripts);
      const totalScripts = scripts.length;
      let analyzedScripts = 0;

      console.log(`Found ${totalScripts} scripts to analyze`);

      scripts.forEach((script) => {
        if (script.src && script.src.startsWith(window.location.origin)) {
          // Only try to fetch scripts from the same origin to avoid CORS issues
          try {
            fetch(script.src, { method: "HEAD" })
              .then((response) => {
                const size = response.headers.get("content-length");
                if (size) {
                  console.log(
                    `Script ${script.src.split("/").pop()}: ${(parseInt(size) / 1024).toFixed(2)} KB`,
                  );
                }
                analyzedScripts++;
              })
              .catch((error) => {
                // Silently handle fetch errors for development
                analyzedScripts++;
              });
          } catch (error) {
            // Handle any synchronous errors
            analyzedScripts++;
          }
        } else {
          // For external scripts, just log them without fetching
          if (script.src) {
            console.log(
              `External script: ${script.src.split("/").pop() || script.src}`,
            );
          }
          analyzedScripts++;
        }
      });
    } catch (error) {
      // Silently handle any errors in development mode
      console.warn("Bundle analysis skipped due to environment constraints");
    }
  }
};

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  if ("performance" in window) {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType("paint");

    const metrics = {
      // Core Web Vitals approximation
      FCP:
        paint.find((entry) => entry.name === "first-contentful-paint")
          ?.startTime || 0,
      LCP: 0, // Would need additional measurement
      FID: 0, // Would need additional measurement
      CLS: 0, // Would need additional measurement

      // Navigation timing
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,

      // Resource timing
      totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      serverResponse: navigation.responseEnd - navigation.requestStart,
      domProcessing: navigation.domComplete - navigation.domLoading,
    };

    return metrics;
  }
  return null;
};

// Auto-optimize images based on device capabilities
export const optimizeImageQuality = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Check if device supports WebP
  const supportsWebP =
    canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;

  // Check device pixel ratio
  const pixelRatio = window.devicePixelRatio || 1;

  // Check viewport size
  const isSmallScreen = window.innerWidth < 768;

  return {
    format: supportsWebP ? "webp" : "jpg",
    quality: isSmallScreen ? 0.7 : 0.85,
    pixelRatio: Math.min(pixelRatio, 2), // Cap at 2x for performance
    maxWidth: isSmallScreen ? 800 : 1200,
  };
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  // Preload critical fonts
  preloadResource("/fonts/inter.woff2", "font");

  // Load fonts
  loadFonts();

  // Register service worker
  if (process.env.NODE_ENV === "production") {
    registerServiceWorker();
  }

  // Setup image lazy loading
  const imageLoader = createImageLoader();
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageLoader.observe(img as HTMLImageElement);
  });

  // Monitor performance in development
  if (process.env.NODE_ENV === "development") {
    setTimeout(() => {
      try {
        const metrics = collectPerformanceMetrics();
        if (metrics) {
          console.log("Performance Metrics:", metrics);
        }
        monitorMemoryUsage();
        analyzeBundleSize();
      } catch (error) {
        console.warn("Performance monitoring skipped:", error.message);
      }
    }, 5000);
  }
};
