import { useState, useEffect } from "react";
import darkThemeIcon from "../assets/dark-theme.svg";
import "../styles/ThemeSwitch.scss";

const ThemeToggle = () => {
  const storedTheme = localStorage.getItem("theme");
  const isDarkMode = storedTheme === "dark";

  const [isChecked, setIsChecked] = useState(isDarkMode);

  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isChecked]);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="theme-container">
      <img src={darkThemeIcon} width="18px" height="18px" />
      Dark theme
      <label htmlFor="theme-toggle" className="theme-toggle">
        <input
          type="checkbox"
          id="theme-toggle"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="icon"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
