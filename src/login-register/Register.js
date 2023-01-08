import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const [usernameAvailable, setUsernameAvailable] = useState(true);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const displayName = e.target[0].value;
        const ref = doc(db, "usernames", displayName);
        const snap = await getDoc(ref);
        

        setUsernameAvailable(!snap.exists());
        console.log(usernameAvailable)
        if(!usernameAvailable) return;
        
        const email = e.target[1].value;
        const password = e.target[2].value;
        try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(res.user, { displayName });
        await setDoc(doc(db, "usernames", displayName), {
            displayName,
            uid: res.user.uid
        })

        


        await setDoc(doc(db, "users", res.user.uid),{
            uid: res.user.uid,
            email,
            displayName,
            password: password
        });

        await setDoc(doc(db, "userchats", res.user.uid), {})
        navigate("/")
        }
        catch (err){
            setErr(true);
        }
    
    }


    return ( 
        <div className="Container text-center row text-center justify-content-center">
            <div className=" login text-center align-self-center shadow">
                <p className="m-0 p-0 login-text mt-2 logo">Adam's chat</p>
                <p className="m-0 p-0 login-text mt-2 title">Create Account</p>
                <form onSubmit={handleSubmit} className="text-center">
                    <input type="text" placeholder="Username" className="d-block mx-auto mt-4 input-lgreg" required/>
                    <input type="text" placeholder="Email" className="d-block mx-auto mt-4 input-lgreg" required/>
                    <input type="text" placeholder="Password" className="d-block mx-auto mt-4 input-lgreg" required/>
                    <button className="mt-4 submit-btn">Sign up</button>
                </form>
                {err && <span className="no-account">Something went wrong</span>}
                {!usernameAvailable && <span className="no-account">This username is already taken</span>}
                <p className="mt-2 no-account">Have an account? <Link to="/login"> Login</Link></p>
            </div>
        </div>
     );
}
 
export default Register;