import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Benner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const renderCarousel = () => (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-lg md:max-w-xl lg:max-w-2xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
<CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );

  return (
    <div className="space-y-6 relative">
      {renderCarousel()}
      {/* {renderCarousel()} */}
      {/* {renderCarousel()} */}
{/*        */}
      
    </div>
  );
};

export default Benner;
