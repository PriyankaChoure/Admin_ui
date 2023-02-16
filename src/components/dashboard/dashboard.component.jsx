import "./dashboard.styles.css";
import { useState } from "react";
import UserDetail from "../user/user.component";
import { isMobile } from "react-device-detect";



const Dashboard = ({ userList, SaveEditedChanges, handleSingleDelete, handleMultipleDelete, }) => {

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
        const { checked } = e.target;
        if (checked) {
            setIsSelectAll(true);
            const allUserIds = userList.map((element) => element.id);
            setAllSelectedList(allUserIds);
        } else {
            setAllSelectedList([]);
            setIsSelectAll(false);
        }
    }
    // Handle delete method according to checkbox selected
    const handleDelete = () => {
        if (isSelectAll) {
            handleMultipleDelete(allSelectedList);
        } else {
            handleMultipleDelete(checkList);
        }
    }
    return (
        <>
            <div className="container border border-3 mt-2">
              {!isMobile ?   <div className="row border border-2">
                    <div className="col-sm col-12">
                        <label className="d-inline-flex justify-content-around">
                            <input
                                type="checkbox"
                                name="all"
                                onChange={handleSelectAll}
                            />                            
                        </label>
                    </div>
                    <div className="col-sm col-12">
                        <h4>User Name</h4>
                    </div>
                    <div className="col-sm col-12">
                        <h4>User Email</h4>
                    </div>
                    <div className="col-sm col-12">
                        <h4>User Role</h4>
                    </div>
                    <div className="col-sm col-12">
                        <h4>Actions</h4>
                    </div>
                </div>
                :   <div className="col-sm col-12">
                <label className="d-inline-flex justify-content-around">
                    <input
                        type="checkbox"
                        name="all"
                        onChange={handleSelectAll}
                    />   
                       Select all                         
                </label>
            </div>  }

                {userList.map((user) => {
                    return (
                        <div key={user.id} id={user.id} className="row border border-2 ">
                            <UserDetail
                                userDetail={user}
                                SaveEditedChanges={SaveEditedChanges}
                                handleChecked={handleChecked}
                                handleSingleDelete={handleSingleDelete}
                                isSelectAll={isSelectAll}
                            />
                        </div>
                    )
                })}
            </div>
            <button type="button" class="btn btn-danger mt-2" onClick={handleDelete}>Delete Selected </button>
        </>

    )
}

export default Dashboard;