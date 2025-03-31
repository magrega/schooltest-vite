import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useTypedSelector";
import styles from "./Timer.module.css";

const Timer = () => {
  const countdownValue = useAppSelector((state) => state.questionCard.timer);
  const isTimeOut = useAppSelector((state) => state.questionCard.isTimeOut);
  const allUserAnswers = useAppSelector(
    (state) => state.questionCard.allUserAnswers
  );

  const { tick, setIsTimeout } = useActions();

  useEffect(() => {
    const timerCountdown = setTimeout(() => {
      if (countdownValue <= 0) {
        clearTimeout(timerCountdown);
        setIsTimeout(true);
      }
      tick();
    }, 1000);

    return () => clearTimeout(timerCountdown);
  }, [countdownValue, setIsTimeout, tick]);

  if (isTimeOut)
    return <Navigate to="/results" state={allUserAnswers} replace />;

  return (
    <span
      className={
        countdownValue < 60
          ? `${styles.timer} ${styles["almost-out-of-time"]}`
          : styles.timer
      }
    >
      {`${Math.floor(countdownValue / 60)}`.padStart(2, "0")} :{" "}
      {`${countdownValue % 60}`.padStart(2, "0")}
    </span>
  );
};

export default Timer;
