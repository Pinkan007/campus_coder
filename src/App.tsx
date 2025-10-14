import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Blogs from "./pages/Blogs";
import Jobs from "./pages/Jobs";
import Learn from "./pages/Learn";
import Projects from "./pages/Projects";
import Cheatsheet from "./pages/Cheatsheet";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Store from "./pages/Store";
import Freelance from "./pages/Freelance";
import Events from "./pages/Events";
import Tutorials from "./pages/Tutorials";
import MoreCategories from "./pages/MoreCategories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/cheatsheet" element={<Cheatsheet />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/store" element={<Store />} />
                <Route path="/freelance" element={<Freelance />} />
                <Route path="/events" element={<Events />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/more-categories" element={<MoreCategories />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </SubscriptionProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
