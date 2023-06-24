/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, PrevButton, NextButton } from "./CarouselButtons";
import Image from "next/image";
import { type IconType } from "react-icons/lib";
import { BiRightArrowAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useSiembraModal from "@/app/hooks/useSiembraModal";

interface ImageType {
  src: string;
  alt: string;
  title?: string;
  description: string;
  url?: string;
  action?: string;
  icon?: IconType;
}

interface PropType {
  options?: EmblaOptionsType;
  slides: ImageType[];
  style?: string;
}
const autoplayOptions = {
  delay: 6000,
  rootNode: (emblaRoot: { parentElement: any }) => emblaRoot.parentElement,
};

const Carousel: React.FC<PropType> = (props) => {
  const router = useRouter();
  const siembraModal = useSiembraModal();
  if (props.style === undefined) {
    props.style = "";
  }
  const { options, style, slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (emblaApi == null) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      <div className={"embla !p-0 " + style}>
        <div className={"embla__viewport " + style} ref={emblaRef}>
          <div className={"embla__container " + style}>
            {slides.map((image, index) => (
              <div
                className="embla__slide flex justify-center lg:justify-start items-center aspect-video"
                key={index}
              >
                <div className="embla__slide__number px-[50px] py-[60px] flex flex-col gap-y-6 bg-white justify-center lg:justify-start lg:items-start items-center p-4 w-[70%] xl:w-[30%] lg:ml-[60px] shadow-lg text-center lg:text-left">
                  <hr className="bg-green-700 w-[20%] leading-tight h-2 justify-self-start" />
                  <h1 className="lg:text-[44px] md:text-3xl text-2xl font-bold text-gray-800">
                    {image.title}
                  </h1>
                  <p className="lg:text-[16px] md:text-md text-md text-gray-700">
                    {image.description}
                  </p>
                  <button
                    className="bg-green-700 hover:bg-green-800 w-fit text-white font-bold pl-4 py-2 pr-[20px] rounded-sm"
                    onClick={() => {
                      image.url === "sembrar"
                        ? siembraModal.onOpen()
                        : router.push(image.url ?? "/");
                    }}
                  >
                    <span>{image.action}</span>
                    {image.icon != null ? (
                      <image.icon size={24} className="inline-block ml-2" />
                    ) : (
                      <BiRightArrowAlt
                        className="inline-block ml-2"
                        size={24}
                      />
                    )}
                  </button>
                </div>
                <Image
                  className="brightness-50"
                  src={
                    image.src === "No determinado"
                      ? "/images/logo.svg"
                      : image.src ?? "/images/logo.svg"
                  }
                  alt={image.alt}
                  fill
                  priority
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={false} />
        <NextButton onClick={scrollNext} enabled={false} />
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => {
              scrollTo(index);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
