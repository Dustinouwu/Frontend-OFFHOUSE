import React from "react";
import "./index.css";

const Search = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"

                />
            </div>

            <div className="userChat" >
           {/*  <img src='https://danzeria.com/wp-content/uploads/2014/09/Daft-Punk2-600x271.jpg' alt='user' /> */}
               {/*  <div className="userChatInfo">
                    <span></span>
                </div> */}
            </div>

        </div>
    );
}

export default Search;