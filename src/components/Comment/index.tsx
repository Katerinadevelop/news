import React, { FC } from "react";
import { IComment } from "../../types";
import "./styles.css";

interface CommentProps {
  comment: IComment;
  index: number;
}

const Comment: FC<CommentProps> = (props) => {
  const { comment, index } = props;

  const unescapeHTML = (html: string) => {
    const escapeEl = document.createElement('div');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  }

  return (
    <div className="comment-container">
      {comment.text && (
        <>
          <span>{`${index + 1}) `}</span>
          {unescapeHTML(comment.text)}
        </>
      )}
    </div>
  )
}

export default Comment;
