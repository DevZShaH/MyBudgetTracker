import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import axios from 'axios';

//INITIAL STATE
const initialState = {
	transactions: [
		// { id: 1, text: 'Flower', amount: -20 },
		// { id: 2, text: 'Salary', amount: 300 },
		// { id: 3, text: 'Book', amount: -10 },
		// { id: 4, text: 'Camera', amount: 150 }
	],
	error: null,
	loading: true
};

//CREATE CONTEXT
export const GlobalContext = createContext(initialState);

//PROVIDER COMPONENT
export const GlobalProvider = ({ children }) => {
	//REDUCER ACTION
	const [ state, dispatch ] = useReducer(AppReducer, initialState); //Slight knowledge of Reducer here.

	//ACTIONS - which calls to reducer

	async function getTransactions() {
		try {
			const res = await axios.get('./api/v1/transactions');
			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: res.data.data
			});
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error
			});
		}
	}

	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);

			dispatch({
				type: 'DELETE_TRANSACTION',
				payload: id
			});
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/v1/transactions', transaction, config);

			dispatch({
				type: 'ADD_TRANSACTION',
				payload: res.data.data
			});
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				getTransactions,
				deleteTransaction,
				addTransaction
			}}
		>
			{children}
		</GlobalContext.Provider>
	); //provider component to all of its children who consumes it.
};
