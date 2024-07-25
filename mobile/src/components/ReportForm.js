// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// Modal.setAppElement('#root');

// const ReportForm = ({ isOpen, onRequestClose, task, onSubmit }) => {
//     const [content, setContent] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await onSubmit(task, content);
//         setContent('');
//         onRequestClose();
//     };

//     return (
//         <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
//             <h3>Отчет для {task?.order_name}</h3>
//             <form onSubmit={handleSubmit}>
//                 <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//                 />
//                 <button type="submit">Отправить отчет</button>
//             </form>
//                 <button onClick={onRequestClose}>Отмена</button>
//         </Modal>
//     );
// };