import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { BASE_NAME } from "./constants/api";
import Home from "./pages/home";
import OurStoryPage from "./pages/our-story";
import CandlesPage from "./pages/candles";
import CandleCollectionPage from "./pages/candles/CollectionPage";
import PaintingsPage from "./pages/paintings";
import GreetingCardsPage from "./pages/greeting-cards";
import { store } from "./redux/store";

const PrivateRoute = () => {
  const token = "a";
  return token ? <Outlet /> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={BASE_NAME}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/candles" element={<CandlesPage />} />
            <Route path="/candles/:collectionSlug" element={<CandleCollectionPage />} />
            <Route path="/paintings" element={<PaintingsPage />} />
            <Route path="/greeting-cards" element={<GreetingCardsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default AppRoutes;
