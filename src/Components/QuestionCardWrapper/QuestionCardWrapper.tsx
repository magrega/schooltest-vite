import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { QuestionCardType } from "../../types/types";
import ErrorPage from "../ErrorPage/ErrorPage";
import QuestionCard from "../QuestionCard/QuestionCard";
import Loader from "../UI/Loader/Loader";
import { Navigate } from "react-router-dom";

interface QuestionCardWrapperProps {
  type: QuestionCardType;
}

const QuestionCardWrapper = ({ type }: QuestionCardWrapperProps) => {
  const isError = useAppSelector((state) => state.questionCard.isError);
  const isLoading = useAppSelector((state) => state.questionCard.isLoading);
  const { fetchData } = useActions();

  const questions = useAppSelector((state) => state.questionCard.questions);
  const questionNum = useAppSelector((state) => state.questionCard.questionNum);
  const allUserAnswers = useAppSelector(
    (state) => state.questionCard.allUserAnswers
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loader />;
  if (questionNum === questions.length)
    return <Navigate to="/results" state={allUserAnswers} replace />;

  return <QuestionCard type={type} />;
};

export default QuestionCardWrapper;
