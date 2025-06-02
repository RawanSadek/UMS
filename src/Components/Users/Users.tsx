import axios from 'axios'
import { useEffect, useState } from 'react'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { GoBell } from 'react-icons/go'
import { IoIosSearch } from 'react-icons/io'
import { RiUserSearchLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { PiUsersThreeLight } from 'react-icons/pi'

export default function Users() {
  interface userData {
    id: number;
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
  }

  let [users, setUsers] = useState<userData[]>([]);
  let getUsers = async () => {

    try {
      let response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users);

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getUsers();
  }, []);

  let [filteredUsers, setFilteredUsers] = useState(users);

  let searchUser = (e: any) => {
    let searchInput = e.target.value;
    if(searchInput==""){
      setFilteredUsers(users)
    }
    else{
      let filtered = users.filter((user) =>
        user?.firstName.toLowerCase().startsWith(searchInput.toLowerCase()) || user?.lastName.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }

  useEffect(() => {
  setFilteredUsers(users);
}, [users]);

  localStorage.setItem("users", JSON.stringify(users));

  let [userIdx, setUserIdx] = useState<number>(Number)
  let [userData, setUserData] = useState<userData | null>(null)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (idx: number) => {
    setShow(true);
    setUserIdx(idx);
    setUserData(users[idx])
  }

  let deleteUser = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${users[userIdx].id}`);
      toast.info(`${users[userIdx].firstName} ${users[userIdx].lastName} successfully deleted`)
      users.splice(userIdx, 1);   //no need for this with the real APIs
      localStorage.setItem("users", JSON.stringify(users));
      handleClose();
      // getUsers();  //will draw all the users cause i'm not deleting from the real data (it's a fake API)
    } catch (error) {
      toast.error("Failed to delete user")
      console.log(error)
    }
  }


  


  let navigate = useNavigate();
  let navigateToAddUser = () => {
    navigate('/dashboard/addUser');
  }

  let UpdateUser = (index: number) => {
    navigate(`/dashboard/users/${index}`)
  }


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center px-4 bg-white py-4">
        <RiUserSearchLine size={20} className='fw-lighter' />
        <div className='d-flex align-items-center'>
          <div className="search-container rounded-1 border border-1 px-2 py-1">
            <input onChange={searchUser} type="search" name="search" id="search" className='border-0 ' placeholder='Search' />
            <IoIosSearch />
          </div>
          <GoBell className='ms-3' />
        </div>
      </div>

      <div className='px-4 pt-3'>
        <div className="d-flex justify-content-between px-4">
          <h3><PiUsersThreeLight size={30} className='me-2 mb-2' />Users list</h3>
          <button onClick={navigateToAddUser} className='btn text-light px-5'>Add New User</button>
        </div>
        <hr />
      </div>

      <div className="users-data p-4 overflow-y-scroll">
        <table className="table bg-light mx-auto text-center">
          <thead>
            <tr>
              <th ></th>
              <th >First Name</th>
              <th >Last Name</th>
              <th >Email</th>
              <th >Phone</th>
              <th >Birth Date</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>

            {filteredUsers.map((user, index) => (
              <tr key={index} className=''>
                <td className='image-col'><img src={user.image} alt="" className='w-50' /></td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.birthDate}</td>
                <td className='border-start border-1 text-center'>
                  <CiEdit onClick={() => UpdateUser(index)} size={23} className='text-warning edit me-4' />
                  <CiTrash onClick={() => handleShow(index)} size={23} className=' text-danger trash' />
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='main-bg'>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {userData?.firstName} {userData?.lastName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose} className='bg-secondary normal-btn'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
