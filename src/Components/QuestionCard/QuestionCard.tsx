import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { RootState } from "../../state/store";
import ErrorPage from "../ErrorPage/ErrorPage";
import MainMenu from "../MainMenu/MainMenu";
import BackToMenuButton from "../UI/BackToMenuButton/BackToMenuButton";
import Loader from "../UI/Loader/Loader";
import Indicators from "./Indicators";
import styles from "./QuestionCard.module.css";

const QuestionCard = ({ type }: { type: string }) => {
  const isError = useSelector((state: RootState) => state.questionCard.isError);
  const isLoading = useSelector(
    (state: RootState) => state.questionCard.isLoading
  );

  const questions = useSelector(
    (state: RootState) => state.questionCard.questions
  );
  const questionNum = useSelector(
    (state: RootState) => state.questionCard.questionNum
  );
  const allUserAnswers = useSelector(
    (state: RootState) => state.questionCard.allUserAnswers
  );

  const { setUserAnswer, setNextQuestion, fetchData } = useActions();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") handleNextQuestion();
  };

  const renderQuestionType = (type: string) => {
    switch (type) {
      case "single-choice":
        return (
          <Radio.Group
            className={styles.group}
            options={questions[questionNum].answers}
          />
        );
      case "multiple-choice":
        return (
          <Checkbox.Group
            className={styles.group}
            options={questions[questionNum].answers}
          />
        );
      case "short-written":
        return <Input autoFocus />;
      case "long-written":
        return <Input.TextArea autoFocus onKeyDown={handleKeyDown} />;
      default:
        return <MainMenu />;
    }
  };

  const handleFormChange = (answer: object) => setUserAnswer(answer);
  const handleNextQuestion = () => setNextQuestion();

  // fetch data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loader />;

  // check if the test ended
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
            {renderQuestionType(type)}
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
