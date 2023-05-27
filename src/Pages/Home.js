import './Home.css';
import { logOut } from "../Redux/UserRedux";
import Navbar from "../Components/Navbar";
import React, { useRef, useState  } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import galleryImage from '../Assets/gallery.png';

const Home = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch= useDispatch()

    const navigate= useNavigate()
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const [ response, setResponse ]= useState("")

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    
    const handleNameChange = (e) => {
        setImageName(e);
    };
    const fileInputRef = useRef(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        // Handle the selected file here
        setImage(file)
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', image);
        formData.append('imageName', imageName);
        setResponse("Uploading...");
        try {
            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'token': `Bearer ${token}`
                }
            };
            
            const response = await axios.post('http://localhost:5001/api/upload', formData, config);

            setResponse("Success");
            setTimeout(() => {
            setResponse("");
            }, 5000);

            setImage(null)
            setImageName('')
            
        } catch (error) {
            console.log(error)
            setResponse(error.response["data"]);
            setTimeout(() => {
                setResponse("");
            }, 5000);

            setImage(null)
            setImageName('')

            if (error.response["status"] === 403 || error.response["status"] === 401) {
                dispatch(logOut())
            }
            
        }
        setImage(null)
        setImageName('')
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    

    return (
    <>
        <Navbar />
        <div style={{display: "flex", width: "100%", height: "80vh", padding: "20px"}}>
            <div style={{display: "flex", flex: 6, height: "100%", width: "100%", justifyContent:"center",  alignItems: "center", flexDirection: "column"}}>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                />
                <button className="upload-icon" style={{}} onClick={handleButtonClick}>
                    {!image ? <FileUploadOutlinedIcon fontSize="large"  /> : 
                    <CloudDoneOutlinedIcon fontSize="large" /> 
                    }
                </button>
                <input className="upload-input" type="text"  value={imageName} onChange={(e)=>handleNameChange(e.target.value)} />
                <button className="upload-icon" style={{ width:"100px", height: "40px", marginTop: "0px", border: "0", backgroundColor: "rgb(48, 48, 48)", color: "#edf5e1", fontFamily: 'Reem Kufi Fun',
                }} onClick={(e)=>handleSubmit(e)}>UPLOAD</button>
                
                {response && <div
                className={response=="Success" ? "upload-success" : "upload-failure" }
                style={{
                    paddingTop: "10px"
                }}>
                    <p>{response}</p>
                </div>}
            </div>
            <div style={{width:"1px", backgroundColor: "rgb(48, 48, 48)", height: "80%" }}></div>
            <div style={{flex: 4, display: "flex", justifyContent:"center"}}>
                <div 
                className="gallery-div"
                style={{
                    width: "80%",
                    height: "80%", display: "flex", justifyContent:"center",  alignItems: "center", flexDirection: "column", position: "relative"
                }}
                onClick={()=>{navigate("/gallery")}}
                >
                    <img className="gallery-image" src={galleryImage} alt="My Image" />
                    <p className="gallery-text">GALLERY</p>
                </div>
            </div>
        </div>
        <a 
        href="/logout"
        className="logout-text"
        style={{
            bottom: "50px",
            color: "rgb(48, 48, 48)",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "none",
                cursor: "pointer"
                // backgroundColor: Colors.light_gray
            }
        }}
        
        onClick={(e)=> {

        }}
        >
            LOGOUT
        </a>
    </>
  );
}

export default Home;
