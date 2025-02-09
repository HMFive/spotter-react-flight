import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material";
import {store} from "./store/store.ts";
const theme = createTheme({

});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <App></App>
          </ThemeProvider>
      </Provider>
  </StrictMode>,
)
