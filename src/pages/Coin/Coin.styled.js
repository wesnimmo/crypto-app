import styled from 'styled-components';

export const DescTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 25px;
    padding: 1% 5%;
`;

export const DescTopLt = styled.div`
    flex-basis: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const DescTopLtUpper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`;

export const DescTopLtLower = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
`;

export const DescTopCtr = styled.div`
    flex-basis: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Price = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    p {
        display: flex;
        font-weight: 500;
        align-items: center;
        color: ${({profit}) => profit < 0 ? '#f80000' : '#00bb00'};
    }
`
export const AllTimeHigh = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
export const AllTimeLow = styled.div`
    display: flex;
`;

export const DescTopRt = styled.div`
    box-sizing: border-box;
    flex-basis: 40%;
    padding: 20px;
    font-size: .75em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;  
`;

export const DescBtmContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1% 5%;
`;
export const Desc = styled.div`
    padding: 10px 25px;
    margin-bottom: 20px;
`;

export const DescLinks = styled.div`
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    div {
        overflow: hidden;
        width: 30%;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
    }
`;

export const ChartContainer = styled.div`
    margin: 50px 0;
    padding: 10px 25px;
`

export const CurrencyConverterContainer = styled.div`
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

export const CurrencyConverter = styled.div`
    display: flex;
    justify-content: space-around;

    & p {
        padding: 10px;
        background-color: #06D554; 
        border-radius: 10px 0 0 10px;
    }

    & input {
        border:none;
        width: 100%;
        padding: 10px;
        border-radius: 0 10px 10px 0;
    }

    & input:focus{
        outline:none;
    }

    & div:focus-within {
        outline: #06D554 1px solid;
        outline-offset: 2px;
    }
`

