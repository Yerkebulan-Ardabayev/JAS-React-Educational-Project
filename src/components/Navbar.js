import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from "react";
import { Auth } from "../context/Auth";
import styled from '@emotion/styled';
import { getEstroiData } from '../fetchers/e-stroi';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ListItem = styled.p`
    background-color: white;
    padding: 3px 89px 3px 14px;
    margin: 0;
    border: 1px solid #f5f5f5;
    &:hover {
        background: blue;
        color: white;
        cursor: pointer;
    }
    
    ${({ active }) => active && ({
        background: 'blue',
        color: 'white',
    })}
`
const CatalogList = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
    text-align: center;
    
    z-index: 1;`

const CatalogItem = styled("div")`
    display: block;
   
    color: black;`

export const Navbar = () => {
    const navigate = useNavigate()
    const { token } = useContext(Auth)
    const [expand, setExpand] = useState(false);
    const [catalogItems, setCatalogItems] = useState([]);
    const [selectedFirstLevelItem, setSelectedFirstLevelItem] = useState();

    useEffect(() => {
        getEstroiData().then(data => {
            setCatalogItems(data)
        })
    }, [])

    const handleMouseEnter = () => {
        setExpand(true);
    }

    const handleMouseLeave = () => {
        setExpand(false);
    }

    return (
        <AppBar position="relative">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Button
                            onClick={() => navigate('/movies')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Movies
                        </Button>
                        <Button
                            onClick={() => navigate('/cinema')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            The Breaking Bad
                        </Button>
                        <div style={{
                            display: 'flex',
                            position: 'relative',
                        }}>
                            <Button
                                endIcon={<KeyboardArrowDownIcon
                                    sx={{display: 'flex' }} />}
                                onClick={handleMouseEnter}
                                sx={{ color: 'white', display: 'flex' }}
                            >
                                Каталог
                            </Button>
                            <div className='CatalogItem'
                                onMouseLeave={handleMouseLeave}>
                                <CatalogList>
                                    {expand && catalogItems.map((item) => (
                                        <ListItem
                                            onClick={() => setSelectedFirstLevelItem(item)}
                                            active={item === selectedFirstLevelItem}
                                        >
                                            {item.name}
                                        </ListItem>
                                    ))
                                    }
                                </CatalogList>
                                {expand && selectedFirstLevelItem &&
                                    <CatalogItem onMouseEnter={handleMouseEnter}>
                                    {selectedFirstLevelItem.childCategories.map((item, index) => (
                                        <ListItem>
                                            {item.name}
                                        </ListItem>
                                    ))}
                                    </CatalogItem>}
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate('/shop')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Shop
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {token ? (
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                        ) : (
                        <Button
                            onClick={() => navigate('/login')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Login
                        </Button>
                        )}
                        <Button
                            onClick={() => navigate('/signup')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
