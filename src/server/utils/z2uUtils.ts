import { type Z2UQuerySearchResponse } from "~/types";

// Parameters should be validated by zod in the route.ts
export async function getProducts(page: number, query: string) {
  const url = `https://www.z2u.com/searchProductList?page=${page}&keyword=${query}&service_id=&platform_id=&rangeFrom=&rangeTo=&sort=recomm`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "en-US,en;q=0.9",
    "X-Requested-With": "XMLHttpRequest",
  };

  const response = await fetch(url, { headers });
  if (response.ok) {
    const json = (await response.json()) as Z2UQuerySearchResponse;
    await Promise.all(
      json.data.html.data.map(async (product) => {
        const imageUrl = await fetchImageWithHeaders(product.imgurl);
        product.imgurl = imageUrl;
      }),
    );

    return json;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function fetchImageWithHeaders(imageUrl: string) {
  const headers = {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.5",
    "Access-Control-Allow-Origin": "*",
    Connection: "keep-alive",
    Host: "z2u.s3-accelerate.amazonaws.com",
    "If-Modified-Since": "Mon, 15 Apr 2024 08:16:50 GMT",
    "If-None-Match": '"bfa468081bc05bb644184a89a187405c"',
    Referer: "https://www.z2u.com/",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "cross-site",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
  };

  const response = await fetch(imageUrl, { headers });

  if (!response.ok) {
    return "https://miro.medium.com/v2/resize:fit:640/format:webp/1*ngNzwrRBDElDnf2CLF_Rbg.gif";
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const mimeType = response.headers.get("content-type");
  const dataUrl = `data:${mimeType};base64,${base64}`;

  return dataUrl;
}
