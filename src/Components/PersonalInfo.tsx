import React, { useState, useEffect } from 'react';

import { FormDataProps } from './MyForm';
import FadeInOut from "./FadeInOut";
import Form from 'react-bootstrap/Form';
import '../App.css'

export default function PersonalInfo({ formData, setFormData }: FormDataProps) {
  const [page, setPage] = useState(0)
  const [show, setShow] = useState(false);

  const [forNo, setForNo] = useState('')
  const [name, setName] = useState('')
  const [forName, setForName] = useState('')
  const [nameCharLength, setNameCharLength] = useState(0)

  const toggleShow = () => setShow(show);
  const extraStyles = {
      // position: "fixed",
      // top: "30px",
      // left: 0,
      // right: 0,
      // bottom: 0,
      // background: "rgba(0, 0, 0, 0.4)",
      // color: "#FFF"
    };

  useEffect(() => {
    return () => {
        toggleShow(show ? "hide" : "show")
    };
  }, [])


  const phoneNoFormat = (unForNo:any) => {

    const currentValue = unForNo.replace(/[^\d]/g, '');
    const cvLength = currentValue.length; 

    if (cvLength < 10){ 
        if (cvLength < 4) {
          setForNo(currentValue)
          setFormData({...formData, number: forNo}) 
        }
        else if (cvLength < 7) {
          setForNo(`(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`)
          setFormData({...formData, number: forNo}) 
        }
        else {setForNo(`(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`)};
        setFormData({...formData, number: forNo}) 
    } else if (cvLength === 10){
        setForNo(`(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`)
        setFormData({...formData, number: forNo})
    } else { return forNo }

  }

  const nameFormat = (unFoName:any, forName:any) => {
    //get name w/o numbers
    const formName = unFoName.replace(/[0-9]/g, "")

    //get the number of digits not including spaces
    const formNameWoSpacesLength = unFoName.replace(/\s/g, '').length;

    setForName(formName)
    setNameCharLength(formNameWoSpacesLength)
    setFormData({...formData, name: formName})
    setFormData({...formData, nameCharLength: nameCharLength})

    console.log(formName, nameCharLength)
    return formName
  }

  return (
    <FadeInOut show={!show} duration={1000} style={extraStyles}>
      <Form className='form-page fade-in'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Your Name</Form.Label>
          <Form.Control 
            value={formData.name} 
            type="text" 
            minLength={3}
            placeholder="Your Name" 
            aria-label="Name Input" 
            onChange={(e:any) => {
              setFormData({...formData, name: nameFormat(e.target.value, forName)})
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Age</Form.Label>
          <Form.Control 
            value={formData.age} 
            type="number" 
            placeholder="Your Age" 
            aria-label="Age Input" 
            min="4"
            max="99"
            defaultValue="18"
            onChange={(e:any) => {
              setFormData({...formData, age: e.target.value})
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
            key="number"
            value={formData.number} 
            type="string" 
            placeholder="(xxx) xxx-xxxx"
            aria-label="Phone-Number Input" 
            onChange={(e:any) => {
              setFormData({...formData, number: phoneNoFormat(e.target.value)})
            }}
          />
        </Form.Group>
      </Form>
    </FadeInOut>
  );
}
