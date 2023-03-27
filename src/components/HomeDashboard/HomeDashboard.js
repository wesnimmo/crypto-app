import React from 'react'
import axios from 'axios'
import NavbarTicker from 'components/NavbarTicker/NavbarTicker';
import abbrCurrencySetter from '../../utilities/abbrCurrencySetter';
import { 
  DashboardContainer,
  LTCol,
  LTColheading,
  LTColChart,
  RTCol,
  RTColheading,
  RTColChart 

} from './HomeDashboard.styled'
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


class HomeDashboard extends React.Component {

    state = {
        coinData: null,
        isLoading: false
    }

    getBitCoin = async () => {
        try{
            this.setState({isLoading: true});
            const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${this.props.currency}&days=14`)

            const bitCoin = data;
            console.log(data)
            this.setState({coinData: null, isLoading: false})
            //console.log('Homedashboard api -->', bitCoin)
        } catch(err){
            console.log('here is the err:',err)
        }
    }

    componentDidMount() {
        this.getBitCoin()
    }

    render() {
        const bitCoin = this.state.coinData;
        const hasCoin = !this.state.isLoading && this.state.coinData;

        const price = abbrCurrencySetter(bitCoin?.prices?.[bitCoin.prices.length -1][1], this.props.currency)
        //const price = Math.round(10 * rawPrice) / 10000

        // const price = currencySetter(rawPrice)
        const timestamp = (bitCoin?.prices?.[bitCoin.prices.length -1][0]);
        const date = new Date(timestamp)
        const month = date.toLocaleString("en-US", {month: "short"});
        const day = date.toLocaleString("en-US", {day: "numeric"});
        const today = new Date()
        const year = today.getFullYear()
       
        //const volume = Math.round(10*rawVolume) / 10000000000
        const volume = abbrCurrencySetter(bitCoin?.total_volumes?.[bitCoin.prices.length -1][1], this.props.currency)
        
        return (
           <>
            {hasCoin && (
              <div>
                  <NavbarTicker currency={this.props.currency} />
                 <DashboardContainer>
                    <LTCol className="dashboard-column">
                        <LTColheading>
                            <p>BTC</p>
                            <h1>{price}</h1>
                            <div><p>{month} {day}, {year}</p></div>
                        </LTColheading>
                        <LTColChart>
                            <Line
                                data={{
                                    labels: bitCoin.prices?.map((coin) => {
                                        const timestamp2 = ( coin?.[0]);
                                        let chartDate = new Date(timestamp2)
                                    
                                         return chartDate.toLocaleString("en-US", {day: "numeric"})
                                    
                                    }),
                                    datasets: [
                                        {
                                            data: bitCoin.prices?.map((coin) => coin?.[1]),
                                            borderColor: '#00FF5F',
                                            backgroundColor: '#00FF5F',
                                        }
                                    ]
                                }}
                                options={{
                                    elements: {
                                      point: {
                                        radius: 1,
                                      },
                                    },
                                    scales: {
                                        y: {
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
                       
                        </LTColChart>
                    </LTCol>
                    <RTCol className="dashboard-column">
                        <RTColheading>
                            <p>volume</p>
                            <h1>{volume}</h1>
                            <div><p>{month} {day}, {year}</p></div>
                        </RTColheading>
                        <RTColChart>
                             <Bar
                                data={{
                                    labels: bitCoin.prices?.map((coin) => {
                                        const timestamp2 = ( coin?.[0]);
                                        let chartDate = new Date(timestamp2)
                                    
                                         return chartDate.toLocaleString("en-US", {day: "numeric"})
                                    
                                    }),
                                    datasets: [
                                        {
                                            data: bitCoin.prices?.map((coin) => coin?.[1]),
                                            borderColor: '#2172E5',
                                            backgroundColor: '#2172E5',
                                        }
                                    ]
                                }}
                             options={{
                                elements: {
                                  point: {
                                    radius: 1,
                                  },
                                },
                                scales: {
                                    y: {
                                      ticks: {
                                        display: false,
                                      }
                                    }
                                },
                                 plugins: {
                                    legend: {
                                      display: false
                                    }
                                  },
                                responsive:true,
                                maintainAspectRatio: false
                              }}
                            />
                        </RTColChart>
                    </RTCol>
                </DashboardContainer>
              </div>
            
            )}
           </>
        )
    }
}

export default HomeDashboard
