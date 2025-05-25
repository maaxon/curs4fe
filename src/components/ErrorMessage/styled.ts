import styled, { css, keyframes } from "styled-components";

const showError = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-300px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ErrorMessageContainer = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 200px;
  top: 5%;
  z-index: 999;
`;

export const ErrorMessageWrapper = styled.div`
  ${({ theme: { colors } }) => css`
    color: ${colors.error};
    background-color: ${colors.errorMessageBg};
    border: 1px solid ${colors.errorMessageBorder};
    animation: ${showError} 0.8s ease-in-out;
    max-width: 450px;
    width: 350px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;

    @media (max-width: 480px) {
      font-size: 10px;
    }
  `}
`;
