import { CiEdit } from "react-icons/ci";
import UserForm from "../UserForm/UserForm";
import { useParams, type IndexRouteObject, type IndexRouteProps } from "react-router-dom";

export default function UpdateUser() {

    let {index} = useParams()
    let userIndex = index;

    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users[userIndex])

    return (
        <div className='vh-100 overflow-y-auto'>
            <div className='px-4 pt-3'>
                <div className="d-flex justify-content-between px-4">
                    <h3><CiEdit size={30} className='me-2 mb-2' />Update User's Data</h3>
                </div>
                <hr />
            </div>

            <div className="d-flex justify-content-center align-items-center mt-5">
                <UserForm imgFlag={false} disableFlag={false} btnFlag={false} userData={users[userIndex]}/>
            </div>
        </div>
    )
}
