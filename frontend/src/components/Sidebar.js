// src/components/Sidebar.js
const userRole = "LogisticsOfficer"; // This would come from your JWT/Context

const Sidebar = () => {
  return (
    <nav>
       <Link to="/dashboard">Dashboard</Link>
       
       {/* Only Admins and Logistics can see Purchases */}
       {(userRole === 'Admin' || userRole === 'LogisticsOfficer') && (
         <Link to="/purchases">Record Purchases</Link>
       )}
       
       {/* Commanders can see their specific base data */}
       {userRole === 'BaseCommander' && (
         <Link to="/my-base">My Base Reports</Link>
       )}
    </nav>
  );
}