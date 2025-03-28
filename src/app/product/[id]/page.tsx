import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import Image from "next/image";
import Stripe from "stripe";
import { BuyButton } from "./components/buy-button";
import { Metadata } from "next";

export default async function Product({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params

  const data = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  })

  const price = data.default_price as Stripe.Price;

  const product = {
    id: data.id,
    name: data.name,
    imageUrl: data.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format((price.unit_amount || 0) / 100),
    description: data.description,
    defaultPrice: price.id
  }
  
  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt={`Produto: ${product.name}`}
          width={520}
          height={480}
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <BuyButton priceId={product.defaultPrice} />
      </ProductDetails>
    </ProductContainer>
  )
}

export async function generateStaticParams() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 10
  })

  return response.data.map((product) => ({
    id: product.id
  }))
}

export async function generateMetadata({ params }: { params:  Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  const data = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const productName = data.name;

  return {
    title: `${productName} | Elite Shop`,
  };
}

export const revalidate = 3600;