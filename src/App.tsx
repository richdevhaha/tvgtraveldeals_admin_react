import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reflect-metadata";

import { store, persistor } from "./redux";
import { RootRouter } from "./routes";
import { lightTheme } from "./theme";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [rootStore, setRootStore] = useState<any | undefined>(undefined);

  useEffect(() => {
    const initStore = async () => setRootStore({ store, persistor });
    initStore();
  }, []);

  if (!rootStore) {
    return null;
  }

  return (
    <HelmetProvider>
      <Provider store={rootStore.store}>
        <PersistGate loading={null} persistor={rootStore.persistor}>
          <ThemeProvider theme={lightTheme}>
            <BrowserRouter>
              <CssBaseline />
              <RootRouter />
            </BrowserRouter>
            <ToastContainer />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
