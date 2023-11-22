import React, { FC } from "react";
import "./styles.css";

interface ErrorIconProps {
  type: string;
}

export const ErrorIcon: FC<ErrorIconProps> = ({ type }) => (
  <svg className={`notification-${type}-icon`} width="14" height="14" viewBox="0 0 16 16"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM3.293 4.707l8 8 1.414-1.414-8-8-1.414 1.414z"
          fill-rule="evenodd"/>
  </svg>
);
