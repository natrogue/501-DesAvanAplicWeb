import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from '../../class2/A01663909/inputField';
import Button from '../../class2/A01663909/button';
import { useUser } from './UserContext';

interface ExpenseFormValues {
  amount: string;
  category: string;
  description: string;
}

const expenseSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  category: Yup.string()
    .required('Category is required'),
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters')
});

const ExpenseForm: React.FC = () => {
  const { submitExpense } = useUser();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (values: ExpenseFormValues, { resetForm }: any) => {
    // Use the submitExpense function from context
    submitExpense(values);
    
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
      initialValues={{ amount: '', category: '', description: '' }}
      validationSchema={expenseSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form className="p-4">
          <h1 className="text-2xl font-bold mb-4">Expense Form</h1>
          
          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Expense submitted successfully!
            </div>
          )}
          
          <div className="mb-4">
            <Field
              as={InputField}
              type="number"
              name="amount"
              placeholder="Amount"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              name="amount"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          
          <div className="mb-4">
            <Field
              as={InputField}
              type="text"
              name="category"
              placeholder="Category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          
          <div className="mb-4">
            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 border border-gray-300 rounded w-full h-24"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          
          <Button label={isSubmitting ? "Submitting..." : "Submit"} onClick={() => handleSubmit()} />
        </Form>
      )}
    </Formik>
  );
};

export default ExpenseForm;