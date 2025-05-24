import { AiOutlineUserAdd } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { PiUsersThreeLight } from 'react-icons/pi';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import pp from '../../assets/images/pp.jpeg'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useState } from 'react';

export default function SideBar() {
let [collapsed, setCollapsed] = useState(false);

let toggleCollapsed=()=>{
  setCollapsed(!collapsed);
}

  return (
    <div className='d-flex'>
      <div className='sidebarContainer vh-100 position-relative'>
        <Sidebar className='vh-100' collapsed={collapsed}>
          <h5>UMS</h5>
          <div className="text-center mb-4">
            <img src={pp} alt="user image" className='w-50 rounded-circle mt-5' />
            <h4>John Doe</h4>
            <small className=''>Admin</small>
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
