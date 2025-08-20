import { useRef, useEffect, useContext } from "react";
import {
  animate,
  createScope,
  createTimeline,
  onScroll,
  stagger,
} from "animejs";

import "./Story.sass";
import { globalContext } from "../../main";

import certificates from "../../data/certificates";
import profileImage from "../../assets/images/ProfilePicture.jpg";
import LinkLogo from "./LinkLogo.jsx";
import { cursorEnter, cursorLeave } from "../Cursor/anime.js";

const myStory = [
  {
    title: (
      <p>
        掌握資料科學方法
        <br />
        靈活發揮於不同應用場景
      </p>
    ),
    content: (
      <>
        <p>您好，我是宋豪！</p>
        <p>
          畢業於統計學系，我擁有穩固的數理基礎，以及對於數據的強烈敏感度。面對資料分析的任務，我擅長設計直觀的分析流程，解決主管所提出的抽象問題，並搭配創意的視覺化手法，呈現額外的洞見。
        </p>
        <p>
          無論是PM2.5時序分析、自動光學瑕疵檢測、又或者是曝險部位壓力測試，我能獨立探究可行方法，並根據當前場景，實踐合適的模型。
        </p>
      </>
    ),
  },
  {
    title: (
      <p>
        探索開源解決方案
        <br />
        將資訊科技融入日常生活
      </p>
    ),
    content: (
      <>
        <p>作為科技愛好者，我利用閒暇時間，規劃建置個人的 Homelab 實驗環境。</p>
        <p>
          從「網段區隔」、「動態路由」、「單臂路由」等基本設計，到「
          指標監控系統」、「網路型入侵偵測系統」、「安全資訊與事件管理服務」等解決方案；對企業服務的實作，不僅僅是轉職的練習；更有價值的，是將資訊技術結合於日常生活，增加異常處理與日誌解析的經驗累積，使技術理解更為透徹!
        </p>
      </>
    ),
  },
];

const Certificate = ({ isMobile }) => {
  useEffect(() => {
    if (!isMobile) {
      // Use animate outside of scope, otherwise "#cursor-center" can't be accessed
      document
        .querySelectorAll(`.container-cert .item:not(:first-child)`)
        .forEach((item) => {
          item.addEventListener("mouseenter", cursorEnter);
          item.addEventListener("mouseleave", cursorLeave);
        });
    }

    return () => {
      if (!isMobile) {
        document
          .querySelectorAll(`.container-cert .item:not(:first-child)`)
          .forEach((item) => {
            item.removeEventListener("mouseenter", cursorEnter);
            item.removeEventListener("mouseleave", cursorLeave);
          });
      }
    };
  }, []);

  return (
    <div className="container-cert">
      <header>
        <div id="cert-header">國際資訊證照</div>
      </header>
      <div className="content">
        <div id="cert-content" className="table">
          <div className="table-header item">
            <span>核發日期</span>
            <span>證照名稱</span>
          </div>
          {certificates.map((cert, index) => {
            return (
              <div
                key={`cert-${index}`}
                className="item"
                onClick={() => window.open(cert.validateRef, "_blank")}
              >
                <span className="date">{cert.date}</span>
                <span className="title">
                  {cert.abbreviation && !isMobile
                    ? `${cert.title} (${cert.abbreviation})`
                    : cert.title}
                </span>
                <LinkLogo />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Story = () => {
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

      if (isMobile) {
        animate(".container-about > *, .container-cert > *", {
          opacity: {
            to: [0, 1], //! According to padding-top in .sass
            ease: "easeOutQuint",
            duration: 500,
          },
          delay: stagger(750),
          autoplay: onScroll({
            container: "body",
            axis: "y",

            enter: {
              container: `bottom-=${global.containerEndOffset}`,
              target: "top+=200px",
            },
            leave: {
              container: `top+=${global.containerStartOffset}`,
              target: "bottom+=200px",
            },
            sync: "play",
            onSyncComplete: (self) => {
              self.revert();
            },
            debug,
          }),
        });
      } else {
        const intervalDefault = 1000;
        const tl = createTimeline({
          defaults: {
            easing: "easeOutQuint",
            duration: intervalDefault,
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
              target: "bottom-=600px",
            },
            sync: 0.5,
            debug,
          }),
        });

        // Add animation for for About
        for (let i = 0; i < myStory.length; i++) {
          // headerSlideIn
          tl.add(
            `#story-header-${i}`,
            {
              translateY: { to: "-=150px" }, //! According to padding-top in .sass
            },
            i == 0 ? 0 : `<<`
          )
            // contentSlideIn
            .add(
              `#story-content-${i}`,
              {
                translateY: { to: "-=400px" }, //! According to padding-top in .sass
                duration: 1.5 * intervalDefault,
              },
              `<-=${Math.round((intervalDefault * 2) / 3)}`
            )
            // headerSlideOut
            .add(`#story-header-${i}`, {
              translateY: { to: "+=150px" },
              delay: 3 * intervalDefault,
            })
            // contentSlideOut
            .add(
              `#story-content-${i}`,
              {
                translateY: { to: "+=400px" },
                duration: 1.5 * intervalDefault,
              },
              `<-=${Math.round((intervalDefault * 2) / 3)}`
            );
        }
        // Add animation for for Certificates
        // showCertificateContainer
        tl.add(
          ".container-cert",
          {
            opacity: [0, 1],
            duration: 1,
          },
          "<<"
        )
          // certHeaderSlideIn
          .add(
            "#cert-header",
            {
              translateY: { to: "-=90px" },
            },
            "<"
          )
          // certContentSlideIn
          .add(
            "#cert-content",
            {
              translateY: { to: "-=100vh" },
              duration: 1.5 * intervalDefault,
            },
            `<-=${Math.round((intervalDefault * 2) / 3)}`
          );
      }
    });

    // Cleanup all anime.js instances
    return () => scope.current.revert();
  }, []);

  const isMobile =
    window.innerWidth <= global.layoutBreakpoint.replace("px", "");

  if (isMobile) {
    // Mobile layout: loop to create whole story container
    return (
      <div ref={root}>
        {myStory.map((story, index) => {
          return (
            <section key={`story-${index}`} className="container-story">
              <article className="story">
                <div className="right-panel">
                  <div className="container-about">
                    <header>
                      <div>{story.title}</div>
                    </header>
                    <div className="content">
                      <div>{story.content}</div>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          );
        })}
        <section className="container-story">
          <article className="story">
            <div className="right-panel">
              <Certificate isMobile={isMobile} />
            </div>
          </article>
        </section>
      </div>
    );
  } else {
    // Monitor layout: loop to create header and content in the same .container-about (for animation purpose)
    return (
      <section className="container-story" ref={root}>
        <article className="story">
          <div className="left-panel">
            <img src={profileImage} alt="Profile Image" />
          </div>
          <div className="right-panel">
            <div className="container-about">
              <header>
                {myStory.map((story, index) => {
                  const headerID = `story-header-${index}`;
                  return (
                    <div key={headerID} id={headerID}>
                      {story.title}
                    </div>
                  );
                })}
              </header>
              <div className="content">
                {myStory.map((story, index) => {
                  const contentID = `story-content-${index}`;
                  return (
                    <div key={contentID} id={contentID}>
                      {story.content}
                    </div>
                  );
                })}
              </div>
            </div>
            <Certificate isMobile={isMobile} />
          </div>
        </article>
      </section>
    );
  }
};

export default Story;
