import { useRef, useEffect, useContext } from "react";
import { animate, createScope, createTimeline, onScroll } from "animejs";

import "./Greeting.sass";
import { globalContext } from "../../main";

import TextRing from "./TextRing.jsx";
import bgImage from "../../data/bgImage.js";
import mouseLogo from "../../assets/images/mouse.svg";

const Greeting = () => {
  const root = useRef(null);
  const scope = useRef(null);
  const global = useContext(globalContext);
  const debug = global.debug;

  const showImageTiming = 1000;

  useEffect(() => {
    scope.current = createScope({
      root: root.current,
      mediaQueries: {
        mobile: `(max-width: ${global.layoutBreakpoint})`,
        reducedMotion: "(prefers-reduced-motion)",
      },
    }).add((self) => {
      const isMobile = self.matches.mobile;

      const tl = createTimeline({
        defaults: {
          ease: "outCirc",
        },
        autoplay: true,
      })
        .label("start", 0)
        .label("showImages", showImageTiming)
        .add(
          "#name, #scrollDownSign",
          {
            translateY: { to: "-=40px" }, //! According to padding-top in .sass (However, only 1/2 amount is needed)
            opacity: { to: [0, 1] },
            duration: showImageTiming,
            delay: 400,
          },
          "start"
        );

      for (let i = 0; i < bgImage.length; i++) {
        // Scale down translateX amount on mobile devices
        let xCoord = bgImage[i].coord.translateX;
        if (isMobile) {
          const [xCoordMagnitude] = xCoord.match(/(\d+)/);
          xCoord = xCoord.replace(/(\d+)/, Math.round(xCoordMagnitude / 3));
        }
        tl.add(
          `.back div:nth-child(${Number(i) + 1})`,
          {
            ...bgImage[i].coord,
            translateX: xCoord,
            opacity: [0, 1],
            duration: 800,
          },
          "showImages"
        );
      }

      animate(".text-ring", {
        rotate: {
          to: [0, 360],
        },
        ease: "linear",
        duration: 15000,
        loop: true,
      });

      animate(".full-name", {
        filter: {
          to: ["blur(0px)", "blur(15px)"],
          ease: "easeOutQuint",
          duration: 1000,
        },
        autoplay: onScroll({
          container: "body",
          axis: "y",

          enter: {
            container: `bottom-=${global.containerEndOffset}`,
            target: "top+=80%",
          },
          leave: {
            container: `top+=${global.containerStartOffset}`,
            target: "bottom-=10%",
          },
          sync: 0.8,
          debug,
        }),
      });
    });

    animate("#cursor-center,#cursor-ring", {
      opacity: { to: [0, 1] },
      duration: showImageTiming,
      delay: 400,
    });

    // Cleanup all anime.js instances
    return () => scope.current.revert();
  }, []);

  return (
    <section className="container-2" ref={root}>
      {/* Greeting: z-index 1 ~ 2 */}
      <div className="container-1 sticky">
        <article className="container-1 full-name">
          {/* Project Snapshot Page */}
          <div className="container-1 back">
            {bgImage.map((image, index) => {
              return (
                <div className="snapshot" key={`bgImage-id-${index}`}>
                  <img src={image.src} alt={image.alt} />
                </div>
              );
            })}
          </div>
          {/* Full Name Page */}
          <div className="container-1 front">
            <div id="name">HaoSung,</div>
            <div id="scrollDownSign">
              <img src={mouseLogo} alt="Mouse Icon" />
              <TextRing text="  ScrollDown  ScrollDown  ScrollDown" />
            </div>
          </div>
        </article>
      </div>
      {/* Greeting: z-index 3 */}
      <div className="container-1 welcome">
        <article className="container-1 welcome-message">
          <div>
            <span>WELCOME</span>
          </div>
          <div>
            <span>TO MY</span>
          </div>
          <div>
            <span>CREATIVITY</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Greeting;
