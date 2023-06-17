import React from 'react'
import './404page.scss'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate()
    const previousPage = () => {
        navigate(-1)
    }
    return (
        <div className='error-body'>
            <div className='main-error'><div className="mars"></div>
                <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
                <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
                <p className="title">Oh no!!</p>
                <p className="subtitle">
                    You’re either misspelling the URL <br /> or requesting a page that's no longer here.
                </p>
                <div align="center">
                    <a className="btn-back" onClick={previousPage}>Back to previous page</a>
                </div>
                <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
                <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" /></div>
        </div>
    )
}

export default ErrorPage