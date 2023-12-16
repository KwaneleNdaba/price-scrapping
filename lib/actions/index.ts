"use server"


import { scrapeAmazonProduct } from "../scrapper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { revalidatePath } from "next/cache";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodeMailer";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return false;

    try {

        connectToDB();



        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if (!scrapedProduct) {
            return false;
        }

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url });
        if (existingProduct) {
            const updatedPriceHistoy = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistoy,
                lowestPrice: getLowestPrice(updatedPriceHistoy),
                highestPrice: getHighestPrice(updatedPriceHistoy),
                averagePrice: getAveragePrice(updatedPriceHistoy)

            }
        }

        const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url },
            product,
            { upsert: true, new: true })//if none exists then create one 

        revalidatePath(`/products/${newProduct._id}`)
        if (newProduct) {
            return newProduct ;
        }
    } catch (error: any) {
        throw new Error(`Failed to create or update product: ${error.message}`)
        return false
    }
}

export async function getProductById(productId: string) {
    try {
        connectToDB()

        const product = await Product.findOne({ _id: productId });

        if (!product) return false;

        return product;

    } catch (error: any) {
        throw new Error(`Failed to get the product: ${error.message}`)
    }
}


export async function getAllProducts() {
    try {
        connectToDB()

        const products = await Product.find();

        if (!products) return;

        return products;

    } catch (error: any) {
        throw new Error(`Failed to get the product: ${error.message}`)
    }
}

export async function getSimilarProducts(productId: string) {
    try {
        connectToDB();

        const currentProduct = await Product.findById({ _id: productId });

        if (!currentProduct) return null;

        const similarProducts = await Product.find({
            _id: { $ne: productId },//not equaly to productId

        }).limit(3)

        return similarProducts

    } catch (error) {

    }
}

export async function addUserEmailToProduct(productId: string, userEmail:string){
    try {
        const product = await Product.findById(productId);
        if(!product) return;

        const userExists = product.users.some((user:User) => user.email === userEmail);

        if(!userExists){
            product.users.push({email:userEmail});

            await product.save();

            const emailContent = await generateEmailBody(product, "WELCOME");

            await sendEmail(emailContent, [userEmail])
        }
    } catch (error:any) {
        throw new Error( `Faile to  add user email to product: ${error.message}`)
    }
}