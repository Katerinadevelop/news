import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import axios from "axios";
import Loader from "./Loader";
import Story from "./Story";
import Comment from "./Comment";
import Toast from "./Toast";
import { IComment, INotification, IPage, IStory } from "../types";

const pagesCount = 500 / 20;

const App = () => {
  const [page, setPage] = useState<IPage>({number: 1, start: 0, end: 20});
  const [data, setData] = useState<IStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState<number | null>(null );
  const [notification, setNotification] = useState<INotification>({isShow: false, type: "error", subtitle: ""});

  const getNotification = (value: INotification) => {
    setNotification(value);
    setTimeout(() => setNotification({isShow: false, type: "error", subtitle: ""}), 4000)
  }

  const getNews = async () => {
    setIsLoading(true);
    const stories: IStory[] = [];
    await axios("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const itemsIds = res.data.slice(page.start, page.end);
        const requests = itemsIds.map(async (id: number) => {
          return new Promise(async (resolve, reject) => {
            try {
              await axios(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, {
                method: 'GET',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                }
              })
                .then((result) => {
                  stories.push(result.data);
                })

              resolve(null);
            } catch (error) {
              getNotification({isShow: true, type: "error", subtitle: "Something went wrong"});
              reject();
            }
          })
        })
        Promise
          .all(requests)
          .then(() => {
            setData(stories);
            setIsLoading(false);
          }).catch(e => {
          getNotification({isShow: true, type: "error", subtitle: "Something went wrong"});
          setIsLoading(false);
        })
      })
      .catch(e => {
        getNotification({isShow: true, type: "error", subtitle: "Something went wrong"});
        setIsLoading(false);
      })
  }

  useEffect(() => {
    (async () => {
      await getNews()
    })()
  }, [page]);

  const handleNextPageClick = (isNext: boolean) => {
    const newPage: IPage = {...page};
    if (isNext) {
      newPage.start = page.start + 20;
      newPage.end = page.end + 20;
      newPage.number = page.number + 1;
      if (newPage.end > 500) {
        getNotification({isShow: true, type: "info", subtitle: "Page not found"});
        newPage.start = page.start;
        newPage.end = page.end;
        newPage.number = page.number;
      }
    } else {
      newPage.start = page.start - 20;
      newPage.end = page.end - 20;
      newPage.number = page.number - 1
      if (newPage.start < 0) {
        getNotification({isShow: true, type: "info", subtitle: "Page not found"});
        newPage.start = page.start;
        newPage.end = page.end;
        newPage.number = page.number;
      }
    }
    setPage(newPage);
  }

  const getComments = (commentIds: number[], id: number, isClose: boolean) => {
    if (isClose) {
      let newData: IStory[] = [...data];
      newData = newData.map(item => {
        const newItem = {...item};
        if (item.id === id) {
          newItem.comments = [];
        }
        return newItem
      })
      setData(newData);
      return
    }

    const newComments: IComment[] = [];
    setIsCommentLoading(id);
    const requests = commentIds.map(async (id: number) => {
      return new Promise(async (resolve, reject) => {
        try {
          await axios(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, {
            method: 'GET',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            }
          })
            .then((result) => {
              newComments.push(result.data);
            })
          resolve(null);
        } catch (e) {
          getNotification({isShow: true, type: "error", subtitle: "Something went wrong"});
          reject();
        }
      })
    })
    Promise
      .all(requests)
      .then(() => {
        let newData: IStory[] = [...data];
        newData = newData.map(item => {
          const newItem = {...item};
          if (item.id === id) {
            newItem.comments = newComments;
          }
          return newItem
        })
        setData(newData);
        setIsCommentLoading(null);
      }).catch(e => {
        getNotification({isShow: true, type: "error", subtitle: "Something went wrong"});
      setIsCommentLoading(null);
    });
  }

  return (
    <div className="app">
      <h4>Top Stories from the HackerNews</h4>
      <div className="base-container">
        {isLoading ? (
          <div className="wrapper loading-container">
            <Loader/>
          </div>
        ) : (
          <div className="wrapper">
            {data.map((item: IStory, index) => (
              <div key={item.id} className="container">
                <Story
                  page={page}
                  index={index}
                  item={item}
                  getComments={getComments}
                />
                <div className="full-width-container">
                  {isCommentLoading === item.id && (
                    <div className="wrapper loading-container">
                      <Loader/>
                    </div>
                  )}
                  {!isCommentLoading && item.comments?.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                      <Comment comment={comment} index={index}/>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="page-container">
          <div className="button-container">
            {page.number !== 1 && <button className="button" onClick={() => handleNextPageClick(false)}>Prev</button>}
          </div>
          {`Page ${page.number} of ${pagesCount}`}
          <div className="button-container">
            {page.number < 25 && <button className="button" onClick={() => handleNextPageClick(true)}>Next</button>}
          </div>
        </div>

        {notification.isShow && <Toast notification={notification} setNotification={setNotification}/>}
      </div>
    </div>
  );
}

export default App;
