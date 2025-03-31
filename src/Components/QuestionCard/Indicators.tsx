import { Steps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Timer from "../Timer/Timer";
import styles from "./QuestionCard.module.css";

const Indicators = () => {
  const questions = useSelector(
    (state: RootState) => state.questionCard.questions
  );
  const questionNum = useSelector(
    (state: RootState) => state.questionCard.questionNum
  );

  return (
    <div className={styles["quiz-indicators"]}>
      <p style={{ marginRight: "5px" }}>Question</p>
      <Steps
        className={styles.steps}
        percent={(100 / questions.length) * (questionNum + 1) - 1}
        size="default"
        responsive={false}
        initial={questionNum}
        items={[{ status: "process" }]}
      />
      <Timer />
    </div>
  );
};

export default Indicators;
