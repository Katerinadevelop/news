import React, { FC } from "react";
import "./styles.css";

interface WarningIconProps {
  type: string;
}

export const WarningIcon: FC<WarningIconProps> = ({ type }) => (
  <svg className={`Notification-${type}-icon`} width="14" height="14" viewBox="0 0 16 16"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M.75 16a.75.75 0 0 1-.67-1.085L7.33.415a.75.75 0 0 1 1.34 0l7.25 14.5A.75.75 0 0 1 15.25 16H.75zm6.5-10v5h1.5V6h-1.5zM8 13.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0 1.5z"
      fill-rule="nonzero"/>
  </svg>
)
