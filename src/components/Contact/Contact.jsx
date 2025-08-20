import { useRef, useEffect, useContext } from "react";
import { animate, createScope, createTimeline, onScroll } from "animejs";

import "./Contact.sass";
import { globalContext } from "../../main";
import reactLogo from "../../assets/images/react.svg";

const Contact = () => {
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
      const showContactTiming = 1000;

      createTimeline({
        defaults: {
          ease: "easeOutQuint",
        },
        autoplay: onScroll({
          target: root.current,
          container: "body",
          axis: "y",
          enter: {
            container: `bottom-=${global.containerEndOffset}`,
            target: "top+=600px",
          },
          leave: {
            container: `top+=${global.containerStartOffset}`,
            target: "bottom-=650px",
          },
          sync: 0.2,
          debug,
        }),
      })
        .label("start", 0)
        .label("showContact", showContactTiming)
        // "Get In" slide-left
        .add(
          ".left-slide",
          {
            translateX: {
              to: isMobile ? "-=480px" : "-=1500px", //! According to common width of device viewport
            },
            duration: showContactTiming,
          },
          "start"
        )
        // "Touch" slide-right
        .add(
          ".right-slide",
          {
            translateX: {
              to: isMobile ? "+=480px" : "+=1500px", //! According to common width of device viewport
            },
            duration: showContactTiming,
          },
          "start"
        )
        .add(
          ".front p, .front > div:last-child",
          {
            opacity: {
              to: 1,
            },
            duration: 100,
          },
          "showContact"
        );
    });

    animate(".logo", {
      rotate: 360,
      easing: "easeOutQuint",
      duration: 1500,
      loop: true,
      loopDelay: 250,
    });

    // Cleanup all anime.js instances
    return () => scope.current.revert();
  }, []);

  return (
    <section className="container-4" ref={root}>
      <article className="container-1 container-contact">
        {/* Add two blank <div>s for CSS grid-template-rows in .sass*/}
        <div className="container-1 back">
          <div></div>
          <div className="left-slide">GET IN</div>
          <div className="right-slide">TOUCH</div>
          <div></div>
        </div>
        {/* Add a blank <div> for CSS grid-template-rows in .sass*/}
        <div className="container-1 front">
          <div></div>
          <div className="mail">
            <p>haosung0525@gmail.com</p>
          </div>
          <div className="phone">
            <p>{"(+886) 930 563 033"}</p>
          </div>
          <div>
            <div className="creator">Created with React</div>
            <img
              src={reactLogo}
              className="logo"
              alt="React logo"
              width="18px"
              height="18px"
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default Contact;
