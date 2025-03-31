import { Checkbox, Input, Radio } from "antd";
import { useActions } from "../../hooks/useActions";
import MainMenu from "../MainMenu/MainMenu";
import styles from "./QuestionCard.module.css";

export const RenderQuestionType = (type: string, options: string[]) => {
  const { setNextQuestion } = useActions();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") setNextQuestion();
  };

  switch (type) {
    case "single-choice":
      return <Radio.Group className={styles.group} options={options} />;
    case "multiple-choice":
      return <Checkbox.Group className={styles.group} options={options} />;
    case "short-written":
      return <Input autoFocus />;
    case "long-written":
      return <Input.TextArea autoFocus onKeyDown={handleKeyDown} />;
    default:
      return <MainMenu />;
  }
};
