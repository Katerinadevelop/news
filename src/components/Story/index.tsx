import React, { FC } from "react";
import { IPage, IStory } from "../../types";
import "./styles.css";

interface StoryProps {
  page: IPage;
  index: number;
  item: IStory;
  getComments: (commentIds: number[], id: number, isClose: boolean) => void;
}

const Story: FC<StoryProps> = (props) => {
  const { page, index, item, getComments } = props;

  return (
    <div className="story-container">
      <div className="title-container">
        <span>{`${page.start + index + 1}) `}</span>
        <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
      </div>
      <div className="votes-container">
        <span>{`Votes: ${item.score} `}</span>
        <span className="comment-link" onClick={() => getComments(item.kids, item.id, Boolean(item.comments?.length))}>
          {`Comments: ${item.kids?.length ?? 0}`}
        </span>
      </div>
    </div>
  )
}

export default Story;
