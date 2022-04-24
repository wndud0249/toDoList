import type { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="main page-title">
            Read me &nbsp;
            <Image src="/img/pen-tool.svg" alt="alert mark" width="30px" height="30px" />
          </div>
          <div className="main-wrapper">
            <section>
              <div className="title">할 일 페이지 기능 리스트</div>
              <ul>
                <li>할 일 추가 기능</li>
                <li>할 일 삭제 기능</li>
                <li>할 일 삭제 실수 방지 기능 ( prompt 창 이용 )</li>
                <li>할 일 완료 기능 ( 완료한 일로 이동 )</li>
                <li>정렬 기능 ( 할 일 추가한 날짜 기준, 중요도 기준 )</li>
                <li>페이징 기능</li>
                <li>보여줄 목록 개수 설정 기능</li>
                <li>할 일 이름 검색 기능</li>
                <li>새로운 할 일 추가시 input 포커스</li>
              </ul>
            </section>
            <section>
              <div className="title">할 일 완료 페이지 기능 리스트</div>
              <ul>
                <li>할 일 목록으로 복귀 기능</li>
                <li>페이징 기능</li>
                <li>보여줄 목록 개수 설정 기능</li>
                <li>할 일 완료 목록이 없을 때 분기</li>
                <li>할 일 완료 이름 검색 기능</li>
              </ul>
            </section>
            <section>
              <div className="title">할 일 페이지 & 할 일 완료 페이지 UI 리스트</div>
              <ul>
                <li>페이지 제목 led 등 효과 - keyframes 사용</li>
                <li>중요도 별 개수로 보여주기</li>
                <li>버튼 호버시 하이라이트</li>
                <li>목록 내림차순,오름차순 여부 화살표 표시</li>
              </ul>
            </section>
            <section>
              <div className="title">아쉬웠던 점</div>
              <div className="content">
                첫번째로는 리덕스 사가등의 비동기 상태관리 라이브러리등으로 비동기 상태관리를
                코드상으로 보여드리지 못한 점이 아쉽습니다. <br />
                todolist 프로젝트를 만들기 시작할 때부터 요구사항을 충족시키기 위해 굳이 비동기
                상태관리까지는 필요가 없을것 같아 사용하지 않았습니다. <br /> <br />
                두번째로는 해도 안해도 상관없는 기능으로 새로고침이나 페이지 닫았다켜도 목록이
                초기화 되지 않는 기능을 구현해보라고 해주셨는데 <br />
                아, 이건 백엔드쪽을 구현 하던가, 로컬스토리지를 활용해야겠다 라고 생각했지만 시간상
                구현을 하지 못한점이 아쉽습니다. <br />
              </div>
            </section>
            <section>
              <div className="title">느낀 점</div>
              <div className="content">
                루디님에게 다음주 목요일까지 드리겠노라 약속드렸지만 사실 다음주에 회사 프로젝트
                발표가 있어서 평일에는 시간을 많이 내지 못할것 같아 <br /> 주말 이틀동안 다 끝내서
                월요일날 드릴 생각이었습니다. <br />
                머릿속으로 방법이 다 그려지는 느낌이라 자만했던것 같습니다. <br />
                아무리 쉽게 느껴지는 일이라 하더라도 실제로 하기 전에 자만하지 말아야 한다는 교훈을
                다시 되새기는 계기가 되었습니다. <br />
                회사 관련 프로젝트만 몇 개월간 하다가 새로운 프로젝트를 하게 되어 만드는 동안
                행복했습니다. <br />
                감사합니다.
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
