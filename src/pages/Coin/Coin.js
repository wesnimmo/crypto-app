import React, { Component } from 'react';
import currencySetter from '../../utilities/currencySetter';
import abbrCurrencySetter from '../../utilities/abbrCurrencySetter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { 
    DescTopContainer,
    DescTopLt,
    DescTopLtUpper,
    DescTopLtLower,
    DescTopCtr,
    Price,
    AllTimeHigh,
    AllTimeLow,
    DescTopRt,
    DescBtmContainer,
    Desc,
    DescLinks,
    ChartContainer,
    CurrencyConverterContainer,
    CurrencyConverter
} from './Coin.styled'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import DOMPurify from 'dompurify'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinkIcon from '@mui/icons-material/Link';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



class Coin extends Component {

    state = {
        coin: null,
        isLoading: false,
        hasError: false,
        clipboard: null,
        placeholderCurrency: '',
        priceInputValue: null
    }

    input = React.createRef();

    getCoin = async (coinId) => {
        try{
            this.setState({isLoading: true});
            const {data} = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coinId}`
            )
            const newObj = data;

            this.setState({
                coin: newObj,
                isLoading: false,
                placeholderCurrency: currencySetter(newObj?.market_data.current_price[this.props.currency], this.props.currency),
                priceInputValue: currencySetter(newObj?.market_data.current_price[this.props.currency], this.props.currency),
            })
        }catch (err) {
            console.log(err)
        }
    }

    handleInput(value) {
      //const value = e.target.value;
      const formattedValue = parseFloat(value).toFixed(2);
     const price = currencySetter(formattedValue, this.props.currency);
      this.setState({ priceInputValue: price });
    }

    // handleFocus(e) {
    //     this.setState({  priceInputValue: e.target.value });
    //   }

    componentDidMount(){
        this.getCoin(this.props.match.params.coinId)
    }

    render() {

        console.log('Here is the Current PRICE BABY from Coin.js--->', this.state.placeholderCurrency)

        const coinData = this.state.coin
        const hasCoin = !this.state.isLoading && this.state.coin;

        //MIDDLE COLUMN DATA
        const price = currencySetter(coinData?.market_data.current_price[this.props.currency], this.props.currency);
        const price_change_percentage = coinData?.market_data?.price_change_percentage_1h_in_currency[this.props.currency]
        const profit_1h = coinData?.market_data?.price_change_percentage_1h_in_currency[this.props.currency] > 0;
        const loss_1h = coinData?.market_data?.price_change_percentage_1h_in_currency[this.props.currency] < 0;
        const all_time_high = currencySetter(coinData?.market_data?.ath[this.props.currency], this.props.currency);
        const all_time_low = currencySetter(coinData?.market_data?.atl[this.props.currency], this.props.currency);

        //RIGHT COLUMN DATA
         const market_cap = abbrCurrencySetter(coinData?.market_data?.market_cap[this.props.currency], this.props.currency);
         const fully_diluted_valuation = abbrCurrencySetter(coinData?.market_data?.fully_diluted_valuation[this.props.currency], this.props.currency);
         const total_volume = abbrCurrencySetter(coinData?.market_data?.total_volume[this.props.currency], this.props.currency);
         const circulating_supply = coinData?.market_data?.circulating_supply.toLocaleString();
         const max_supply = coinData?.market_data?.max_supply?.toLocaleString();

         //INPUT FIELDS PLACEHOLDER & VALUE
         const placeholderCurrency = this.state?.placeholderCurrency;
        const priceInputValue = this.state?.priceInputValue;
        
        return (
           <>
           {hasCoin && (
             <div>
                 <DescTopContainer>
                    <DescTopLt className="secondary-background">
                        <DescTopLtUpper>
                            <img style={{marginRight: "10px"}} src={coinData.image.small} alt="" />
                            <p>{coinData.name} <span>({coinData.symbol.toUpperCase()})</span></p>
                        </DescTopLtUpper>
                        <DescTopLtLower>
                            <p>{coinData.links.homepage[0].replace(/^https?:\/\//, '')}</p>
                        </DescTopLtLower>
                    </DescTopLt>

                    <DescTopCtr className="secondary-background">
                       <div>
                         <Price profit={price_change_percentage}>
                            <h2>{price}</h2>
                            <p>{profit_1h && <ArrowDropUpIcon/> || loss_1h && <ArrowDropDownIcon/>}</p>
                            <p>{price_change_percentage.toFixed(2)}%</p>
                        </Price>
                        <AllTimeHigh>
                            <ArrowDropUpIcon style={{color: "green"}}/>
                            <p>All Time High: {all_time_high}</p>
                        </AllTimeHigh>
                        <AllTimeLow>
                            <ArrowDropDownIcon style={{color: "red"}}/>
                            <p>All Time Low: {all_time_low}</p>
                        </AllTimeLow>
                       </div>
                    </DescTopCtr>
                   
                   
                    <DescTopRt className="secondary-background">
                        <p><span style={{fontWeight: 800}}>Market Cap:</span> {market_cap}</p>
                        <p><span style={{fontWeight: 800}}>FullyDiluted Valuation:</span> {fully_diluted_valuation}</p>
                        <p><span style={{fontWeight: 800}}>Total Volume:</span> {total_volume} </p>
                        <p><span style={{fontWeight: 800}}>Circulating Supply:</span> {circulating_supply}</p>
                        <p><span style={{fontWeight: 800}}>Max Supply:</span> {max_supply ? max_supply : 'NA'}</p>
                    </DescTopRt>
                </DescTopContainer>

                 <DescBtmContainer className="light-text">
                    <Desc className="secondary-background">
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coinData.description.en)

                        }}>
                        </p>
                    </Desc>
                    <DescLinks>
                        <div className="secondary-background">
                            <a href={coinData.links.blockchain_site[0]} target="_blank"><LinkIcon/></a>
                            {coinData.links.blockchain_site[0].replace(/^https?:\/\//, '')}
                            <CopyToClipboard text={coinData.links.blockchain_site[0]}>
                                 <ContentCopyIcon />
                            </CopyToClipboard>
                           
                        </div>
                        <div className="secondary-background">
                            <a href={coinData.links.blockchain_site[1]} target="_blank"><LinkIcon/></a>
                            {coinData.links.blockchain_site[1].replace(/^https?:\/\//, '')}
                             <CopyToClipboard text={coinData.links.blockchain_site[1]}>
                                 <ContentCopyIcon />
                            </CopyToClipboard>
                        </div>
                        <div className="secondary-background">
                            <a href={coinData.links.blockchain_site[2]} target="_blank"><LinkIcon/></a>
                            {coinData.links.blockchain_site[2].replace(/^https?:\/\//, '')}
                             <CopyToClipboard text={coinData.links.blockchain_site[2]}>
                                 <ContentCopyIcon />
                            </CopyToClipboard>
                        </div>
                    </DescLinks>
                </DescBtmContainer>
             
                <ChartContainer className="coin-page-chart">
                    
                    <CurrencyConverterContainer>
                        <CurrencyConverter>
                            <p>{this.props.currency.toUpperCase()}</p>
                            <input 
                                placeholder={placeholderCurrency} 
                                /*pattern="^[0-9]+([.][0-9]+)?$"*/
                                type="text" 
                                className="currency-converter-input"
                                onChange={(e) => this.handleInput(Math.abs(e.target.value.replace(/\D/g, '')))}
                                /*value={priceInputValue}*/
                                /* onFocus={(e) => this.handleInput(e)} */
                                
                            />
                        </CurrencyConverter>
                        <SyncAltIcon />
                         <CurrencyConverter>
                            <p>BTC</p>
                            <input value="1" type="text" className="currency-converter-input" />
                        </CurrencyConverter>
                    </CurrencyConverterContainer>
                    
                </ChartContainer>
             </div>
           )}
           </>
        )
    }
}

export default Coin

