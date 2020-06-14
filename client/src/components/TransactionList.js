import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import {Transaction } from './Transaction'


export const TransactionList = () => {

    //Pull up transactions.
    const { transactions, getTransactions } = useContext(GlobalContext); //We can pull anything from GlobalContext using useContext hooks
    
    // console.log(context); // This will return us transactions array object. Instead of using context.transactions, we simply destructure context as {transactions} in line:9

    useEffect(() => {
       getTransactions();
       //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction}/>))}               
      </ul>
        </>
    )
}
