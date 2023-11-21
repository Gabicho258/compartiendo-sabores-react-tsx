import React, { Component, ReactNode } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  CarouselProps,
} from "reactstrap";
import { useNavigate } from "react-router";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./_Carousel.scss";

interface Category {
  src: string;
  title: string;
  path: string;
}

const categories: Category[] = [
  {
    src: "https://www.comedera.com/wp-content/uploads/2013/05/sopa-de-verduras-1.jpg",
    title: "Sopas",
    path: "/category/Sopas",
  },
  {
    src: "https://www.laylita.com/recetas/wp-content/uploads/Ensalada-de-lechuga-con-limon-y-cilantro.jpg",
    title: "Ensaladas",
    path: "/category/Ensaladas",
  },
  {
    src: "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/3/3_entradas_deliciosas_pero_saludables_que_puedes_darle_a_tus_invitados_si_tienes_una_reunion_en_casa4.jpg",
    title: "Entradas",
    path: "/category/Entradas",
  },
  {
    src: "https://cdn.sanity.io/images/jsdrzfkj/production-esmx/f2e6daecf325638df79ed16b2e5c8ee915482cad-2000x1335.jpg?w=800&h=534&fit=crop",
    title: "Platos Fuertes",
    path: "/category/Platos Fuertes",
  },
  {
    src: "https://media.glamour.mx/photos/63fbac8762e9478a3fe578a3/3:2/w_2429,h_1620,c_limit/Decoraci%C3%B3n%20de%20bebidas.jpg",
    title: "Bebidas",
    path: "/category/Bebidas",
  },
  {
    src: "https://www.lazayafruits.com/es/wp-content/uploads/sites/2/2020/08/nuevas-tendencias-en-pasteleria-industrial-1.jpg",
    title: "Pastelería y Postres",
    path: "/category/Pastelería y Postres",
  },
];

const CategoryCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === categories.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? categories.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = categories.map((item, index) => (
    <CarouselItem
      onExiting={onExiting}
      onExited={onExited}
      key={index}
      className="slides"
    >
      <img
        src={item.src}
        alt={item.title}
        className="slides__images"
        onClick={() => {
          navigate(item.path);
        }}
      />
      <CarouselCaption
        className="slides__caption"
        captionText={
          <div
            className="slides__caption-text"
            onClick={() => {
              navigate(item.path);
            }}
          >
            {item.title}
          </div>
        }
        captionHeader={
          <div
            className="slides__caption-text"
            onClick={() => {
              navigate(item.path);
            }}
          >
            {item.title}
          </div>
        }
      />
    </CarouselItem>
  ));

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={categories}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default CategoryCarousel;
