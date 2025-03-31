import { Button, Card, Divider, Form, Typography } from "antd";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { QuestionCardType } from "../../types/types";
import BackToMenuButton from "../UI/BackToMenuButton/BackToMenuButton";
import Indicators from "./Indicators";
import styles from "./QuestionCard.module.css";
import { RenderQuestionType } from "./RenderQuestionType";

const QuestionCard = ({ type }: { type: QuestionCardType }) => {
  const questions = useAppSelector((state) => state.questionCard.questions);
  const questionNum = useAppSelector((state) => state.questionCard.questionNum);

  const { setUserAnswer, setNextQuestion } = useActions();

  const handleFormChange = (answer: object) => setUserAnswer(answer);
  const handleNextQuestion = () => setNextQuestion();

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
              {questionNum === questions.length
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
