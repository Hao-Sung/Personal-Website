import {animate} from "animejs"

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



export {cursorEnter, cursorLeave};