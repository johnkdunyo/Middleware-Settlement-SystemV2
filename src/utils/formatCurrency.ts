const formatCurrency = (amount: number) => {
    if (typeof amount !== 'number') {
      return
    // throw new Error('Invalid input. Expected a number.');
    }
   const formattedAmount = amount.toLocaleString('en-GH', {
    style: 'currency',
    currency: 'GHS'
  });
    return formattedAmount;

}

export default formatCurrency