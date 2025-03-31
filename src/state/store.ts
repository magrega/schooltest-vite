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
    if (type === "questionCard/countdown")
      localStorage.setItem(
        "timer",
        JSON.stringify(getState().questionCard.timer)
      );
    if (type === "questionCard/setNextQuestion") {
      localStorage.setItem(
        "allUserAnswers",
        JSON.stringify(getState().questionCard.allUserAnswers)
      );
      localStorage.setItem(
        "questionNum",
        JSON.stringify(getState().questionCard.questionNum)
      );
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
