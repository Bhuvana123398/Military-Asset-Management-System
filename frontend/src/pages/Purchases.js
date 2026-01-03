import React, { useState } from 'react';
import axios from 'axios';
const Purchases = () => {
  const [formData, setFormData] = useState({ assetType: '', quantity: '', toBase: 'Base Alpha' });
  const [status, setStatus] = useState('');
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/api/assets/purchase', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStatus('Purchase Recorded Successfully!');
  } catch (err) {
    // This logs the real error from the server (e.g. 403 Forbidden or 404 Not Found)
    console.error("Error details:", err.response ? err.response.data : err.message);
    setStatus(`Error: ${err.response?.data?.message || "Check Console"}`);
  }
};
return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Record New Purchase</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Equipment / Asset Name</label>
          <input 
            type="text" placeholder="e.g. M4 Carbine, Humvee" 
            className="w-full border p-3 rounded-xl"
            value={formData.assetType}
            onChange={(e) => setFormData({...formData, assetType: e.target.value})}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Quantity</label>
            <input 
              type="number" className="w-full border p-3 rounded-xl"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Assign to Base</label>
            <select 
              className="w-full border p-3 rounded-xl"
              value={formData.toBase}
              onChange={(e) => setFormData({...formData, toBase: e.target.value})}
            >
              <option>Base Alpha</option>
              <option>Base Bravo</option>
              <option>Base Charlie</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition">
          Confirm Purchase
        </button>
        {status && <p className="mt-4 text-center font-semibold text-blue-600">{status}</p>}
      </form>
    </div>
  );
};
export default Purchases;