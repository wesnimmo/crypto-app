

const abbrCurrencySetter = (number, currency) => {
  console.log(number)
  return Intl.NumberFormat(
    'en', 
    { 
      style: 'currency', 
      notation: 'compact',
      //  twenty,
      currency: currency 
    }
  ).format(number);

}

export default abbrCurrencySetter