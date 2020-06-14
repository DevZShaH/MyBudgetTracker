import React,{ useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import {numberWithCommas} from '../utils/format'

//NOTE: previously when using Context as Provider-Consumer logic, code becomes quite messy.
////////But with the introduction of useContext hooks, we don't have to deal with Consumer part. We just have to call useContext just like in line:9

export const Balance = () => {

    const { transactions } = useContext(GlobalContext); //We can pull anything from GlobalContext using useContext hooks.

    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </>
    )
}
