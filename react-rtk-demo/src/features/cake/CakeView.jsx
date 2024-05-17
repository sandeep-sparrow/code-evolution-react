import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordered, restocked } from './cakeSlice';

export const CakeView = () => {

    const numOfCakes = useSelector((state) => state.cake.numOfCake);

    const disptach = useDispatch();

    return (
        <div>
            <h2>Number of Cakes - {numOfCakes}</h2>
            <button onClick={() => disptach(ordered())}>Order Cake</button>
            <button onClick={() => disptach(restocked(5))}>Restock Cake</button>
        </div>
    )
}
