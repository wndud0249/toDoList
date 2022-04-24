import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Paging from '../../components/Paging';
import { RootState } from '../../store';

const Index = () => {
  const { finishedTodos } = useSelector((state: RootState) => state.todo);

  const [newFinishedTodos, setNewFinishedTodos] = useState(
    finishedTodos.filter((todo, index) => index < 10)
  );
  const [pageNum, setPageNum] = useState(1);
  const [pageCountNum, setPageCountNum] = useState(10);
  const [totalCount, setTotalCount] = useState(finishedTodos.length);
  console.log(finishedTodos);
  useEffect(() => {
    setNewFinishedTodos(
      finishedTodos.filter(
        (todo, index) =>
          index + 1 > (pageNum - 1) * pageCountNum && index + 1 < pageNum * pageCountNum + 1
      )
    );
    setTotalCount(finishedTodos.length);
  }, [finishedTodos]);

  const onChangePage = (value: number) => {
    setPageNum(value);
    setNewFinishedTodos(
      finishedTodos.filter(
        (todo, index) =>
          index + 1 > (value - 1) * pageCountNum && index + 1 < value * pageCountNum + 1
      )
    );
  };

  return (
    <Layout>
      <div className="container">
        <div className="page-title">What I did !!</div>
        <div className="count-menu">
          <span>showing : </span>
          <span>
            <select
            // onChange={onChangePageCountNum}
            >
              <option value="10">show 10 each</option>
              <option value="20">show 20 each</option>
              <option value="50">show 50 each</option>
            </select>
          </span>
        </div>
        <div className="todo-wrapper">
          <div className="listTodo-wrapper">
            <ul>
              <li className="listTodo-title">
                <div className="todo-name">What I did</div>
                <div className="todo-importance">Importance</div>
                <div className="todo-date">Finished Date & Time</div>
                <div className="todo-finished">Move to Todo list</div>
              </li>
              {newFinishedTodos &&
                newFinishedTodos.length > 0 &&
                newFinishedTodos.map((todo) => (
                  <li key={todo.id} className="listTodo-contents">
                    <div className="todo-name">{todo.todo}</div>
                    <div className="todo-importance">
                      {Array.from(Array(todo.importance + 1).keys()).map((arr, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                        </svg>
                      ))}
                    </div>
                    <div className="todo-date">{moment(todo.date).format('YYYY-MM-DD HH:mm')}</div>
                    <div className="todo-finished">
                      <button
                        className="primary"
                        data-todo-id={todo.id}
                        // onClick={onClickDone}
                      >
                        done!
                      </button>
                      <button
                        className="primary"
                        data-todo-id={todo.id}
                        data-todo-name={todo.todo}
                        // onClick={onClickDeleteTodo}
                      >
                        remove!
                      </button>
                    </div>
                  </li>
                ))}
              {newFinishedTodos.length === 0 && (
                <div className="nodata">
                  404 ...? No, <br />
                  There is no data that I have done yet...
                </div>
              )}
            </ul>
          </div>
          <Paging
            countPerPage={pageCountNum}
            nowPage={pageNum}
            totalCount={totalCount}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
