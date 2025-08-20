import projects from "../data/projects";
import experience from "../data/experience.js";
import Greeting from "../components/Greeting/Greeting.jsx";
import SectionTitle from "../components/SectionTitle/SectionTitle.jsx";
import Projects from "../components/Project/Project.jsx";
import Story from "../components/Story/Story.jsx";
import Experience from "../components/Experience/Experience.jsx";
import Contact from "../components/Contact/Contact.jsx";
import Cursor from "../components/Cursor/Cursor.jsx";

export default function Home() {
  return (
    <>
      <Cursor />
      <Greeting />
      <SectionTitle number={1} title={"個人簡介"}></SectionTitle>
      <Story />
      <SectionTitle number={2} title={"工作經歷"}></SectionTitle>
      <Experience exp={experience}></Experience>
      <SectionTitle number={3} title={"個人專案"}></SectionTitle>
      <Projects projects={projects}></Projects>
      <Contact />
    </>
  );
}
