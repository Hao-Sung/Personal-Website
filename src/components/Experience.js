import React, { useRef, useEffect } from "react";
import anime from "animejs";

import { throttle } from "../utils";
import Resume from "../assets/pdf/Resume.pdf";

const Experience = ({ exp }) => {
  return (
    <section className="container-auto center-article">
      <article className="experience-container">
        <header className="summary">
          大學期間，豐富的兼職經驗，不僅拓展了我的分析思維；更重要的，是面對同事及上司時，精簡有效的溝通實力。
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
            個人履歷下載 {"->"}
          </a>
        </footer>
      </article>
    </section>
  );
};

const SingleExperience = ({ position, company, desc, date, index }) => {
  const anima = useRef(null);
  const experienceRef = useRef(null);

  const scrollHandler = () => {
    throttle(() => {
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const targetTop = experienceRef.current.getBoundingClientRect().top;
      if (targetTop < windowHeight * 0.75) {
        anima.current.play();
        window.removeEventListener("scroll", scrollHandler);
      }
    }, 250);
  };
  useEffect(() => {
    anima.current = anime({
      targets: `#exp-id-${index} .date`,
      translateY: ["1vh", "-23.5vh"],
      easing: "easeOutQuint",
      autoplay: false,
      duration: 1500,
    });
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <div id={`exp-id-${index}`} className="item" ref={experienceRef}>
      <div className="left-panel">
        <div className="pos">{`${company} ｜ ${position}`}</div>
        <div className="desc">{desc}</div>
      </div>
      <div className="right-panel">
        <div className="date">
          <br />
          {date}
        </div>
      </div>
    </div>
  );
};

export default Experience;
