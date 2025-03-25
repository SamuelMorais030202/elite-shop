import { IProduct } from "@/types/product";
import HomeClient from "./home-client";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const metadata = {
  revalidate: 60 * 60 * 2 // Revalidação a cada 2 horas
};

export default async function Home() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products: IProduct[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount || 0) / 100)
    }
  })

  return <HomeClient products={products} />
}