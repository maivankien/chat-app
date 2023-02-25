import React from "react";
import { withRouter } from "react-router-dom";

const ChatroomPage = ({ match, socket }) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = React.useState([]);
    const messageRef = React.useRef();
    const [userId, setUserId] = React.useState("");

    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            });

            messageRef.current.value = "";
        }
    };

    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }
        if (socket) {
            socket.on("newMessage", (message) => {
                const newMessages = [...messages, message];
                setMessages(newMessages);
            });
        }
        //eslint-disable-next-line
    }, [messages]);

    React.useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId,
            });
        }

        return () => {
            //Component Unmount
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId,
                });
            }
        };
        //eslint-disable-next-line
    }, []);
    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("CC_Token");
        window.location.href = 'http://localhost:3000/login'
    }
    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">Phòng chat</div>
                <div className="logout">
                    <a href="/login" onClick={logout}>Đăng xuất</a>
                </div>
                <div className="chatroomContent">
                    {messages.map((message, i) => (
                        <div key={i} className="message">
                            <span
                                className={
                                    userId === message.userId ? "ownMessage" : "otherMessage"
                                }
                            >
                                {message.name}:
                            </span>{" "}
                            <span className="valueMessage">{message.message}</span>
                        </div>
                    ))}
                </div>
                <div className="chatroomActions">
                    <div>
                        <input
                            type="text"
                            name="message"
                            placeholder="Nhập tin nhắn"
                            ref={messageRef}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />
                    </div>
                    <div>
                        <button className="join" onClick={sendMessage}>
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(ChatroomPage);
