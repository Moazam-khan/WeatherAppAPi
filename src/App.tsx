import { AppLayout } from "@/components";
import { Dashboard } from "@/pages";
import "@/styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="*" element={<Dashboard />} />
          
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
