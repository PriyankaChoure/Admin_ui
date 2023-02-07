import { useState } from "react";

const SearchBox = ({handleSearch})=> {
    const [searchString,setSearchString]= useState("");
return (
    <div className="input-group">
        <input 
        type="search" 
        className="form-control rounded" 
        placeholder="Search" 
        aria-label="Search" 
        aria-describedby="search-addon" 
        value={searchString}
        onChange={(e)=>setSearchString(e.target.value)}
        />
        <button 
        type="button" 
        onClick={()=> handleSearch(searchString)}
        className="btn btn-outline-primary"
        >search</button>
    </div>
)
}

export default SearchBox;