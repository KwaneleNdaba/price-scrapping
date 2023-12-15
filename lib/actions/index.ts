"use server"


import { scrapeAmazonProduct } from "../scrapper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { revalidatePath } from "next/cache";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return false;

    try {

        connectToDB();

        

        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if (!scrapedProduct) {
            return false;
        } 

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({url:scrapedProduct.url});
        if(existingProduct){
            const updatedPriceHistoy = [
                ...existingProduct.priceHistory,
                {price:scrapedProduct.currentPrice}
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistoy,
                lowestPrice:getLowestPrice(updatedPriceHistoy),
                highestPrice:getHighestPrice(updatedPriceHistoy),
                averagePrice:getAveragePrice(updatedPriceHistoy)
                
            }
        }

        const newProduct= await Product.findOneAndUpdate({url : scrapedProduct.url},
            product,
            {upsert: true, new: true})//if none exists then create one 
            
        revalidatePath(`/products/${newProduct._id}`)
        if(newProduct){
            return true;
        }
    } catch (error: any) {
        throw new Error(`Failed to create or update product: ${error.message}`)
        return false
    }
}

export async function getProductById(productId: string){
try {
    connectToDB()

    const product = await Product.findOne({_id : productId});

    if(!product) return false;

    return product;
    
} catch (error:any) {
    throw new Error(`Failed to get the product: ${error.message}`)
}
}


export async function getAllProducts(){
    try {
        connectToDB()
    
        const products = await Product.find();
    
        if(!products) return;
    
        return products;
        
    } catch (error:any) {
        throw new Error(`Failed to get the product: ${error.message}`)
    }
    }
    