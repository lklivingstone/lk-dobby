import { logOut } from "../Redux/UserRedux";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { useState, useEffect } from "react";
import axios from 'axios';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { changeSearchQuery } from "../Redux/UserRedux";
import { Grid, Container } from "@mui/material";
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';

export const Gallery = () => {
    const token = useSelector((state) => state.user.token);
    const userID = useSelector((state) => state.user.user._id);
    const searchQuery=  useSelector((state) => state.user.searchQuery);
    const dispatch= useDispatch()

    // console.log(token, userID, searchQuery)
    const [imageList, setImageList]= useState([]);
    const [filteredImages, setFilteredImages]= useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchValue, setSearchValue]= useState("");
 

    useEffect(() => {
        const getImages= async () => {
            try{
                const config = {
                    headers: {
                      'token': `Bearer ${token}`
                    }
                };
                const res= await axios.get(`http://localhost:5001/api/image/find/${userID}`, config)
                
                setImageList(res.data)
            } catch(error) {
                if (error.response["status"] === 403 || error.response["status"] === 401) {
                    dispatch(logOut())
                }
            }
        }
        getImages();
    }, [])
    
    useEffect(() => {
        const setImages= async () => {
            setFilteredImages(imageList)
        }
        setImages();
    }, [imageList])




    const handleSearchInput= (data) => {
        setSearchValue(data)
        setSearchInput(data)
    }
  

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchClick = (e) => {
        if (!isSearchOpen) {
            setIsSearchOpen(true);
        }
        else {

            const query = searchInput?.toLowerCase();
            console.log(1, query)

            const regex = new RegExp(query, 'i');
            const filtered = imageList.filter((image) => regex.test(image.name?.toLowerCase()));
            console.log(filtered)
            setFilteredImages(filtered);
        }
    };

    const handleResetClick = async (e) => {
        handleSearchInput("")
        handleSearchClick(e);
        setFilteredImages(imageList)
      };

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleSearchClick(e)
        }
    };


    const renderImages= filteredImages.map((image) => (
        <Card key={image._id} sx={{ maxWidth: "80%", margin: "30px" }}>
        <CardHeader
            title= {image.name}
        />
        <CardMedia
            component="img"
            image={image.url}
            alt="img"
        />
        </Card>


    ));


    return (
        <>
        <nav className='navbar' style={{ display: "flex", padding: "20px"}}>
            <div style={{display: "flex", flex: 1, justifyContent: "flex-start", padding: "10px 40px"}}>
                <h1 style={{backgroundColor: "rgb(48, 48, 48)", color: "#ffe5ec"}}>dobby-ads.</h1>
            </div>
            <div style={{display: "flex", flex: 1, justifyContent: "flex-end", padding: "10px 40px", alignItems: "center"}}>
                
                <IconButton type="button" aria-label="search">
                    <SearchIcon 
                    className="search-icon" 
                    onClick={(e)=>handleSearchClick(e)}
                    onKeyDown={handleKeyDown}
                    />
                </IconButton>

                <div className={`search-bar ${isSearchOpen ? 'open' : ''}`}>
                <InputBase
                    sx={{ ml: 1, flex: 1, variant:"outlined", }}
                    placeholder="type and enter..."
                    value={searchValue}
                    onChange={(e)=>handleSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                </div>
                
            </div>
            <div className="border"></div>
        </nav>   
        {searchInput!=="" && <h3 
        className="reset-text"
        onClick={handleResetClick} style={{padding: "30px 30px 0px 0px", display: "flex", flexDirection: "column", alignItems: "flex-end"}}>RESET</h3>}
        <div style={{ marginTop:"30px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            {renderImages}
            {filteredImages.length===0 && <h2>No images found...</h2>}
        </div> 
        
        <div
            className="logout-text"
            style={{
                display: "flex",
                bottom: "100px",
                left: "0px",
                color: "rgb(48, 48, 48)",
                textDecoration: "none",
                
            }}
        >
            
        <a 
        href="/logout"
        style={{
            color: "rgb(48, 48, 48)",
            textDecoration: "none",
            paddingRight: "20px"
        }}
        >
            <p>
            LOGOUT    
            </p>
        </a> 

        <a 
        href="/"
        style={{
            color: "rgb(48, 48, 48)",
            textDecoration: "none",
        }}
        >
            <p>
            HOME    
            </p>
            
        </a>
        </div> 
        </>
    )
}
