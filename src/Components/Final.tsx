import React, { useState, useEffect } from 'react';

import { FormDataProps } from './MyForm';
import Form from 'react-bootstrap/Form';
import FadeInOut from "./FadeInOut";
import '../App.css';

export default function Final({ formData, setFormData }: FormDataProps) {
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
      <Form className="form-page fade-in">
        <div className="your-info">
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Email:</th>
                <td className="Info">{formData.email}</td>
              </tr>
              <tr>
                <th scope="row">Name:</th>
                <td className="Info">{formData.name}</td>
              </tr>
              <tr>
                <th scope="row">Age:</th>
                <td className="Info">{formData.age}</td>
              </tr>
              <tr>
                <th scope="row">Phone Number:</th>
                <td className="Info">{formData.number}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
          <div className="row">
            <Form.Label>Is all of this data correct?</Form.Label>
            <Form.Check
                key="yourDataCorrect"
                type="checkbox" 
                checked={formData.yourDataCorrect}
                placeholder="Your Phone Number" 
                aria-label="Is your Data correct? Checkbox" 
                onChange={(e:any) => setFormData({...formData, yourDataCorrect: !formData.yourDataCorrect})}
            />
          </div>
        </Form.Group>
      </Form>
    </FadeInOut>
  );
}
