import React, { useState } from 'react'
import './Itemadd.css';
import { NavLink, useNavigate } from 'react-router-dom'

function Itemadd() {
    const navigate = useNavigate();

    const [item, setItem] = useState({
        name: "", price: "", description: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setItem({ ...item, [name]: value });
    }

    const [image, setImage] = useState("");
    // const [allImage, setAllImage] = useState("");

    // function covertToBase64(e) {
    //     console.log(e);
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => { }
    //     console.log(reader.result);
    //     //base64encoded string
    //     setImage(reader.result);
    //     reader.onerror = error => {
    //         console.log("Error: ", error);
    //     };
    // };
 
    const convertToBase64 = (e) => {
        var reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

   
    const postData = async (e) => { 
        e.preventDefault();

        const { name, price, description, base64 } = item;

        const response = await fetch("/addItem", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                
                name, price, description,base64: image
              }),

        });

        const res = await response.json();
        // console.log(response.status);

        if (response.status === 422 || !res) {
            window.alert("Invalid registration");
            console.log("Invalid registration");
        } else {
            window.alert("Registration Successfull");
            console.log("Successfull Registration");

            navigate("/Menu");

        }

    };




    // const convertToFormData = (e) => {
    //     const formData = new FormData();
    //     formData.append("name", item.name);
    //     formData.append("price", item.price);
    //     formData.append("description", item.description);
    //     formData.append("image", e.target.files[0]);
    //     setImage(formData);
    // };

    // const postData = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch("/addItem", {
    //             method: "POST",
    //             body: image,
    //         });

    //         const res = await response.json();

    //         if (response.status === 422 || !res) {
    //             window.alert("Invalid registration");
    //             console.log("Invalid registration");
    //         } else {
    //             window.alert("Registration Successful");
    //             console.log("Successful Registration");
    //             navigate("/Menu");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };


    // function uploadImage() {
    //     fetch("/upload-image", {
    //         method: "POST",
    //         crossDomain: true,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             base64: image
    //         }).then((res) => res.json()).then((data) => console.log(data))
    //     })
    // }
   

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
                                <h2>ItemAdd</h2>
                                <form method="POST">
                                    <input type="text" className="name" name="name" placeholder="Enter Name" required="" autofocus
                                        value={item.name} 
                                        onChange={handleInputs}
                                    />
                                    <input type="number" className="email" name="price" placeholder="Enter price" required="" autofocus
                                        value={item.price} 
                                        onChange={handleInputs}
                                    />

                                    <input type="text" className="phone" name="description" placeholder="Enter description" required="" autofocus
                                        value={item.description}
                                        onChange={handleInputs} 
                                    />
                                    {/* <input type="password" className="password" name="password" placeholder="Enter Password" required="" autofocus
                                                value={user.password} onChange={handleInputs}
                                            />
                                            <input type="password" className="cpassword" name="cpassword" placeholder="Enter Confirm Password" required="" autofocus
                                                value={user.cpassword} onChange={handleInputs}
                                            /> */}
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={convertToBase64}
                                    />
                                     {/* {image ? <img width={100} height={100} src={URL.createObjectURL(image.get("image"))} alt="Preview" /> : ""} */}

                                    {image == "" || image == null ? "" : <img width={100} height={100} src={image} />}
                                    {/* <button onClick={uploadImage}> Upload</button> */}
                                    <button className="btn" type="submit" onClick={ postData}>Log In</button>
                                </form>

                                <p className="account">Already have an account? <NavLink to="/Menu">Menu</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Itemadd;
