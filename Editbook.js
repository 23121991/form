import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link,useParams } from 'react-router-dom';
import Createbook from './Createbook';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from "formik";
import Listbooks from './Listbooks';

function Editbook() {
const navigate = useNavigate();
const params = useParams();

let formValues={
  id:"",
  name: "",
  author: "",
  publications : "",
 }

const [formData,setFormdata]=useState(formValues); 


const validateForm = (formData1) => {
  var errors = {};
  if (formData1.name === "") errors.name = "Name is Required";
  if (formData1.author === "") errors.author = "author is Required";
  if (formData1.publications === "") errors.publications = "publications is Required";
  return errors;
};

useEffect(() => {
  try{
async function getData(rowId){
    const response = await axios.get(`https://6341636a20f1f9d7997200a7.mockapi.io/books/${rowId}`);
    const response1 = response.data;
    setFormdata({...formData,
            id:response1.id,
            name:response1.name,
            author:response1.author,
            publications:response1.publications,       
    }); 
    }     
    getData(params.userId);//call user data when loading the file

  }catch(error){

  }
  
});

const handleSubmit = async (formData, { resetForm }) => {
  setTimeout(async () => {
    try {
   
      await axios.put(`https://6341636a20f1f9d7997200a7.mockapi.io/books/${formData.id}`,{
        id:formData.id,
        name:formData.name,
        author:formData.author,
        publications:formData.publications,  
      });
      
      alert('updated successfully');
      navigate('/Listbooks');
    }catch(error){

    }
    resetForm();
  }, 1000);
};
    return (
    <>    
   <h1>Welcome to Dashboard, Library MANAGEMENT using formik</h1>
   <h2><Link to="/" element={<Dashboard />}>Dashboard</Link> |<Link to="/Createbook" element={<Createbook />}>Create Book</Link> | <Link to="/Listbooks" element={<Listbooks />}>View Book</Link></h2>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-6">
    <h2>Update Book</h2>
    {console.log(formData)}
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
            <Form.Label>Book name</Form.Label>
            <Form.Control  type="text" placeholder="name"  name="name" value={values.name}  onChange={handleChange}  onBlur={handleBlur}   required /> <span style={{color:"red"}}> {touched.name && errors.name}</span><br/>
        </Form.Group>

      <Form.Group className="col-md-6"   controlId="exampleForm.ControlInput2">
        <Form.Label>Author</Form.Label>
        <Form.Control  type="text"  placeholder="author" name="author" value={values.author}  onChange={handleChange}  onBlur={handleBlur}   required /> <span style={{color:"red"}}> {touched.author && errors.author}</span><br/>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
        <Form.Label>Publications</Form.Label>
        <Form.Control type="text" placeholder="publications" name="publications" value={values.publications} onChange={handleChange}  onBlur={handleBlur}    required /> <span style={{color:"red"}}> {touched.publications && errors.publications}</span><br/>
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

export default Editbook;
