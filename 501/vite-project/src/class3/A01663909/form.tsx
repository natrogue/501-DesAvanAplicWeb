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
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-semibold mb-8">Travel Request Form</h1>
      <div className="w-full max-w-md space-y-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="Destination"
            value={state.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
            className="p-3 border rounded w-full"
          />
        </div>
        <div className="w-full">
          <input
            type="date"
            value={state.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="p-3 border rounded w-full"
          />
        </div>
        <div className="w-full">
          <input
            type="date"
            value={state.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            className="p-3 border rounded w-full"
          />
        </div>
        <div className="w-full">
          <textarea
            placeholder="Purpose"
            value={state.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            className="p-3 border rounded w-full h-32"
            rows={4}
          />
        </div>
        <div className="w-full flex justify-center mt-8">
          <button 
            onClick={handleSubmit} 
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 font-medium text-lg"
          >
            Submit
          </button>
        </div>
        <div className="w-full flex justify-center mt-4">
        </div>
      </div>
    </div>
  );
};

export default TravelRequestForm;