import React, { createContext, useEffect, useState } from 'react'

export let basketContext = createContext()

function BasketProvider({children}) {
    let localBasket = JSON.parse(localStorage.getItem("basket"))
    let [basket, setBasket] = useState(localBasket ? localBasket : [])

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])

    let value = {
        basket,
        setBasket
    }
    return (
        <basketContext.Provider value={value}>
            {children}
        </basketContext.Provider>
    )

}

export default BasketProvider
