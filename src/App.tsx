import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataShowScreen from "./screens/data-show-screen";
import ContentDetailDataScreen from "./screens/content-detail-data-screen";
import SearchScreen from "./screens/search-screen";
import MainLayout from "./components/main-layout";

export default function App() {
  return (
    <MainLayout>
      <Router>
        <Routes>
          <Route path="/" element={<DataShowScreen />} index />
          <Route path="/content" element={<ContentDetailDataScreen />} />
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </Router>
    </MainLayout>
  );
}
