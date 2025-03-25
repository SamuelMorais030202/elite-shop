import { IProduct } from "@/types/product";
import HomeClient from "./home-client";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
  })

  const data: { products: IProduct[] } = await response.json()

  return <HomeClient products={data.products} />
}
