import React, { useState, useEffect } from 'react';

import { FormDataProps } from './MyForm';
import FadeInOut from "./FadeInOut";
import Form from 'react-bootstrap/Form';
import '../App.css'

export default function PersonalInfo({ formData, setFormData }: FormDataProps) {
  const [page, setPage] = useState(0)
  const [show, setShow] = useState(false);
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

  return (
    <FadeInOut show={!show} duration={1000} style={extraStyles}>
      <Form className='form-page fade-in'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Your Name</Form.Label>
            <Form.Control 
                value={formData.name} 
                type="text" 
                placeholder="Your Name" 
                aria-label="Name Input" 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                onChange={(e:any) => setFormData({...formData, age: e.target.value})}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
                key="number"
                value={formData.number} 
                type="text" 
                placeholder="Your Phone Number" 
                aria-label="Phone-Number Input" 
                onChange={(e:any) => setFormData({...formData, number: e.target.value})}
            />
        </Form.Group>
      </Form>
    </FadeInOut>
  );
}
