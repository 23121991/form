import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link,useParams } from 'react-router-dom';
import Listassignbooks from './Listassignbooks';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from "formik";
import Assignbooks from './Assignbooks';

function Editassignbooks() {
const navigate = useNavigate();
const params = useParams();

let formValues={
  id:"",
  name: "",
  author: "",
  publications : "",
 }

const [formData,setFormdata]=useState(formValues); 


const validateForm = (formData) => {
    var errors = {};
    if (formData.student_name === "") errors.student_name = "Student is Required";
    if (formData.book_name === "") errors.book_name = "Book is Required";
    if (formData.borrowed_date === "") errors.borrowed_date = "Borrowed date is Required";
    if (formData.closed_date === "") errors.closed_date = "Closed date is Required";
    return errors;
  };

useEffect(() => {
  try{
async function getData(rowId){
    const response = await axios.get(`https://6341636a20f1f9d7997200a7.mockapi.io/books_student/${rowId}`);
    const response1 = response.data;
    setFormdata({...formData,
            id:response1.id,
            student_name:response1.student_name,
            book_name:response1.book_name,
            borrowed_date:response1.borrowed_date, 
            closed_date:response1.closed_date,     
    }); 
    }     
    getData(params.userId);//call user data when loading the file

  }catch(error){

  }
  
});

const handleSubmit = async (formData, { resetForm }) => {
  setTimeout(async () => {
    try {
   
      await axios.put(`https://6341636a20f1f9d7997200a7.mockapi.io/books_student/${formData.id}`,{
        id:formData.id,
        student_name:formData.student_name,
        book_name:formData.book_name,
        borrowed_date:formData.borrowed_date, 
        closed_date:formData.closed_date,     
      });
      
      alert('updated successfully');
      navigate('/Listassignbooks');
    }catch(error){

    }
    resetForm();
  }, 1000);
};
    return (
    <>    
   <h1>Welcome to Dashboard, Library MANAGEMENT using formik</h1>
   <h2><Link to="/" element={<Dashboard />}>Dashboard</Link> |<Link to="/Assignbooks" element={<Assignbooks />}>Assign Book</Link> | <Link to="/Listassignbooks" element={<Listassignbooks />}>View Assigned Books</Link></h2>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-6">
    <h2>Update Assigned Book for Student</h2>
    <Formik
        initialValues={formData} 
        enableReinitialize
        validate={(formData) => validateForm(formData)} 
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          /* and other goodies */
        }) => (
    
          <Form  onSubmit={handleSubmit}>
          <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput1">
          <Form.Label>Student name</Form.Label>
          <Form.Control  type="text" placeholder="student_name"  name="student_name" value={values.student_name}  onChange={handleChange}  onBlur={handleBlur}   required /> <span style={{color:"red"}}> {touched.student_name && errors.student_name}</span><br/>
      </Form.Group>

    <Form.Group className="col-md-6"   controlId="exampleForm.ControlInput2">
      <Form.Label>Book name</Form.Label>
      <Form.Control  type="text"  placeholder="book_name" name="book_name" value={values.book_name}  onChange={handleChange}  onBlur={handleBlur}   required /> <span style={{color:"red"}}> {touched.book_name && errors.book_name}</span><br/>
    </Form.Group>

    <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
      <Form.Label>Borrowed date</Form.Label>
      <Form.Control type="date" placeholder="borrowed_date" name="borrowed_date" value={values.borrowed_date} onChange={handleChange}  onBlur={handleBlur}    required /> <span style={{color:"red"}}> {touched.borrowed_date && errors.borrowed_date}</span><br/>
    </Form.Group>
    <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
      <Form.Label>Closed date</Form.Label>
      <Form.Control type="date" placeholder="closed_date" name="closed_date" value={values.closed_date} onChange={handleChange}  onBlur={handleBlur}    required /> <span style={{color:"red"}}> {touched.closed_date && errors.closed_date}</span><br/>
    </Form.Group>
    <br/><br/>
    <Button type="submit" disabled={isSubmitting} variant="primary">Save</Button>            
        </Form>
    
           )}
          </Formik>
    </div>
    </>
  );
}

export default Editassignbooks;
