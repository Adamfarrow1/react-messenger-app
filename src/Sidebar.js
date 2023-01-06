
import { useContext, useState } from "react";
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore";
import { db } from "./firebase-config";
import { async } from "@firebase/util";
import { AuthContext } from "./context/AuthContext";

import Chats from "./Chats";


const Sidebar= () => {


    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const handleSearch = async() =>{
        if(username === currentUser.displayName) return
        const q = query(collection(db, "users"), where("displayName", "==", username));
        var found = false;
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) =>{
                setUser(doc.data())
                setUserNotFound(false);
                found = true;
            })

            if(!found){
                setUser(null);
                setErr(true);
                setUserNotFound(true)
            }

      
            if(username === "") setUserNotFound(false);
            setErr(false)
        }
        catch(err){
            setUser(null);
            setErr(true);
        }
    }

    const handleKey = (e) =>{
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async() =>{
        if(currentUser.uid === user.uid) return;
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try{
            console.log("working")
            const res = await getDoc(doc(db, "chats", combinedId));

            if(!res.exists()){
                await setDoc(doc(db,"chats", combinedId), { messages: [] });


                await updateDoc(doc(db, "userchats", user.uid),{
                    [combinedId + ".userInfo"]:{
                        uid:currentUser.uid,
                        displayName:currentUser.displayName
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })

                await updateDoc(doc(db, "userchats", currentUser.uid),{
                    [combinedId + ".userInfo"]:{
                        uid:user.uid,
                        displayName:user.displayName
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
            setUser(null)
            setUsername("")
        }
        catch(err){
            
        }
    }



  
    return (  
        <div className="col-3 sidebar text-center">
            <div className="text-center border--bottom ">
                <input type="search" placeholder="Find user" className="find-user" onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
                {user && <div className="userChat" onClick={handleSelect}>{user.displayName}</div>}
                {userNotFound && <div>User Not Found</div> }
            </div>
            <Chats></Chats>
        </div>
    );
}
 
export default Sidebar;