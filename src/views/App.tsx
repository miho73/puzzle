import {BrowserRouter, Route, Routes} from "react-router-dom";
import Jigsaw from "./jigsaw/main.tsx";

function App() {
  return (
    <BrowserRouter>
      <main className={'h-screen w-screen bg-[url(src/assets/blue_fabric.jpg)] bg-auto bg-center'}>
        <Routes>
          <Route path={'/puzzle'} element={<Jigsaw/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
