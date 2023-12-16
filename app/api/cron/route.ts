import { scrapeAndStoreProduct } from "@/lib/actions";
import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils";

export async function GET (){
    try {
        connectToDB();
        const products = await Product.find({});

        if(!products)throw new Error("Product not found");

        //scrappping the latest product details and update the DB
        const updatedProduct = await Promise.all(//we will update all the products at the same time 
            products.map(async (currentProduct) => {
                const scrapedProduct = await scrapeAndStoreProduct(currentProduct.url);

                if(!scrapedProduct) throw new Error("No product found");

                const updatedPriceHistoy = [
                    ...currentProduct.priceHistory,
                    { price: scrapedProduct.currentPrice }
                ]
    
              const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistoy,
                    lowestPrice: getLowestPrice(updatedPriceHistoy),
                    highestPrice: getHighestPrice(updatedPriceHistoy),
                    averagePrice: getAveragePrice(updatedPriceHistoy)
    
                }
            
    
            const updatedProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url },
                product,
             )//if none exists then create one 

             //check the product status 

            //  const emailNotifyType = getEmailNotifType(scrapedProduct, currentProduct)//we need to compare so we can know what has changed 
             




            })
        )

    } catch (error) {
        
    }
}