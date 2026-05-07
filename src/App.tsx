import { useState } from "react"
import Home from "./pages/home"
import ButtonBlock from "./components/button"
import VerticalSeparator from "./components/vertical_sep"
import AboutMe from "./pages/about_me"
import Projects from "./pages/Projects"

function App() {
  // there are ways to do better but...
  // i am too lazy :p
  const [page, setPage] = useState("home")

  return (
    <div className="flex justify-center bg-gray-950">
      <div className="absolute flex justify-center items-center z-10">
        <ButtonBlock
          onClick={() => setPage("home")}
          text="Home"
          active={page === "home"}
        />

        <VerticalSeparator />

        <ButtonBlock
          onClick={() => setPage("about")}
          text="Past Experience"
          active={page === "about"}
        />

        <VerticalSeparator />

        <ButtonBlock
          onClick={() => setPage("projects")}
          text="Projects"
          active={page === "projects"}
        />
      </div>

      <div className="w-full h-screen">
        {page === "home" && <Home />}
        {page === "about" && <AboutMe />}
        {page === "projects" && <Projects />}
      </div>
    </div>
  )
}

export default App