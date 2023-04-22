import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link } from 'react-router-dom';
import Listbooks from './Listbooks';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from "formik";


function Createstudent() {
    const navigate = useNavigate();

    const validateForm = (formData) => {
      var errors = {};
      if (formData.name === "") errors.name = "Name is Required";
      if (formData.author === "") errors.author = "author is Required";
      if (formData.publications === "") errors.publications = "publications is Required";
      return errors;
    };
 

const handleSubmit = async (formData, { resetForm }) => {
  setTimeout(async () => {
    try {
     await axios.post("https://6341636a20f1f9d7997200a7.mockapi.io/books",{
       name:formData.name,
       author:formData.author,
       publications:formData.publications,  
    });
   
    alert('created successfully');
    resetForm();
    navigate('/Listbooks');
  }catch(error){

  }
    resetForm();
  }, 3000);
};

    return (
    <>    
      <h1>Welcome to Dashboard, Library MANAGEMENT using formik</h1>
      <h4><Link to="/" element={<Dashboard />}>Dashboard</Link> | <Link to="/Listbooks" element={<Listbooks />}>View Books</Link></h4>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-12">
    <h2>Create Book</h2>
    <Formik
        initialValues={{
          name: "",
          author: "",
          publications : "",
        }}
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
export default Createstudent;
