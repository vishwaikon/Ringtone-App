import { GoBell } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import { Navigate, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';



import './header.css'
import axios from "axios";
import { useEffect, useState } from "react";




const Header = () => {
  
  const [songs, setSongs] = useState([]);
  const [Uname, setUname] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/artists/${localStorage.getItem('AID')}`);
        setSongs(response.data); 
        setUname(response.data.firstName);

      
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs(); // Fetch songs when the component mounts
  }, []);


 


  const navigate = useNavigate();

  const handleDownload = () => {
    const mp3FilePath = '../../../Backend/src/Songs/Adeesha Tharud/adeesh.mp3';
  
    const anchor = document.createElement('a');
    anchor.href = mp3FilePath;
    anchor.download = 'test.mp3';
  
    anchor.click();
  };

  const location = useLocation();
  

  const getTitle = () => {
    if (location.pathname === "/user-dashboard/all-songs" || location.pathname === "/admin-dashboard/all-songs") {
      return "ALL SONGS";
    } else if (location.pathname === "/user-dashboard" || location.pathname === "/admin-dashboard") {
      return "DASHBOARD";
    } else if (location.pathname === "/user-dashboard/request-songs" || location.pathname === "/admin-dashboard/request-songs") {
      return "request songs";
    } else if (location.pathname === "/user-dashboard/artist-list" || location.pathname === "/admin-dashboard/artist-list") {
      return "artist list";
    }
  };

  const handleMenuClick = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.left = sidebar.style.left === '0px' ? '-300px' : '0px';
  };

  const handleLogout = () => {
    // axios.post('http://localhost:5000/user/logout')
    //   .then(res => {
    //     location.reload(true);
    //     navigate('/');
    //   })
    //   .catch(err => console.log(err));
       localStorage.clear()
       navigate('/')
  };
  
  
  return (
    <div className="navbar">
      <div className="wrapper  h-[50px] flex bg-[#FFFFFF] justify-between items-center px-[20px]">
        <div className="dashtitle font-semibold flex uppercase">{getTitle()}</div>
        <div className="hamberger-menu">
          <TiThMenu className="cursor-pointer" onClick={handleMenuClick}/>
        </div>
        <div className="iconwrapper flex">
          {/*<div className="icon rounded-full bg-[#F6F6F6] w-[30px] h-[30px] flex items-center justify-center ml-2">
            {" "}
            <a href="">
              <GoBell size={"1.5em"} />
            </a>
          </div>
          <div className="icon rounded-full bg-[#F6F6F6] w-[30px] h-[30px] flex items-center justify-center ml-2">
            {" "}
            <a href="">
              <CiSettings size={"1.5em"}/>
            </a>
          </div>*/}
          <div>
      
       
      
    </div>
    
    
        <div>
            {Uname ? (
              <div className="welcome font-semibold text-[20px]">Welcome ! {Uname}</div>
            ) : (
              <div className="welcome font-semibold text-[20px]">Welcome ! Admin</div>
            )}
          </div>
        

          <div className="icon rounded-full bg-[#F6F6F6] w-[30px] h-[30px] flex items-center justify-center ml-2" onClick={handleDownload}>
            {" "}
            <a href="" >
              <LuUser size={"1.5em"} />
            </a>
          </div>
          <button
          className="isp rounded-xl w-[80px] bg-red-500 text-white ml-2" onClick={handleLogout}
          
        >
          Logout
        </button>
        
        
      
      

        </div>
      </div>
    </div>
  );
};

export default Header;


