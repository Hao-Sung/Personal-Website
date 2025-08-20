import { useRef, useEffect, useContext } from "react";
import { animate, createScope, onScroll, utils } from "animejs";

import "./Project.sass";
import { globalContext } from "../../main";

// TODO: Adjust .project width to 80% in mobile viewport
// TODO: put all animation into scope

const Project = ({ projects }) => {
  return (
    <>
      {projects.map((project, index) => {
        return (
          <SingleProject
            key={`project-id-${index}`}
            {...project}
            index={index}
          ></SingleProject>
        );
      })}
    </>
  );
};

const SingleProject = ({ title, image, keywords, href, index }) => {
  const root = useRef(null);
  const scope = useRef(null);
  const global = useContext(globalContext);
  const debug = global.debug;

  const createProjectOnScroll = (alignment) => {
    const translateXMagnitude = alignment === "left" ? "+=300px" : "-=300px";
    return {
      translateX: {
        to: translateXMagnitude,
        ease: "easeOutQuint",
        duration: 1500,
      },
      autoplay: onScroll({
        container: "body",
        axis: "y",

        enter: {
          container: `bottom-=${global.containerEndOffset}`,
          target: "top-=300px",
        },
        leave: {
          container: `top+=${global.containerStartOffset}`,
          target: "bottom+=200px",
        },
        sync: 0.25,
        debug,
      }),
    };
  };

  let setterProjectMaxWidth;
  const limitKeywordWidth = (keys, isMobile) => {
    const reference = utils.$(`#project-${index} header`);
    const target = utils.$(`#project-${index} .keywords`);
    const targetContainer = utils.$(`#project-${index} .container-keywords`);
    const targetWidth = utils.get(reference, "clientWidth");
    let keyClientWidth;

    // Fill in Keyword list first to measure clientWidth of Keyword container
    utils.set(target, { innerHTML: keys });
    keyClientWidth = utils.get(target, "clientWidth");

    // Setting maxWidth to keep Keyword list same wide as its header
    if (!isMobile) {
      setterProjectMaxWidth = utils.set(targetContainer, {
        maxWidth: `${targetWidth}px`,
      });
    }

    // Return clientWidth of Keyword to help configure animation
    return keyClientWidth;
  };

  useEffect(() => {
    // Modified layout based on device (define all logic in JS, not in SASS)
    const isMobile =
      window.innerWidth <= global.layoutBreakpoint.replace("px", "");
    const isEven = index % 2 == 1;
    if (!isMobile && isEven) {
      // Query with id selector to prevent malfunction
      utils.set(utils.$(`#project-${index} .main`), {
        justifyContent: "flex-end",
      });
    }

    // Create and insert keyword list
    const sep = "&nbsp;".repeat(5);
    const keywordWidth = limitKeywordWidth(
      (sep + keywords.join(sep)).repeat(2),
      isMobile
    );

    scope.current = createScope({
      root: root.current,
      mediaQueries: {
        mobile: `(max-width: ${global.layoutBreakpoint})`,
        reducedMotion: "(prefers-reduced-motion)",
      },
    }).add((self) => {
      const scopeIsMobile = self.matches.mobile;

      if (!scopeIsMobile) {
        if (!isEven) {
          animate(`#project-${index} .project`, createProjectOnScroll("left"));
        } else {
          animate(`#project-${index} .project`, createProjectOnScroll("right"));
        }
      }

      animate(`#project-${index} .keywords`, {
        translateX: {
          to: `-=${keywordWidth / 2}px`,
        },
        ease: "linear",
        duration: 15000,
        loop: true,
      });
    });

    // Use animate outside of scope, otherwise "#cursor-center" can't be accessed
    const $front = document.querySelector(`#project-${index} .front`);
    const cursorEnter = () => {
      animate("#cursor-center", {
        scale: [1, 8],
        ease: "outQuint",
        duration: 400,
      });
      animate("#cursor-ring", {
        opacity: [1, 0],
        ease: "outQuint",
        duration: 400,
      });
    };
    const cursorLeave = () => {
      animate("#cursor-center", {
        scale: {
          to: [8, 1],
        },
        ease: "outQuint",
        duration: 400,
      });
      animate("#cursor-ring", {
        opacity: [0, 1],
        ease: "outQuint",
        duration: 600,
      });
    };
    $front.addEventListener("mouseenter", cursorEnter);
    $front.addEventListener("mouseleave", cursorLeave);

    return () => {
      // Cleanup all anime.js instances
      scope.current.revert();

      // Reset .Project MaxWidth
      if (!isMobile) {
        setterProjectMaxWidth.revert();
      }

      // Reset .keywords content (setter.revert() not work with innerHTML property...)
      utils.set(utils.$(".main .keywords"), { innerHTML: "" });

      // Remove EventListener
      $front.removeEventListener("mouseenter", cursorEnter);
      $front.removeEventListener("mouseleave", cursorLeave);
    };
  }, []);

  return (
    <section id={`project-${index}`} className="container-project" ref={root}>
      <div></div>
      <div className="main">
        <article className="project">
          <div className="back">
            <header>{title}</header>
            <div className="container-keywords">
              <p className="keywords"></p>
            </div>
          </div>
          <div
            className="front"
            onClick={() => {
              for (let i = 0; i < href.length; i++) {
                window.open(href[i], "_blank");
              }
            }}
          >
            <img src={image.link} alt={image.alt}></img>
          </div>
        </article>
      </div>
      <div></div>
    </section>
  );
};

export default Project;
