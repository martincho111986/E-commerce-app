import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
      props.primary &&
      css`
        background: #31455b;
      `}
    ${(props) =>
      props.secondary &&
      css`
        background: blue;
      `}
    ${(props) =>
      props.danger &&
      css`
        background: #f40105;
      `}

    ${(props) =>
      props.large &&
      css`
        width: 135px;
        border-radius: 10px;
      `}
    ${(props) =>
      props.medium &&
      css`
        width: 100px;
        border-radius: 10px;
      `}
    ${(props) =>
      props.small &&
      css`
        width: 40px;
        border-radius: 10px;
      `}
`;

export default EasyButton;
