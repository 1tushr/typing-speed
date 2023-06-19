import React from "react";
import Select from "react-select";
import { themeOptions } from "../utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";

export default function Footer() {
  const { setTheme, theme } = useTheme();

  const handleChange = (selectedOption) => {
    setTheme(selectedOption.value); // Update the theme based on the selected option's value
    localStorage.setItem("theme", JSON.stringify(selectedOption.value)); // Store the selected theme in localStorage
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme.background,
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: theme.background,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? theme.textColor : theme.background,
      color:  state.isFocused ? theme.background : theme.textColor,
      cursor: "pointer",
    }),
  };

  return (
    <div className="footer">
      Footer
      <div className="links">
        links
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{ label: theme.label, value: theme }}
          styles={customStyles}
        />
      </div>
    </div>
  );
}
