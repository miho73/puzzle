import {createRoot} from 'react-dom/client'
import App from './views/App.tsx'
import './styles/univ.scss'
import {Provider} from "react-redux";
import store from "./services/redux/store.ts";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
