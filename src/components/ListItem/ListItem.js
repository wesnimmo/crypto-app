//import { TH } from 'components/styles/CoinList.styled';
import React from 'react'
import currencySetter from '../../utilities/currencySetter';
import abbrCurrencySetter from '../../utilities/abbrCurrencySetter';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TR, TD, Image, ProgressCircle, LineContainer, PercentChange } from './ListItem.styled'
import { VolMktBar, InnerBar } from '../../styles/ProgressBar.styled'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ListItem = (props) => {


    const profit_1h = props.coin.price_change_percentage_1h_in_currency > 0;
    const loss_1h = props.coin.price_change_percentage_1h_in_currency < 0;
    const profit_24h = props.coin.price_change_percentage_24h > 0;
    const loss_24h = props.coin.price_change_percentage_24h < 0;
    const profit_7d =  props.coin.price_change_percentage_7d_in_currency > 0;
    const loss_7d =  props.coin.price_change_percentage_7d_in_currency < 0;

    
    const volume = abbrCurrencySetter(props.coin.total_volume, props.curr)
    // const volume = Math.round(10*rawVolume) / 10000000000;

    const volume_market_cap = abbrCurrencySetter(props.coin.market_cap, props.curr)
    // const volume_market_cap = Math.round(10*rawMarketCap) / 10000000000

    const circulating_supply = abbrCurrencySetter(props.coin.circulating_supply, props.curr)
    // const circulating_supply = Math.round(10*rawCirculatingSupply) / 10000000000;

    const total_supply = abbrCurrencySetter(props.coin.total_supply, props.curr)
    // const total_supply = Math.round(10*rawTotalSupply) / 10000000000

    
   
    return (
    
        <TR>
            <TD>{props.coin.market_cap_rank}</TD>
            <TD>
                <Link to={`/coin/${props.coin.id}`} key={props.coin.id} style={{color: 'white', textDecoration: 'none'}} >
                    <Image src={props.coin.image} alt='' />
                    <span>{props.coin.id}</span>
                    <span>({props.coin.symbol.toUpperCase()})</span>
                </Link> 
            </TD>
            <TD>
              {/* ${parseFloat(props.coin.current_price.toFixed(2)).toLocaleString()} */}
              {currencySetter(props.coin.current_price, props.curr)}
              </TD>

            <TD>
                <PercentChange price={props.coin.price_change_percentage_1h_in_currency}>
                    {(profit_1h &&  <ArrowDropUpIcon/> || loss_1h && <ArrowDropDownIcon/>)}{props.coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                </PercentChange>
            </TD>
            <TD>
                <PercentChange price={props.coin.price_change_percentage_24h}>
                    {(profit_24h &&  <ArrowDropUpIcon/> || loss_24h && <ArrowDropDownIcon/>)}{props.coin.price_change_percentage_24h.toFixed(2)}%
                </PercentChange>
            </TD>
            <TD>
                <PercentChange price={props.coin.price_change_percentage_7d_in_currency}>
                    {(profit_7d &&  <ArrowDropUpIcon/> || loss_7d && <ArrowDropDownIcon/>)}{props.coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                </PercentChange>
            </TD>


            <TD>
                <div>
                    <p><ProgressCircle className="progess-circle"/> {volume}</p>
                    <p><ProgressCircle className="progess-circle"/>{volume_market_cap}</p>
                </div>
                <div>
                    <VolMktBar className="outer-bar">
                        <InnerBar className="inner-bar" percent={(props.coin.total_volume / props.coin.market_cap) * 100} />
                    </VolMktBar>
                </div>
            </TD>

            <TD>
                <div>
                    <p><ProgressCircle className="progess-circle"/>{circulating_supply}</p>
                    <p><ProgressCircle className="progess-circle"/>{total_supply}</p>
                </div>
                <div>
                    <VolMktBar className="outer-bar">
                      <InnerBar className="inner-bar" percent={(props.coin.circulating_supply / props.coin.total_supply) * 100} />
                    </VolMktBar>
                </div>
            </TD>
            <TD>
                <LineContainer>
                      <Line
                        data={{
                            labels: props.coin.sparkline_in_7d.price?.map((coin) => coin ),
                                    
                            datasets: [
                                {
                                    data: props.coin.sparkline_in_7d.price?.map((coin) => coin ),
                                    borderColor: '#00FF5F',
                                    backgroundColor: '#00FF5F',
                                    showLine: false
                                }
                            ]
                        }}
                   
                        options={{
                            elements: {
                              point: {
                                radius: 1,
                              },
                            },
                             showLine: false,
                             scales: {
                                y: {
                                  ticks: {
                                    display: false,
                                  }
                                },
                                 x: {
                                  ticks: {
                                    display: false,
                                  }
                                }
                            },
                            xAxes: [{
                                ticks: {
                                  maxTicksLimit: 8
                                }
                              }],
                            plugins: {
                                legend: {
                                  display: false
                                }
                              },
                            responsive:true,
                            maintainAspectRatio: false
                          }}
                       />
                </LineContainer>
                
            </TD>
            
        </TR>
    )
 }


export default ListItem