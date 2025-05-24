import UserForm from '../../UserForm/UserForm'
import { AiOutlineUserAdd } from 'react-icons/ai'

export default function AddUser() {
  return (
    <div className='vh-100 overflow-y-auto'>
      <div className='px-4 pt-3'>
        <div className="d-flex justify-content-between px-4">
          <h3><AiOutlineUserAdd size={30} className='me-2 mb-2' />Add User</h3>
        </div>
        <hr />
      </div>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <UserForm imgFlag={true} disableFlag={false} btnFlag={false} userData={null}/>
      </div>
    </div>
  )
}
