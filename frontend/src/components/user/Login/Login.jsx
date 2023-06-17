
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../../Axios'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom'
import { isLoggedIn, userAdd } from '../../../redux/user'
import { useDispatch } from 'react-redux'
function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        if (formData.email, formData.password) {

            axios.post('/login', formData).then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch(userAdd(response.data.result))
                    dispatch(isLoggedIn(true))
                    navigate('/')
                }
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((preFormData) => ({
            ...preFormData,
            [name]: value
        }))
    }
    return (
        <div className='login_body'>


            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="user-box">
                        <input type="email" name="email" required="" value={formData.email} onChange={handleChange} />
                        <label>Emaii</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" value={formData.password} required="" onChange={handleChange} />
                        <label>Password</label>
                    </div>

                    <a type='submit' href='#' onClick={onSubmit} >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </a>

                    <Link style={{
                        fontSize: '10px',
                        float: 'right'
                    }} to='/signup'>SignUp</Link>
                </form>
            </div>
        </div>
    )
}

export default Login