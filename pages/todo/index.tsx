import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Paging from '../../components/Paging';
import { RootState } from '../../store';
import moment from 'moment';
import { deleteTodo, insertTodo, moveTodoFinished } from '../../store/todo/actions';
import Image from 'next/image';

const Index = () => {
  const dispatch = useDispatch();
  const { todos, searchState, searchedTodos } = useSelector((state: RootState) => state.todo);

  // 투두 리스트 상태
  const [newTodos, setNewTodos] = useState(todos.filter((todo, index) => index < 10));
  const [newTodoId, setNewTodoId] = useState(todos[todos.length - 1].id + 2);

  // 추가할 투두 리스트 초기 상태
  const [newTodo, setNewTodo] = useState([
    {
      id: newTodoId,
      importance: 0,
      todo: '',
      completed: false,
      date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
    },
  ]);

  // 정렬 상태
  const [importanceDescend, setImportanceDescend] = useState(true);
  const [dateDescend, setDateDescend] = useState(true);

  // 페이징 기능 관련 상태
  const [pageNum, setPageNum] = useState(1);
  const [pageCountNum, setPageCountNum] = useState(10);
  const [totalCount, setTotalCount] = useState(todos.length);

  const newTodoName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const set = new Set(
      todos
        .sort((a, b) =>
          importanceDescend ? a.importance - b.importance : b.importance - a.importance
        )
        .filter(
          (todo, index) =>
            index + 1 > (pageNum - 1) * pageCountNum && index + 1 < pageNum * pageCountNum + 1
        )
    );

    setNewTodos([...set]);
    setTotalCount(todos.length);
  }, [importanceDescend]);

  useEffect(() => {
    const set = new Set(
      todos
        .sort((a, b) =>
          dateDescend
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .filter(
          (todo, index) =>
            index + 1 > (pageNum - 1) * pageCountNum && index + 1 < pageNum * pageCountNum + 1
        )
    );

    setNewTodos([...set]);
    setTotalCount(todos.length);
  }, [dateDescend]);

  useEffect(() => {
    setNewTodos(
      todos
        .sort((a, b) => a.id - b.id)
        .filter(
          (todo, index) =>
            index + 1 > (pageNum - 1) * pageCountNum && index + 1 < pageNum * pageCountNum + 1
        )
    );
    setTotalCount(todos.length);
  }, [todos]);

  const onChangePage = (value: number) => {
    setPageNum(value);
    setNewTodos(
      todos.filter(
        (todo, index) =>
          index + 1 > (value - 1) * pageCountNum && index + 1 < value * pageCountNum + 1
      )
    );
  };

  const onChangePageCountNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageCountNum(parseInt(e.target.value));
    setNewTodos(todos.filter((todo, index) => index < parseInt(e.target.value)));
  };

  const onChangeNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(
      newTodo.map((todoItem) => {
        return {
          id: todoItem.id,
          importance: todoItem.importance,
          todo: e.target.value,
          completed: todoItem.completed,
          date: todoItem.date,
        };
      })
    );
  };

  const onClickStar = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    setNewTodo(
      newTodo.map((todoItem) => {
        return {
          id: todoItem.id,
          importance: parseInt(e.currentTarget.dataset.starNumber || ''),
          todo: todoItem.todo,
          completed: todoItem.completed,
          date: todoItem.date,
        };
      })
    );
  };

  const onClickAddTodo = () => {
    setNewTodoId(newTodoId + 1);
    dispatch(insertTodo(newTodo));
    setNewTodo(
      newTodo.map((todoItem) => {
        return {
          id: newTodoId + 1,
          importance: 0,
          todo: '',
          completed: false,
          date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        };
      })
    );
    newTodoName && newTodoName.current && newTodoName.current.focus();
  };

  const onClickDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!e.currentTarget.dataset.todoId) return;
    if (!e.currentTarget.dataset.todoName) return;
    if (
      prompt(
        `it will permanently deleted. do you agree?
then, type "${e.currentTarget.dataset.todoName}"`
      ) === e.currentTarget.dataset.todoName
    ) {
      dispatch(deleteTodo({ todoId: parseInt(e.currentTarget.dataset.todoId) }));
    }
  };

  const onClickDone = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!e.currentTarget.dataset.todoId) return;
    dispatch(moveTodoFinished({ todoId: parseInt(e.currentTarget.dataset.todoId) }));
  };

  const onClickImportance = () => {
    setImportanceDescend(!importanceDescend);
  };

  const onClickDate = () => {
    setDateDescend(!dateDescend);
  };

  return (
    <Layout>
      <div className="container">
        <div className="page-title">To do list !!</div>
        {!searchState && (
          <div className="count-menu">
            <span>showing : </span>
            <span>
              <select onChange={onChangePageCountNum}>
                <option value="10">show 10 each</option>
                <option value="20">show 20 each</option>
                <option value="50">show 50 each</option>
              </select>
            </span>
          </div>
        )}

        <div className="todo-wrapper">
          {!searchState && (
            <div className="createTodo-wrapper">
              <div className="createTodo-title">
                <div className="todo-name">Name What To do </div>
                <div className="todo-importance">Set importance</div>
              </div>
              <div className="createTodo-contents">
                <div className="todo-name">
                  <input
                    type="text"
                    onChange={onChangeNewTodoName}
                    value={newTodo[0].todo}
                    ref={newTodoName}
                  />
                </div>
                <div className="todo-importance">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className={newTodo[0].importance > -1 ? 'blink' : ''}
                    data-star-number="0"
                    onClick={onClickStar}
                  >
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className={newTodo[0].importance > 0 ? 'blink' : ''}
                    data-star-number="1"
                    onClick={onClickStar}
                  >
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className={newTodo[0].importance > 1 ? 'blink' : ''}
                    data-star-number="2"
                    onClick={onClickStar}
                  >
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                  </svg>
                </div>
                <div className="todo-submit">
                  <button className="primary" onClick={onClickAddTodo}>
                    Add to list
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="listTodo-wrapper">
            <ul>
              <li className="listTodo-title">
                <>
                  <div className="todo-name">To do</div>
                  <div className="todo-importance" onClick={onClickImportance}>
                    <span>Importance</span>
                    {!searchState && (
                      <span>
                        {importanceDescend && (
                          <Image
                            height="20px"
                            width="20px"
                            src="/img/arrow-up.svg"
                            alt="arrow up"
                          />
                        )}
                        {!importanceDescend && (
                          <Image
                            height="20px"
                            width="20px"
                            src="/img/arrow-down.svg"
                            alt="arrow down"
                          />
                        )}
                      </span>
                    )}
                  </div>
                  <div className="todo-date" onClick={onClickDate}>
                    <span>Created Date & Time</span>
                    {!searchState && (
                      <span>
                        {dateDescend && (
                          <Image
                            height="20px"
                            width="20px"
                            src="/img/arrow-up.svg"
                            alt="arrow up"
                          />
                        )}
                        {!dateDescend && (
                          <Image
                            height="20px"
                            width="20px"
                            src="/img/arrow-down.svg"
                            alt="arrow down"
                          />
                        )}
                      </span>
                    )}
                  </div>
                  {!searchState && <div className="todo-finished">finished</div>}
                </>
              </li>
              {newTodos &&
                newTodos.length > 0 &&
                !searchState &&
                newTodos.map((todo) => (
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
                      <button className="primary" data-todo-id={todo.id} onClick={onClickDone}>
                        done!
                      </button>
                      <button
                        className="primary"
                        data-todo-id={todo.id}
                        data-todo-name={todo.todo}
                        onClick={onClickDeleteTodo}
                      >
                        remove!
                      </button>
                    </div>
                  </li>
                ))}
              {searchedTodos &&
                searchedTodos.length > 0 &&
                searchState &&
                searchedTodos.map((todo) => (
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
                    {!searchState && (
                      <div className="todo-finished">
                        <button className="primary" data-todo-id={todo.id} onClick={onClickDone}>
                          done!
                        </button>
                        <button
                          className="primary"
                          data-todo-id={todo.id}
                          data-todo-name={todo.todo}
                          onClick={onClickDeleteTodo}
                        >
                          remove!
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              {searchState && searchedTodos.length === 0 && (
                <div className="nodata">
                  There is no such data. <br />
                  Plz check your search keyword.
                </div>
              )}
            </ul>
          </div>
          {!searchState && (
            <Paging
              countPerPage={pageCountNum}
              nowPage={pageNum}
              totalCount={totalCount}
              onChangePage={onChangePage}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
