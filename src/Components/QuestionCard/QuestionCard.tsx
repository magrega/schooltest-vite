import { Button, Card, Divider, Form, Typography } from "antd";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { RootState } from "../../state/store";
import BackToMenuButton from "../UI/BackToMenuButton/BackToMenuButton";
import Indicators from "./Indicators";
import styles from "./QuestionCard.module.css";
import { RenderQuestionType } from "./RenderQuestionType";

const QuestionCard = ({ type }: { type: string }) => {
  const questions = useSelector(
    (state: RootState) => state.questionCard.questions
  );
  const questionNum = useSelector(
    (state: RootState) => state.questionCard.questionNum
  );
  const allUserAnswers = useSelector(
    (state: RootState) => state.questionCard.allUserAnswers
  );

  const { setUserAnswer, setNextQuestion } = useActions();

  const handleFormChange = (answer: object) => setUserAnswer(answer);
  const handleNextQuestion = () => setNextQuestion();

  if (questionNum === questions.length)
    return <Navigate to="/results" state={allUserAnswers} replace />;

  return (
    <div className={styles["quiz-container"]}>
      <Typography.Title className={styles["quiz-title"]}>
        Test in progress
      </Typography.Title>
      <Indicators />
      <Card className={styles.card}>
        <Typography.Paragraph className={styles["card-question"]}>
          {questions[questionNum].question}
        </Typography.Paragraph>
        <Divider />
        <Form
          name={`question${questionNum}`}
          onFinish={handleNextQuestion}
          onValuesChange={handleFormChange}
          autoComplete="off"
        >
          <Form.Item
            name={`answers${questionNum}`}
            rules={[{ required: true, message: "Enter your answer!" }]}
          >
            {RenderQuestionType(type, questions[questionNum].answers)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {questions[questionNum].id === questions.length
                ? "Answer and finish"
                : "Answer"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <BackToMenuButton />
    </div>
  );
};
export default QuestionCard;
