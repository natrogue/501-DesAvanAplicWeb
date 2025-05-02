import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUser } from './UserContext';

interface TravelRequestFormValues {
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
}

const travelRequestSchema = Yup.object().shape({
  destination: Yup.string().required('Destination is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
  purpose: Yup.string().required('Purpose is required'),
});

const TravelRequestForm: React.FC = () => {
  const { submitTravelRequest } = useUser();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (values: TravelRequestFormValues, { resetForm }: any) => {
    // Submit the travel request
    submitTravelRequest(values);
    
    // Console log for debugging
    console.log('Travel Request:', values);
    
    // Reset form and show success message
    resetForm();
    setSubmitted(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Formik
      initialValues={{ destination: '', startDate: '', endDate: '', purpose: '' }}
      validationSchema={travelRequestSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            Travel Request Form
          </h1>
          
          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Travel request submitted successfully!
            </div>
          )}
          
          <div className="mb-4">
            <Field
              type="text"
              name="destination"
              placeholder="Destination"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <ErrorMessage
              name="destination"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <Field
              type="date"
              name="startDate"
              placeholder="Start Date"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <Field
              type="date"
              name="endDate"
              placeholder="End Date"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <ErrorMessage
              name="endDate"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <Field
              as="textarea"
              name="purpose"
              placeholder="Purpose"
              className="p-2 border border-gray-300 rounded w-full h-24"
            />
            <ErrorMessage
              name="purpose"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded border-none cursor-pointer"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TravelRequestForm;