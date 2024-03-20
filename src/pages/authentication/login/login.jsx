
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// const Login = () => {
//   const [values, setValues] = useState({
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', values);
//       const { token, user, userType } = response.data;
//       if (token) {
//         localStorage.setItem('token', token);
//         if (userType === 'user') {
//           navigate('/user-dashboard');
//         } else if (userType === 'admin') {
//           navigate('/admin-dashboard');
//         } else {
          
//           alert('Invalid user type!');
//         }
//       } else {
//         alert('Invalid Email or Password!');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('An error occurred while logging in. Please try again later.');
//     }
//   };

//   return (
//     <section className="bg-gray-50">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-primary">
//           Login
//         </a>
//         <div className="w-full bg-secondary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-primary">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   onChange={e => setValues({...values, email: e.target.value})}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
//                   placeholder="name@gmail.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   onChange={e => setValues({...values, password: e.target.value})}
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
//                   required
//                 />
//               </div>
             
//               <button type="submit" className="w-full text-white bg-primary hover:bg-primaryhover transition-all focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ loginSuccessCallback }) => {
//   const [values, setValues] = useState({
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate(); // Define navigate function

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', values);
//       const { token, userType } = response.data;
//       if (token && userType) {
//         document.cookie = `token=${token}; path=/;`;

//         localStorage.setItem('userType', userType);
//         loginSuccessCallback(userType, values); // Pass values here
//         navigate(userType === 'user' ? '/user-dashboard' : '/admin-dashboard');
//       } else {
//         alert('Invalid Email or Password!');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('An error occurred while logging in. Please try again later.');
//     }
//   };

//   return (
//     <section className="bg-gray-50">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-primary">
//           Login
//         </a>
//         <div className="w-full bg-secondary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-primary">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={values.email}
//                   onChange={e => setValues({...values, email: e.target.value})}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
//                   placeholder="name@gmail.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={values.password}
//                   onChange={e => setValues({...values, password: e.target.value})}
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
//                   required
//                 />
//               </div>
//               <button type="submit" className="w-full text-white bg-primary hover:bg-primaryhover transition-all focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ loginSuccessCallback }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Define navigate function

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', values);
      const { token, user, userType } = response.data; // Destructure response data
      console.log(response.data);
      if (token && userType) {
        document.cookie = `token=${token}; path=/`; // Fixed template literal
        localStorage.setItem('userType', userType);
        localStorage.setItem('AID', user.AID);
        loginSuccessCallback(userType, values); // Pass values here
        navigate(userType === 'user' ? '/user-dashboard' : '/admin-dashboard');
      } else {
        alert('Invalid Email or Password!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-primary">
          Login
        </a>
        <div className="w-full bg-secondary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-primary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={e => setValues({...values, email: e.target.value})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={e => setValues({...values, password: e.target.value})}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  required
                />
              </div>
              <button type="submit" className="w-full text-white bg-primary hover:bg-primaryhover transition-all focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;