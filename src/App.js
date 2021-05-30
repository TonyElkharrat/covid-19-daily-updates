import Header from "./components/layouts/Header";
import { useState } from "react";
import Footer from "./components/layouts/Footer";

import Dashboard from "./components/DashBoard";
import { ThemeProvider } from "./store/ThemeContext";
function App() {
  return (
    <>
      <>
        <ThemeProvider>
          <Header />
          <Dashboard />
          <Footer />
        </ThemeProvider>
      </>
    </>
  );
}

export default App;
