import React from 'react';

const Paging = ({
  countPerPage,
  nowPage,
  totalCount,
  onChangePage,
}: {
  countPerPage: number;
  nowPage: number;
  totalCount: number;
  onChangePage: (value: number) => void;
}) => {
  const allPageNumbers = !totalCount ? 1 : Math.ceil(totalCount / countPerPage);
  const pageArray =
    allPageNumbers > 9 ? Array.from(Array(10).keys()) : Array.from(Array(allPageNumbers).keys());

  const onClickPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!nowPage) return;
    e.preventDefault();
    onChangePage(
      parseInt(e.currentTarget.dataset.pagenum || '') < 1
        ? 1
        : parseInt(e.currentTarget.dataset.pagenum || '')
    );
  };

  const onClickPrev = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!nowPage) return;
    if (nowPage === 1) return;
    onChangePage(nowPage - 1);
  };

  const onClickNext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!nowPage) return;
    if (nowPage === allPageNumbers) return;
    onChangePage(nowPage + 1);
  };

  return (
    <div className="pagination">
      <button className="prev" onClick={onClickPrev} disabled={nowPage === 1}>
        &lt;
      </button>
      <div className="pageNum">
        {nowPage < 11 &&
          pageArray.map((page, index) => (
            <button
              key={index}
              className={nowPage === page + 1 ? 'focused' : ''}
              data-pagenum={page + 1}
              onClick={onClickPage}
            >
              {page + 1}
            </button>
          ))}
        {nowPage > 10 &&
          allPageNumbers - nowPage > 4 &&
          pageArray.map((page, index) => (
            <button
              key={index}
              className={nowPage === page + nowPage - 4 ? 'focused' : ''}
              data-pagenum={page + nowPage - 4}
              onClick={onClickPage}
            >
              {page + nowPage - 4}
            </button>
          ))}
        {nowPage > 10 &&
          allPageNumbers - nowPage < 5 &&
          pageArray.map((page, index) => (
            <button
              key={index}
              className={nowPage === page + allPageNumbers - 9 ? 'focused' : ''}
              data-pagenum={page + allPageNumbers - 9}
              onClick={onClickPage}
            >
              {page + allPageNumbers - 9}
            </button>
          ))}
      </div>
      <button className="next" onClick={onClickNext} disabled={nowPage === allPageNumbers}>
        &gt;
      </button>
    </div>
  );
};

export default Paging;
