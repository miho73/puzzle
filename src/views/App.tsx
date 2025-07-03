import {BrowserRouter, Route, Routes} from "react-router-dom";
import Jigsaw from "./jigsaw/main.tsx";
import JigsawSetup from "./jigsaw/setup/setup.tsx";
import Index from "./index";
import Settings from "./settings/settings.tsx";

function App() {
  return (
    <BrowserRouter>
      <main className={'h-screen w-screen bg-[url(/src/assets/wood_dark.jpg)] bg-auto bg-center'}>
        <Routes>
          <Route path={'/'} element={<Index/>}/>
          <Route path={'/settings'} element={<Settings/>}/>
          <Route path={'/puzzle/setup'} element={<JigsawSetup/>}/>
          <Route path={'/puzzle'} element={<Jigsaw/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
