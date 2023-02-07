import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import "./user.styles.css";

const UserDetail = ({ userDetail, SaveEditedChanges, handleChecked, handleSingleDelete,isSelectAll }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState(userDetail);
    const handleEdit = (e) => {
        setIsEdit(true)
    }
    useEffect(()=>{
        if(isSelectAll){
            setIsEdit(true);
            console.log(isEdit);
        }
    },[]);

    /*
        handle update method
        1. save changes
        2. trun save button to edit button again
    */
    const handleSavechanges = ()=>{
        SaveEditedChanges(user);
        setIsEdit(false);
    }
    return (
        <>
            <div className="user-container">
                <input
                    type="checkbox"
                    name={user.name}
                    value={user.id}
                    onChange={(e)=>handleChecked(e)}
                    defaultChecked = {isSelectAll ? 'checked' : ''}
                />
                <input
                    readOnly={!isEdit}
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                ></input>
                <input
                    readOnly={!isEdit}
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                ></input>
                <input
                    readOnly={!isEdit}
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                ></input>
                <div className="action-container" >
                    {!isEdit ?
                        <button onClick={handleEdit} value={user.id} ><AiOutlineEdit /></button> :
                        <button onClick={handleSavechanges} value={user.id} >save</button>
                    }
                    <button onClick={()=> handleSingleDelete(user)} value={user.id}><AiFillDelete /></button>
                </div>
            </div>
        </>
    )

}

export default UserDetail;