import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Lock, User } from 'lucide-react';
const Login = () => {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        username: username || 'User1', 
        password: password, 
        role: role 
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.role);
      localStorage.setItem('base', res.data.base);
      navigate('/');
      window.location.reload();
    } catch (err) {
      alert("Login Failed. Ensure backend is running.");
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <ShieldCheck className="mx-auto text-blue-600 mb-2" size={64} />
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Military Auth</h1>
          <p className="text-slate-500 text-sm font-medium">Asset Management System v1.0</p>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full border-2 border-slate-100 p-3 pl-10 rounded-xl focus:border-blue-500 outline-none transition-all"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full border-2 border-slate-100 p-3 pl-10 rounded-xl focus:border-blue-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Level</label>
            <select 
              className="w-full border-2 border-slate-100 p-3 rounded-xl font-bold text-slate-700 bg-slate-50 mt-1 cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Headquarters (Admin)</option>
              <option value="Commander">Base Commander (Alpha)</option>
              <option value="Logistics">Logistics Officer</option>
            </select>
          </div>
        </div>
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white font-black py-4 rounded-xl mt-8 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 uppercase tracking-wider" >
          Secure Access
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest">
          Classified Information • Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};
export default Login;