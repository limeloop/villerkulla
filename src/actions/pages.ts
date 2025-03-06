export async function getPageData(
    websiteKey: string,
    slug: string
  ): Promise<any> {
    // Replace with your actual endpoint URL from Site A
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;

    try {
      const response = await fetch(`${baseUrl!}/websites/page`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            website_id: websiteKey,
            slug: slug,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      const {html, css} = data;

      return {html, css};
    } catch (error) {
      console.error("Error calling Site A endpoint:", error);
      throw error;
      return {error: error};
    }
  }
  
export async function getPages(
    websiteKey: string,
  ): Promise<any> {
    // Replace with your actual endpoint URL from Site A
    const baseUrl = process.env.WEBSITE_DATA_ENDPOINT;

    try {
        const response = await fetch(`${baseUrl!}/websites/pages`, {
            method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            website_id: websiteKey
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
      return {error: error};
    }
  }
  