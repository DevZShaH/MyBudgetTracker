import React, { useContext } from 'react';
import { numberWithCommas } from '../utils/format';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {
	//Pulling up deleteTransaction event
	const { deleteTransaction } = useContext(GlobalContext);
	// console.log(deleteTransaction);
	const sign = transaction.amount < 0 ? '-' : '+';

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{sign}${numberWithCommas(Math.abs(transaction.amount))}
			</span>
			<button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">
				x
			</button>
		</li>
	);
};
