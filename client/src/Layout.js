import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import NewsSection from './NewsSection'; // Import the NewsSection component

export default function Layout() {
  return (
    <div>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <Outlet />
          </div>
          <div className="col-lg-4">
            <NewsSection /> {/* Include the NewsSection component here */}
          </div>
        </div>
      </div>
    </div>
  );
}
