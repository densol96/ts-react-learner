import { ChangeEvent, memo, ReactElement } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerActionType, actions_type, formatCurrency } from "../context/CartProvider"

type Props = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerActionType>,
    REDUCER_ACTIONS: actions_type
}

function CartLineItem({item, dispatch, REDUCER_ACTIONS}: Props) {
    const image: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href
    const lineTotal: number = (item.qty * item.price)
    const highestQty: number = 20 > item.qty ? 20 : item.qty
    const optionValues: number[] = Array.from({ length: highestQty }, (_, i) => i);

    const options: ReactElement[] = optionValues.map(numValue => <option key={`opt${numValue}`} value={numValue}>{numValue}</option>)

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch({type: REDUCER_ACTIONS.QUANTITY, payload: {...item, qty: +e.target.value}})
    const onRemoveFromCart = () => dispatch({type: REDUCER_ACTIONS.REMOVE, payload: item})

    return (
            <li className="cart__item">
                <img src={image} alt={item.name} className="cart__img" />
                <div aria-label="Item Name">{item.name}</div>
                <div aria-label="Price Per Item">{formatCurrency(item.price)}</div>
                <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
                <select onChange={onChange} name="itemQty" id="itemQty" className="cart__select" value={item.qty}>
                    {options}
                </select>
                <button className="cart__button" onClick={onRemoveFromCart}>Delete from cart</button>
            </li>
    )
}

const areItemsEqual = ({item: prevItem}: Props, {item: nextItem}: Props) => {
   return Object.keys(prevItem).every(key => prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType])
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem
