import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, History } from 'lucide-react';
const Purchases = () => {
  const [formData, setFormData] = useState({ assetType: '', quantity: '', toBase: 'Base Alpha' });
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/assets/history/purchases`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (err) {
      console.log("Error fetching history:", err);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, [status]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/assets/purchase`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStatus('✅ Purchase Recorded Successfully!');
      setFormData({ assetType: '', quantity: '', toBase: 'Base Alpha' }); 
    } catch (err) {
      console.error("Error details:", err.response ? err.response.data : err.message);
      setStatus(`Error: ${err.response?.data?.message || "Check Console"}`);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
        <ShoppingCart className="text-blue-600" /> Record New Purchase
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* PURCHASE FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border space-y-4 h-fit">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Equipment Name</label>
            <input 
              type="text" placeholder="e.g. M4 Carbine" 
              className="w-full border-2 p-3 rounded-xl focus:border-blue-500 outline-none"
              value={formData.assetType}
              onChange={(e) => setFormData({...formData, assetType: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Quantity</label>
            <input 
              type="number" className="w-full border-2 p-3 rounded-xl focus:border-blue-500 outline-none"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Assign to Base</label>
            <select 
              className="w-full border-2 p-3 rounded-xl bg-gray-50 font-bold"
              value={formData.toBase}
              onChange={(e) => setFormData({...formData, toBase: e.target.value})}
            >
              <option>Base Alpha</option>
              <option>Base Bravo</option>
              <option>Base Charlie</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95">
            CONFIRM PURCHASE
          </button>
          {status && <p className="mt-4 text-center font-bold text-sm text-blue-600">{status}</p>}
        </form>
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <History className="text-gray-400" /> Purchase History
          </h2>
          <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-xs font-black uppercase text-gray-400">Asset</th>
                  <th className="p-4 text-xs font-black uppercase text-gray-400">Qty</th>
                  <th className="p-4 text-xs font-black uppercase text-gray-400">Base</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? history.map((item, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-800 uppercase">{item.assetType}</td>
                    <td className="p-4 font-black text-blue-600">+{item.quantity}</td>
                    <td className="p-4 text-sm text-gray-600">{item.toBase}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="p-10 text-center text-gray-400">No purchase records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;