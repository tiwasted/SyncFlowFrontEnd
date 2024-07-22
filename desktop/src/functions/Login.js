// // Login.js
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { useSidebarVisibility } from './SidebarContext';
// import axios from 'axios';
// import styles from '../styles/Login.module.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const { setIsVisible } = useSidebarVisibility();
//   const { login } = useAuth();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     setIsVisible(false);
//     return () => {
//       setIsVisible(true);
//     };
//   }, [setIsVisible]);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/users/login/', {
//         login: username,
//         password: password
//       });

//       const token = response.data.token || response.data.access;
//       if (token) {
//         login(token);
//         navigate('/main');
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const { login, password } = error.response.data;
//         if (login && login.length > 0) {
//           setErrorMessage(login[0]);
//         } else if (password && password.length > 0) {
//           setErrorMessage(password[0]);
//         } else {
//           setErrorMessage('Неверный логин или пароль');
//         }
//       } else {
//         setErrorMessage('Произошла ошибка во время аутентификации');
//       }
//     }
//   };

//   return (
//     <div className={styles.formContainer}>
//       <form onSubmit={handleLogin} className={styles.formLogin}>
//         <h2 className={styles.h2Login}>Добро пожаловать</h2>
//         <h6 className={styles.h6Login}>Войдите в систему, чтобы отслеживать заказы и пользоваться нашими услугами.</h6>
//         <input
//           type="text"
//           placeholder="Логин"
//           className={styles.inputLogin}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Пароль"
//           className={styles.inputLogin}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className={styles.buttonLogin}>Войти</button>
//         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
//         <div className={styles.footerText}>
//           Если забыли пароль, обратитесь по номеру +7 (777) 777-77-77
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { useSidebarVisibility } from './SidebarContext';
// import axios from 'axios';
// import styles from '../styles/Login.module.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const { setIsVisible } = useSidebarVisibility();
//   const { login } = useAuth();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     setIsVisible(false);
//     return () => {
//       setIsVisible(true);
//     };
//   }, [setIsVisible]);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       // Добавляем проверку на формат номера телефона
//       if (!/^\+?[0-9]{10,14}$/.test(username)) {
//         setErrorMessage('Неверный формат номера телефона');
//         return;
//       }

//       const response = await axios.post('http://127.0.0.1:8000/users/auth/login/', {
//         phone: username,
//         password: password
//       });

//       const token = response.data.token || response.data.access;
//       if (token) {
//         login(token);
//         navigate('/main');
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         const { login: phone, password } = error.response.data;
//         if (phone && phone.length > 0) {
//           setErrorMessage(phone[0]);
//         } else if (password && password.length > 0) {
//           setErrorMessage(password[0]);
//         } else {
//           setErrorMessage('Неверный логин или пароль');
//         }
//       } else {
//         setErrorMessage('Произошла ошибка во время аутентификации');
//       }
//     }
//   };

//   return (
//     <div className={styles.formContainer}>
//       <form onSubmit={handleLogin} className={styles.formLogin}>
//         <h2 className={styles.h2Login}>Добро пожаловать</h2>
//         <h6 className={styles.h6Login}>Войдите в систему, чтобы отслеживать заказы и пользоваться нашими услугами.</h6>
//         <input
//           type="text"
//           placeholder="Логин (номер телефона)"
//           className={styles.inputLogin}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           pattern="^\+?[0-9]{10,14}$"
//           title="Введите действительный номер телефона"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Пароль"
//           className={styles.inputLogin}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className={styles.buttonLogin}>Войти</button>
//         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
//         <div className={styles.footerText}>
//           Если забыли пароль, обратитесь по номеру +7 (777) 777-77-77
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSidebarVisibility } from './SidebarContext';
import styles from '../styles/Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { setIsVisible } = useSidebarVisibility();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsVisible(false);
    return () => {
      setIsVisible(true);
    };
  }, [setIsVisible]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (!/^\+?[0-9]{10,14}$/.test(username)) {
        setErrorMessage('Неверный формат номера телефона');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/users/auth/login/', {
        phone: username,
        password: password
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      if (accessToken && refreshToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        login(accessToken);
        navigate('/main');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { login: phone, password } = error.response.data;
        if (phone && phone.length > 0) {
          setErrorMessage(phone[0]);
        } else if (password && password.length > 0) {
          setErrorMessage(password[0]);
        } else {
          setErrorMessage('Неверный логин или пароль');
        }
      } else {
        setErrorMessage('Произошла ошибка во время аутентификации');
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleLogin} className={styles.formLogin}>
        <h2 className={styles.h2Login}>Добро пожаловать</h2>
        <h6 className={styles.h6Login}>Войдите в систему, чтобы отслеживать заказы и пользоваться нашими услугами.</h6>
        <input
          type="text"
          placeholder="Логин (номер телефона)"
          className={styles.inputLogin}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          pattern="^\+?[0-9]{10,14}$"
          title="Введите действительный номер телефона"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.inputLogin}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.buttonLogin}>Войти</button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.footerText}>
          Если забыли пароль, обратитесь по номеру +7 (777) 777-77-77
        </div>
      </form>
    </div>
  );
};

export default Login;
