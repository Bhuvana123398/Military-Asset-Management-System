import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Info } from 'lucide-react';
const Dashboard = () => {
  const [showNetModal, setShowNetModal] = useState(false);
  const [stats, setStats] = useState({
    openingBalance: 1200,
    netMovement: 0,
    purchases: 0,
    transfersIn: 0,
    transfersOut: 0,
    expended: 0,
    assigned: 0,
    closingBalance: 1200
  });
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseFilter = localStorage.getItem('base') || 'All';
        const res = await axios.get(`${API_URL}/api/dashboard/stats?base=${baseFilter}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard failed to fetch real data:", err);
      }
    };
    fetchStats();
  }, [API_URL]); 
  const opening = stats.openingBalance || 1200;
  const net = stats.netMovement || 0;
  const expended = stats.expended || 0;
  const assigned = stats.assigned || 0;
  const closing = stats.closingBalance || (opening + net - expended);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Military Asset Overview</h1>
        <div className="flex gap-4">
          <input type="date" className="border p-2 rounded-lg shadow-sm" />
          <select className="border p-2 rounded-lg shadow-sm">
            <option>All Bases</option>
            <option>Base Alpha</option>
            <option>Base Bravo</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Opening Balance" value={opening} color="bg-white border-gray-200" />
        <div 
          onClick={() => setShowNetModal(true)}
          className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl cursor-pointer hover:bg-blue-700 transition-all relative"
        >
          <p className="text-xs font-bold uppercase opacity-80">Net Movement</p>
          <p className="text-3xl font-bold">{net > 0 ? `+${net}` : net}</p>
          <Info className="absolute bottom-4 right-4 opacity-40" size={20} />
        </div>

        <StatCard title="Assigned" value={assigned} color="bg-white" />
        <StatCard title="Expended" value={expended} color="bg-white text-red-600" />
        <StatCard title="Closing Balance" value={closing} color="bg-green-700 text-white" />
      </div>

      {showNetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Movement Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Purchases</span>
                <span className="font-mono font-bold text-green-600">+{stats.purchases || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transfers In</span>
                <span className="font-mono font-bold text-green-600">+{stats.transfersIn || 0}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-600">Transfers Out</span>
                <span className="font-mono font-bold text-red-600">-{stats.transfersOut || 0}</span>
              </div>
              <div className="flex justify-between font-black text-xl pt-2">
                <span>Total Net</span>
                <span>{net}</span>
              </div>
            </div>
            <button 
              onClick={() => setShowNetModal(false)}
              className="mt-8 w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const StatCard = ({ title, value, color }) => (
  <div className={`${color} p-6 rounded-2xl shadow-sm border`}>
    <p className="text-xs font-bold uppercase text-gray-500 mb-2">{title}</p>
    <p className="text-3xl font-black">{value}</p>
  </div>
);
export default Dashboard;