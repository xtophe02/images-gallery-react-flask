import BlogImages from "./components/BlogImages";
import Header from "./components/Header";

import Layout from "./components/Layout";
import { ImagesProvider } from "./context/ImagesContext";

function App() {
  return (
    <>
      <Header />
      <ImagesProvider>
        <Layout />
        <BlogImages />
      </ImagesProvider>
    </>
  );
}

export default App;
