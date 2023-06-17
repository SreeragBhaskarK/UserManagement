import axios from '../../../Axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })
    const navigate = useNavigate()

    const onSubmit = (data) => {
        if (formData.name && formData.email && formData.password && formData.phone) {

            axios.post('/signup', formData).then((response) => {
                if (response.data.success) {
                    navigate('/login')
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
        <div className='signup_body'>

            <div className="login-box">
                <h2>SignUp</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="user-box">
                        <input type="text" name="name" required="" value={formData.name} onChange={handleChange} />
                        <label>Name</label>
                    </div>
                    <div className="user-box">
                        <input type="email" name="email" required="" value={formData.email} onChange={handleChange} />
                        <label>Emaii</label>
                    </div>
                    <div className="user-box">
                        <input type="number" name="phone" value={formData.phone} required="" onChange={handleChange} />
                        <label>Phone</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" value={formData.password} required="" onChange={handleChange} />
                        <label>Password</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="c-password" required="" onChange={handleChange} />
                        <label>Confirm Password</label>
                    </div>
                    {/* <button style={{ backgroundColor: '#1a1a1a', borderRadius: '10%' }} type='submit' >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button> */}
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
                    }} to='/login'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup