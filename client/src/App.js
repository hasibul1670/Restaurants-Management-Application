import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { Toaster } from "react-hot-toast";
import Cooking from "./pages/Shared/Cooking";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/table/:tableNo" element={<Menu />} />
          <Route path="/cooking" element={<Cooking />} />
        </Routes>
      </QueryClientProvider>
      <Toaster/>
    </>
  );
}

export default App;
