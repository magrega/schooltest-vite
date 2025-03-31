import "@ant-design/v5-patch-for-react-19";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Results from "./Components/Result/Result";
import "./index.css";
import { store } from "./state/store";
import QuestionCardWrapper from "./Components/QuestionCardWrapper/QuestionCardWrapper";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "single-choice",
      element: <QuestionCardWrapper type={"single-choice"} />,
    },
    {
      path: "multiple-choice",
      element: <QuestionCardWrapper type={"multiple-choice"} />,
    },
    {
      path: "short-written",
      element: <QuestionCardWrapper type={"short-written"} />,
    },
    {
      path: "long-written",
      element: <QuestionCardWrapper type={"long-written"} />,
    },
    {
      path: "results",
      element: <Results />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
  { future: { v7_relativeSplatPath: true } }
);

<RouterProvider router={router} />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Provider>
  </StrictMode>
);
