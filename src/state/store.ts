import { configureStore, isAnyOf } from "@reduxjs/toolkit";
import { listenerMiddleware, startAppListening } from "./listenerMiddleware";
import questionCardReducer, { actions } from "./questionCard/questionCard";

startAppListening({
  matcher: isAnyOf(
    actions.tick,
    actions.setNextQuestion,
    actions.setAllUserAnswers
  ),
  effect: ({ type }, { getState }) => {
    const {
      questionCard: { timer, allUserAnswers, questionNum },
    } = getState();
    if (type === "questionCard/tick")
      localStorage.setItem("timer", JSON.stringify(timer));
    if (type === "questionCard/setNextQuestion") {
      localStorage.setItem("allUserAnswers", JSON.stringify(allUserAnswers));
      localStorage.setItem("questionNum", JSON.stringify(questionNum));
    }
  },
});

export const store = configureStore({
  reducer: {
    questionCard: questionCardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
