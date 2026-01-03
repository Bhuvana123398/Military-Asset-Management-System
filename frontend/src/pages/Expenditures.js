import React, { useState } from 'react';
const Expenditures = () => {
  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Assignments & Expenditure</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg border">
        <div className="flex gap-4 mb-6">
          <button className="flex-1 bg-gray-900 text-white p-3 rounded-xl font-bold">Assign to Personnel</button>
          <button className="flex-1 bg-red-600 text-white p-3 rounded-xl font-bold">Mark as Expended</button>
        </div>
        <form className="space-y-4">
          <input type="text" placeholder="Personnel Name / Rank" className="w-full border p-3 rounded-xl" />
          <input type="text" placeholder="Equipment (e.g. Ammo 5.56mm)" className="w-full border p-3 rounded-xl" />
          <input type="number" placeholder="Quantity" className="w-full border p-3 rounded-xl" />
          <textarea placeholder="Reason / Mission Name" className="w-full border p-3 rounded-xl"></textarea>
          <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-4">Confirm Transaction</button>
        </form>
      </div>
    </div>
  );
};
export default Expenditures;