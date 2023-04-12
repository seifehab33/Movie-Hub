import React from "react";
import "./Button.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
function Button() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisibility);
  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUpwardIcon className="arrowScroll" />
        </button>
      )}
    </div>
  );
}

export default Button;
