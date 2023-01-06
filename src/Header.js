import { signOut } from "firebase/auth";
import { useContext} from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { auth } from "./firebase-config";

const Header = () => {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);


    return ( 
        <div className="container-xxl">
            <div className="row header ">
                <div className="col-4 d-flex temp">
                <button className="logout-btn align-self-center" onClick={()=>signOut(auth)}>Logout</button>
                <p className="username-header align-self-center mb-0">Welcome {currentUser.displayName}!</p>
                
                </div>
                <div className="col-6 text-center align-self-center">
                    <p className="chat-username m-0">{data.user.displayName}</p>
                </div>
            </div>
        </div>
     );
}
 
export default Header;