import React, { useEffect } from "react"
import dotenv from "dotenv"
import makeToast from "../Toaster"
import axios from "axios"
import { withRouter } from "react-router-dom"

dotenv.config()

const LoginPage = (props) => {
    useEffect(() => {
        document.title = "Đăng nhập"
    }, [])
    const emailRef = React.createRef()
    const passwordRef = React.createRef()

    const loginUser = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        
        axios
            .post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/login`, {
                email,
                password,
            })
            .then((response) => {
                makeToast("success", response.data.message)
                localStorage.setItem("CC_Token", response.data.token)
                props.history.push("/dashboard")
                props.setupSocket()
            })
            .catch((err) => {
                console.log(err)
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
            <div className="cardHeader">Đăng nhập</div>
            <div className="cardBody">
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
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mật khẩu của bạn"
                        ref={passwordRef}
                    />
                </div>
                <button onClick={loginUser}>Đăng nhập</button>
                <div className="createAccount">
                    <span>Bạn chưa có tài khoản </span>
                    <a href="/register">đăng ký?</a>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)
