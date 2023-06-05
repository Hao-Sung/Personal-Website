import React, { useRef, useEffect } from "react";
import anime from "animejs";

import { throttle } from "../utils";

const Projects = ({ projects }) => {
  return (
    <>
      {projects.map((project, index) => {
        return (
          <Project
            key={`project-id-${index}`}
            {...project}
            index={index}
          ></Project>
        );
      })}
    </>
  );
};

const Project = ({ title, image, desc, keywords, position, links, index }) => {
  const anima = useRef(null);
  const projectRef = useRef(null);

  const scrollHandler = () => {
    throttle(() => {
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const targetTop = projectRef.current.getBoundingClientRect().top;

      if (targetTop < windowHeight * 0.5) {
        anima.current.play();
        window.removeEventListener("scroll", scrollHandler);
      }
    }, 250);
  };
  useEffect(() => {
    anima.current = anime.timeline({
      easing: "easeOutQuint",
      autoplay: false,
      duration: 1500,
    });
    anima.current
      .add({
        targets: `#project-id-${index} .left-panel`,
        translateY: ["20%", "0%"],
        translateX: ["-30%", "0%"],
        opacity: [0, 1],
        rotate: [5, 0],
      })
      .add(
        {
          targets: `#project-id-${index} .right-panel`,
          translateY: ["20%", "0%"],
          opacity: [0, 1],
        },
        0
      );
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    // project-container
    <section id={`project-id-${index}`} className="container-1 center-article">
      <article className="project-container" ref={projectRef}>
        <div className="left-panel">
          <div className="title">
            <p>{title}</p>
          </div>
          <div className="image-container">
            <img src={image.link} alt={image.alt} />
          </div>
        </div>
        <div className="right-panel">
          <div className="desc">
            <p>{desc}</p>
          </div>
          <div className="keyword">
            <>
              {keywords.map((key, index) => {
                return (
                  <p key={index}>
                    <span>#</span>
                    {key}
                  </p>
                );
              })}
            </>
          </div>
          <div className="position">
            <p>{position.date}</p>
            <p>
              {position.icon}
              {position.company}
            </p>
          </div>
          <div className="link">
            {links.map((link, idx) => {
              return (
                <a
                  key={`project-${index}-${idx}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.title}
                </a>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Projects;
