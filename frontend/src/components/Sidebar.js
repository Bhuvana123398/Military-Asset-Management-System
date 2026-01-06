const userRole = "LogisticsOfficer"; 
const Sidebar = () => {
  return (
    <nav>
       <Link to="/dashboard">Dashboard</Link>
       {(userRole === 'Admin' || userRole === 'LogisticsOfficer') && (
         <Link to="/purchases">Record Purchases</Link>
       )}
       {userRole === 'BaseCommander' && (
         <Link to="/my-base">My Base Reports</Link>
       )}
    </nav>
  );
}