import React, { useReducer } from 'react';

type State = {
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
};

type Action = {
  type: 'UPDATE_FIELD';
  field: keyof State;
  value: string;
};

const initialState: State = {
  destination: '',
  startDate: '',
  endDate: '',
  purpose: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const TravelRequestForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (field: keyof State, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const handleSubmit = () => {
    console.log('Travel Request:', state);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-semibold">Travel Request Form</h1>
      <input
        type="text"
        placeholder="Destination"
        value={state.destination}
        onChange={(e) => handleChange('destination', e.target.value)}
        className="p-2 border rounded w-64"
      />
      <input
        type="date"
        value={state.startDate}
        onChange={(e) => handleChange('startDate', e.target.value)}
        className="p-2 border rounded w-64"
      />
      <input
        type="date"
        value={state.endDate}
        onChange={(e) => handleChange('endDate', e.target.value)}
        className="p-2 border rounded w-64"
      />
      <textarea
        placeholder="Purpose"
        value={state.purpose}
        onChange={(e) => handleChange('purpose', e.target.value)}
        className="p-2 border rounded w-64"
      />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Submit
      </button>
    </div>
  );
};

export default TravelRequestForm;