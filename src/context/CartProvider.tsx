import { createContext, ReactElement, ReactNode, useMemo, useReducer } from "react";

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number
};

type CartStateType = {cart: CartItemType[]}

const initCartState: CartStateType = {cart: []}

const REDUCER_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerAction = {
    type: string,
    payload?: CartItemType
};

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch(action.type) {
        case REDUCER_TYPE.ADD: {
            if (!action.payload) {
                throw new Error("action.payload missing in ADD action");
            }
            const payload = action.payload;
            const itemExists = state.cart.some((item) => item.sku === payload.sku);
            const newCart = itemExists
                ? state.cart.map((item): CartItemType => {
                      if (item.sku === payload.sku) {
                          return { ...item, qty: item.qty + payload.qty };
                      }
                      return item;
                  })
                : [...state.cart, action.payload];
            return { ...state, cart: newCart };
        }
        case REDUCER_TYPE.QUANTITY: {
            if(!action.payload) {
                throw new Error("action.payload missing in QUANTITY action");
            }

            const {sku, qty} = action.payload;
            const itemExists = state.cart.find(item => item.sku === sku) !== undefined;
            if(!itemExists) throw new Error("Unable to update qty for this item as it is not in the cart");
            const cart = state.cart.map(item => {
                if(item.sku === sku) {
                    return {...item, qty}
                }
                return item;
            })
            return {...state, cart}
        }
        case REDUCER_TYPE.REMOVE: {
            if(!action.payload) {
                throw new Error("action.payload missing in REMOVE action");
            }
            const {sku} = action.payload;
            return {...state, cart: state.cart.filter(item => item.sku !== sku)};

        }
        case REDUCER_TYPE.SUBMIT: {
            return {...state, cart: []};
        }
        default: throw new Error("Invalid action.type passed in as an argument to reducer in CartProvider.tsx")
    }
}


export const formatCurrency = (totalPrice: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: 'currency', currency: 'USD'
    }).format(totalPrice);
}

const useCartContext = (providedInitState: CartStateType = initCartState) => {
    const [state, dispatch] = useReducer(reducer, providedInitState);
    const REDUCER_ACTIONS: Readonly<typeof REDUCER_TYPE> = useMemo(() => {
        return REDUCER_TYPE;
    }, [REDUCER_TYPE])
    const totalItems: number = state.cart.length
    const totalPrice: number = state.cart.reduce((total, item) => {
        return total + item.price * item.qty;
    }, 0);
    const totalPriceFormatted: string = formatCurrency(totalPrice)
    const cart = state.cart.sort((a,b) => {
        const itemA = +a.sku.slice(-4);
        const itemB = +b.sku.slice(-4);
        return itemA - itemB;
    })

    return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart, totalPriceFormatted};
}

export type CartContextType = ReturnType<typeof useCartContext>; 

const initCartContextState: CartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_TYPE,
    totalItems: 0,
    totalPrice: 1,
    totalPriceFormatted: formatCurrency(0),
    cart: []
}

type CartProviderProps = {
    children: ReactNode
}

export const CartContext = createContext<CartContextType>(initCartContextState);

export default function CartProvider({children}: CartProviderProps): ReactElement {
    return <CartContext.Provider value={useCartContext()}>{children}</CartContext.Provider>
}
