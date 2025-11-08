import React, { useEffect } from "react";
import "./styles/splash.css";

export default function Splash({ duration = 1200, onFinish }) {
  useEffect(() => {
    // respect reduced motion
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = prefersReduced ? 0 : duration;
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, ms);
    return () => clearTimeout(t);
  }, [duration, onFinish]);

  return (
    <div className="splash-overlay" role="status" aria-hidden="false">
      <div className="splash-content">
        <div className="splash-brand-circle" aria-hidden>
          <span className="splash-initials">GS</span>
        </div>
        <div className="splash-title">G Sudeep kumar</div>
      </div>
    </div>
  );
}
