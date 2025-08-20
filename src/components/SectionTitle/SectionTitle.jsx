import { useRef, useEffect, useContext } from "react";
import { animate, createScope, onScroll } from "animejs";

import "./SectionTitle.sass";
import { globalContext } from "../../main";

const SectionTitle = ({ number, title }) => {
  const root = useRef(null);
  const scope = useRef(null);
  const global = useContext(globalContext);
  const debug = global.debug;

  useEffect(() => {
    scope.current = createScope({
      root: root.current,
      mediaQueries: {
        mobile: `(max-width: ${global.layoutBreakpoint})`,
        reducedMotion: "(prefers-reduced-motion)",
      },
    }).add((self) => {
      const isMobile = self.matches.mobile;

      const titleSlideUp = animate(".text-slide", {
        translateY: {
          to: isMobile ? "-=40px" : "-=60px", //! According to padding-top in .sass
        },
        ease: "easeOutQuint",
        duration: 500,
        autoplay: false,
      });

      animate(".title", {
        width: {
          to: isMobile ? "90%" : "50%", //! According to padding-top in .sass
          easing: "easeOutQuint",
          duration: 1000,
        },
        autoplay: onScroll({
          container: "body",
          axis: "y",

          enter: {
            container: `bottom-=${global.containerEndOffset}`,
            target: "top-=350px",
          },
          leave: {
            container: `top+=${global.containerStartOffset}`,
            target: "bottom-=250px",
          },
          sync: 0.8,
          onSyncComplete: (self) => {
            titleSlideUp.play();
            self.revert();
          },
          debug,
        }),
      });
    });

    // Cleanup all anime.js instances
    return () => scope.current.revert();
  }, []);

  return (
    <section
      id={`section-id-${number}`}
      className="section-container"
      ref={root}
    >
      <div className="title">
        <span>N° {number}</span>
        <span>
          <div className="text-slide">{title}</div>
        </span>
      </div>
    </section>
  );
};

export default SectionTitle;
