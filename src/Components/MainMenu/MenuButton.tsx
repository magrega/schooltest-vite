import { Button } from "antd";
import { Link, To } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import styles from "./MainMenu.module.css";

interface MenuButtonProps {
  link: { to: To; tabIndex: number; label: string };
}

const MenuButton = ({ link: { to, tabIndex, label } }: MenuButtonProps) => {
  const { resetCard } = useActions();

  return (
    <Link tabIndex={-1} to={to}>
      <Button
        tabIndex={tabIndex}
        className={styles.btn}
        type="primary"
        onClick={() => resetCard()}
      >
        {label}
      </Button>
    </Link>
  );
};

export default MenuButton;
