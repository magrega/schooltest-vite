import { Button } from "antd";
import { Link } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";

const BackToMenuButton = () => {
  const { resetCard } = useActions();

  const clearState = () => {
    resetCard();
    localStorage.clear();
  };
  return (
    <Link tabIndex={-1} to={`/`}>
      <Button danger onClick={clearState}>
        Back to Menu
      </Button>
    </Link>
  );
};

export default BackToMenuButton;
