import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/dashboard.component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginatedItems from './components/paginate/pagination.component';
import Pagination from './components/paginate/pagination.component';
import SearchBox from './components/search/search.component';

function App() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage]= useState(1);
  const [dataPerPage, setDataPerPage]= useState(10);
  // const [checkList, setCheckList] = useState([]);
  
  useEffect(()=>{
      const fetchUserData = async()=> {
        const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        setUserList(response.data);
        // console.log("user list - ",response.data);
      }
      fetchUserData();
    },[]);
    
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = userList.slice(indexOfFirstData,indexOfLastData);

    const paginate = (pageNumber)=> setCurrentPage(pageNumber); 
   
  
    // edit user data
    const SaveEditedChanges = (user) => {
      console.log("parent user -",user);
      const userData = userList.filter((val)=> val.id === user.id );
      const userIndex = userList.findIndex((userObj => userObj.id == user.id));
      let userListTemp = [...userList];
      userListTemp[userIndex] = user;
      setUserList(userListTemp);
      console.log(userListTemp);
    }
    // delete multiple selected data
    const handleMultipleDelete = (checkList) => {
      if (checkList.length > 0) {
        let userListTemp = userList.filter(obj=> !checkList.includes(obj.id));
        alert(`${checkList.length} user deleted successfully`);
        setUserList(userListTemp);
        
      }
    }

    // delete single data
    const handleSingleDelete = (user) => {
      console.log(user);
      console.log(userList.length);
      let userListTemp = userList.filter(obj=> obj.id !== user.id)
      setUserList(userListTemp);
      console.log(userListTemp.length);
      alert(`users deleted successfully`);
  }

  // Handle search for any string
  const handleSearch = (searchString) => {
    if(searchString.length>0){
    const searchList =   userList.filter((userObj)=> Object.values(userObj).includes(searchString ));
    console.log("search list", searchList);
    setUserList(searchList);
    }
  }

  return (
    <div className="App">
      <SearchBox handleSearch={handleSearch}/>
      <Dashboard 
      userList={currentData}  
      SaveEditedChanges={SaveEditedChanges}
      handleSingleDelete={handleSingleDelete}
      handleMultipleDelete={handleMultipleDelete}
      />
      <Pagination dataPerPage={dataPerPage} totalData = {userList.length}  paginate={paginate}/>
      
    </div>
  );
}

export default App;
