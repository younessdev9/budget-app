import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/alert';
import ExpenseForm from './components/expenseForm';
import ExpenseList from './components/expenseList';
import './App.css';

const initialExpense = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];
function App() {
  const [expenses, setExpenses] = useState(initialExpense);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  // ********** useEffect*********
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== '') {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        setAlert({ type: 'success', text: 'item edited' });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'item added' });
      }
      setCharge('');
      setAmount('');
    } else {
      handleAlert({
        type: 'danger',
        text: `charge can't be empty value and amount value ha to be bigger than zero`,
      });
    }
  };
  //clear items function
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'all items deleted' });
  };
  //deleting one item handler
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'item deleted' });
  };
  //deleting one item handler
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{' '}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;

// { id: uuidv4(), charge: 'rent', amount: 1600 },
// { id: uuidv4(), charge: 'car payment', amount: 400 },
// { id: uuidv4(), charge: 'credit card bill', amount: 1200 },
