import React from "react";
import AccountCircle from "./AccountCircle";
import typingLogo from "./images/typing-logo.png";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={typingLogo} alt="Typing Logo" className="logo-image" />
      </div>
      <div className="user-icon">
        {/* User icon */}
        <AccountCircle />
      </div>
    </div>
  );
}
