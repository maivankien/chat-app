import React, { useEffect } from "react"
import dotenv from "dotenv"
import axios from "axios"
import makeToast from "../Toaster"

dotenv.config()

const RegisterPage = (props) => {
    useEffect(() => {
        document.title = "Đăng ký"
    }, [])
    const nameRef = React.createRef()
    const emailRef = React.createRef()
    const passwordRef = React.createRef()

    const registerUser = (props) => {
        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        axios
            .post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/register`, {
                name,
                email,
                password,
            })
            .then((response) => {
                makeToast("success", response.data.message)
                setTimeout(() => {
                    window.location.href = '/login'
                    props.history.push("/login")
                }, 2000)
            })
            .catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    makeToast("error", err.response.data.message)
            })
    }

    return (
        <div className="card">
            <div className="cardHeader">Đăng ký tài khoản</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="name">Tên</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Tên của bạn"
                        ref={nameRef}
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Địa chỉ email của bạn"
                        ref={emailRef}
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Mật Khẩu</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mật khẩu của bạn"
                        ref={passwordRef}
                    />
                </div>
            </div>
            <button onClick={registerUser}>Đăng ký</button>
            <div className="createAccount">
                <span>Bạn đã có tài khoản </span>
                <a href="/login">đăng nhập?</a>
            </div>
        </div>
    )
}

export default RegisterPage
