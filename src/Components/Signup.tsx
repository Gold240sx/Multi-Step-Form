import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

import { FormDataProps } from './MyForm';
import Form from 'react-bootstrap/Form';
import '../App.css'
import { faLoveseat } from '@fortawesome/pro-duotone-svg-icons';
import { connectFirestoreEmulator } from 'firebase/firestore';

export const USER_REGEX = /^[a-zA-Z0-9_]{3,14}$/;
export const PWD_REGEX = /^(?=.*[a-x])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%"("")"]).{8,24}$/;
export const EML_REGEX =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function Signup({ formData, setFormData }: FormDataProps) {
    const emlRef = useRef(); //one for the user input (places focus on user input when the site loads)
    const errRef = useRef();  //places focus on the error if at any point we recieve an error for screenreader accessibility
    const pwdRef = useRef();
    
    //User Field State
    const [eml, setEml] = useState('');
    const [validEml, setValidEml] = useState(false);
    const [emlFocus, setEmlFocus] = useState(false);
    const [emlMsg, setEmlMsg] = useState('');

    //Password Field State
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdVision, setPwdVision] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const stripes = document.querySelector('.stripes')

    //1st useEffect sets the focus when the component loads
    useEffect(() => {
        emlRef.current.focus();
    }, [])

    useEffect(() => {
        setFormData({...formData, password: pwd, email: eml, emlRegexPass: validEml, pwdRegexPass: validPwd})
    }, [eml,pwd, formData.pwdRegexPass, formData.emlRegexPass])

    useEffect(() => {
        eml.length > 0 ? stripes?.classList.add('animated') : 
        stripes?.classList.remove('animated');
    },[eml])
        //2rd useEffect for email, status on failed submission
        useEffect(() => {
            const result = EML_REGEX.test(eml);
            // console.log("Result", result);
            if (!result) {
                setValidEml(false)
                setFormData({...formData, emlRegexPass: false})
            }
            else if (result) {
                setValidEml(true)
                setFormData({...formData, emlRegexPass: true})
            }
            return 
        }, [eml])


    //3rd useEffect for the Password Regex and state
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        //console.log(result, pwd);
        if (!result) {
            setValidPwd(false)
            setFormData({...formData, pwdRegexPass: false})
        }
        else if (result) {
            setValidPwd(true)
            setFormData({...formData, pwdRegexPass: true})
        }
        return 
    }, [pwd, setPwd])
    //4th useEffect: Error Message
    useEffect(() => {
        setErrMsg('')
    }, [ eml, pwd])

    /////////////////////////////////////////////////////////
    // const [emailIsValid, setEmailIsValid] = useState(false);
    // const [emailMessage, setEmailMessage] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState(false);
    // const [passwordMessage, setPasswordMessage] = useState('');
    // const [passwordFocus, setPasswordFocus] = useState(false)
    // const [formIsValid, setFormIsValid] = useState(false);

    // const emailEdit = (e:any) => {
    //     const email = e.target.value;

    //     if (EML_REGEX.test(email)) {
    //         setEmailIsValid(true);
    //         setEmailMessage('Your email looks good!');
    //       } else {
    //         setEmailIsValid(false);
    //         setEmailMessage('Please enter a valid email!');
    //       }
    // }

    // const passwordEdit = (e:any) => {
    //     const password = e.target.value;

    //     if (PWD_REGEX.test(password)) {
    //         setPasswordIsValid(true);
    //         setPasswordMessage('Your Password looks good!');
    //     } else {
    //         setPasswordIsValid(false);
    //         setPasswordMessage('Please enter a valid Password!');
    //     }
    // }

    return (
        <Form className="form-page fade-in signInForm">
            <Form.Group 
                className="mb-3" 
                // controlId="exampleForm.ControlInput1"
            >
                <Form.Label>Email Adress</Form.Label>
                <Form.Group className="row-input">
                    <Form.Control 
                        type="email" 
                        id="email"
                        ref={emlRef}
                        value={eml}
                        required
                        placeholder="Enter Email" 
                        aria-label="email Input" 
                        aria-invalid={validEml ? "false" : "true"}
                        aria-describedby="emlnote"
                        onChange={(e) => {
                            setEml(e.target.value)
                        }}
                        onFocus={() => {
                            setEmlFocus(true)
                        }}
                        onBlur={() => setEmlFocus(false)}
                    />
                    <Form.Label className="input-val-icons" htmlFor="email">
                        <span className={validEml ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEml || !eml ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </Form.Label>
                </Form.Group>
                <Form.Group id="emlnote" className={emlFocus && !validEml && eml.length > 5 ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please provide a valid Email <br />
                </Form.Group>
            </Form.Group>

        {/* //PASSWORD */}

            <Form.Group 
                className="mb-3" 
                //</Form>controlId="exampleForm.ControlInput2"
            >
                <Form.Label>Password</Form.Label>
                <Form.Group className="row-input">
                    <span 
                        className="password-vision input-val-icons" 
                        onClick={() => {
                            setPwdVision(!pwdVision)

                        }
                    }>
                        <FontAwesomeIcon 
                            icon={faEye}  
                            className={!pwdVision ? "" : "hide"} 
                            // onClick={pwdRef.current.focus()}
                        />
                        <FontAwesomeIcon 
                            icon={faEyeSlash}  
                            className={pwdVision ? "" : "hide"} 
                            // onClick={pwdRef.current.focus()}
                        />
                    </span>
                    <Form.Control 
                        // value={formData.password} 
                        value={pwd} 
                        type={pwdVision ? " text" : "password"}
                        id="password"
                        required
                        // ref={pwdRef}
                        placeholder="Enter Password" 
                        aria-label="Password Input" 
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        tabIndex={0}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        // onChange={(e:any) => setFormData({...formData, password: e.target.value})}
                        // onKeyUp={(e:any) => { passwordEdit(e)}}
                    />
                    <Form.Label className="input-val-icons" htmlFor="password">
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon ={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon ={faTimes} />
                        </span>
                    </Form.Label>
                </Form.Group>
                <Form.Group className={`message ${validPwd ? 'success' : 'error'}`}>
                    <Form.Label id="pwdnote" className={pwdFocus && !validPwd ? "instructions input-hint" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span><span aria-label="parenthesis left">(</span><span aria-label="parenthesis right">)</span>
                    </Form.Label>
                </Form.Group>
            </Form.Group>
        </Form>
    );
}