import React from 'react';
import ExpenseItem from './expenseItem';
import { MdDelete } from 'react-icons/md';
const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;

// import React from 'react';
// import { MdDelete } from 'react-icons/md';
// import ExpenseItem from './expenseItem';
// const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
//   return (
//     <>
//       <ul className="list">
//         {expenses.map((expense) => {
//           return (
//             <ExpenseItem
//               key={expenses.id}
//               expense={expense}
//               handleEdit={handleEdit}
//               handleDelete={handleDelete}
//             />
//           );
//         })}
//       </ul>
//       {expenses.length > 0 && (
//         <button className="btn" onClick={clearItems}>
//           clear expenses
//           <MdDelete className="btn-icon" />
//         </button>
//       )}
//     </>
//   );
// };

// export default ExpenseList;
