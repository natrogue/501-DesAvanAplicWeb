import React from 'react';
import { useUser } from './UserContext';
import TravelRequestForm from './TravelRequestForm';
import ExpenseForm from './ExpenseForm';

const Dashboard: React.FC = () => {
  const { user, login } = useUser();

  const handleRoleChange = (newRole: string) => {
    // Validate that the newRole is one of the allowed roles
    if (newRole === 'employee' || newRole === 'manager' || newRole === 'admin') {
      login(newRole);
    } else {
      console.error('Invalid role:', newRole);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="mb-4">
        <label className="mr-2">Switch Role:</label>
        <select 
          value={user.role} 
          onChange={(e) => handleRoleChange(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      {user.role === 'employee' && (
        <div className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Employee View</h2>
          <p className="mb-4">As an employee, you can submit travel requests and expenses.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="text-lg font-medium mb-2">Submit New Travel Request</h3>
              <TravelRequestForm />
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-lg font-medium mb-2">Submit New Expense</h3>
              <ExpenseForm />
            </div>
          </div>
        </div>
      )}
      
      {user.role === 'manager' && (
        <div className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Manager View</h2>
          <p className="mb-4">As a manager, you can approve travel requests and expenses.</p>
          <div className="border p-4 rounded bg-yellow-50">
            <h3 className="text-lg font-medium mb-2">Pending Approvals</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Submitted By</th>
                  <th className="border p-2 text-left">Date</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Travel Request</td>
                  <td className="border p-2">John Doe</td>
                  <td className="border p-2">2025-04-28</td>
                  <td className="border p-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Approve</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Expense</td>
                  <td className="border p-2">Jane Smith</td>
                  <td className="border p-2">2025-04-29</td>
                  <td className="border p-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Approve</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {user.role === 'admin' && (
        <div className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Admin View</h2>
          <p className="mb-4">As an admin, you can manage users and system settings.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded bg-blue-50">
              <h3 className="text-lg font-medium mb-2">User Management</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Username</th>
                    <th className="border p-2 text-left">Role</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">john.doe</td>
                    <td className="border p-2">Employee</td>
                    <td className="border p-2">
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">jane.smith</td>
                    <td className="border p-2">Manager</td>
                    <td className="border p-2">
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border p-4 rounded bg-green-50">
              <h3 className="text-lg font-medium mb-2">System Settings</h3>
              <div className="mb-4">
                <label className="block mb-1">Approval Workflow</label>
                <select className="p-2 border border-gray-300 rounded w-full">
                  <option>Single-level approval</option>
                  <option>Two-level approval</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email Notifications</label>
                <input type="checkbox" className="mr-2" checked /> Enabled
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;