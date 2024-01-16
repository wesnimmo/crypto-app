

const currencySetter = (number, currency, useDecimals = true) => {
  
  return Intl.NumberFormat(
    'en', 
    { 
      style: 'currency', 
      notation: 'standard',
      maximumFractionDigits: useDecimals ? 2 : 0,
      currency: currency 
    }
  ).format(number);

}

export default currencySetter