const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
var throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

// const inVeiwTrigger = (elementRef, animeRef, topRatio) => {
//   const windowHeight =
//     window.innerHeight || document.documentElement.clientHeight;
//   const targetTop = elementRef.current.getBoundingClientRect().top;

//   if (targetTop < windowHeight * topRatio) {
//     animeRef.current.play();
//   }
// };

export { throttle, reportWebVitals };
