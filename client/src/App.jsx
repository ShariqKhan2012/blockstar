import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Home, Contests, NewContest, ContestDetails, Contestants, ContestantDetails, Participate, Profile, Dashboard, SUDashboard } from './views';
//import { Web3ContextProvider } from './store/web3-context';
//require ('dotenv').config({path: '../.env'});
function App() {
  //let web3 = null;

  return (
    <>
      <div className="flex min-h-screen min-w-full flex-col justify-between">
        <Navbar />
        <Routes>
          <Route path="/" exact caseSensitive={false} element={<Home />} />
          <Route path="/contests/new" exact caseSensitive={false} element={<NewContest />} />
          <Route path="/contests/:id" exact caseSensitive={false} element={<ContestDetails />} />
          <Route path="/contests" exact caseSensitive={false} element={<Contests />} />
          <Route path="/contestants/:id" exact caseSensitive={false} element={<ContestantDetails />} />
          <Route path="/contestants" exact caseSensitive={false} element={<Contestants />} />
          <Route path="/participate" exact caseSensitive={false} element={<Participate />} />
          <Route path="/profile" exact caseSensitive={false} element={<Profile />} />
          <Route path="/dashboard" exact caseSensitive={false} element={<Dashboard />} />
          <Route path="/su-dashboard" exact caseSensitive={false} element={<SUDashboard />} />
        </Routes>

        <Footer />
      </div>
    </>
  )
}

export default App
