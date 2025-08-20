import { useRef, useEffect, useContext } from "react";
import { animate, createScope, onScroll } from "animejs";

import "./Experience.sass";
import { globalContext } from "../../main";
import { cursorEnter, cursorLeave } from "../Cursor/anime.js";
import DownloadLogo from "./DownloadLogo.jsx";
import Resume from "../../assets/pdfs/Resume.pdf";

// TODO: Add resize event listener to update isMobile variable

const Experience = ({ exp }) => {
  useEffect(() => {
    document.querySelectorAll(".download").forEach((item) => {
      item.addEventListener("mouseenter", cursorEnter);
      item.addEventListener("mouseleave", cursorLeave);
    });

    return () => {
      document.querySelectorAll(".download").forEach((item) => {
        item.removeEventListener("mouseenter", cursorEnter);
        item.removeEventListener("mouseleave", cursorLeave);
      });
    };
  }, []);
  return (
    <section className="container-experience">
      <div>
        <header className="summary">
          自學生時期，豐富的工作經驗，不僅拓展了我的分析思維；更重要的，是培養面對瓶頸時，主動出擊的積極態度。
        </header>
        <main>
          {exp.map((item, index) => {
            return (
              <SingleExperience
                key={index}
                index={index}
                {...item}
              ></SingleExperience>
            );
          })}
        </main>
        <footer className="download">
          <a href={Resume} target="_blank" rel="noreferrer">
            <DownloadLogo />
            個人履歷下載
          </a>
        </footer>
      </div>
    </section>
  );
};

const SingleExperience = ({
  position,
  company,
  department,
  desc,
  period,
  index,
}) => {
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

      if (!isMobile) {
        animate(".right-panel .date", {
          translateY: {
            to: "-=260px", //! According to padding-top in .sass
            ease: "inOutBack",
            duration: 1500,
          },
          autoplay: onScroll({
            container: "body",
            axis: "y",

            enter: {
              container: `bottom-=${global.containerEndOffset}`,
              target: "top",
            },
            leave: {
              container: `top+=${global.containerStartOffset}`,
              target: "bottom-=300px",
            },
            onSyncComplete: (self) => {
              self.revert();
            },
            sync: "play",
            debug,
          }),
        });
      }
    });

    // Cleanup all anime.js instances
    return () => scope.current.revert();
  }, []);

  const mobile = window.innerWidth <= global.layoutBreakpoint.replace("px", "");

  return (
    <div id={`exp-id-${index}`} className="item" ref={root}>
      <div className="left-panel">
        <div className="full-title">{`${company} ${
          mobile ? department.abbreviation : department.full
        } ｜ ${mobile ? position.abbreviation : position.full}`}</div>
        <div className="date">{`${period.yearStart}/${period.monthStart} - ${period.yearEnd}/${period.monthEnd}`}</div>
        <div className="desc">{desc}</div>
      </div>
      <div className="right-panel">
        <div className="date">{period.yearEnd}</div>
      </div>
    </div>
  );
};

export default Experience;
