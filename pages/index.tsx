import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="main page-title">Read me</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
