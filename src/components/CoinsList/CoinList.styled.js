import styled from 'styled-components';


export const Table = styled.table`
    width: 90%;
    border-radius: 10px;
    margin: 0 auto;
    border-collapse: collapse;
`
export const Row = styled.tr`
    border-bottom: 1px solid rgba(255,255,255,.5);
`
export const Heading = styled.th`
    padding: 15px;
    font-weight: 700;
    font-size: 12px;
    &:nth-child(2) {
        text-align: left;
    }
    
`

