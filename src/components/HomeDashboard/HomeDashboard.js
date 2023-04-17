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

    // create an instance variable to store the axios request
    source = axios.CancelToken.source()

    getBitCoin = async () => {
        try{
            this.setState({isLoading: true});
            const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${this.props.currency}&days=14`,{ crossDomain: true, cancelToken: this.source.token })
            const bitCoin = data;
            this.setState({coinData: bitCoin, isLoading: false})
        } catch(err){
            console.log('here is the err:',err)
        }
    }

    componentDidMount() {
        this.getBitCoin()
    }

    componentWillUnmount() {
        // cancel the axios request when the component is unmounted
        this.source.cancel('Component is unmounted')
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.currency !== prevProps.currency){
            this.getCoins()
        }
    }

    render() {
        const bitCoin = this.state?.coinData;
        const hasCoin = !this.state.isLoading && this.state?.coinData;

        // CURRENCY FORMATTED DATA
        const price = abbrCurrencySetter(bitCoin?.prices?.[bitCoin?.prices.length -1][1], this.props.currency)
        const volume = abbrCurrencySetter(bitCoin?.total_volumes?.[bitCoin?.prices.length -1][1], this.props.currency)

        //TIME, DATE, MONTH, YEAR
        const timestamp = (bitCoin?.prices?.[bitCoin?.prices.length -1][0]);
        const date = new Date(timestamp)
        const month = date.toLocaleString("en-US", {month: "short"});
        const day = date.toLocaleString("en-US", {day: "numeric"});
        const today = new Date()
        const year = today.getFullYear()
        
        return (
           <>
            {hasCoin && (
              <div>
                  {/* <NavbarTicker currency={this.props.currency} /> */}
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
                                    labels: bitCoin?.prices.map((coin) => {
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
                                    labels: bitCoin?.prices.map((coin) => {
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
