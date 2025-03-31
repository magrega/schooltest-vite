import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuestions } from "../../services/api";
import { QuestionCardState, TQuestion } from "./../../types/types";

const desiredTime = 15 * 60;
const lSquestionNum = JSON.parse(localStorage.getItem("questionNum") || "0");
const lSallUserAnswers = JSON.parse(localStorage.getItem("allUserAnswers")!);

const initialState: QuestionCardState = {
  isLoading: true,
  isTimeOut: false,
  isError: false,
  questions: [],
  questionNum: lSquestionNum,
  userAnswer: {},
  allUserAnswers: lSallUserAnswers || {},
  timer: JSON.parse(localStorage.getItem("timer")!) || desiredTime,
};

const questionCardSlice = createSlice({
  name: "questionCard",
  initialState,
  reducers: {
    setIsTimeout: (state, action: PayloadAction<boolean>) => {
      state.isTimeOut = action.payload;
    },
    setUserAnswer: (state, action: PayloadAction<object>) => {
      state.userAnswer = action.payload;
    },
    setAllUserAnswers: (state, action: PayloadAction<object>) => {
      state.allUserAnswers = { ...state.allUserAnswers, ...action.payload };
    },
    tick: (state) => {
      state.timer = state.timer - 1;
    },
    setNextQuestion: (state) => {
      state.questionNum++;
      state.allUserAnswers = { ...state.allUserAnswers, ...state.userAnswer };
    },
    resetCard: () => {
      return {
        ...initialState,
        questionNum: 0,
        allUserAnswers: {},
        timer: desiredTime,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<TQuestion[]>) => {
          state.questions = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const fetchData = createAsyncThunk("questionCard/fetchData", async () =>
  fetchQuestions()
);

export const { actions } = questionCardSlice;
export default questionCardSlice.reducer;
