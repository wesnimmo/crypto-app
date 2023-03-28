import axios from 'axios'
import React from 'react'
import { Heading, Row, Table} from './CoinList.styled'
import { ListItem } from 'components';
import InfiniteScroll from "react-infinite-scroll-component";

class CoinsList extends React.Component {

    state = {
        coins: [],
        isLoading: false
    }

    getCoins = async ( perPage = 20) => {
        try {
            this.setState({isLoading: true});
            const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`);
            const coins = data;
            this.setState({coins, isLoading: false})

        } catch (err) {
          console.log(err)
        }

    }

    componentDidMount() {
        this.getCoins()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.currency !== prevProps.currency){
            this.getCoins()
        }
    }

    render() {
        //console.log('Here is the CoinList-->' ,this.state.coins)
        return (
           <>
             <InfiniteScroll
                dataLength={this.state.coins.length}
                next={() => this.getCoins(this.state.coins.length + 20)}
                hasMore={this.state.coins && this.state.coins.length >= 100 ? false : true}
                loader={<h4>Loading...</h4>}
            > 
                <Table>
                    <thead>
                        <Row>
                            <Heading>#</Heading>
                            <Heading>Name</Heading>
                            <Heading>Price</Heading>
                            <Heading>1h%</Heading>
                            <Heading>24h%</Heading>
                            <Heading>7d%</Heading>
                            <Heading>24h Volume/Market Cap</Heading>
                            <Heading>Circulating/Total Supply</Heading>
                            <Heading>Last 7d</Heading>
                        </Row>
                    </thead>
                    <tbody>
                        {
                            this.state.coins.map((coin) => {
                                return (
                            
                                    <ListItem coin={coin} curr={this.props.currency} key={coin.id}/>
                                
                                )
                            })
                        }    
                    </tbody>    
                </Table>
            </InfiniteScroll>
           </>
        )
    }
}

export default CoinsList
