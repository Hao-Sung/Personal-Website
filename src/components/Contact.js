import React, { useRef, useEffect } from "react";
import anime from "animejs";

const Contact = () => {
  const animaRef = useRef(null);
  const contactRef = useRef(null);

  const scrollHandler = () => {
    const containerBottom = contactRef.current.getBoundingClientRect().bottom;
    const containerHeight = contactRef.current.getBoundingClientRect().height;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (containerBottom < containerHeight) {
      let scrollPercent = Math.min(
        (containerHeight - containerBottom) / (containerHeight - windowHeight),
        1
      );
      let scrollEffect = animaRef.current;
      scrollEffect.seek(scrollPercent * scrollEffect.duration);
    }
  };

  useEffect(() => {
    animaRef.current = anime.timeline({
      easing: "easeInOutQuad",
      duration: 1000,
      autoplay: false,
    });
    animaRef.current
      .add({
        targets: ".left-slide",
        translateX: ["0%", "-80%"],
      })
      .add(
        {
          targets: ".right-slide",
          translateX: ["0%", "80%"],
        },
        0
      )
      .add({
        targets: ".mail div",
        opacity: [0, 1],
        duration: 300,
      })
      .add(
        {
          targets: ".phone div",
          opacity: [0, 1],
          duration: 300,
        },
        "-=300"
      );
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <section className="container-4" ref={contactRef}>
      <article className="container-1 contact-container">
        <div className="container-1 back">
          <div></div>
          <div className="left-slide">GET IN</div>
          <div className="right-slide">TOUCH</div>
          <div></div>
        </div>
        <div className="container-1 front">
          <div></div>
          <div className="mail">
            <div>haosung0525@gmail.com</div>
          </div>
          <div className="phone">
            <div>{"(+886) 930 563 033"}</div>
          </div>
          <div>
            <div className="creator">Created by Hao.</div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Contact;
