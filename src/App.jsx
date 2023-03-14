// Need to add button bellow active items to see inactive items. Need to create page of inactive items with option to view details
// need to alter viewDetails of product (business) to conditionally render permanently delete button to exclude product from
// history of inactive products.
// Add toasts to Loading stages and to confirm exclusion of products "permanently" (softDelete from inactives) and to delete account
// (softDelete).

import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ClientEditProfile, Profile } from "./pages/ClientEditProfile";
import { Signup } from "./pages/Signup";
import { ClientFavorites } from "./pages/ClientFavorites";
import { ClientOrderDetail } from "./pages/ClientOrderDetail";
import { ClientProfile } from "./pages/ClientProfile";
import { ProtectedBusinessRoute } from "./components/ProtectedRoutes/protectedBusinessRoute.jsx";
import { ProtectedClientRoute } from "./components/ProtectedRoutes/protectedClientRoute.jsx";
import { ClientDiscover } from "./pages/ClientDiscover";
import { ClientProductDetail } from "./pages/ClientProductDetail";
import { DiscoverNotClient } from "./pages/DiscoverNotUser";
import { BusinessCreateProduct } from "./pages/BusinessCreateProduct";
import { BusinessProfile } from "./pages/BussinesProfile";
import { BusinessAdmin } from "./pages/BusinessAdmin";
import { BusinessEditProfile } from "./pages/BusinessEditProfile";
import { BusinessOrderDetail } from "./pages/BusinessOrderDetail";
import { BusinessProductDetail } from "./pages/BusinessProductDetail";
import { Toaster } from "react-hot-toast";
import { BusinessInactiveProducts } from "./pages/BusnessInactiveProducts";

function App() {
  return (
    <>
      <div className="App bg-stone-200 h-full">
        <AuthContextComponent>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/discover" element={<DiscoverNotClient />} />
            <Route
              path="/user/profile"
              element={<ProtectedClientRoute component={ClientProfile} />}
            />
            <Route
              path="/user/profile/edit"
              element={<ProtectedClientRoute component={ClientEditProfile} />}
            />
            <Route
              path="/user/viewOrder/:idOrder"
              element={<ProtectedClientRoute component={ClientOrderDetail} />}
            />
            <Route
              path="/user/favorites"
              element={<ProtectedClientRoute component={ClientFavorites} />}
            />
            <Route
              path="/user/discover"
              element={<ProtectedClientRoute component={ClientDiscover} />}
            />
            <Route
              path="/user/viewMagic/:idMagic"
              element={<ProtectedClientRoute component={ClientProductDetail} />}
            />
            <Route
              path="/business/admin"
              element={<ProtectedBusinessRoute component={BusinessAdmin} />}
            />
            <Route
              path="/business/inactiveProducts"
              element={
                <ProtectedBusinessRoute component={BusinessInactiveProducts} />
              }
            />
            <Route
              path="/business/profile"
              element={<ProtectedBusinessRoute component={BusinessProfile} />}
            />
            <Route
              path="/business/create-form"
              element={
                <ProtectedBusinessRoute component={BusinessCreateProduct} />
              }
            />
            <Route
              path="/business/profile/edit"
              element={
                <ProtectedBusinessRoute component={BusinessEditProfile} />
              }
            />
            <Route
              path="/business/viewOrder/:orderId"
              element={
                <ProtectedBusinessRoute component={BusinessOrderDetail} />
              }
            />
            <Route
              path="/business/viewProduct/:idProduct"
              element={
                <ProtectedBusinessRoute component={BusinessProductDetail} />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </>
  );
}

export default App;
