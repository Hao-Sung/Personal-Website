import IntervalTimeSeries from "../assets/images/IntervalTimeSeries.png";
import Homelab from "../assets/images/HomelabDesign.png";
import map from "../assets/images/map.png";
import ThumbsUp from "../assets/images/ThumbsUp.jpg";

const projects = [
  {
    title: "SOHO實驗環境",
    desc: [
      "",
    ],
    image: {
      link: Homelab,
      alt: "Homelab Infrastructure Design",
    },
    keywords: [
      "Suricata",
      "HAProxy",
      "Prometheus",
      "Grafana",
      "Jenkins",
      "Proxmox",
      "OPNsense / pfSense",
    ],
    href: ["https://hao-sung-homelab.netlify.app/"] ,
  },
  {
    title: "區間值時間序列",
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
      "區間相關性",
      "細懸浮微粒",
      "Python語言",
      "R語言",
      "LaTeX語言",
    ],
    href: ["http://doi.org/10.1002/asmb.2733"] ,
  },
  {
    title: "校務資料分析",
    desc: "本專案以各校論文摘要為分析標的，運用自然語言處理常見的分析手法，探討各單位的研究特色，進行學校層級與地區層級的比較；同時納入 SciVal 所提供的關鍵字詞，綜合評估。",
    image: {
      link: map,
      alt: "World Map",
    },
    keywords: [
      "文字探勘",
      "TF-IDF方法",
      "集群分析",
      "字詞相關性",
      "互動式地圖",
      "R語言",
      "類別資料分析",
    ],
    href: [
      "https://github.com/Hao-Sung/SDG3-TextMining",
      "https://github.com/Hao-Sung/Student-Interdisciplinary-Learning"
    ],

  },
  {
    title: "個人前端履歷",
    desc: [
      "",
    ],
    image: {
      link: ThumbsUp,
      alt: "My Portfolio",
    },
    keywords: [
      "React框架",
      "Anime.js",
      "響應式網頁設計",
      "HTML元素",
      "SASS語言",
      "Javascript語言",
      "Netlify網站托管",
    ],
    href: ["#"] ,
  },
  // {
  //   title: "跨領域學習分析",
  //   desc: [
  //     "本專案利用學生修課記錄，探討學生跨領域學習的意向與模式。結果顯示，跨域學習頻率與年級之間，存在顯著的相依性；且必修學分與跨域學分之間，亦存在中度的負相關性。",
  //   ],
  //   image: {
  //     link: tsHeatmap,
  //     alt: "Time Series Heatmap",
  //   },
  //   keywords: ["類別資料分析", "資料視覺化", "R語言", "類別資料分析", "資料視覺化", "R語言"],
  //   href: ["https://github.com/Hao-Sung/Student-Interdisciplinary-Learning"],
  // },
];

export default projects;
