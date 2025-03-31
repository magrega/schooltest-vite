import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { RootState } from "../../state/store";
import { QuestionCardType } from "../../types/types";
import ErrorPage from "../ErrorPage/ErrorPage";
import QuestionCard from "../QuestionCard/QuestionCard";
import Loader from "../UI/Loader/Loader";

interface QuestionCardWrapperProps {
  type: QuestionCardType;
}

const QuestionCardWrapper = ({ type }: QuestionCardWrapperProps) => {
  const isError = useSelector((state: RootState) => state.questionCard.isError);
  const isLoading = useSelector(
    (state: RootState) => state.questionCard.isLoading
  );
  const { fetchData } = useActions();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loader />;

  return <QuestionCard type={type} />;
};

export default QuestionCardWrapper;
