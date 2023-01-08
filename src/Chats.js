import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { db } from "./firebase-config";





const Chats = () => {

    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect( () =>{

        const getChats = () =>{
            const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) =>{
                setChats(doc.data());
            })
           
            return () =>{
                unsub();
            }
        };

        currentUser.uid && getChats();
    }, [currentUser.uid])


    const handleSelect = (u) =>{
        dispatch({type:"CHANGE_USER", payload:u})
    }




    return ( 
        <div className="chats-scroll" id="style-1">
            {chats && Object.entries(chats).sort((a,b)=>b[1].date - a[1].date).map((chat) =>(
                <div className="bottom--border userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                    <span className="userChat-displayName">{chat[1].userInfo?.displayName}</span>

                    {chat[1].lastMessage?.text.length > 246 ?
                    (
                        <p className="last-message mobile-view">{chat[1].lastMessage?.text.substring(0,246)}...</p> 
                    ):
                    <p className="last-message mobile-view">{chat[1].lastMessage?.text}</p>}
                    
                    <p className="userChats-date mobile-view">{chat[1].date && chat[1].date.toDate().toLocaleTimeString('en-US')} {chat[1].date &&  chat[1].date.toDate().getMonth() + 1 }/{ chat[1].date && chat[1].date.toDate().getDay() + 1}/{chat[1].date &&  chat[1].date.toDate().getFullYear()}</p>
                </div>
            ))}
        </div>
     );
}
 
export default Chats;