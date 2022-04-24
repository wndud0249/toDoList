import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
  const router = useRouter();
  const onClickHeaderMenu = (e: React.MouseEvent<HTMLElement>) => {
    router.push(`/${e.currentTarget.dataset.menu}`);
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
                <input type="text" />
                <div className="img-wrapper">
                  <Image width="20px" height="20px" alt="search icon" src="/img/search.svg" />
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
