"use client"

import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { IProduct } from "@/types/product";

interface IHomeClientProps {
  products: IProduct[]
}

export default function HomeClient({ products }: IHomeClientProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {
        products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt="camiseta 1"
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        ))
      }
    </HomeContainer>
  );
}
