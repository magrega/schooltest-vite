import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { QuestionCardType } from "../../types/types";
import ErrorPage from "../ErrorPage/ErrorPage";
import QuestionCard from "../QuestionCard/QuestionCard";
import Loader from "../UI/Loader/Loader";

interface QuestionCardWrapperProps {
  type: QuestionCardType;
}

const QuestionCardWrapper = ({ type }: QuestionCardWrapperProps) => {
  const isError = useAppSelector((state) => state.questionCard.isError);
  const isLoading = useAppSelector((state) => state.questionCard.isLoading);
  const { fetchData } = useActions();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loader />;

  return <QuestionCard type={type} />;
};

export default QuestionCardWrapper;
