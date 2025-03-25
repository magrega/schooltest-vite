import { Button } from "antd";
import { Link, To } from "react-router-dom";
import styles from "./MainMenu.module.css";

interface MenuButtonProps {
  link: { to: To; tabIndex: number; label: string };
}

const MenuButton = ({ link: { to, tabIndex, label } }: MenuButtonProps) => {
  return (
    <Link tabIndex={-1} to={to}>
      <Button tabIndex={tabIndex} className={styles.btn} type="primary">
        {label}
      </Button>
    </Link>
  );
};

export default MenuButton;
