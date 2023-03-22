

const currencySetter = (number, currency) => {
  
  return Intl.NumberFormat(
    'en', 
    { 
      style: 'currency', 
      notation: 'standard',
      //  twenty,
      currency: currency 
    }
  ).format(number);

}

export default currencySetter