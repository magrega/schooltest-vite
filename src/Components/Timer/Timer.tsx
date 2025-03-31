import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { RootState } from "../../state/store";
import styles from "./Timer.module.css";

const Timer = () => {
  const countdownValue = useSelector(
    (state: RootState) => state.questionCard.timer
  );
  const isTimeOut = useSelector(
    (state: RootState) => state.questionCard.isTimeOut
  );
  const allUserAnswers = useSelector(
    (state: RootState) => state.questionCard.allUserAnswers
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
