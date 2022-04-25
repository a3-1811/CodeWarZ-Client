import React from 'react'

function Message(props) {
    const {message, owner} = props

    const calcTime = (time)=>{
        let minus = 60 * 1000
        let hours =  60 * minus
        let day = 24 * hours


        let timeMessage = new Date(time)
        let now = new Date()

        let dif = now.getTime() - timeMessage.getTime()
        if(dif < minus){
            return "just now"
        }else{
            if(dif < hours){
                return `${Math.floor((dif)/minus)} minutes ago`
            }else{
                if(dif < day){
                    return timeMessage.toLocaleTimeString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                      })
                }else{
                        return timeMessage.toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                          })
                }
            }
        }
    }
    return (
        <div className={`message__item ${owner ? "owner" : ""}`}>
            <div className="senderIcon">
                <img src={message.sender.avatar} alt={message.sender.fullName} />
            </div>
            <div className="contentBox">
                <div className="text-sm">{message.sender.fullName}</div>
                <div className="text">{message.message}</div>
                <div className="time text-xs">{calcTime(message.time)}</div>
            </div>
        </div>
    )
}

export default Message
