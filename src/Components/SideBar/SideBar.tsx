import { AiOutlineUserAdd } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { PiUsersThreeLight } from 'react-icons/pi';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import pp from '../../assets/pp.png'

export default function SideBar() {
  let {userData}:any = useContext(AuthContext);

let [collapsed, setCollapsed] = useState(false);

let toggleCollapsed=()=>{
  setCollapsed(!collapsed);
}

  return (
    <div className='d-flex'>
      <div className='sidebarContainer vh-100 position-relative'>
        <Sidebar className='sidebar vh-100' collapsed={collapsed} >
          <h5 className='ms-4 mt-3'>UMS</h5>
          <div className="text-center mb-4">
            <img src={userData? userData.image: pp} alt="user image" className='w-50 rounded-circle mt-5' />
            {userData? <h4 className='loginUserName w-100 text-center'>{userData.firstName} {userData.lastName}</h4> : <h4></h4>}
            <small className='main-text'>Admin</small>
          </div>
          <Menu className='d-flex flex-column align-items-center align-top'>
            <MenuItem icon={<IoHomeOutline size={20} className='me-2' />} component={<Link to="/dashboard" />}>  Home</MenuItem>
            <MenuItem icon={<PiUsersThreeLight size={20} className='me-2' />} component={<Link to="/dashboard/users" />}> Users</MenuItem>
            <MenuItem icon={<AiOutlineUserAdd size={20} className='me-2' />} component={<Link to="/dashboard/addUser" />}> Add User</MenuItem>
            <MenuItem icon={<CgProfile size={20} className='me-2' />} component={<Link to="/dashboard/profile" />}> Profile</MenuItem>
            <MenuItem icon={<CiLogout size={20} className='me-2' />} component={<Link to="/login" />}> Logout</MenuItem>
          </Menu>
      <div className='sidebar-btn btn main-bg p-2 mt-3 rounded-0 position-absolute bottom-0 mb-3'>
        {collapsed? <FaChevronRight size={25} onClick={toggleCollapsed}/> : <FaChevronLeft size={25} onClick={toggleCollapsed}/>}
        
      </div>
        </Sidebar>
      </div>
    </div>
  )
}
