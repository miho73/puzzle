import {BrowserRouter, Route, Routes} from "react-router-dom";
import Jigsaw from "./jigsaw/main.tsx";
import JigsawSetup from "./jigsaw/setup/setup.tsx";
import Index from "./index";
import Settings from "./settings/settings.tsx";

function App() {
  return (
    <BrowserRouter>
      <main className={'h-screen w-screen bg-[url(/puzzle/src/assets/wood_dark.jpg)] bg-auto bg-center'}>
        <Routes>
          <Route path={'/puzzle'}>
            <Route path={'/puzzle'} element={<Index/>}/>
            <Route path={'/puzzle/settings'} element={<Settings/>}/>
            <Route path={'/puzzle/puzzle/setup'} element={<JigsawSetup/>}/>
            <Route path={'/puzzle/puzzle'} element={<Jigsaw/>}/>
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
