import axios from 'axios'
import React from 'react'
import { Heading, Row, Table} from './CoinList.styled'
import { ListItem } from 'components';
import InfiniteScroll from "react-infinite-scroll-component";

class CoinsList extends React.Component {

    state = {
        coins: [],
        isLoading: false,
        errMessage: "",
        isMounted: false  // add isMounted flag to state
    }

    // create an instance variable to store the axios request
    source = axios.CancelToken.source()

    getCoins = async (perPage = 20) => {
        try {
            this.setStateIfMounted({ isLoading: true });
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`, { crossDomain: true, cancelToken: this.source.token });
            const coins = data;
            this.setStateIfMounted({ coins, isLoading: false });
        } catch (err) {
            //console.log(err)
            this.setStateIfMounted({
                errMessage: "Api is down check back later",
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.setState({ isMounted: true });  // set isMounted flag to true
        this.getCoins()
    }

    componentWillUnmount() {
        this.source.cancel('Component is unmounted');
        this.setState({ isMounted: false });  // set isMounted flag to false
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.currency !== prevProps.currency){
            this.getCoins()
        }
     }

    setStateIfMounted = (state) => {
        if (this.state.isMounted) {
            this.setState(state);
        }
    }

    render() {
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
                {this.state.errMessage && <h2>{this.state.errMessage}</h2>}
            </InfiniteScroll>
           </>
        )
    }
}

export default CoinsList
