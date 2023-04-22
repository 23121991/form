import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link,useParams } from 'react-router-dom';
import Liststudents from './Liststudents';
import Createstudent from './Createstudent';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Formik } from "formik";

function Editstudent() {
const navigate = useNavigate();
const params = useParams();

let formValues={
  id:"",
  name:"",
  age:"",
  email:"",
  gender:"",
  mobile_number:"",
  courses:"",
  address:"",
  education:"",
  joined_date:"",
  error:{
  name:"",
  age:"",
  mobile_number:"",
  email:"",
  gender:"",
  courses:"",
  address:"",
  education:"",
  joined_date:"",
  }
}

const [formData,setFormdata]=useState(formValues); 


const validateForm = (formData1) => {
  var errors = {};
  if (formData1.name === "") errors.name = "Name is Required";
  if (formData1.age === "") errors.age = "Age is Required";
  if (formData1.email === "") errors.email = "Email is Required";
  if (formData1.gender === "") errors.gender = "Gender is Required";
  if (formData1.mobile_number === "") errors.courses = "Mobile no is Required";
  if (formData1.courses === "") errors.courses = "Courses is Required";
  if (formData1.address === "") errors.address = "address is Required";
  if (formData1.education === "") errors.courses = "education is Required";
  if (formData1.joined_date === "") errors.joined_date = "joined date is Required";
  return errors;
};

useEffect(() => {
  try{
async function getData(rowId){
    const response = await axios.get(`https://6341636a20f1f9d7997200a7.mockapi.io/student/${rowId}`);
    const response1 = response.data;
    setFormdata({...formData,
            id:response1.id,
            name:response1.name,
            age:response1.age,
            email:response1.email,
            gender:response1.gender,
            education:response1.education,
            courses:response1.courses,
            address:response1.address,
            mobile_number:response1.mobile_number,
            joined_date:response1.joined_date,       
    }); 
    }     
    getData(params.userId);//call user data when loading the file

  }catch(error){

  }
  
});

const handleSubmit = async (formData, { resetForm }) => {
  setTimeout(async () => {
    try {
   
      await axios.put(`https://6341636a20f1f9d7997200a7.mockapi.io/student/${formData.id}`,{
        id:formData.id,
        name:formData.name,
        age:formData.age,
        email:formData.email,
        gender:formData.gender,
        education:formData.education,
        courses:formData.courses,
        address:formData.address,
        mobile_number:formData.mobile_number,
        joined_date:formData.joined_date,
      });
      
      alert('updated successfully');
      navigate('/Liststudents');
    }catch(error){

    }
    resetForm();
  }, 1000);
};
    return (
    <>    
   <h1>Welcome to Dashboard, Library MANAGEMENT using formik</h1>
   <h2><Link to="/" element={<Dashboard />}>Dashboard</Link> |<Link to="/Createstudent" element={<Createstudent />}>Create Student</Link> | <Link to="/Liststudents" element={<Liststudents />}>View Student</Link></h2>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-6">
    <h2>Update Student</h2>
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
              <Form.Control  type="text" placeholder="name"  name="name" value={values.name}  onChange={handleChange}  onBlur={handleBlur}   required /> <span style={{color:"red"}}> {touched.name && errors.name}</span><br/>
          </Form.Group>
  
        <Form.Group className="col-md-6"   controlId="exampleForm.ControlInput2">
          <Form.Label>Student email</Form.Label>
          <Form.Control  type="text"  placeholder="email" name="email" value={values.email}  onChange={handleChange}  onBlur={handleBlur}   required /> <span style={{color:"red"}}> {touched.email && errors.email}</span><br/>
        </Form.Group>
  
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
          <Form.Label>Student age</Form.Label>
          <Form.Control type="text" placeholder="age" name="age" value={values.age} onChange={handleChange}  onBlur={handleBlur}    required /> <span style={{color:"red"}}> {touched.age && errors.age}</span><br/>
        </Form.Group>
  
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput4" name="gender">
        <Form.Label>Gender</Form.Label>
      
          <Form.Check
            value="male"
            type="radio"
            aria-label="radio 1"
            label="male"
            onChange={handleChange}  
            onBlur={handleBlur} 
            name="gender"
            checked={values.gender === "male"}
          />
          <Form.Check
            value="female"
            type="radio"
            aria-label="radio 2"
            label="Female"
            onChange={handleChange}  
            onBlur={handleBlur} 
            name="gender"
            checked={formData.gender === "female"} 
          />
          <Form.Check
            value="other"
            type="radio"
            aria-label="radio 3"
            label="Other"
            name="gender"
          />
        </Form.Group> <br/>
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput5">
          <Form.Label>Mobile number</Form.Label>
          <Form.Control type="text" placeholder="mobile_number" name="mobile_number" value={values.mobile_number}  onChange={handleChange}  onBlur={handleBlur}  required /> <span style={{ color: "red" }}>{touched.mobile_number && errors.mobile_number}</span><br/>
        </Form.Group><br/>
   
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput6">
          <Form.Label>Education</Form.Label>
          <Form.Control type="text" placeholder="education" name="education" value={values.education} onChange={handleChange}  onBlur={handleBlur}   required /> <span style={{color:"red"}}> {touched.education && errors.education}</span><br/>
        </Form.Group><br/>
       
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput5">
          <Form.Label>Courses</Form.Label>
          <Form.Control type="text" placeholder="courses" name="courses" value={values.courses} onChange={handleChange}  onBlur={handleBlur}  required /> <span style={{color:"red"}}> {touched.courses && errors.courses}</span><br/>
        </Form.Group><br/>
  
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput5">
          <Form.Label>Joining date</Form.Label>
          <Form.Control type="date" placeholder="joined_date" name="joined_date" value={values.joined_date} onChange={handleChange}  onBlur={handleBlur} required /> <span style={{color:"red"}}> {touched.joined_date && errors.joined_date}</span><br/>
        </Form.Group><br/>
  
        <Form.Label>Address</Form.Label>
        <FloatingLabel controlId="floatingTextarea2" label="Address">
          <Form.Control
            as="textarea"
            name="address"
            placeholder="Leave a address here"
            style={{ height: '100px' }}
            value={values.address} 
            onChange={handleChange}  
            onBlur={handleBlur} 
          />
        </FloatingLabel>
        <span style={{color:"red"}}> {touched.address && errors.address}</span><br/><br/>
        <Button type="submit" disabled={isSubmitting} variant="primary">Save</Button>            
            </Form>
        
           )}
          </Formik>
    </div>
    </>
  );
}

export default Editstudent;
