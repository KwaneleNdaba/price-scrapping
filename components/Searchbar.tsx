"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Searchbar() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonProductUrl = (url: string) => {
    try {
      const parseUrl = new URL(url); //taking an argument making it a URL
      const hostname = parseUrl.hostname; //checking where is the product url hosted
      console.log("Hostname", hostname);
      if (
        hostname.includes("bash.com") ||
        hostname.includes("bash") ||
        hostname.endsWith("bash")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidProductLink = isValidAmazonProductUrl(searchPrompt);

    let _id = toast.loading("Searching..", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (!isValidProductLink) {
      toast.update(_id, {
        render: "Please enter a valid Sportscene product link",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(_id);
      }, 2000);
      return false;
    }

    try {
      setIsLoading(true);
      debugger;
      const product = await scrapeAndStoreProduct(searchPrompt)
      debugger;
      if(product !== null){
        toast.dismiss(_id);
        setIsLoading(false);
      }
    
      return;
    } catch (error) {

      // toast.update(_id, {
      //   render: "Error: Please try again later",
      //   type: "error",
      //   isLoading: false,
      // });
    
      setTimeout(()=> {
        toast.dismiss(_id);
      },2000)
      debugger;
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPrompt(e.target.value);
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12">
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Enter product link"
          className="searchbar-input"
        />

        <button
          disabled={searchPrompt === ""}
          type="submit"
          className="searchbar-btn"
        >
        {isLoading ? "Searching.." : "  Search"}
        </button>
      </form>
    </>
  );
}

export default Searchbar;
