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
    '/src/assets/images/bk7.jpg',
    '/src/assets/images/bk1.jpg',
    '/src/assets/images/bk2.jpg',
    '/src/assets/images/bk8.jpg',

    '/src/assets/images/bk5.jpg',
    '/src/assets/images/bk3.jpg',
    '/src/assets/images/bk4.jpg',

    '/src/assets/images/bk6.jpg',
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
