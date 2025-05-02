import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TravelRequestForm from '../../class5/A01663909/TravelRequestForm';
import { UserContext } from '../../class6/A01663909/UserContext';

// Mock the UserContext
const mockSubmitTravelRequest = jest.fn();
const mockContextValue = {
  user: { role: 'employee', username: 'testuser' },
  login: jest.fn(),
  logout: jest.fn(),
  isAuthenticated: true,
  travelRequests: [],
  expenses: [],
  submitTravelRequest: mockSubmitTravelRequest,
  submitExpense: jest.fn(),
  updateTravelRequestStatus: jest.fn(),
  updateExpenseStatus: jest.fn()
};

// Wrapper component to provide context for testing
const TestWrapper = ({ children }) => (
  <UserContext.Provider value={mockContextValue}>
    {children}
  </UserContext.Provider>
);

describe('TravelRequestForm Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders the travel request form', () => {
    render(
      <TestWrapper>
        <TravelRequestForm />
      </TestWrapper>
    );
    
    // Check form elements are present
    expect(screen.getByText('Travel Request Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Destination')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Start Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('End Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Purpose')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('displays validation errors when form is submitted with empty fields', async () => {
    render(
      <TestWrapper>
        <TravelRequestForm />
      </TestWrapper>
    );
    
    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check validation errors
    await waitFor(() => {
      expect(screen.getByText('Destination is required')).toBeInTheDocument();
      expect(screen.getByText('Start date is required')).toBeInTheDocument();
      expect(screen.getByText('End date is required')).toBeInTheDocument();
      expect(screen.getByText('Purpose is required')).toBeInTheDocument();
    });
    
    // Ensure form submission function was not called
    expect(mockSubmitTravelRequest).not.toHaveBeenCalled();
  });
});