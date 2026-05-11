import { useState } from "react"
import Home from "./pages/home"
import ButtonBlock from "./components/button"
import VerticalSeparator from "./components/vertical_sep"
import AboutMe from "./pages/about_me"
import Projects from "./pages/projects"
import PastExpirience from "./pages/past_expirience"

function App() {
  // there are ways to do better but...
  // i am too lazy :p
  const [page, setPage] = useState("home")

  return (
    <div className="h-dvh w-dvw flex justify-center bg-gray-950">
      <div className="fixed flex justify-center items-center z-10 top-1 sm:top-3 left-0 right-0  sm:gap-3">
        <ButtonBlock
          onClick={() => setPage("home")}
          text="Home"
          active={page === "home"}
        />
        <VerticalSeparator />
        <ButtonBlock
          onClick={() => setPage("about")}
          text="About me"
          active={page === "about"}
        />
        <VerticalSeparator />
        <ButtonBlock
          onClick={() => setPage("past_expirience")}
          text="Past expirience"
          active={page === "past_expirience"}
        />
        <VerticalSeparator />
        <ButtonBlock
          onClick={() => setPage("projects")}
          text="Projects"
          active={page === "projects"}
        />
      </div>

      <div className="h-dvh w-dvw">
        {page === "home" && <Home />}
        {page === "about" && <AboutMe />}
        {page === "past_expirience" && <PastExpirience />}
        {page === "projects" && <Projects />}
      </div>
    </div>
  )
}

export default App