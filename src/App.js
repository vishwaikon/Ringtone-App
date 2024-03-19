
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Login from './pages/authentication/login/login';
// import AdminDashboard from './pages/admin/dashboard/adminDashboard';
// import UserDashboard from './pages/user/dashboard/userDashboard';
// import Usersidebar from './components/sidebar/userSidebar/userSidebar';
// import Adminsidebar from './components/sidebar/adminSidebar/adminSidebar';
// import UserAllSongs from './pages/user/songs/allSongs';
// import AdminAllSongs from './pages/admin/songs/allSongs';
// import Footer from './components/footer/footer';
// import Header from './components/header/header';
// import UserRequestSongs from './pages/user/request/requestSongs';
// import AdminRequestSongs from './pages/admin/request/requestSongs';
// import SongUploadform from './components/forms/songUpload/songupload';
// import ArtistList from './pages/admin/artistList/ArtistList.jsx';

// const App = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route
//             path="/*"
//             element={
//               <>
//                 <div className="body flex flex-row">
//                   {window.location.pathname === '/user-dashboard' ? (
//                     <Usersidebar />
//                   ) : (
//                     <Adminsidebar />
//                   )}

//                   <div className="content flex flex-col justify-between">
//                     <div>
//                       <Header />
//                       <div className="main">
//                         <Routes>
//                           <Route path="/user-dashboard" element={<UserDashboard />} />
//                           <Route path="/user-dashboard/all-songs" element={<UserAllSongs />} />
//                           <Route path="/user-dashboard/request-songs" element={<UserRequestSongs />} />

//                           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//                           <Route path="/admin-dashboard/all-songs" element={<AdminAllSongs />} />
//                           <Route path="/admin-dashboard/request-songs" element={<AdminRequestSongs />} />
//                           <Route path="/admin-dashboard/artist-list" element={<ArtistList />} />
//                         </Routes>
//                       </div>
//                     </div>
//                     <Footer />
//                   </div>
//                 </div>
//               </>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import './App.css';
// import Login from './pages/authentication/login/login';
// import AdminDashboard from './pages/admin/dashboard/adminDashboard';
// import UserDashboard from './pages/user/dashboard/userDashboard';
// import Usersidebar from './components/sidebar/userSidebar/userSidebar';
// import Adminsidebar from './components/sidebar/adminSidebar/adminSidebar';
// import Footer from './components/footer/footer';
// import Header from './components/header/header';
// import UserAllSongs from './pages/user/songs/allSongs';
// import AdminAllSongs from './pages/admin/songs/allSongs';
// import UserRequestSongs from './pages/user/request/requestSongs';
// import AdminRequestSongs from './pages/admin/request/requestSongs';
// import ArtistList from './pages/admin/artistList/ArtistList.jsx';

// const App = () => {
//   const [userType, setUserType] = useState('');

//   useEffect(() => {
//     const userTypeFromStorage = localStorage.getItem('userType');
//     if (userTypeFromStorage) {
//       setUserType(userTypeFromStorage);
//     }
//   }, []);

//   const loginSuccessCallback = (userType) => {
//     setUserType(userType);
//   };

//   const ProtectedRoute = ({ element, expectedType }) => {
//     return userType === expectedType ? element : <Navigate to={userType === 'user' ? '/user-dashboard' : '/admin-dashboard'} />;
//   };

//   const ProtectedRoutes = ({ children }) => {
//     if (!userType) {
//       return <Navigate to="/login" />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       <div className="app">
//         <ProtectedRoutes>
//           <Routes>
//             <Route path="/login" element={<Login loginSuccessCallback={loginSuccessCallback} />} />
//             <Route
//               path="/*"
//               element={
//                 <>
//                   <div className="body flex flex-row">
//                     {userType === 'user' ? (
//                       <Usersidebar />
//                     ) : (
//                       <Adminsidebar />
//                     )}

//                     <div className="content flex flex-col justify-between">
//                       <div>
//                         <Header />
//                         <div className="main">
//                           <Routes>
//                             <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} expectedType="user" />} />
//                             <Route path="/user-dashboard/all-songs" element={<UserAllSongs />} />
//                             <Route path="/user-dashboard/request-songs" element={<UserRequestSongs />} />

//                             <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} expectedType="admin" />} />
//                             <Route path="/admin-dashboard/all-songs" element={<AdminAllSongs />} />
//                             <Route path="/admin-dashboard/request-songs" element={<AdminRequestSongs />} />
//                             <Route path="/admin-dashboard/artist-list" element={<ArtistList />} />
//                           </Routes>
//                         </div>
//                       </div>
//                       <Footer />
//                     </div>
//                   </div>
//                 </>
//               }
//             />
//           </Routes>
//         </ProtectedRoutes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './pages/authentication/login/login';
import AdminDashboard from './pages/admin/dashboard/adminDashboard';
import UserDashboard from './pages/user/dashboard/userDashboard';
import Usersidebar from './components/sidebar/userSidebar/userSidebar';
import Adminsidebar from './components/sidebar/adminSidebar/adminSidebar';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import UserAllSongs from './pages/user/songs/allSongs';
import AdminAllSongs from './pages/admin/songs/allSongs';
import UserRequestSongs from './pages/user/request/requestSongs';
import AdminRequestSongs from './pages/admin/request/requestSongs';
import ArtistList from './pages/admin/artistList/ArtistList.jsx';

const App = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const userTypeFromStorage = localStorage.getItem('userType');
    if (userTypeFromStorage) {
      setUserType(userTypeFromStorage);
    }
  }, []);  

  const loginSuccessCallback = (userType) => {
    setUserType(userType);
    localStorage.setItem('userType', userType);
  };  

  const ProtectedRoute = ({ element, expectedType }) => {
    return userType === expectedType ? element : <Navigate to={userType === 'user' ? '/user-dashboard' : '/admin-dashboard'} />;
  };

  return (
    <Router>
      <div className="app">
          <Routes>
            <Route path="/" element={<Login loginSuccessCallback={loginSuccessCallback} />} />
            <Route
              path="/*"
              element={
                <>
                  <div className="body flex flex-row">
                    {userType === 'user' ? (
                      <Usersidebar />
                    ) : (
                      <Adminsidebar />
                    )}

                    <div className="content flex flex-col justify-between">
                      <div>
                        <Header />
                      
                        <div className="main">
                          <Routes>
                            <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} expectedType="user" />} />
                            <Route path="/user-dashboard/all-songs" element={<ProtectedRoute element={<UserAllSongs />} expectedType="user" />} />
                            <Route path="/user-dashboard/request-songs"  element={<ProtectedRoute element={<UserRequestSongs />} expectedType="user" />} />

                            <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} expectedType="admin" />} />
                            <Route path="/admin-dashboard/all-songs" element={<ProtectedRoute element={<AdminAllSongs />} expectedType="admin" />} />
                            <Route path="/admin-dashboard/request-songs" element={<ProtectedRoute element={<AdminRequestSongs />} expectedType="admin" />} />
                            <Route path="/admin-dashboard/artist-list" element={<ProtectedRoute element={<ArtistList />} expectedType="admin" />} />
                          </Routes>
                        </div>
                      </div>
                      <Footer />
                    </div>
                  </div>
                </>
              }
            />
          </Routes>
      </div>
    </Router>
  );
};

export default App;