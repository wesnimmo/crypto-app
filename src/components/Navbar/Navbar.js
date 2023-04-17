import React from 'react'
import axios from "axios";
import { NavContainer, Nav, Buttons, Coins, Portfolio, Forms, SearchContainer, Select } from './Navbar.styled'
import SearchIcon from '@mui/icons-material/Search';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Toggler } from 'components';


class Navbar extends React.Component {

    handleChange = (value) => {
        this.props.handleCurrency(value)
    }
        render() {
             return (
                <NavContainer>
                    <Nav>
                        <Buttons>
                            <Link to="/">
                                <Coins className="active">Coins</Coins>
                            </Link>
                           <Portfolio>Portfolio</Portfolio>
                        </Buttons>
                        <Forms>
                            <SearchContainer className="search-container">
                                 <SearchIcon />
                                {/* <input type="text" placeholder="search" name="search"/> */}
                            </SearchContainer>
                           <Select
                                onChange={(e) => this.handleChange(e.target.value)}
                            >
                                <option value="usd">USD</option>
                               {
                                    this.props.currencies.map((currency) => {
                                       return (
                                        <option key={currency} value={currency}>{currency.toUpperCase()}</option>
                                       )
                                   })
                               }
                            </Select>
                           <Toggler theme={this.props.theme} changeTheme={this.props.changeTheme}/>
                        </Forms>
                        
                    </Nav>
                </NavContainer>
            )
        }
    
}

export default Navbar
