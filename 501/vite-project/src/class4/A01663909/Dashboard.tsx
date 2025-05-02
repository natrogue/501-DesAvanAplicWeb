import React from 'react';
import { useUser } from '../../class6/A01663909/UserContext';
import TravelRequestForm from '../../class5/A01663909/TravelRequestForm';
import ExpenseForm from './ExpenseForm';
import RealTimeNotifications from '../../class7/A01663909/RealTimeNotifications';

const Dashboard: React.FC = () => {
  const { user, login, travelRequests, expenses, updateTravelRequestStatus, updateExpenseStatus } = useUser();

  const handleRoleChange = (newRole: string) => {
    // Validate that the newRole is one of the allowed roles
    if (newRole === 'employee' || newRole === 'manager' || newRole === 'admin') {
      login(newRole);
    } else {
      console.error('Invalid role:', newRole);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
      
      {/* Real-Time Notifications Component - visible for all roles */}
      <div className="mb-4">
        <RealTimeNotifications />
      </div>
      
      {user.role === 'employee' && (
        <div className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Employee View</h2>
          <p className="mb-4">As an employee, you can submit travel requests and expenses.</p>
          
          {/* Show employee's submitted requests */}
          {(travelRequests.length > 0 || expenses.length > 0) && (
            <div className="mb-4 border p-4 rounded bg-gray-50">
              <h3 className="text-lg font-medium mb-2">My Submissions</h3>
              
              {travelRequests.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-1">Travel Requests</h4>
                  <table className="w-full border-collapse mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Destination</th>
                        <th className="border p-2 text-left">Dates</th>
                        <th className="border p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {travelRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="border p-2">{request.destination}</td>
                          <td className="border p-2">
                            {request.startDate} to {request.endDate}
                          </td>
                          <td className={`border p-2 ${
                            request.status === 'approved' 
                              ? 'text-green-600' 
                              : request.status === 'rejected' 
                                ? 'text-red-600' 
                                : 'text-yellow-600'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {expenses.length > 0 && (
                <div>
                  <h4 className="font-medium mb-1">Expenses</h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Amount</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense) => (
                        <tr key={expense.id}>
                          <td className="border p-2">${expense.amount}</td>
                          <td className="border p-2">{expense.category}</td>
                          <td className={`border p-2 ${
                            expense.status === 'approved' 
                              ? 'text-green-600' 
                              : expense.status === 'rejected' 
                                ? 'text-red-600' 
                                : 'text-yellow-600'
                          }`}>
                            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
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
          
          {travelRequests.filter(req => req.status === 'pending').length === 0 && 
           expenses.filter(exp => exp.status === 'pending').length === 0 ? (
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-4">
              <p className="text-center text-yellow-800">No pending approvals at this time.</p>
            </div>
          ) : (
            <div className="border p-4 rounded bg-yellow-50 mb-4">
              <h3 className="text-lg font-medium mb-2">Pending Approvals</h3>
              
              {travelRequests.filter(req => req.status === 'pending').length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-1">Travel Requests</h4>
                  <table className="w-full border-collapse mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Destination</th>
                        <th className="border p-2 text-left">Dates</th>
                        <th className="border p-2 text-left">Purpose</th>
                        <th className="border p-2 text-left">Submitted By</th>
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {travelRequests
                        .filter(request => request.status === 'pending')
                        .map((request) => (
                          <tr key={request.id}>
                            <td className="border p-2">{request.destination}</td>
                            <td className="border p-2">
                              {request.startDate} to {request.endDate}
                            </td>
                            <td className="border p-2">{request.purpose}</td>
                            <td className="border p-2">{request.submittedBy}</td>
                            <td className="border p-2">{formatDate(request.submittedDate)}</td>
                            <td className="border p-2">
                              <button 
                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                onClick={() => updateTravelRequestStatus(request.id, 'approved')}
                              >
                                Approve
                              </button>
                              <button 
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => updateTravelRequestStatus(request.id, 'rejected')}
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {expenses.filter(exp => exp.status === 'pending').length > 0 && (
                <div>
                  <h4 className="font-medium mb-1">Expenses</h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Amount</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Description</th>
                        <th className="border p-2 text-left">Submitted By</th>
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses
                        .filter(expense => expense.status === 'pending')
                        .map((expense) => (
                          <tr key={expense.id}>
                            <td className="border p-2">${expense.amount}</td>
                            <td className="border p-2">{expense.category}</td>
                            <td className="border p-2">{expense.description}</td>
                            <td className="border p-2">{expense.submittedBy}</td>
                            <td className="border p-2">{formatDate(expense.submittedDate)}</td>
                            <td className="border p-2">
                              <button 
                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                onClick={() => updateExpenseStatus(expense.id, 'approved')}
                              >
                                Approve
                              </button>
                              <button 
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => updateExpenseStatus(expense.id, 'rejected')}
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
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
                <input type="checkbox" className="mr-2" defaultChecked /> Enabled
              </div>
              <div className="mb-4">
                <label className="block mb-1">WebSocket Notifications</label>
                <input type="checkbox" className="mr-2" defaultChecked /> Enabled
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