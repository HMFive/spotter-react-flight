import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material";
import {store} from "./store/store.ts";
import {Home} from "./pages/home.tsx";

const theme = createTheme({

});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Home></Home>
          </ThemeProvider>
      </Provider>
  </StrictMode>
)
