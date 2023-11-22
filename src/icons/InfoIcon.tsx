import React, { FC } from "react";
import "./styles.css";

interface InfoIconProps {
  type: string;
}

export const InfoIcon: FC<InfoIconProps> = ({ type }) => (
  <svg className={`Notification-${type}-icon`} width="14" height="14" viewBox="0 0 16 16"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm1-3V7H7v6h2zM8 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          fill-rule="evenodd"/>
  </svg>
);
