// import React, { useState } from 'react';
// import axios from 'axios';

// const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const addEmployee = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/employees/create/', {
//         first_name: firstName,
//         last_name: lastName,
//         password: password,
//         phone: phoneNumber
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       onEmployeeAdded(response.data);
//       onClose();
//     } catch (error) {
//       console.error('Error adding employee', error);
//     }
//   };

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>Добавить сотрудника</h2>
//         <input type="text" placeholder="Имя" value={firstName} onChange={e => setFirstName(e.target.value)} />
//         <input type="text" placeholder="Фамилия" value={lastName} onChange={e => setLastName(e.target.value)} />
//         <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
//         <input type="text" placeholder="Номер телефона" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
//         <button onClick={addEmployee}>Добавить</button>
//       </div>
//     </div>
//   );
// };

// export default AddEmployeeModal;



import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const addEmployee = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/employees/create/', {
        first_name: firstName,
        last_name: lastName,
        password: password,
        phone: phoneNumber
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onEmployeeAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding employee', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2 className="modal-title">Добавить сотрудника</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Имя"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Фамилия"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Номер телефона"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
        <button className="form-button" onClick={addEmployee}>Добавить</button>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
