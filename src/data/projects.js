import IntervalTimeSeries from "../assets/image/IntervalTimeSeries.png";
import tsHeatmap from "../assets/image/tsHeatmap.png";
// import worldCloud from "../assets/image/worldCloud.png";
import map from "../assets/image/map.png";
import collegeResearch from "../assets/pdf/College Student Research Scholarship.pdf";

import { MdOutlineSchool } from "react-icons/md";

const projects = [
  {
    title: ["象徵性資料", <br />, "的時間序列應用"],
    desc: [
      "本研究採用象徵性資料分析的概念，將南台灣每週的PM2.5觀測值整理成區間數值的形式，配適區間值時間序列模型，並利用區間變數特有的蒲公英圖，展現不同地區之間，污染物質的區間相關程度。",
    ],
    image: {
      link: IntervalTimeSeries,
      alt: "Interval Time Series",
    },
    keywords: [
      "象徵性資料分析",
      "蒙地卡羅模擬",
      "區間值時間序列",
      "區間相關性",
      "細懸浮微粒",
      "Python語言",
      "R語言",
      "LaTeX語言",
    ],
    position: {
      company: "國立成功大學 統計學系",
      icon: <MdOutlineSchool size={30} style={{ marginRight: "5px" }} />,
      date: 2021,
    },
    links: [
      { title: "期刊論文連結", href: "http://doi.org/10.1002/asmb.2733" },
      { title: "科技部大專學生計畫", href: collegeResearch },
    ],
  },
  {
    title: ["聯合國", <br />, "永續發展目標", <br />, "論文文字探勘"],
    // desc: "本專案以自然語言處理為主軸，分析各校的SDG3論文摘要，並運用統計數值定義各單位的研究特色，進行學校層級與地區層級的比較；同時納入SciVal所提供的關鍵字詞，綜合評估。",
    desc: "本專案以各校SDG3論文摘要為分析標的，運用自然語言處理常見的分析手法，探討各單位的研究特色，進行學校層級與地區層級的比較；同時納入 SciVal 所提供的關鍵字詞，綜合評估。",
    image: {
      link: map,
      // alt: "Comparison World Cloud",
      alt: "World Map",
    },
    keywords: [
      "文字探勘",
      "TF-IDF方法",
      "集群分析",
      "字詞相關性",
      "永續發展目標三",
      "互動式地圖",
      "R語言",
    ],
    position: {
      company: "國立成功大學 研發處校務資料組",
      icon: <MdOutlineSchool size={30} style={{ marginRight: "5px" }} />,
      date: 2020,
    },
    links: [
      {
        title: "GitHub連結",
        href: "https://github.com/Hao-Sung/SDG3-TextMining",
      },
    ],
  },
  {
    title: ["學生", <br />, "跨領域學習", <br />, "行為分析"],
    desc: [
      "本專案利用學生修課記錄，探討學生跨領域學習的意向與模式。結果顯示，跨域學習頻率與年級之間，存在顯著的相依性；且必修學分與跨域學分之間，亦存在中度的負相關性。",
    ],
    image: {
      link: tsHeatmap,
      alt: "Time Series Heatmap",
    },
    keywords: ["類別資料分析", "資料視覺化", "R語言"],
    position: {
      company: "國立成功大學 研發處校務資料組",
      icon: <MdOutlineSchool size={30} style={{ marginRight: "5px" }} />,
      date: 2020,
    },
    links: [
      {
        title: "GitHub連結",
        href: "https://github.com/Hao-Sung/Student-Interdisciplinary-Learning",
      },
    ],
  },
];

export default projects;
