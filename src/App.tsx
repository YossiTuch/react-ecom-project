import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex w-full flex-wrap justify-center rounded">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>

          <div>
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
