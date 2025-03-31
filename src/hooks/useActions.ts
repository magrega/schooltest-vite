import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actions as QuestionCardActions,
  fetchData,
} from "../state/questionCard/questionCard";

export function useActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({ ...QuestionCardActions, fetchData }, dispatch),
    [dispatch]
  );
}
