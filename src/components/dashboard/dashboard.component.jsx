import "./dashboard.styles.css";
import { useState } from "react";
import UserDetail from "../user/user.component";



const Dashboard = ({ userList, SaveEditedChanges,handleSingleDelete,handleMultipleDelete }) => {
    
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [allSelectedList, setAllSelectedList] = useState([]);
    const [checkList, setCheckList] = useState([]);

    // handle single checked event
    const handleChecked = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            console.log(value);
            setCheckList(checkList => [...checkList, value]);
            const listItem = document.getElementById(value);
            listItem.classList.add('set-background');
            console.log(checkList);
        } else {
            if (checkList.includes(value)) {
                const newCheckList = checkList.filter((val) => val !== value);
                const listItem = document.getElementById(value);
                listItem.classList.remove('set-background');
                setCheckList(newCheckList);
                console.log(checkList);
            }
        }

    }
    // select/deselect all user 
    const handleSelectAll = (e) => {
        const {checked} = e.target;
        if(checked){
            setIsSelectAll(true);      
            const allUserIds = userList.map((element) => element.id);
            setAllSelectedList(allUserIds);            
        }else{
            setAllSelectedList([]);
            setIsSelectAll(false);
        }        
    }
    // Handle delete method according to checkbox selected
    const handleDelete = () => {
        if(isSelectAll){
            handleMultipleDelete(allSelectedList);
        }else{
            handleMultipleDelete(checkList);
        }
    }
    return (
        <>
            <ul className="list-group">
                <li className="list-group-item">
                <div className="user-head-container ">
                <label className="d-inline-flex justify-content-around">
                <input
                    type="checkbox"
                    name="all"   
                    onChange={handleSelectAll}                               
                />
                {/* <h6>Select All </h6> */}
                </label>
                
                <h4>User Name      </h4>
                <h4>User Email</h4>
                <h4>User Role</h4>
                <h4>Actions</h4>
             
            </div>
                </li>
            
                {userList.map((user) => {
                    return (
                        <li key={user.id} id={user.id} className="item-list list-group-item ">
                           <UserDetail 
                            userDetail={user} 
                            SaveEditedChanges = {SaveEditedChanges} 
                            handleChecked={handleChecked} 
                            handleSingleDelete={handleSingleDelete}
                            isSelectAll={isSelectAll}
                            />
                        </li>
                    )
                })}
            </ul>
            <button type="button" class="btn btn-danger mt-2" onClick={handleDelete}>Delete Selected </button>
        </>

    )
}

export default Dashboard;