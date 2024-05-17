import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ordered, restocked } from './icecreamSlice';

export const IcecreamView = () => {

    const numOfIceCreams = useSelector((state) => state.icecream.numOfIceCream);

    const disptach = useDispatch();

    return (
        <div>
            <h2>Number of IceCreams - {numOfIceCreams}</h2>
            <button onClick={() => disptach(ordered())}>Order IceCream</button>
            <button onClick={() => disptach(restocked(5))}>Restock IceCream</button>
        </div>
    )
}
