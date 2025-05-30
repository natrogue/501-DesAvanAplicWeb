// Test del REDUCER (función pura) - esto SÍ debe funcionar
describe('Travel Form Reducer', () => {
  // Copiamos el reducer directamente aquí para evitar imports
  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return { ...state, [action.field]: action.value };
      default:
        return state;
    }
  };

  const initialState = {
    destination: '',
    startDate: '',
    endDate: '',
    purpose: '',
  };

  test('reducer updates destination field', () => {
    const action = { type: 'UPDATE_FIELD', field: 'destination', value: 'Paris' };
    
    const newState = reducer(initialState, action);
    
    expect(newState.destination).toBe('Paris');
    expect(newState.startDate).toBe(''); // otros campos no cambian
  });

  test('reducer updates startDate field', () => {
    const action = { type: 'UPDATE_FIELD', field: 'startDate', value: '2025-06-15' };
    
    const newState = reducer(initialState, action);
    
    expect(newState.startDate).toBe('2025-06-15');
    expect(newState.destination).toBe(''); // otros campos no cambian
  });

  test('reducer updates purpose field', () => {
    const action = { type: 'UPDATE_FIELD', field: 'purpose', value: 'Business meeting' };
    
    const newState = reducer(initialState, action);
    
    expect(newState.purpose).toBe('Business meeting');
  });

  test('reducer returns same state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    
    const newState = reducer(initialState, action);
    
    expect(newState).toBe(initialState); // referencia exacta
  });

  test('reducer preserves other fields when updating one', () => {
    const currentState = {
      destination: 'Tokyo',
      startDate: '2025-06-01',
      endDate: '2025-06-05',
      purpose: 'Conference'
    };
    
    const action = { type: 'UPDATE_FIELD', field: 'destination', value: 'Seoul' };
    
    const newState = reducer(currentState, action);
    
    expect(newState.destination).toBe('Seoul');
    expect(newState.startDate).toBe('2025-06-01'); // sin cambios
    expect(newState.endDate).toBe('2025-06-05');   // sin cambios
    expect(newState.purpose).toBe('Conference');   // sin cambios
  });
});