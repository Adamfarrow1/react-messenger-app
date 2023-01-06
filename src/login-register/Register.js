import {  createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase-config";
import { useState } from "react";
import { db } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";


const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const displayName = e.target[0].value;
        console.log(displayName);
        const email = e.target[1].value;
        const password = e.target[2].value;
        try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(res.user, { displayName });
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
                    <input type="text" placeholder="Name" className="d-block mx-auto mt-4" required/>
                    <input type="text" placeholder="Email" className="d-block mx-auto mt-4" required/>
                    <input type="text" placeholder="Password" className="d-block mx-auto mt-4" required/>
                    <button className="mt-4 submit-btn">Sign up</button>
                </form>
                {err && <span>Something went wrong</span>}
                <p className="mt-2">Have an account? <Link to="/login"> Login</Link></p>
            </div>
        </div>
     );
}
 
export default Register;