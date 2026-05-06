import { useState, type JSX } from "react"
import Home from "./pages/home"
import ButtonBlock from "./components/button";
import VerticalSeparator from "./components/vertical_sep";

function App() {

  const [page, setPage] = useState<JSX.Element>(<Home />);

  return (
    <div className="flex justify-center bg-gray-950">
      <div className="absolute flex justify-center items-center z-2">
        <ButtonBlock onClick={() =>setPage(<Home />)} text="Home"/>
        <VerticalSeparator/>
        <ButtonBlock onClick={() =>setPage(<Home />)} text="Past Expirience"/>
        <VerticalSeparator/>
        <ButtonBlock onClick={() =>setPage(<Home />)} text="Projects"/>
      </div>
      <div className="w-full h-screen">
        {page}
      </div>
    </div>

  )
}

export default App