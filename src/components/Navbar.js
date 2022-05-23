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
import { useContext, useState } from "react";
import { Auth } from "../context/Auth";
import styled from '@emotion/styled';

export const Navbar = () => {
    const navigate = useNavigate()
    const { token } = useContext(Auth)
    const [expand, setExpand] = useState(false);
    const [subList, setSubList] = useState(false);

    const handleMouseEnter = () => {
        setExpand(true);
    }

    const handleMouseLeave = () => {
        setExpand(false);
        setSubList(false);
    }

    const firstLevelList = ['Movies', 'RickAndMorty', 'Cinema', 'Catalog'];
    const secondLevelList = ['SignIn', 'Counter', 'Todo', 'BreakingBad'];

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
                            onClick={() => navigate('/RickAndMorty')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Rick & Morty
                        </Button>
                        <Button
                            onClick={() => navigate('/counter')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Counter
                        </Button>
                        <Button
                            onClick={() => navigate('/todo')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            ToDo
                        </Button>
                        <Button
                            onClick={() => navigate('/cinema')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            The Breaking Bad
                        </Button>
                        <div style={{
                            display: 'flex',
                            position:'relative',
                        }}>
                            <Button
                                onClick={handleMouseEnter}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Каталог
                            </Button>
                            <div style={{
                                display: 'flex',
                                position: 'absolute',
                                top: '70px',
                            }}>
                                <CatalogList onMouseLeave={handleMouseLeave}>
                                    {expand && firstLevelList.map((item, index) => (
                                        <p onMouseEnter={() => {
                                            setSubList(true);
                                        }} style={{
                                            backgroundColor: 'white',
                                            margin: '0px',
                                            padding: '20px',
                                        }}>
                                            {item}
                                        </p>
                                    ))
                                    }
                                </CatalogList>
                                <CatalogItem onMouseEnter={handleMouseEnter}>
                                    {subList && secondLevelList.map((item, index) => (
                                        <p style={{
                                            backgroundColor: 'white',
                                            margin: '0px',
                                            padding: '20px',
                                        }}>
                                            {item}
                                        </p>
                                    ))}
                                </CatalogItem>
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
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Button
                                onClick={() => navigate('/signin')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Sign In
                            </Button>
                        )}
                        <Button
                            onClick={() => navigate('/registration')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Registration
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
