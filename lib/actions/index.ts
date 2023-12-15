"use server"

import { scrapeAmazonProduct } from "../scrapper";

export async function scrapeAndStoreProduct(productUrl : string){
    if(!productUrl) return false;

    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(scrapedProduct) return true;
    } catch (error:any) {
        throw new Error(`Failed to create or update product: ${error.message}`)
        return false
    }
}