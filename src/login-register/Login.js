import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate , Link} from "react-router-dom";
import { useState } from "react";



const Login = () => {


    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
            await signInWithEmailAndPassword(auth, email, password)
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
                <p className="m-0 p-0 login-text mt-2 title">Login</p>
                <form action="" className="text-center" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" className="d-block mx-auto mt-4 input-lgreg"/>
                    <input type="password" placeholder="Password" className="d-block mx-auto mt-4 input-lgreg"/>
                    <button type="submit" className="mt-4 submit-btn input-lgreg">Submit</button>
                </form>
                {err && <span className="no-account">Something went wrong</span>}
                <p className="mt-2 no-account">Don't have an account? <Link to="/register"> Register</Link></p>
            </div>
        </div>
     );
}
 
export default Login;