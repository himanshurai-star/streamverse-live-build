
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import GoLiveSetup from "./pages/GoLiveSetup";
import LiveStreaming from "./pages/LiveStreaming";
import StreamViewer from "./pages/StreamViewer";
import UploadPhoto from "./pages/UploadPhoto";
import UploadVideo from "./pages/UploadVideo";
import NotFound from "./pages/NotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyOTP from "./pages/auth/VerifyOTP";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
          <Route path="/creator/go-live" element={<GoLiveSetup />} />
          <Route path="/creator/live" element={<LiveStreaming />} />
          <Route path="/creator/upload/photo" element={<UploadPhoto />} />
          <Route path="/creator/upload/video" element={<UploadVideo />} />
          <Route path="/stream/:streamId" element={<StreamViewer />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/verify-otp" element={<VerifyOTP />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
