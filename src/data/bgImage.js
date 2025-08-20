import clustering from "../assets/images/clustering.png";
import tsFitting from "../assets/images/tsFitting.png";
import tsMissing from "../assets/images/tsMissing.png";
import segment from "../assets/images/segment.png";
import sankey from "../assets/images/sankey.png";
import worldCloudBG from "../assets/images/worldCloudBG.png";
import stackBar from "../assets/images/stackBar.png";

// Note:
//    - coord will be destructed to parameters of animate() method.
//    - "%" is compared with right bottom corner of the container
const bgImages = [
  {
    src: stackBar,
    alt: "Stacked Bar Chart",
    coord: {
      translateX: "-=720px",
      translateY: "+=280px",
    },
  },
  {
    src: sankey,
    alt: "Sankey Plot",
    coord: {
      translateX: "-=560px",
      translateY: "-=220px",
    },
  },
  {
    src: clustering,
    alt: "Word Clustering",
    coord: {
      translateX: "-=200px",
      translateY: "-=50px",
    },
  },
  {
    src: segment,
    alt: "Time Series Segment Plot",
    coord: {
      translateX: "+=0px",
      translateY: "+=200px",
    },
  },
  {
    src: tsFitting,
    alt: "Time Series Module Fitting Result",
    coord: {
      translateX: "+=350px",
      translateY: "-=220px",
    },
  },
  {
    src: tsMissing,
    alt: "Time Series Interpolation",
    coord: {
      translateX: "+=480px",
      translateY: "+=230px",
    },
  },
  {
    src: worldCloudBG,
    alt: "Word Cloud",
    coord: {
      translateX: "+=650px",
      translateY: "-=100px",
    },
  },
];

export default bgImages;
