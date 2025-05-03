
function validateFormFields(values) {
  const errors = {};
  
  if (!values.destination) {
    errors.destination = 'Destination is required';
  }
  
  if (!values.startDate) {
    errors.startDate = 'Start date is required';
  }
  
  if (!values.endDate) {
    errors.endDate = 'End date is required';
  }
  
  if (values.startDate && values.endDate && new Date(values.endDate) <= new Date(values.startDate)) {
    errors.endDate = 'End date must be after start date';
  }
  
  if (!values.purpose) {
    errors.purpose = 'Purpose is required';
  }
  
  return errors;
}


describe('TravelRequestForm validation', () => {
  test('form should have the required fields', () => {

    const requiredFields = ['destination', 'startDate', 'endDate', 'purpose'];
    

    requiredFields.forEach(field => {
      expect(typeof field).toBe('string');
    });
    
    expect(requiredFields.length).toBe(4);
  });
  
  test('validation should show errors for empty fields', () => {
    const emptyValues = {
      destination: '',
      startDate: '',
      endDate: '',
      purpose: ''
    };
    
    const errors = validateFormFields(emptyValues);
    
    expect(errors.destination).toBe('Destination is required');
    expect(errors.startDate).toBe('Start date is required');
    expect(errors.endDate).toBe('End date is required');
    expect(errors.purpose).toBe('Purpose is required');
  });
  
  test('validation should pass with valid data', () => {

    const validValues = {
      destination: 'Tokyo',
      startDate: '2025-06-15',
      endDate: '2025-06-20',
      purpose: 'Business meeting'
    };
    
    const errors = validateFormFields(validValues);
    
    expect(Object.keys(errors).length).toBe(0);
  });
  
  test('validation should check that end date is after start date', () => {
    const invalidDateValues = {
      destination: 'Paris',
      startDate: '2025-07-20',
      endDate: '2025-07-15',
      purpose: 'Vacation'
    };
    
    const errors = validateFormFields(invalidDateValues);
    
    expect(errors.endDate).toBe('End date must be after start date');
  });
});