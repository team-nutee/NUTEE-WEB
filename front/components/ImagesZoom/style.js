import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,.6);
  item-align: center;
  vertical-align: middle;
`;

export const ImagesContent = styled.div`
  background-color: #EFFBF5;
  margin: 15vh auto;
  border: 1px solid #888;
  width: 80%; 
  max-width: 750px;
  height: auto;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  & div {
    text-align:center;
  } 
`;

export const ImgWrapper = styled.div`
  margin-top: 30px;
  position: relative;
  item-align: center;
  & img {
    width: 70%;
    height: 70%;
    max-width: 750px;
    max-height: 500px;
    margin: auto;
    top:0; bottom:0; left:0; right:0;
  } 
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  font-size: 20px;
  line-height: 14px;
  cursor: pointer;
  color: white;
`;

export const Indicator = styled.div`
  margin-top: 10px;
  margin-bottom: -20px;
  item-align: center;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;
