import AboutMe from "./components/aboutme"
import PastExpirience from "./components/past_expirience"
import Projects from "./components/projects"
import Title from "./components/title"

function App() {
  return (
    <div className="flex flex-col items-center gap-3">
      <br/>
      <Title />
      <br/>
      <AboutMe/>
      <br/>
      <PastExpirience/>
      <Projects/>
    </div>
  )
}

export default App