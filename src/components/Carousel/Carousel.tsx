import React, { Component, ReactNode } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  CarouselProps,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./_Carousel.scss";

interface Category {
  src: string;
  title: string;
}

const categories: Category[] = [
  {
    src: "https://www.comedera.com/wp-content/uploads/2013/05/sopa-de-verduras-1.jpg",
    title: "Sopas",
  },
  {
    src: "https://www.laylita.com/recetas/wp-content/uploads/Ensalada-de-lechuga-con-limon-y-cilantro.jpg",
    title: "Ensaladas",
  },
  {
    src: "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/3/3_entradas_deliciosas_pero_saludables_que_puedes_darle_a_tus_invitados_si_tienes_una_reunion_en_casa4.jpg",
    title: "Entradas",
  },
  {
    src: "https://cdn.sanity.io/images/jsdrzfkj/production-esmx/f2e6daecf325638df79ed16b2e5c8ee915482cad-2000x1335.jpg?w=800&h=534&fit=crop",
    title: "Platos Fuertes",
  },
  {
    src: "https://media.glamour.mx/photos/63fbac8762e9478a3fe578a3/3:2/w_2429,h_1620,c_limit/Decoraci%C3%B3n%20de%20bebidas.jpg",
    title: "Bebidas",
  },
  {
    src: "https://www.lazayafruits.com/es/wp-content/uploads/sites/2/2020/08/nuevas-tendencias-en-pasteleria-industrial-1.jpg",
    title: "Pastelería y Postres",
  },
];

interface CategoryState {
  activeIndex: number;
}

class CategoryCarousel extends Component<{}, CategoryState> {
  private animating: boolean = false;

  constructor(props: {}) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  private onExiting(): void {
    this.animating = true;
  }

  private onExited(): void {
    this.animating = false;
  }

  private next(): void {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === categories.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  private previous(): void {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? categories.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  private goToIndex(newIndex: number): void {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render(): ReactNode {
    const { activeIndex } = this.state;

    const slides = categories.map((item, index) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={index}
        className="slides"
      >
        <img src={item.src} alt={item.title} className="slides__images" />
        <CarouselCaption captionText={item.title} captionHeader={item.title} />
      </CarouselItem>
    ));

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={categories}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default CategoryCarousel;
