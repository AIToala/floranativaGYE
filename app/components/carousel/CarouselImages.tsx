import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState, type FC } from "react";
import { Thumb } from "./CarouselButtons";

interface PropType {
  slides: ImageType[];
  options?: EmblaOptionsType;
  style?: string;
}
interface ImageType {
  src: string;
  alt: string;
  description: string;
}
const autoplayOptions = {
  delay: 6000,
  rootNode: (emblaRoot: { parentElement: any }) => emblaRoot.parentElement,
};
const CarouselImages: FC<PropType> = (props) => {
  if (props.style === undefined) {
    props.style = "";
  }
  const { slides, options, style } = props;
  let images = [];
  if (slides === null) {
    images = [
      {
        src: "No determinado",
        description: "Presentacion",
        alt: "Presentacion",
      },
      {
        src: "No determinado",
        description: "Fruta",
        alt: "Fruta",
      },
      {
        src: "No determinado",
        description: "Hoja",
        alt: "Hoja",
      },
      {
        src: "No determinado",
        description: "Flor",
        alt: "Flor",
      },
      {
        src: "No determinado",
        description: "Detalle de flor",
        alt: "Detalle de flor",
      },
      {
        src: "No determinado",
        description: "Corteza",
        alt: "Corteza",
      },
      {
        src: "No determinado",
        description: "Semilla",
        alt: "Semilla",
      },
    ];
  } else {
    images = slides;
  }
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (emblaMainApi == null || emblaThumbsApi == null) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (emblaMainApi == null || emblaThumbsApi == null) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (emblaMainApi == null) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <>
      <div className={"embla " + style}>
        <div className={"embla__viewport "} ref={emblaMainRef}>
          <div className={"embla__container"}>
            {images.map((image, index) => (
              <div
                className="embla__slide flex justify-center items-end aspect-square md:h-[60vh]"
                key={index}
              >
                <div className="embla__slide__number bg-black/70 mb-2 p-4 text-white w-fit shadow-lg text-center font-semibold text-xl !rounded-xl">
                  {image.description}
                </div>
                <Image
                  className="!rounded-full aspect-square object-contain"
                  src={
                    image.src === "No determinado"
                      ? "/images/logos/fngye-logo-item.png"
                      : image.src
                  }
                  fill
                  alt={image.src}
                  priority
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {images.map((image, index) => (
                <Thumb
                  onClick={() => {
                    onThumbClick(index);
                  }}
                  selected={index === selectedIndex}
                  index={index}
                  imgSrc={
                    image.src === "No determinado"
                      ? "/images/logos/fngye-logo-item.png"
                      : image.src
                  }
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselImages;
