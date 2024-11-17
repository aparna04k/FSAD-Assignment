// import React, { useState } from 'react';
// import axios from 'axios';
// import './Auth.css';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const { username, email, password } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('/api/auth/register', formData);
//             console.log(res.data);
//         } catch (err) {
//             console.error(err.response.data);
//         }
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
//             <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//             <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
//             <button type="submit">Register</button>
//         </form>
//     );
// };

// export default Register;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Initialize the navigate function

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', {
//         name,
//         email,
//         password
//       });
//       setMessage('Registration successful! Token: ' + response.data.token);
//     } catch (error) {
//       setMessage('Error: ' + error.response.data.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Register;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password
      });
      setMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
    
      const data = await response.json();
      
      if (response.ok) {
        document.getElementById('message').textContent = 'Registration successful! Redirecting...';
        console.log('Registration successful!', data); // Added for debugging
        setTimeout(() => {
          window.location.href = 'login.html'; // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        document.getElementById('message').textContent = 'Error: ' + data.message;
        console.error('Error:', data.message); // Added for debugging
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error: ' + error.message;
      console.error('Error:', error.message); // Added for debugging
    }
  });
  
  

export default Register;

