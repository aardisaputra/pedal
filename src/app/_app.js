import { SubjectProvider } from '../context/SubjectContext';

function MyApp({ Component, pageProps }) {
  return (
    <SubjectProvider>
      <Component {...pageProps} />
    </SubjectProvider>
  );
}

export default MyApp;