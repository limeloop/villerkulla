import { Page } from "@/types";

export async function getPageData(
  websiteId: string,
    slug: string
  ): Promise<Page & {error: string}> {

    // Replace with your actual endpoint URL from Site A
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    // console.log(baseUrl, websiteId, slug);
    try {
      const response = await fetch(`${baseUrl!}/websites/page`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            website_id: websiteId,
            slug: slug,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // const { html, css } = data;

      return data;
    } catch (error) {
      console.error("Error calling Site A endpoint:", error);
      throw error;
    }
  }
  
export async function getPages(
  websiteId: string,
  ): Promise<Page[]> {
    // Replace with your actual endpoint URL from Site A
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;
    // console.log(baseUrl, websiteId);

    try {
        const response = await fetch(`${baseUrl!}/websites/pages`, {
            method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            website_id: websiteId
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error("Error calling Site A endpoint:", error);
      throw error;
    }
  }
  