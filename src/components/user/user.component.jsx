import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { isMobile } from "react-device-detect";
import "./user.styles.css";

const UserDetail = ({ userDetail, SaveEditedChanges, handleChecked, handleSingleDelete, isSelectAll }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState(userDetail);
    const handleEdit = (e) => {
        setIsEdit(true)
    }
    useEffect(() => {
        if (isSelectAll) {
            setIsEdit(true);
            console.log(isEdit);
        }
    }, []);

    /*
        handle update method
        1. save changes
        2. trun save button to edit button again
    */
    const handleSavechanges = () => {
        let flag = true;
        for (let key in user) {
            if (user[key] === "") {
                alert(`${key}  can not be empty`);
                flag = false;
            }
        }
        if (flag) {
            SaveEditedChanges(user);
            setIsEdit(false);
        }
    }
    return (
        <>
            <div className="col-sm">
                <input
                    type="checkbox"
                    name={user.name}
                    value={user.id}
                    onChange={(e) => handleChecked(e)}
                    defaultChecked={isSelectAll ? 'checked' : ''}
                />
            </div>
            <div className="col-sm">
                {isMobile &&  <span className="h4">User Name  </span>}
                <input
                    readOnly={!isEdit}
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                ></input>
            </div>
            <div className="col-sm">
                {isMobile &&  <span className="h4">User Email  </span>}
                <input
                    readOnly={!isEdit}
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                ></input>
            </div>
            <div className="col-sm">
                {isMobile &&  <span className="h4">User Role  </span>}
                <input
                    readOnly={!isEdit}
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                ></input>
            </div>
            <div className="col-sm d-flex justify-content-center" >
                <div className={isMobile ? "action-container-mobile" : "action-container"}>
                    {!isEdit ?
                        <button onClick={handleEdit} value={user.id} ><AiOutlineEdit /></button> :
                        <button onClick={handleSavechanges} value={user.id} >save</button>
                    }
                    <button onClick={() => handleSingleDelete(user)} value={user.id}><AiFillDelete /></button>
                </div>
            </div>
            
        </>
    )

}

export default UserDetail;