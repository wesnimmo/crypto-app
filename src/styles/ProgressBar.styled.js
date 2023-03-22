import styled from "styled-components";

export const VolMktBar = styled.div`
    width: 100%;
    height: .6rem;
    border-radius: 100px;
    display: flex;
    align-items: center;
`
export const InnerBar = styled.div`
    width: ${({ percent }) => percent}%;
    height: .5rem;
    border-radius: 100px;
`