import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex w-full flex-wrap justify-between rounded">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
