import { Card, Typography } from "antd";
import styles from "./MainMenu.module.css";
import MenuButton from "./MenuButton";

const MainMenu = () => {
  const links = [
    { to: "single-choice", tabIndex: 1, label: "Single choice" },
    { to: "multiple-choice", tabIndex: 2, label: "Multiple choices" },
    { to: "short-written", tabIndex: 3, label: "Short answer" },
    { to: "long-written", tabIndex: 4, label: "Long answer" },
  ];

  return (
    <div className={styles["mainmenu-container"]}>
      <Typography.Title>Main Menu</Typography.Title>
      <Card className={styles["mainmenu-container"]}>
        {links.map((link) => (
          <MenuButton key={link.tabIndex} link={link} />
        ))}
      </Card>
    </div>
  );
};

export default MainMenu;
