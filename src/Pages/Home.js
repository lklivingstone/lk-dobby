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
            
            const response = await axios.post('https://lk-dobby.onrender.com/api/upload', formData, config);

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

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleSubmit(e)
        }
    };
    

    return (
    <>
        <Navbar />
        <div className= "container">
            <div className='flex-6'>
                <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
                />
                    <button 
                    className="upload-icon" 
                    onClick={handleButtonClick}>
                        {
                        !image ? <FileUploadOutlinedIcon fontSize="large"  /> : 
                        <CloudDoneOutlinedIcon fontSize="large" /> 
                        }
                    </button>
                <input 
                className="upload-input" 
                type="text" 
                value={imageName} 
                onChange={(e)=>handleNameChange(e.target.value)} 
                onKeyDown={handleKeyDown}/>
                    <button 
                    className="upload-button" 
                    onClick={(e)=>handleSubmit(e)} 
                    onKeyDown={handleKeyDown}>
                        UPLOAD
                    </button>
                    {response && 
                    <div
                    className={response=="Success" ? "upload-success" : "upload-failure" }>
                        <p>{response}</p>
                    </div>}
                </div>
            <div className='vertical-line'></div>
            <div className='flex-4'>
                <div 
                className="gallery-div"
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
            }
        }}
        >
            LOGOUT
        </a>
    </>
  );
}

export default Home;
