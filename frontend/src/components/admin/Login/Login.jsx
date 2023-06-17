import axios from '../../../Axios'
import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { adminIsLoggedIn } from '../../../redux/user'
function Login() {
    const [formData, setFormData] = useState({
        email: 'admin@gmail.com',
        password: '123456789'
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.email, formData.password) {
            console.log('acess');
            axios.post('/admin/login', formData).then((response) => {
                if (response.data.success) {
                    dispatch(adminIsLoggedIn(true))
                    navigate('/admin')
                }else{

                }
            })
        }
    }
    return (
        <div className='admin-login-body'>
            <div className='admin-login-main' style={{ height: '100%' }}>
                <div className="blurred-box">
                    <div className="user-login-box">
                        <span className="user-icon"></span>
                        <div className="user-name">Admin</div>
                        <form onSubmit={handleSubmit}>
                            <input className="user-password me-3" type="password" value={formData.password}  onChange={handleChange} />
                            <Button className='btn-sm' type='submit'>submit</Button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login