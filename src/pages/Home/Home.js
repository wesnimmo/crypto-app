import React from 'react'
import {CoinsList, HomeDashboard} from 'components';


const Home = (props) => {
    //console.log('here are those props-->',props)
    return (
        <div>
            <HomeDashboard currency={props.currency} />
            <CoinsList currency={props.currency} />
        </div>
    )
}

export default Home
