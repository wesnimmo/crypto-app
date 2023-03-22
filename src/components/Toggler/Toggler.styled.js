import styled from 'styled-components'

export const ToggleContainer = styled.div`
    position: relative;
    top: 20%;
    left: 5%;
    width: 40px;
    height: 20px;
    border-radius: 160px;
    cursor: pointer;
    span {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        border-radius: 100px;
        transform: scale(.9);
        transition: .2s;
    }
`