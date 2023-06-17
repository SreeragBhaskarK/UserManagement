import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net/js/jquery.dataTables.js';
import axios from '../../../Axios';
import { Button, Container, Row, Modal, Form } from 'react-bootstrap'
import './UserManagement.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminIsLoggedIn } from '../../../redux/user';

function UserManagement() {
    const navigate = useNavigate()
    const tableRef = useRef()
    const [tableData, setTableData] = useState([])
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })

    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])



    useEffect(() => {
        $(tableRef.current).DataTable()
        axios.get('/admin').then((response) => {
            console.log(response);
            setTableData(response.data.result)
        })

        return () => {
            $(tableRef.current).DataTable().destroy()
        }

    }, [])

    const addUser = (e) => {
        e.preventDefault()
        console.log(formData, '//////////////');
        if (formData.name, formData.email, formData.phone, formData.password) {
            console.log('success');
            axios.post('/admin/add', formData).then((response) => {
                console.log(response, 'kdfjkdfj');
                if (response.data.success) {
                    setShow(false);
                }
            })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const deleteUser = (id) => {
        axios.delete(`/admin/delete/${id}`).then((response) => {
            if (response.data.success) {

            }
        })
    }

    const getEditUser = (id) => {
        axios.get(`/admin/${id}`).then((response) => {
            console.log(response, 'uslldkf');
            if (response.data.success) {
                setEditFormData(response.data.result)
                handleShowEdit()
            }
        })
    }
    const dispatch = useDispatch()
    const updateUser = (e) => {
        e.preventDefault()
        if (editFormData.name && editFormData.email && editFormData.phone) {
            axios.patch('/admin/update', editFormData).then((response) => {
                if (response.data.success) {
                    handleCloseEdit()
                }
            })
        }

    }

    // add
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit 
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    //add 
    const handleChages = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // update
    const EdithandleChages = (e) => {
        const { name, value } = e.target
        setEditFormData({ ...editFormData, [name]: value })
    }


    const logOut = () => [
        axios.delete('/admin/logout').then((response) => {
            if (response.data.success) {
                dispatch(adminIsLoggedIn(false))
                navigate('/admin/login')
            }
        }).catch((err) => {
            console.log(err, 'logout');
        })
    ]

    return (
        <div className='main_userManagement-body'>


            <div className='main_userManagement'>


                <main className="table">
                    <section className="table__header">
                        <h1>User Management</h1>
                        <div className="input-group" style={{ flexWrap: 'inherit' }}>
                            <input type="search" placeholder="Search Data..." />
                            <img src="image/search.png" alt="" />
                        </div>
                        <div className="export__file">
                            <label for="export-file" className="export__file-btn" title="Export File"></label>
                            <input type="checkbox" id="export-file" />
                            <div className="export__file-options">
                                <label onClick={handleShow}>Add user &nbsp; &#10140;</label>
                                <label for="export-file" onClick={logOut} id="toPDF">LogOut </label>
                            </div>
                        </div>
                    </section>
                    <section className="table__body">
                        <table>
                            <thead>

                                <tr>
                                    <th> Id <span className="icon-arrow">&uarr;</span></th>
                                    <th> User Name <span className="icon-arrow">&uarr;</span></th>
                                    <th> Email <span className="icon-arrow">&uarr;</span></th>
                                    <th> Phone <span className="icon-arrow">&uarr;</span></th>
                                    <th> Status <span className="icon-arrow">&uarr;</span></th>
                                    <th> Action <span className="icon-arrow">&uarr;</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData && tableData.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td> #{data.id} </td>
                                            <td> <img src={data.image} alt="" />{data.name}</td>
                                            <td> {data.email} </td>
                                            <td> {data.phone} </td>
                                            <td>
                                                <p className="status delivered">Active</p>
                                            </td>
                                            <td><Button onClick={() => getEditUser(data.id)} className='me-3'>Edit</Button>
                                                <Button onClick={() => deleteUser(data.id)} className='btn-danger'>Delete</Button></td>
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table>
                    </section>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={addUser}>
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



                    {
                        editFormData && <Modal show={showEdit} onHide={handleCloseEdit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={updateUser}>
                                <Modal.Body>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            autoFocus
                                            value={editFormData.name}
                                            onChange={EdithandleChages}
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
                                            value={editFormData.email}
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
                                            value={editFormData.phone}
                                        />
                                    </Form.Group>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEdit}>
                                        Close
                                    </Button>
                                    <Button type='submit' variant="primary" >
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    }
                </main >
            </div>
        </div>
    )
}

export default UserManagement