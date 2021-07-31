import "./Navbar.css"
import {  Link, useNavigate, } from "react-router-dom"
import { useAuthContext} from "../../Contexts/auth"
import { Button } from "@material-ui/core"

export default function Navbar({ logoutUser }) {
        const navigate = useNavigate()
        const {user, initialized} = useAuthContext()
        const handleLogout = async () =>{
            await logoutUser()
            navigate("/")
        }
        const handleSignUp = ()=>{
            navigate("/register")
        }
        const handleLogin =()=>{
            navigate("/login")
        }
        
    
    return(
        <nav className="Navbar">
                {user?.email?(
                <div className="auth">
                    <Link to="/">
                <img className="logoImg" src="https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80" 
                alt = "logo"></img>
                 </Link>
                <h2><Link className="actlink" to="/activity">Activity</Link></h2>
               <h2> <Link className="slink" to="/sleep">Sleep</Link></h2>
               <h2> <Link className="exlink" to="/nutrition">Nutrition</Link>
               </h2>
                <Button variant="outlined" className="btnOut" onClick={handleLogout}>Logout</Button>
                </div>
                
            ):(   <div className="auth">
                  <Link to="/">
                <img className="logoImg" src="https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80" 
                alt = "logo"></img>
                 </Link>
                <h2><Link className="actlink" to="/not-found">Activity</Link></h2>
                <h2><Link className="slink" to="/not-found">Sleep</Link></h2>
                <h2><Link className="exlink" to="/not-found">Nutrition</Link></h2>
                
           
            <Button variant="outlined" className="btnLog" onClick={handleLogin} color="theme.palette.common.white" >Login</Button>
            <Button variant="outlined" className="btnSign" onClick={handleSignUp}>Sign Up</Button>
        
        </div>)}
    
        </nav>
    )
                }
