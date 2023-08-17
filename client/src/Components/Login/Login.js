import React,{useState, useContext} from 'react';
import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';


function Login() {

  const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const loginUser = async (e) => {
      e.preventDefault();
  
      const res = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
  
      const data = await res.json();
  
      if (res.status === 400 || !data) {
        window.alert("Invalid Login");
        console.log("Invalid Login");
      } else if (res.status === 200){
          window.alert("Successfully Login");
          navigate("/Dashboard");
        }
        else{
          
          dispatch({type:"USER", payload:true})
          window.alert("Successfully Login");
          console.log("Successfully Login");
          navigate("/Home");
        }
      
    }
    return (
        <>
            <section class="w3l-hotair-form">

                <div className="container">

                    <div className="workinghny-form-grid">
                        <div className="main-hotair">
                            <div className="content-wthree">
                                <h2>Log In</h2>
                                <form  method="post">
                                    <input type="email" 
                                    className="email" 
                                    name="email" 
                                    placeholder="Enter email iD" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />

                                    <input type="password"
                                     className="password"
                                     name="password"
                                     placeholder="Enter Password"  
                                     value={password}
                                     onChange={(e) => setPassword(e.target.value)} />

                                    <button className="btn" 
                                    type="submit"
                                    name="login"  
                                    value="log In"
                                    onClick={loginUser}>Log In
                                    </button>
                                </form>

                                <p className="account">Don't have an account? <NavLink to="/Signup">Register</NavLink></p>
                            </div>
                            {/* <div className="w3l_form align-self">
                                <div className="left_grid_info"> */}
                                    <img src="assets/img/logo/1.png" alt="" className="img-fluid" />
                                {/* </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login
