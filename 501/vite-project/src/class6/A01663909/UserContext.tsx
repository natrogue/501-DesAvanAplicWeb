import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the possible user roles
type UserRole = 'employee' | 'manager' | 'admin';

// Define the TravelRequest interface
interface TravelRequest {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Define the Expense interface
interface Expense {
  id: string;
  amount: string;
  category: string;
  description: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Define the User interface
interface User {
  id?: string;
  username?: string;
  role: UserRole;
  email?: string;
  name?: string;
}

// Define the context type
interface UserContextType {
  user: User;
  login: (role: UserRole, userData?: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  travelRequests: TravelRequest[];
  expenses: Expense[];
  submitTravelRequest: (request: Omit<TravelRequest, 'id' | 'submittedBy' | 'submittedDate' | 'status'>) => void;
  submitExpense: (expense: Omit<Expense, 'id' | 'submittedBy' | 'submittedDate' | 'status'>) => void;
  updateTravelRequestStatus: (id: string, status: 'approved' | 'rejected') => void;
  updateExpenseStatus: (id: string, status: 'approved' | 'rejected') => void;
}

// Create the context with undefined as default value
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Initialize user state with default role as 'employee'
  const [user, setUser] = useState<User>({ role: 'employee' });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [travelRequests, setTravelRequests] = useState<TravelRequest[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Check for existing user session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('user');
      }
    }

    // Load saved travel requests and expenses
    const storedTravelRequests = localStorage.getItem('travelRequests');
    if (storedTravelRequests) {
      try {
        setTravelRequests(JSON.parse(storedTravelRequests));
      } catch (error) {
        console.error('Failed to parse travel requests:', error);
      }
    }

    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      try {
        setExpenses(JSON.parse(storedExpenses));
      } catch (error) {
        console.error('Failed to parse expenses:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (travelRequests.length > 0) {
      localStorage.setItem('travelRequests', JSON.stringify(travelRequests));
    }
  }, [travelRequests]);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  // Function to send WebSocket notification
  const sendWebSocketNotification = (message: string) => {
    try {
      const ws = new WebSocket('ws://localhost:8080');
      
      ws.onopen = () => {
        ws.send(message);
        ws.close();
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to send WebSocket notification:', error);
    }
  };

  // Function to handle user login
  const login = (role: UserRole, userData?: Partial<User>) => {
    const newUser: User = {
      ...user,
      ...userData,
      role,
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Send WebSocket notification about login
    sendWebSocketNotification(`User ${newUser.username || 'Unknown'} logged in as ${role}`);
  };

  // Function to handle user logout
  const logout = () => {
    // Send WebSocket notification about logout
    sendWebSocketNotification(`User ${user.username || 'Unknown'} logged out`);
    
    setUser({ role: 'employee' });
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Function to submit a travel request
  const submitTravelRequest = (request: Omit<TravelRequest, 'id' | 'submittedBy' | 'submittedDate' | 'status'>) => {
    const newRequest: TravelRequest = {
      ...request,
      id: `tr-${Date.now()}`,
      submittedBy: user.username || 'Unknown User',
      submittedDate: new Date().toISOString(),
      status: 'pending'
    };

    setTravelRequests(prev => [...prev, newRequest]);
    console.log('Travel Request Submitted:', newRequest);
    
    // Send WebSocket notification about new travel request
    const notificationMessage = `New travel request submitted by ${newRequest.submittedBy} to ${newRequest.destination} from ${newRequest.startDate} to ${newRequest.endDate}`;
    sendWebSocketNotification(notificationMessage);
  };

  // Function to submit an expense
  const submitExpense = (expense: Omit<Expense, 'id' | 'submittedBy' | 'submittedDate' | 'status'>) => {
    const newExpense: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
      submittedBy: user.username || 'Unknown User',
      submittedDate: new Date().toISOString(),
      status: 'pending'
    };

    setExpenses(prev => [...prev, newExpense]);
    console.log('Expense Submitted:', newExpense);
    
    // Send WebSocket notification about new expense
    const notificationMessage = `New expense of $${newExpense.amount} for ${newExpense.category} submitted by ${newExpense.submittedBy}`;
    sendWebSocketNotification(notificationMessage);
  };

  // Function to update travel request status
  const updateTravelRequestStatus = (id: string, status: 'approved' | 'rejected') => {
    const updatedRequests = travelRequests.map(req => {
      if (req.id === id) {
        // Send WebSocket notification about status update
        const notificationMessage = `Travel request to ${req.destination} ${status} by ${user.username || 'Unknown User'}`;
        sendWebSocketNotification(notificationMessage);
        
        return { ...req, status };
      }
      return req;
    });
    
    setTravelRequests(updatedRequests);
  };

  // Function to update expense status
  const updateExpenseStatus = (id: string, status: 'approved' | 'rejected') => {
    const updatedExpenses = expenses.map(exp => {
      if (exp.id === id) {
        // Send WebSocket notification about status update
        const notificationMessage = `Expense of $${exp.amount} for ${exp.category} ${status} by ${user.username || 'Unknown User'}`;
        sendWebSocketNotification(notificationMessage);
        
        return { ...exp, status };
      }
      return exp;
    });
    
    setExpenses(updatedExpenses);
  };

  // Provide the context value to children components
  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated,
      travelRequests,
      expenses,
      submitTravelRequest,
      submitExpense,
      updateTravelRequestStatus,
      updateExpenseStatus
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};