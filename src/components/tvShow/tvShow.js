import styled from '@emotion/styled';
import React from 'react';

const TvshowContainer = styled.div`
    width: 100%;
    min-height: 6em;
    display: flex;
    border-bottom: 2px solid #d8d8d852;
    padding: 6px 8px;
    align-items: center;
`;

const Thumbnail = styled.img`
    width: auto;
    height: 100%;
    display: flex;
    flex: 0.3;
    img {
    width: auto;
    height: 100%;
    }
`;

const Name = styled.h3`
    font-size: 15px;
    color: #000;
    margin-left: 10px;
    flex: 2;
    display: flex;
    justify-content: flex-start;
`;

const Rating = styled.span`
    color: #000;
    font-size: 16px;
    display: flex;
    flex: 0.5;
`;
function TvShow(props) {

    const { thumbanilSrc, name, rating } = props;
    return (
        <TvshowContainer>
            <Thumbnail
                src={thumbanilSrc}
            />
            <Name>{name}</Name>
            {rating &&
                <Rating>{rating}</Rating>
            }
        </TvshowContainer>
    )
}

export default TvShow