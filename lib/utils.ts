export function extractPrice(...elements: any){//the arguements will be passed into an array

    for (const element of elements) {
        const priceText = element.text().trim();

        if (priceText) {
            const cleanedPrice = priceText.replace(/[^\d.,]/g, '');
            return cleanedPrice;
          }
          
          
    }
return "";
}

export function extractCurrency(element:any){
    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : "";
}