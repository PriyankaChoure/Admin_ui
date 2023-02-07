
const Pagination = ({dataPerPage, totalData, paginate}) => {
  const pageNumber = [];
  for(let i=1; i<= Math.ceil(totalData/dataPerPage);i++){
      pageNumber.push(i);
  }  
 
  return (
    <nav>
      <ul className="pagination">
        {
          pageNumber.map(number=>(
            <li key={number} className="page-item">
              <a onClick={()=> paginate(number)} href="!#" className="page-link rounded-circle">
              {number}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

export default Pagination;