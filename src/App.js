import React from 'react';
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Navbar} from 'components';
import {Home, Coin} from 'pages';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme, lightTheme } from './styles/globalStyles';
import { Error } from '@mui/icons-material';

const Container = styled.div`
  max-width: 1180px;
  width: 98%;
  margin: 25px auto;
  border-radius: 10px;
  border: 1px solid rgba(100,100,100, .1);
`

class App extends React.Component {

  state = {
      currencies: [],
      isLoading: false,
      currency: 'usd',
      theme: null
    }

  getCurrency = async () => {
      try{
        this.setState({isLoading: true});
        const request = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
        const symbol = request.data
        this.setState({
          isLoading: false,
          currencies: symbol
        })
      }catch(err){
        console.log(err)
      }
    }

    setTheme = (value) => {
      window.localStorage.setItem('theme', JSON.stringify(value));
      this.setState({theme: value})
    }

    changeTheme = () => {
      const change = !this.state.theme
      this.setTheme(change)
      // this.setState({theme: change})
      // window.localStorage.setItem('theme', JSON.stringify(change));
    }

  componentDidMount(){
      this.getCurrency();
      const localTheme = JSON.parse(window.localStorage.getItem('theme'));
      localTheme !== null ? this.setState({theme: localTheme}) : this.setTheme(true)

      // console.log('my theme is --->',localTheme)
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.theme !== this.state.theme && this.state.theme){
  //     this.setTheme(this.state.theme)
  //   }
  // }

  setCurrency = (value) => {
    const symbol = value;
    this.setState({currency: symbol})
  }
  
  render() {
    //console.log('New currency selection-->', this.state.currency)
    // const curr = "gbp";
    // const num = 100000000

    // const currencySetter = (currency, number) => {
    //  return Intl.NumberFormat(
    //    'en-US', 
    //    {currency: currency, style: 'currency', notation: 'compact'}
    //  ).format(number)
    // }

    // console.log(currencySetter(curr, num))

    const hasCurrencies = !this.state.isLoading && this.state.currencies.length > 0;
    
    return (

      <ThemeProvider theme={this.state.theme ? darkTheme : lightTheme}>
         <Router>
            <GlobalStyles />
            {hasCurrencies && <Navbar changeTheme={this.changeTheme} theme={this.state.theme} handleCurrency={this.setCurrency} currencies={this.state.currencies} />}
            <Container className="container">
              <Switch>
                <Route exact path="/" component={(props) => <Home {...props} currency={this.state.currency}/>} />
                <Route exact path="/coin/:coinId" component={(props) => <Coin {...props} currency={this.state.currency}/>} />
              </Switch>
            </Container>
         </Router>
      </ThemeProvider>
    );
  }
}

export default App;
