import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";


export async function scrapeAmazonProduct(url: string) {
    if (!url) return false;


    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_password);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: "brd.superproxy.io",
        port,
        rejectUnauthorized: false
    }

    try {
        const images: any = [];
        const response = await axios.get(url, options);//I am getting the page using the url and bright data configurations

        const $ = cheerio.load(response.data);

        const title = $(".vtex-store-components-3-x-productBrand").text().trim();
        const currentPrice = extractPrice($(".vtex-product-price-1-x-sellingPrice"))
        $(".vtex-store-components-3-x-productImageTag").each(function () {
            const imageSrc = $(this).attr("src");
            images.push(imageSrc);
        });

        const currency = extractCurrency($(".vtex-product-price-1-x-currencyCode"))
        const paymentBreakDownSection = $(".thefoschini-vtex-tfg-custom-components-1-x-pdpPaymentBreakdownSection").text().trim();
        const svgIcon = $(".thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon.thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon--tfg-pdp-free-delivery").html();
        const svgWidth = $(".thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon.thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon--tfg-pdp-free-delivery").attr("width");
        const svgHeight = $(".thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon.thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon--tfg-pdp-free-delivery").attr("height");
        const svgViewBox = $(".thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon.thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon--tfg-pdp-free-delivery").attr("viewBox");
        const svgFill = $(".thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon.thefoschini-vtex-tfg-custom-components-1-x-iconLabelIcon--tfg-pdp-free-delivery").attr("fill");
        const deliveryText=$(".thefoschini-vtex-tfg-custom-components-1-x-iconLabelText").text().trim();
        const parentElementColorText = $(".thefoschini-tfg-sku-selector-0-x-skuSelectorName").text().trim();//this div contains multiple selectors

        // Extracting the "Colour" text from the combined text content
        const indexOfColour = parentElementColorText.indexOf('Colour');
        const colorTitle = indexOfColour !== -1 ? parentElementColorText.slice(indexOfColour, indexOfColour + 6) : '';
        const color = $(".thefoschini-tfg-sku-selector-0-x-skuSelectorSelectorImageValue").text().trim();
        const colorImg =$(".thefoschini-tfg-sku-selector-0-x-skuSelectorItemImageValue").attr("src");
        const sizeTextParentElement = $(".thefoschini-tfg-sku-selector-0-x-skuSelectorName").text().trim();
        const indexOfSize = sizeTextParentElement.indexOf('Size');
        const sizeTitle = indexOfColour !== -1 ? sizeTextParentElement.slice(indexOfSize, indexOfSize + 4) : '';



        console.log({ title, currentPrice, images, currency,paymentBreakDownSection,svgIcon,svgFill,svgHeight,svgWidth,svgViewBox,deliveryText,colorTitle,color,colorImg,sizeTitle})
        const data = {
            url,
            title,
            price : currentPrice,
            currency,
            images,
            
        }

        return true;

    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
        return false
    }

}

