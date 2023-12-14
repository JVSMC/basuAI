import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";
import Home from "./Home"

function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isMobile ? (
          <Route index element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Sorry, the mobile view is not available.</h1>
          </div>} />
        ) : (
          <Route index element={<Home />} />
        )}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
