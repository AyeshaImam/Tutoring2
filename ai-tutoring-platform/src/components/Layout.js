// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer'; // Ensure Footer is imported

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer /> {/* Ensure Footer is included here */}
    </div>
  );
}

export default Layout;
