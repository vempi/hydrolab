import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataShowScreen from "./screens/data-show-screen";
import ContentDetailDataScreen from "./screens/content-detail-data-screen";
import SearchScreen from "./screens/search-screen";
import MainLayout from "./components/main-layout";
import { initializeData } from "./lib/dataService";

export default function App() {
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    initializeData()
      .then(() => setReady(true))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Gagal memuat data. Silakan refresh halaman.</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

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
