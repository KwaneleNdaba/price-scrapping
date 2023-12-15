"use server"

import { connect } from "net";
import { scrapeAmazonProduct } from "../scrapper";
import { connectToDB } from "../mongoose";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return false;

    try {

        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if (scrapedProduct) {
            return true;
        } else false;
    } catch (error: any) {
        throw new Error(`Failed to create or update product: ${error.message}`)
        return false
    }
}