import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const ThemeToggler: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const getStoredTheme = (): string | null => localStorage.getItem("theme");
  const setStoredTheme = (theme: string) =>
    localStorage.setItem("theme", theme);

  const getPreferredTheme = (): string => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme: string) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  // Apply the theme on component mount
  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    setTheme(preferredTheme);
  }, []);

  // Listen for changes to the preferred color scheme
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        const preferredTheme = getPreferredTheme();
        applyTheme(preferredTheme);
        setTheme(preferredTheme);
      }
    };

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setStoredTheme(newTheme);
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={theme === "dark" ? "Dark Mode" : "Light Mode"}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
    </Form>
  );
};

export default ThemeToggler;
