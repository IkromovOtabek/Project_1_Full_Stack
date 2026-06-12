import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, THEME_ID } from "@mui/material/styles";
import { CssVarsProvider } from "@mui/joy/styles";
import "./css/index.css";
import theme from "./app/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/css/home.css";
import ContextProvider from "./app/context/ContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <ThemeProvider theme={{ [THEME_ID]: theme }}>
          <CssVarsProvider>
            <CssBaseline />
            <Router>
              <App />
            </Router>
          </CssVarsProvider>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
