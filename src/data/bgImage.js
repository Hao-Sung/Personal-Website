import clustering from "../assets/image/clustering.png";
import tsFitting from "../assets/image/tsFitting.png";
import tsMissing from "../assets/image/tsMissing.png";
import segment from "../assets/image/segment.png";
import sankey from "../assets/image/sankey.png";
import worldCloudBG from "../assets/image/worldCloudBG.png";
import stackBar from "../assets/image/stackBar.png";

const bgImages = [
  {
    src: stackBar,
    alt: "clustering",
    coord: {
      top: "70%",
      right: "90%",
    },
  },
  {
    src: sankey,
    alt: "cluster",
    coord: {
      bottom: "62%",
      right: "80%",
    },
  },
  {
    src: clustering,
    alt: "clustering",
    coord: {
      bottom: "40%",
      right: "57%",
    },
  },
  {
    src: segment,
    alt: "cluster",
    coord: {
      bottom: "5%",
      right: "43%",
    },
  },
  {
    src: tsFitting,
    alt: "cluster",
    coord: {
      bottom: "62%",
      left: "66%",
    },
  },
  {
    src: tsMissing,
    alt: "cluster",
    coord: {
      top: "65%",
      left: "75%",
    },
  },
  {
    src: worldCloudBG,
    alt: "segment plot",
    coord: {
      top: "20%",
      left: "87%",
    },
  },
];

export default bgImages;
