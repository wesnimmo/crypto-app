import React from 'react'
import axios from 'axios'
import { Ticker, TickerData, MarketCap, MarketChange } from './NavbarTicker.styled'
import abbrCurrencySetter from '../../utilities/abbrCurrencySetter';
import { ProgressCircle } from './NavbarTicker.styled';
import { VolMktBar, InnerBar } from '../../styles/ProgressBar.styled';
import BTC_PNG from "../../assets/bitcoin.png"
import ETH_PNG from "../../assets/eth.png"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


class NavbarTicker extends React.Component {


    state = {
        marketData: null,
        isLoading: false
    }

    getMarketData = async () => {
      try{
        this.setState({isLoading: true});
        const {data} = await axios.get('https://api.coingecko.com/api/v3/global');
        const newObj = data.data;
        this.setState({
          isLoading: false,
          marketData: newObj
        })
      }catch(err){
        console.log(err)
      }
    }

    componentDidMount() {
       this.getMarketData()
    }


    render() {
         console.log('Ticker data---->', this.state.marketData)

         const marketData = this.state.marketData

         const activeCurrencies = marketData?.active_cryptocurrencies
         const exchanges = marketData?.markets
         const market_cap = abbrCurrencySetter(marketData?.total_market_cap[this.props.currency], this.props.currency)
         const marketCap24hChange = marketData?.market_cap_change_percentage_24h_usd.toFixed(2)

         const profit_24h = marketData?.market_cap_change_percentage_24h_usd > 0;
         const loss_24h = marketData?.market_cap_change_percentage_24h_usd < 0;

         const total_volume = abbrCurrencySetter(marketData?.total_volume[this.props.currency], this.props.currency)

         const market_cap_percentage = marketData?.market_cap_percentage.btc.toFixed(2)

        return (
         <Ticker className="ticker">
            <TickerData>Coins {activeCurrencies}</TickerData>
            <TickerData>Exchange {exchanges}</TickerData>
            <TickerData>
              <MarketCap>
                <ProgressCircle className="progess-circle"/>{market_cap}
                 <MarketChange profit={marketCap24hChange}>
                  {profit_24h && <ArrowDropUpIcon/> || loss_24h && <ArrowDropDownIcon/>} {marketCap24hChange}% 
                    <ProgressCircle className="progess-circle"/>
                </MarketChange>
              </MarketCap>
              </TickerData>

            {/* <TickerData>
              {total_volume}
               <VolMktBar className="outer-bar">
                  <InnerBar className="inner-bar" percent={(marketData?.total_volume[this.props.currency] / marketData?.total_market_cap[this.props.currency]) * 100}></InnerBar>
              </VolMktBar>
            </TickerData> */}
            <TickerData>
              <img src={BTC_PNG} alt="" />
              <VolMktBar style={{width: "50px"}} className="outer-bar">
                <InnerBar className="inner-bar" percent={100}/>
              </VolMktBar>
            </TickerData>
            <TickerData>Data goes here</TickerData>
        </Ticker>
        )
    }
}

export default NavbarTicker;
