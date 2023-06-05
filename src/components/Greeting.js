import React, { useRef, useEffect } from "react";
import anime from "animejs";

// import { FaKiwiBird } from "react-icons/fa";
import { SlMouse } from "react-icons/sl";

import TextRing from "../components/TextRing";
import bgImage from "../data/bgImage";

const Name = () => {
  const animaMain = useRef(null);
  const animeBlur = useRef(null);
  const animaRotate = useRef(null);
  const welcomeRef = useRef(null);

  const scrollHandler = () => {
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const targetTop = welcomeRef.current.getBoundingClientRect().top;
    if (targetTop < windowHeight) {
      let scrollPercent = Math.min(
        (windowHeight - targetTop) / windowHeight,
        1
      );
      let scrollEffect = animeBlur.current;
      scrollEffect.seek(scrollPercent * scrollEffect.duration);
    }
  };
  useEffect(() => {
    animaMain.current = anime
      .timeline({
        easing: "easeOutQuint",
        duration: 1500,
      })
      .add({
        targets: ["#name", "#scrollDownSign"],
        translateY: ["30%", "0%"],
        opacity: [0, 1],
        easing: "easeInOutSine",
        duration: 700,
        delay: 300,
      });
    for (let i = 0; i < bgImage.length; i++) {
      animaMain.current.add(
        {
          targets: `.back div:nth-child(${Number(i) + 1})`,
          opacity: [0, 1],
          ...bgImage[i].coord,
        },
        1000
      );
    }
    animeBlur.current = anime({
      targets: ".name-container",
      filter: ["blur(0px)", "blur(15px)"],
      easing: "easeInQuad",
      duration: 1000,
      autoplay: false,
    });
    animaRotate.current = anime({
      targets: ".text-ring",
      rotate: [0, 360],
      easing: "linear",
      duration: 15000,
      loop: true,
    });
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <section className="container-2">
      {/* Background */}
      <div className="sticky-container container-1">
        <article className="name-container container-1">
          <div className="container-1 back">
            {bgImage.map((image, index) => {
              return (
                <div className="image-container" key={`bgImage-id-${index}`}>
                  <img src={image.src} alt={image.alt} />
                </div>
              );
            })}
          </div>
          {/* Name page */}
          <div className="container-1 front">
            <div id="name">HaoSung,</div>
            <div id="scrollDownSign">
              <SlMouse size={30} color={"#CB4335"} />
              <TextRing text="  ScrollDown  ScrollDown  ScrollDown" />
            </div>
          </div>
        </article>
      </div>
      <div className="non-sticky-container container-1">
        <article className="greeting-container container-1" ref={welcomeRef}>
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
      {/* <div className="marker-container">
        <FaKiwiBird size={80} />
      </div> */}
      {/* <div id="toggleButton">
        <FaBars size={80} />
      </div> */}
    </section>
  );
};

export default Name;
