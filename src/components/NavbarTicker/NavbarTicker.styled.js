import styled from 'styled-components';

export const Ticker = styled.div`
    height: 30px;
    width: 650px;
    padding: 0 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: .75em;
`

export const TickerData = styled.p`
    display: flex;
    align-items: center;
`

export const MarketCap = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export const MarketChange = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({profit}) => profit < 0 ? '#f80000' : '#00bb00'};
`

export const ProgressCircle = styled.span`
    width: .5rem;
    height: .5rem;
    margin: 0 .2rem;
    display: inline-block;
    border-radius: 100px;
`
