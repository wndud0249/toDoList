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

          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
