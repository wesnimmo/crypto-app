import styled from 'styled-components';


export const ImageSymbol = styled.p`
    /* display: flex;
    align-items: center; */
`
export const TR = styled.tr`
   
`
export const TD = styled.td`
    padding: 15px;
    font-weight: 500;
    font-size: 11px;
    padding: 30px 10px;
    border-bottom: .1px solid rgba(255,255,255,.3);
    &:nth-child(2) {
        display: flex;
    }
    &:nth-child(7) > div{
        display: flex;
        justify-content: space-between;
        margin: 1px 0;
    }
    &:nth-child(8) > div{
      display: flex;
        justify-content: space-between;
        margin: 1px 0;
    }
`

// export const CirculatingSupply = styled.td`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// `

export const Image = styled.img`
    height: 30px;
    margin-right: 8px;
    width: 30px;
`

export const PercentChange = styled.p`
    display: flex;
    color: ${({price}) => price < 0 ? '#f80000' : '#00bb00'};
    align-items: center;
`

export const ProgressCircle = styled.span`
    width: .5rem;
    height: .5rem;
    margin-right: .2rem;
    display: inline-block;
    border-radius: 100px;
`

export const LineContainer = styled.div`
    width: 216px;
    height: 33px;
`


