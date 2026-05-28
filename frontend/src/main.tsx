import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { ToastProvider } from "./components/ui/ToastProvider";
import ThemeWrapper from "./features/theme/ThemeWrapper";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>
);