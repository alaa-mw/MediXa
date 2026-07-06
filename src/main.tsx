import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./shared/providers/SnackbarContext.tsx";
import { Provider } from "react-redux";
import { store } from "./features/purchase_invoices/store/index.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
           <Provider store={store}>
          <App />
          </Provider>
        </QueryClientProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>,
);
