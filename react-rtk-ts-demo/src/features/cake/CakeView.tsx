import React from 'react';
import { ordered, restocked } from './cakeSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks'

export const CakeView = () => {

    const numOfCakes = useAppSelector((state) => state.cake.numOfCake);

    const disptach = useAppDispatch();

    return (
        <div>
            <h2>Number of Cakes - {numOfCakes}</h2>
            <button onClick={() => disptach(ordered())}>Order Cake</button>
            <button onClick={() => disptach(restocked(5))}>Restock Cake</button>
        </div>
    )
}
