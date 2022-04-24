import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchFinished, searchTodos } from '../store/todo/actions';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = useState('');

  const onClickHeaderMenu = (e: React.MouseEvent<HTMLElement>) => {
    router.push(`/${e.currentTarget.dataset.menu}`);
  };

  const onChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  const onClickSearch = () => {
    if (router.pathname === '/todo') {
      dispatch(searchTodos({ searchKey }));
    } else if (router.pathname === '/finished') {
      dispatch(searchFinished({ searchKey }));
    }
  };
  return (
    <>
      <Head>
        <title>my awesome todolist</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="container">
          <div className="inner-wrapper">
            <div className="home">
              <Image width="30px" height="30px" alt="home image" src="/img/home_white.svg" />
              <span onClick={onClickHeaderMenu} data-menu="">
                Home
              </span>
            </div>
            <div className="menu-wrapper">
              <ul>
                <li>
                  <span onClick={onClickHeaderMenu} data-menu="todo">
                    To do
                  </span>
                </li>
                <li>
                  <span onClick={onClickHeaderMenu} data-menu="finished">
                    Finished
                  </span>
                </li>
                <li>
                  <span onClick={onClickHeaderMenu} data-menu="todoStorage">
                    To do - <br />
                    storage based
                  </span>
                </li>
                <li>
                  <span onClick={onClickHeaderMenu} data-menu="finishedStorage">
                    Finished -<br />
                    storage based
                  </span>
                </li>
              </ul>
            </div>
            <div className="search-wrapper">
              <div className="search-inner-wrapper">
                <input type="text" onChange={onChangeSearchKey} />
                <div className="img-wrapper">
                  <Image
                    width="20px"
                    height="20px"
                    alt="search icon"
                    src="/img/search.svg"
                    onClick={onClickSearch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
