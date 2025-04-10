import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Benner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true }),
  );

  const images = [
    'https://img.freepik.com/free-photo/front-view-stacked-books-ladders-education-day_23-2149241046.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-photo/3d-view-books-cartoon-style_52683-117188.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-vector/modern-school-education-knowledge-concept_3446-665.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-vector/realistic-world-book-day-theme_23-2148476893.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',

    'https://img.freepik.com/free-photo/front-view-stacked-books-ladders-education-day_23-2149241046.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149331952.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-psd/books-icon-isolated-3d-render-illustration_47987-7695.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',

    'https://img.freepik.com/free-psd/pile-books-icon-isolated-3d-render-illustration_47987-15486.jpg?uid=R104361349&ga=GA1.1.1841229347.1715426784&semt=ais_hybrid&w=740',
  ];

  const renderCarousel = () => (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-lg  md:max-w-xl  mb-10 lg:max-w-6xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <Card className="overflow-hidden border-none  shadow-none">
              <CardContent className="p-0">
                <img
                  className="w-full rounded-lg h-[150px] md:h-[200px] lg:h-[250px] object-cover"
                  src={src}
                  alt={`Banner ${index + 1}`}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );

  return (
    <div className="relative mt-0 flex justify-center">{renderCarousel()}</div>
  );
};

export default Benner;
