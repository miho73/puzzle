import {BrowserRouter, Route, Routes} from "react-router-dom";
import Jigsaw from "./jigsaw/main.tsx";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path={'/puzzle'} element={<Jigsaw/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
