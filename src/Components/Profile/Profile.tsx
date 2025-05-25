import { CgProfile } from 'react-icons/cg'
import UserForm from '../UserForm/UserForm'
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

export default function Profile() {

  let {userData}:any = useContext(AuthContext);
  return (
    <div className='vh-100 overflow-y-auto'>
      <div className='px-4 pt-3'>
        <div className="d-flex justify-content-between px-4">
          <h3><CgProfile size={30} className='me-2 mb-1' />My profile</h3>
        </div>
        <hr />
      </div>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <UserForm imgFlag={false} disableFlag={true} btnFlag={true} userData={userData} />
      </div>
    </div>
  )
}
