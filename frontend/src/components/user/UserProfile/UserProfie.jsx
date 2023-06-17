import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserProfile.css'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from '../../../Axios'
import { isLoggedIn, userAdd, userImage } from '../../../redux/user'


function UserProfie() {
    const userDetails = useSelector((state) => state.user.userList)
    const dispatch = useDispatch()
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])
    const navigate = useNavigate()
    const previousPage = () => {
        navigate(-1)
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setFormData(userDetails)
        setShow(true);
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('//////', formData);
        if (formData.name && formData.email && formData.phone && formData.id) {
            axios.patch('/update', formData).then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch(userAdd(formData))
                    handleClose()
                }
            })
        }
    }

    const handleChages = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const uploadImage = (e) => {
        const imageData = { image: e.target.files[0] }
        if (imageData) {
            axios.post('/upload_image', imageData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then((response) => {
                console.log(response, 'response');
                if (response.data.success) {
                    dispatch(userImage(response.data.result))
                }
            })
                .catch((err) => {
                    console.log(err.message, 'errror');
                })
        }
    }

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const logout = () => {
        axios.delete('/logout').then((response) => {
            if (response.data.success) {
                dispatch(isLoggedIn(false))
                navigate('/login')
            } else {

            }
        })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div className='user-profile-body'>
            <div className='user-profile-main'>


                <main id="app">
                    <section style={{ margin: 'auto' }} className="ui-challenge">
                        <header>
                            <div className="backdrop"></div>
                            <button type='file' onClick={previousPage} className="back">
                                <svg className="icon" viewBox="0 0 172 172">
                                    <path d="M114.55469,22.87734c-1.48951,0.04438 -2.90324,0.6669 -3.94167,1.73568l-57.33333,57.33333c-2.23811,2.23904 -2.23811,5.86825 0,8.10729l57.33333,57.33333c1.43802,1.49778 3.5734,2.10113 5.5826,1.57735c2.0092,-0.52378 3.57826,-2.09284 4.10204,-4.10204c0.52378,-2.0092 -0.07957,-4.14458 -1.57735,-5.5826l-53.27969,-53.27969l53.27969,-53.27969c1.69569,-1.64828 2.20555,-4.16851 1.28389,-6.3463c-0.92166,-2.17779 -3.08576,-3.56638 -5.44951,-3.49667z"></path>
                                </svg>
                            </button>
                            <div className="text">
                                <h1>User Profile</h1>

                            </div>

                            <button onClick={handleClick} style={{
                                width: '7em',
                                height: '7em',
                                borderRadius: '10%',
                            }} className="play">
                                <img style={{
                                    borderRadius: '10%', width: 'inherit',
                                    height: 'inherit'
                                }} src={userDetails.image}></img>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={uploadImage}
                            />

                        </header>
                        <section className="exercises">
                            <h2>Profile Details</h2>
                            <ul>
                                <li><a href="#"><span>Name :-</span><h2 style={{ margin: 'auto 0 auto 0' }}>{userDetails.name}</h2><i className="arrow"></i></a></li>
                                <li><a href="#"><span>Email :-</span><h2 style={{ margin: 'auto 0 auto 0' }}>{userDetails.email}</h2><i className="arrow"></i></a></li>
                                <li><a href="#"><span>Phone :-</span><h2 style={{ margin: 'auto 0 auto 0' }}>{userDetails.phone}</h2><i className="arrow"></i></a></li>
                            </ul>
                            <div style={{ width: "fit-content", margin: "auto" }} className='editButton'>
                                <button onClick={handleShow} className='custom-btn btn-9' ><span style={{ position: "inherit", zIndex: '2' }}>Edit</span></button>
                            </div>
                            <div style={{ width: "fit-content", margin: "auto" }} className='logout-btn-main'>
                                <button onClick={logout} class="logout-btn btn-10"><span style={{ position: "inherit", zIndex: '2' }}>Logout</span></button>
                            </div>

                        </section>
                    </section>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        value={formData.name}
                                        onChange={handleChages}
                                        name='name'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        autoFocus
                                        onChange={handleChages}
                                        name='email'
                                        value={formData.email}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="91**********"
                                        autoFocus
                                        onChange={handleChages}
                                        name='phone'
                                        value={formData.phone}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoFocus
                                        onChange={handleChages}
                                        name='password'
                                        value={formData.password}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoFocus
                                    />
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type='submit' variant="primary" >
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </main >

            </div>
        </div>



    )
}

export default UserProfie