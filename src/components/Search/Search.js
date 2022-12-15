import React, { useState, useRef } from 'react';
import './Search.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import MoonLoader from 'react-spinners/MoonLoader';
import useDebounceHook from '../../hooks/debounceHook';
import axios from 'axios';
import TvShow from '../tvShow/tvShow';


const SearchBarContainer = styled(motion.div)`
    display: flex;
    width: 40%;
    flex-direction: column;
    position: absolute;
    background-color: #D39C49;
    border-radius: 25px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);

    overflow: hidden;
    &::-webkit-scrollbar {
        width:0;
    }
    
`;

const SearchInputContainer = styled.div`
    width: 95%;
    min-height: 1.5em;
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 15px;
    
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
    margin-left: 40px;
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


    const expandContainer = () => {
        setIsExpanded(!isExpanded);
    }

    const collapseContainer = () => {
        setIsExpanded(false);
        setSearchQuery("");
        setIsLoading(false);
        setTvShows([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const prepareSearchQuery = () => {
        const url = `https://api.tvmaze.com/search/shows?q=${searchQuery}`;
        return encodeURI(url);
    }

    const searchTvShow = async () => {
        if (!searchQuery || searchQuery.trim() === "") {
            return;
        }

        setIsLoading(true);
        const URL = prepareSearchQuery(searchQuery);

        const response = await axios.get(URL).catch((err) => {
            console.log("Err: ", err);
        });

        if (response) {
            console.log("response: ", response.data);
            setTvShows(response.data);
        }
        setIsLoading(false);
    }


    const changeHandler = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    const isEmpty = !tvShows || tvShows.length === 0;

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
                    {tvShows.map((tvShow) => (
                        <TvShow
                            key={tvShow.show.id}
                            thumbanilSrc={tvShow.show.image.medium}
                            name={tvShow.show.name}
                            rating={tvShow.show.rating.average}
                        />
                    ))}
                </>}
            </SearchContent>
            }
        </SearchBarContainer>
    )
}

export default Search