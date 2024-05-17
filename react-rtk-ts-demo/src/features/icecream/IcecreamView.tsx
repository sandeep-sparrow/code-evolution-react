import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ordered, restocked } from './icecreamSlice';

export const IcecreamView = () => {

    const numOfIceCreams = useAppSelector((state) => state.icecream.numOfIceCream);

    const disptach = useAppDispatch();

    return (
        <div>
            <h2>Number of IceCreams - {numOfIceCreams}</h2>
            <button onClick={() => disptach(ordered())}>Order IceCream</button>
            <button onClick={() => disptach(restocked(5))}>Restock IceCream</button>
        </div>
    )
}
