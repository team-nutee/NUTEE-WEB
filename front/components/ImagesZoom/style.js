import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed; /* Stay in place */
    z-index: 2; /* Sit on top */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,.6); /* Black w/ opacity */
    text-align: center;
    vertical-align: middle;
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 44px auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #EFFBF5;
  text-align: center;
  
  & div {
    text-align:center;
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
  color: white;
`;

export const ImgWrapper = styled.div`
  padding: 32px;
  position: relative;
  
  
  & img {
    width: 0 auto;
    height: 70vh;
    margin: auto;
    top:0; bottom:0; left:0; right:0;
  }
`;
