import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
import { Metamask } from "./features/metamask/Metamask";
import { Collection } from "./features/collection/Collection";
import { Market } from "./features/market/Market";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { IGunInstance } from "gun";
import { Mint } from "./features/mint/Mint";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { gun } from './app/gun';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    gun?: IGunInstance;
  }
}

if (typeof window.gun !== 'undefined') {
  window.gun = gun;
}

interface NavButtonProps {
  children: string;
  active?: boolean;
  onClick?: Function;
}
const NavButton: React.FC<NavButtonProps> = ({children, active, onClick}: NavButtonProps) => {
  return (
  <button onClick={() => {onClick && onClick()}} className={`font-bold  ${active ? 'border-b border-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500' : 'text-white bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-transparent hover:bg-clip-text' }`}>
    {children}
  </button>
  )
};

function App() {
  const location = useLocation();
  const nav = useNavigate();

  return (
    <div className="bg-black w-full">
      <div className="w-full">
        <h1 className="text-7xl text-center text-white mb-12">
          Ninja Tools Project
        </h1>
        <Metamask />
        <Mint />

        <nav className="text-white w-full h-[72px] border-b border-white flex items-center justify-center gap-4">
          <NavButton onClick={() => {nav('/')}} active={location.pathname === '/'}>My Collection</NavButton>
          <NavButton onClick={() => {nav('/market')}} active={location.pathname === '/market'}>Market</NavButton>
        </nav>

        <Routes>
          <Route path="/" element={<Collection />}></Route>
          <Route path="/market" element={<Market />}></Route>
        </Routes>

        <footer className="bg-black w-full h-[600px]">

        </footer>
      </div>
    </div>
  );
}

export default App;
