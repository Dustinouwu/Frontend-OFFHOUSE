import React, { useState, useRef, useEffect } from 'react';
import './Search.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import MoonLoader from 'react-spinners/MoonLoader';
import useDebounceHook from '../../hooks/debounceHook';
import axios from 'axios';
import TvShow from '../tvShow/tvShow';
import { useNavigate } from 'react-router-dom';


const SearchBarContainer = styled(motion.div)`
    display: flex;
    width: 40%;
    flex-direction: column;
    background-color: #D39C49;
    border-radius: 10px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
    position: absolute;
    z-index: 999;
    overflow: hidden;
    &::-webkit-scrollbar {
        width:0;
    }
    @media only screen and (min-width: 768px) {
        width: 40%; /* solo se aplica en pantallas mayores a 768px*/
      }
      @media (max-width: 900px) {
        width: 55%;
    }
    @media (max-width: 650px) {
        width: 60%;
    }

`;

const SearchInputContainer = styled.div`
    width: 95%;
    min-height: 1.5em;
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 10px;
    
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 15px;
    color: #12112e;
    border-radius: 6px;
    font-weight: 500;
    background-color: transparent;

    &:focus {
        outline: none;

        &::placeholder {
            opacity: 0;
    },

    &::placeholder {
        color: gray;
        transition: all 250ms ease-in-out;  
    },
    &::-webkit-scrollbar {
        width:0;
    }
`;

const SearchIconContainer = styled.span`
    color: #000;
    font-size: 27px;
    margin-right: 10px;
    margin-top: 6px;
    vertical-align: middle;
`;

const CloseIconContainer = styled(motion.span)`
    color: #000;
    font-size: 23px;
    vertical-align: middle;
    trasition: all 200ms ease-in-out;
    margin-left: 60px;
    cursor: pointer;
    &:hover {
        color: #dfdfdf;
    }

`;

const LineSeparator = styled.div`
    display: flex;
    min-width: 100%;
    min-height: 1px;
    background-color: #dfdfdf;
`;

const SearchContent = styled.div`
    widht: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 1em;
    cursor: pointer;

    &::-webkit-scrollbar {
        width:0;
    }
`;

const LoadginWrapper = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;

`;
const containerVariants = {
    expanded: {
        height: '25em',
    },
    collapsed: {
        height: '3em',
    }
}


function Search(props) {

    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef();
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tvShows, setTvShows] = useState([])
    const [product, setProduct] = useState([])
    const token = localStorage.getItem('token');
    const navigate = useNavigate();



    const expandContainer = () => {
        setIsExpanded(!isExpanded);
    }

    const collapseContainer = () => {
        setIsExpanded(false);
        setSearchQuery("");
        setIsLoading(false);
        setProduct([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const prepareSearchQuery = () => {
        const url = `https://offhouse.herokuapp.com/api/search?title=${searchQuery}`;
        return encodeURI(url);
    }

    const searchTvShow = async () => {
        if (!searchQuery || searchQuery.trim() === "") {
            return;
        }

        setIsLoading(true);
        const URL = prepareSearchQuery(searchQuery);

        const response = await axios.get(URL, { headers: { 'accept': 'application/json', 'authorization': token } }).catch((err) => {
            console.log("Err: ", err);
        });

        if (response) {
            console.log("response: ", response.data.data.product);
            setProduct(response.data.data.product);
        }
        setIsLoading(false);
        setIsLoading(false);
    }


    const changeHandler = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    const isEmpty = !product || product.length === 0;

    useDebounceHook(searchQuery, 500, searchTvShow);

    return (
        <SearchBarContainer
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
        >
            <SearchInputContainer>
                <SearchIconContainer>
                    <SearchIcon />
                </SearchIconContainer>
                <SearchInput
                    placeholder='Search'
                    onFocus={expandContainer}
                    ref={inputRef}
                    value={searchQuery}
                    onChange={changeHandler}
                ></SearchInput>
                <AnimatePresence>
                    {isExpanded && (
                        <CloseIconContainer
                            key="close-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={collapseContainer}
                            transition={{ duration: 0.2 }}
                        >
                            <CloseIcon />
                        </CloseIconContainer>
                    )}
                </AnimatePresence>
            </SearchInputContainer>
            {isExpanded && <LineSeparator />}
            {isExpanded && <SearchContent>
                {isLoading && (
                    <LoadginWrapper>
                        <MoonLoader color={'#000'} loading={true} size={25} />
                    </LoadginWrapper>
                )}
                {!isLoading && !isEmpty && <>
                    {product.map((product) => (
                        <TvShow
                            rute={() => {
                                navigate(`/viewproduct/${product.id}`)
                                collapseContainer()
                                window.location.reload()
                            }}
                            key={product.id}
                            thumbanilSrc={product.image}
                            name={product.title}
                            rating={product.price}
                        />


                    ))}
                </>}
            </SearchContent>
            }
        </SearchBarContainer>
    )
}

export default Search