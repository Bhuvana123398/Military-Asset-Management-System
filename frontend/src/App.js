import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft, ShoppingCart, ShieldAlert, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import TransferPage from './pages/Transfer';
import Purchases from './pages/Purchases';
import Login from './pages/Login';
function App() {
  const role = localStorage.getItem('userRole');
  if (!role) {
    return (
      <Router>
        <Login />
      </Router>
    );
  }
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64 bg-slate-900 text-white p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-10 px-2 border-b border-slate-700 pb-6">
            <ShieldAlert className="text-red-500" size={32} />
            <h1 className="text-xl font-black uppercase tracking-tighter">Military Ops</h1>
          </div>
          <nav className="space-y-2 flex-1">
            <Link to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition font-medium">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/transfers" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition font-medium">
              <ArrowRightLeft size={20} /> Transfers
            </Link>
            <Link to="/purchases" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition font-medium">
              <ShoppingCart size={20} /> Purchases
            </Link>
          </nav>
          <div className="pt-6 border-t border-slate-700">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Authenticated As</p>
            <p className="text-sm font-bold text-green-400 mb-4">{role.toUpperCase()}</p>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 font-bold transition"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transfers" element={<TransferPage />} />
            <Route path="/purchases" element={<Purchases />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;