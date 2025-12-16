


const BASE_URL = 'https://api.exchangerate-api.com/v4/latest'



export async function exchangeRateApi(fromCurrency){

    try {
        const response = await fetch(`${BASE_URL}/${fromCurrency}`)
        const data = await response.json()
        return data

    } catch(error) {
        console.log(error)
    }
}



export function convertCurrency(amount, rate) {
    return (parseFloat(amount) * rate).toFixed(2)
}