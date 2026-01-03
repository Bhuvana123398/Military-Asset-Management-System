import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRightLeft, History } from 'lucide-react';
const TransferPage = () => {
  const [formData, setFormData] = useState({ 
    assetType: '', 
    quantity: '', 
    fromBase: 'Base Alpha', 
    toBase: 'Base Bravo' 
  });
  const [msg, setMsg] = useState('');
  const [logs, setLogs] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const fetchLogs = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/assets/history/transfers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
    } catch (err) {
        console.error("Error fetching logs:", err);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, [API_URL]);
  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/assets/transfer`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg('✅ Transfer Authorized and Logged');
      setFormData({ assetType: '', quantity: '', fromBase: 'Base Alpha', toBase: 'Base Bravo' }); 
      fetchLogs(); 
    } catch (err) { 
      setMsg('Error executing transfer. Check backend.'); 
    }
  };
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
        <ArrowRightLeft className="text-blue-600" /> Asset Transfer
      </h1>
      <form onSubmit={handleTransfer} className="bg-white p-8 rounded-3xl shadow-xl border mb-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Equipment Name</label>
            <input 
              type="text" placeholder="e.g. M4 Carbine" 
              className="border-2 p-3 rounded-xl focus:border-blue-500 outline-none transition-all"
              value={formData.assetType}
              onChange={(e) => setFormData({...formData, assetType: e.target.value})}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Quantity</label>
            <input 
              type="number" placeholder="0" 
              className="border-2 p-3 rounded-xl focus:border-blue-500 outline-none transition-all"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">From Base (Source)</label>
            <select 
              className="border-2 p-3 rounded-xl bg-gray-50 font-semibold"
              value={formData.fromBase}
              onChange={(e) => setFormData({...formData, fromBase: e.target.value})}
            >
              <option>Base Alpha</option>
              <option>Base Bravo</option>
              <option>Base Charlie</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">To Base (Destination)</label>
            <select 
              className="border-2 p-3 rounded-xl bg-gray-50 font-semibold"
              value={formData.toBase}
              onChange={(e) => setFormData({...formData, toBase: e.target.value})}
            >
              <option>Base Bravo</option>
              <option>Base Alpha</option>
              <option>Base Charlie</option>
            </select>
          </div>
        </div>
        <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95">
          EXECUTE MOVEMENT
        </button>
        {msg && <p className={`text-center font-bold ${msg.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-gray-800">
          <History className="text-gray-400" /> Movement Audit Logs
        </h2>
        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-bold text-gray-600 uppercase text-xs">Equipment</th>
                <th className="p-4 font-bold text-gray-600 uppercase text-xs">Type</th>
                <th className="p-4 font-bold text-gray-600 uppercase text-xs">Origin/Dest</th>
                <th className="p-4 font-bold text-gray-600 uppercase text-xs">Qty</th>
                <th className="p-4 font-bold text-gray-600 uppercase text-xs">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-800 uppercase">{log.assetType}</td>
                  <td className={`p-4 font-black text-xs ${log.type === 'TRANSFER_IN' ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="bg-gray-100 px-2 py-1 rounded">{log.type.replace('_', ' ')}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">
                    {log.type === 'TRANSFER_IN' ? `From: ${log.fromBase}` : `Sent To: ${log.toBase}`}
                  </td>
                  <td className="p-4 font-black text-lg">{log.quantity}</td>
                  <td className="p-4 text-gray-400 text-xs font-mono">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {logs.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-2">
               <p className="text-gray-400 font-bold">No transfers recorded yet.</p>
               <p className="text-xs text-gray-300">New movements will appear here automatically.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TransferPage;