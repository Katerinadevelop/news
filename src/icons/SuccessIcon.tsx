import React, { FC } from "react";
import "./styles.css";

interface SuccessIconProps {
  type: string;
}

export const SuccessIcon: FC<SuccessIconProps> = ({ type }) => (
  <svg className={`Notification-${type}-icon`} width="14" height="14" viewBox="0 0 16 16"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.293-11.332L6.75 9.21 4.707 7.168 3.293 8.582 6.75 12.04l5.957-5.957-1.414-1.414z"
      fill-rule="evenodd"/>
  </svg>
);
