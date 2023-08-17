import React, { useState } from 'react'
import './Signup.css'
import { NavLink, useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate();

    // const [user, setUser] = useState({
    //     name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    // });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [type, setType] = useState('');
    const [secretKey, setSecretkey] = useState('');
    const [shopID, setShopID] = useState('');

    // let name, value;
    // const handleInputs = (e) => {
    //     console.log(e);
    //     name = e.target.name;
    //     value = e.target.value;

    //     setUser({ ...user, [name]: value });
    // }

    const PostData = async (e) => {
        e.preventDefault();

        // const { name, email, phone, password, cpassword, type, secretKey, shopID } = user;

        // const response = await fetch("/signin", {
        const response = await fetch("/sign", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, phone, password, cpassword, type, secretKey, shopID


            }),

        });

        const res = await response.json();
        console.log(response.status);

        if (response.status === 422 || !res) {
            window.alert("Invalid registration");
            console.log("Invalid registration");
        } else {
            window.alert("Registration Successfull");
            console.log("Successfull Registration");

            navigate("/Login");

        }

    };

    return (
        <>
            <section class="w3l-hotair-form">

                <div className="container">

                    <div className="workinghny-form-grid">
                        <div className="main-hotair">
                            {/* <div className="w3l_form align-self">
                                <div className="left_grid_info"> */}
                            <img src="assets/img/logo/2.png" alt="" className="img-fluid" />
                            {/* </div>
                            </div> */}
                            <div className="content-wthree">
                                <h2>Sign Up</h2>
                                <form method="POST">
                                    <input type="text" className="name" name="name" placeholder="Enter Name" required="" autofocus
                                        value={name} onChange={(e) => setName(e.target.value)}
                                    />
                                    <input type="email" className="email" name="email" placeholder="Enter Email" required="" autofocus
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <input type="number" className="phone" name="phone" placeholder="Enter Phone Number" required="" autofocus
                                        value={phone} onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <input type="password" className="password" name="password" placeholder="Enter Password" required="" autofocus
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <input type="password" className="cpassword" name="cpassword" placeholder="Enter Confirm Password" required="" autofocus
                                        value={cpassword} onChange={(e) => setCpassword(e.target.value)}
                                    />

                                    <div>
                                        Register As <br />
                                        <label htmlFor="userType">User</label>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="user"
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                        <br />


                                        <label htmlFor="admin">Admin</label>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="admin"
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                    </div>
                                    {type == "admin" ? (
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="secretKey"
                                                placeholder="Enter Secret Key"
                                                required="" autofocus
                                                value={secretKey}
                                                onChange={(e) => setSecretkey(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="shopID"
                                                placeholder="Enter Shop ID"
                                                required="" autofocus
                                                value={shopID}
                                                onChange={(e) => setShopID(e.target.value)}
                                            />
                                        </div>
                                    ) : null}
                                    <button className="btn" type="submit" onClick={PostData}>Sign In</button>
                                </form>

                                <p className="account">Already have an account? <NavLink to="/Login">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
