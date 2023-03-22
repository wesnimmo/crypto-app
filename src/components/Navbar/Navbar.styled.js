import styled from 'styled-components';


export const NavContainer = styled.div`
    margin-bottom: 30px;
`

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 2% 13%;
    border-radius: 10px;
`;

export const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 250px;
`
export const Coins = styled.button`
    width: 120px;
    height: 35px;
    border-radius: 50px;
    border: none;
    font-weight: 900;
    cursor: pointer;
`;

export const Portfolio = styled.button`
    width: 120px;
    height: 35px;
    border-radius: 50px;
    border: none;
    font-weight: 900;
    cursor: pointer;
`;

export const Forms = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SearchContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    max-width: fit-content;
    padding: 10px;
    height: 35px;
    border-radius: 999px;
    margin-right: 15px;
    input {
        border: none;
        padding: 10px;
        outline-width: 0;
        background: none;
}
`

export const Select = styled.select`
    border: none;
    width: 50px;
    border-radius: 10px; 
`