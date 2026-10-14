import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { CatalogProvider } from "./catalog/CatalogContext";
import { CartProvider } from "./context/CartContext";
import { CustomerAuthProvider } from "./context/CustomerAuthContext";
import { BASE_NAME } from "./constants/api";
import CartDrawer from "./components/shop/CartDrawer";
import CheckoutModal from "./components/shop/CheckoutModal";
import AuthModal from "./components/shop/AuthModal";
import Home from "./pages/home";
import OurStoryPage from "./pages/our-story";
import CandlesPage from "./pages/candles";
import CandleCollectionPage from "./pages/candles/CollectionPage";
import GreetingCardsPage from "./pages/greeting-cards";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminCandlesPage from "./pages/admin/AdminCandlesPage";
import AdminCollectionsPage from "./pages/admin/AdminCollectionsPage";
import { AdminCardsPage } from "./pages/admin/AdminGalleryPages";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import { store } from "./redux/store";

const PrivateRoute = () => {
  const token = "a";
  return token ? <Outlet /> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Provider store={store}>
      <CatalogProvider>
        <CustomerAuthProvider>
          <CartProvider>
            <BrowserRouter basename={BASE_NAME}>
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/our-story" element={<OurStoryPage />} />
                  <Route path="/candles" element={<CandlesPage />} />
                  <Route path="/candles/:collectionSlug" element={<CandleCollectionPage />} />
                  <Route path="/collections" element={<CandlesPage />} />
                  <Route path="/collections/:collectionSlug" element={<CandleCollectionPage />} />
                  <Route path="/paintings" element={<Navigate to="/candles" replace />} />
                  <Route path="/greeting-cards" element={<GreetingCardsPage />} />

                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminOverviewPage />} />
                    <Route path="collections" element={<AdminCollectionsPage />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="customers" element={<AdminCustomersPage />} />
                    <Route path="candles" element={<AdminCandlesPage />} />
                    <Route path="greeting-cards" element={<AdminCardsPage />} />
                  </Route>
                </Route>
              </Routes>

              {/* Global Storefront Modals and Drawers */}
              <CartDrawer />
              <CheckoutModal />
              <AuthModal />
            </BrowserRouter>
          </CartProvider>
        </CustomerAuthProvider>
      </CatalogProvider>
    </Provider>
  );
}

export default AppRoutes;
