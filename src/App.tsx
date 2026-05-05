import AboutMe from "./components/aboutme"
import Contact from "./components/contaxt"
import PastExpirience from "./components/past_expirience"
import Projects from "./components/projects"
import Title from "./components/title"

function App() {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex flex-col items-center gap-3 p-4 max-w-3xl">
        <Title />
        <Contact />
        <br />
        <AboutMe />
        <br />
        <PastExpirience />
        <Projects />
      </div>
    </div>

  )
}

export default App