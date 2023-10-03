"use client"



import { scrapeAndStoreProduct } from '@/lib/actions/';
import React, { FormEvent, useState } from 'react'




const isValidAmazonProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;
  
      if(
        hostname.includes('amazon.com') || 
        hostname.includes ('amazon.') || 
        hostname.endsWith('amazon')
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  
    return false;
  }
  

  const Searchbar = () => {
      
      const [searchPrompt, setSearchPrompt] = useState('');
      const [isLoqding, setIsLoading] = useState('false');

  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const isValidLink = isValidAmazonProductURL(searchPrompt);
  
       if(!isValidLink) alert ('please enter a Valid amazon link')  
    try {
        setIsLoading(true)

        //scrape the product page  
        const product =await scrapeAndStoreProduct(searchPrompt)



    } catch (error) {
        console.log(error)
        
    }finally{
        setIsLoading(false)
    }
    }
      
  return (
    <form  className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>

        <input type="text" 
        value={searchPrompt}  
        onChange= {(e)=>setSearchPrompt(e.target.value)} placeholder='enter Product Link' className='searchbar-input' />
        <button type='submit' className='searchbar-btn'> Search</button>
    </form>
  )
}

export default Searchbar