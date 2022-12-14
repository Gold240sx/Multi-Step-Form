import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

//Components
import Signup from './Signup';
import PersonalInfo from './PersonalInfo';
import Final from './Final';
import FadeInOut from "./FadeInOut";
import { Button, Form, ProgressBar } from 'react-bootstrap';
import latLogo from '../assets/Main White Lateral with Circle.png'

// Javascript Functions
import { useSignup } from '../Hooks/useSignup'

import { PWD_REGEX } from './Signup';

export interface FormProps {
    formData: {
        email: string,
        password: string,
        name: string,
        age: string,
        number: string,
        yourDataCorrect: boolean,
        emlRegexPass: boolean,
        pwdRegexPass: boolean,
        phoNoRegexPass: boolean,
        nameCharLength: number,
    }
}

export interface CompleteFormState {
    email: string,
    password: string,
    name: string,
    age: string,
    number: string,
    yourDataCorrect: boolean,
    emlRegexPass: boolean,
    pwdRegexPass: boolean,
    phoNoRegexPass: boolean,
    nameCharLength: number,
}

export interface FormDataProps extends FormProps {
    setFormData: React.Dispatch<React.SetStateAction<CompleteFormState>>
}

export default function MyForm() {
    const [page, setPage] = useState(0)
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const toggleShow = () => setShow(!show);
    
    // Firebase States
    const { error, isPending, signup } = useSignup()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: '',
        age: "",
        number: "",
        yourDataCorrect: false,
        emlRegexPass: false,
        pwdRegexPass: false,
        phoNoRegexPass: false,
        nameCharLength: "",
    })

    const formTitles=["Sign Up:", "Personal Info:", "Your Information:"]
    const formDisplay = () => {
        if (page===0){
            return <Signup formData={formData} setFormData={setFormData} />
        } else if (page === 1) {
            return <PersonalInfo formData={formData} setFormData={setFormData} />
        } else if (page === 2) {
            return <Final formData={formData} setFormData={setFormData} />
        } else { return }
    }

    const prevButtDisabled = () => {
        if ( page === 0 ) {
            return true;
        } else {
            return false
        }
    }

    const numberOfPages = formTitles.length

    const calcPercent = () => {
        if (formTitles.length === page) { return 100 }
        else if (page === 0) { return 0 }
        else { return 100/((numberOfPages-1)/page)}
    }

    useEffect(() => {
        return () => {
            toggleShow(show ? "hide" : "show")
        };
    }, [])

    const nextButtDisabled = () => {
        if (page === 0 && (formData.email.length === 0 || formData.password.length === 0 )) {
            return true
        } else 
        if ( page === 0 && ( !formData.emlRegexPass || !formData.pwdRegexPass )) {
            return true
        }
        else if ( (page === 1) && ( Number(formData.nameCharLength) === 0 || Number(formData.age) < 4 || Number(formData.age) > 100 ||formData.number.length===0)) {
            return true
        } else if ((page === 1) && (Number(formData.nameCharLength) < 2 || formData.number.length < 10)){ 
            return true
        }
        else if ((page === 2) && (!formData.yourDataCorrect && page===2)) {
            return true
        }
        return false;
    }

    useEffect(() => {
        return () => {
            console.log(formData)
        }
    }, [formData])


    return (
        <>
            {success ? (
                <section>
                    <h1>Sucess!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <FadeInOut 
                    show={show} 
                    duration={1000} 
                    style={{ "width": "500px"}}
                    className={`m-auto shadow rounded p-5 form`}
                >
                    <div>
                        <div className="dark-background full-bleed">
                            <img src={latLogo} className="main-lat-logo"/>
                            <div>
                                <div className="100 row1">
                                    <p className='calc-number'>{`${calcPercent()}%`}</p> 
                                    <ProgressBar now={calcPercent()} className="stripes slower" />
                                </div>
                            </div>
                        </div>
                        <h3 className="form-title">{formTitles[page] }</h3>
                        {formDisplay()}

                        <Button 
                            className="mx-3"
                            style={{"backgroundColor":"#FDBB2C", "color":"black", "border":"none"}}
                            disabled={prevButtDisabled()}
                            onClick={(e:any) => {
                                e.preventDefault()
                                setPage((currPage) => currPage-1)
                            }}
                            > Prev
                        </Button>
                        <Button 
                            className="mx-3"
                            disabled={nextButtDisabled()}
                            style={{"backgroundColor":"#26BCBE", "border":"none"}}
                            onClick={() => {
                                //fadeInAnimation("next")
                                setPage((currPage) => currPage+1)
                            }}
                            > {page === formTitles.length - 1 ? "Submit" : "Next"}
                        </Button>
                        
                        {/* {!isPending && <button className="glow" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>}
                        {isPending && <button className="btn" disabled>loading...</button>}
                        {error && <p  className="error">{error}</p>} */}

                        <Form.Label className="bottom-links">
                            Already Registered?<br />
                            <span className="liner">
                                {/* Put another router link here */}
                                <a href="/sign-in">Sign In</a>
                            </span>
                        </Form.Label>

                    </div>
                </FadeInOut>
            )}
        </>
        
    )
}
