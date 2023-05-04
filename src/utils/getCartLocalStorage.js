export const getCartLocalStorage = () => {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
}