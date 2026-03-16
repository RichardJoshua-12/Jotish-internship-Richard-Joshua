import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import Analytics from "./pages/Analytics"
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;