export function extractPrice(...elements: any) {
    for (const element of elements) {
        const priceText = element.text().trim();

        if (priceText) {
            // Replace comma with dot for decimal values and remove non-numeric characters except dot
            const cleanedPrice = Number(priceText.replace(/[^\d,.]/g, '').replace(',', '.'));
            
            if (!isNaN(cleanedPrice)) {
                return cleanedPrice;
            } else {
                console.log("Invalid price format:", priceText);
            }
        }
    }
    return null; // Return null if no valid price is found
}


export function extractCurrency(element:any){
    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : "";
}