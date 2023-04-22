import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Assignbooks from './Assignbooks';

function Listassignbooks(){
    const navigate = useNavigate();

    const [userdata,setUserdata]=useState([]);
    const [loading, setLoading] = useState(true);
    
useEffect(() => { 
    async function getData(){
      setLoading(true);
      try {
            const response=await axios.get("https://6341636a20f1f9d7997200a7.mockapi.io/books_student ");
        setUserdata(response.data);  
      }
      catch(error){

      }
      setLoading(false);
    }        
    getData();//call user data when loading the file
    
},[]);

const handleProceed = (id,status) => {
    if(status===1){  navigate(`/Editassignbooks/${id}`); }else{  }
  };

  async function onDeleteData(id){
    setLoading(true);
    try {
     await axios.delete(`https://6341636a20f1f9d7997200a7.mockapi.io/books_student/${id}`);
    var responseData=userdata.filter(item => id !== item.id);
    setUserdata(responseData);  
     alert('deleted successfully');
    }catch(error){

    }
    setLoading(false);
  }  

    return (
        <>
         <h1>Welcome to Dashboard, Library MANAGEMENT using formik</h1>
         <h4><Link to="/" element={<Dashboard />}>Dashboard</Link> | <Link to="/Assignbooks" element={<Assignbooks />}>Assign Book</Link></h4>
         <h2 style={{textAlign:"center"}}>List Assigned Books</h2>
         {loading && <div className='loading'>Loading</div>}
    {!loading && (
         
    <Table striped bordered hover className='table'>
    <thead>
     <tr>
       <th>Id</th>
       <th>Student name</th>
       <th>Book name</th>
       <th>Borrowed date</th>
       <th>Closed date</th>
       <th>Action</th>
       </tr>
       </thead> 
       <tbody>   
       {userdata ? (
         userdata.map((row) => (   
       <tr key={row.id}>
       <td>{row.id}</td>
       <td>{row.student_name}</td>
       <td>{row.book_name}</td>
       <td>{row.borrowed_date}</td>
       <td>{row.closed_date}</td>
        <td>
          <Button onClick={(e)=>handleProceed(row.id,1)}>Update</Button><br/>
          <Button onClick={()=>onDeleteData(row.id)}>Delete</Button>
       </td>
       </tr>
     )))
     :" Loading..." }
     </tbody>
    </Table>
    )}
    </>
  );
}

export default Listassignbooks;
