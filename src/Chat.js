import { arrayUnion, onSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { db } from "./firebase-config";
import { doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { AuthContext } from "./context/AuthContext";

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() =>{
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) =>{
            doc.exists() && setMessages(doc.data().messages)
        })

        return() =>{
            unSub();
        }
    }, [data.chatId])


    const [text, setText] = useState("");

    const {currentUser} = useContext(AuthContext);



    const handleSend = async () =>{
        if(text === "") return;
        setText("")
        try{
        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now()
            })
        })

        await updateDoc(doc(db, "userchats", currentUser.uid), {
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId + ".date"]: serverTimestamp(),

        })

        await updateDoc(doc(db, "userchats", data.user.uid), {
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId + ".date"]: serverTimestamp(),

        })
    }
    catch(err){
        console.log(err);
    }

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    useEffect(() =>{
        if(!currentUser){
            setMessages([]);
        }
    }, [currentUser])


    const ref = useRef();
     useEffect (() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
     }, [messages])

    return ( 
        <>
        <div className="messages-block" id="style-2" >
            {messages.map((m) => (
                <div ref={ref} className={currentUser.uid === m.senderId ? "sent" : "recieve"} key={m.id}>
                    <div>
                        {m.text}
                    </div>
                    <div>
                        <p className="timestamp">{m.date.toDate().toLocaleTimeString('en-US')} {m.date.toDate().getMonth() + 1 }/{m.date.toDate().getDay() + 1}/{m.date.toDate().getFullYear()}</p>
                    </div>
                </div>
            ))}
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="input d-flex">
            <input type="text" className="input-message mt-auto" onChange={(e) => setText(e.target.value)} value={text}/>
            <button onClick={handleSend} className="send-btn">Send</button>
        </form>
     
        </>
     );
}
 
export default Chat;