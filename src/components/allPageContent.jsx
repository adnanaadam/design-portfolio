import React, { useState, useEffect, useRef } from "react";
import Textbox from "./textbox";
import Background from "./background";
import Showcase from "./imgSlider";

const PageContent = ( pageItems ) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Center the active image smoothly
  useEffect(() => {
    if (sliderRef.current) {
      const middleImage = sliderRef.current.querySelector(
        `.slide-${currentIndex}`
      );
      if (middleImage) {
        middleImage.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [currentIndex]);

  // Define styles for the active and non-active images
  const getSlideStyle = (index) => {
    return index === currentIndex
      ? "opacity-100 border-4 border-[crimson] z-10 transform scale-110"
      : "opacity-60";
  };

  return (
    <div className="w-full h-full">
      <Background bgStyle={pageItems.pageContent[currentIndex].bgStyle} />

      <div className="w-full m-auto flex flex-col justify-center items-center -mt-16">
        <div className="w-full *:z-50 px-16 flex justify-between items-start pb-10">
          <Textbox
            title={pageItems.pageContent[currentIndex].title}
            description={pageItems.pageContent[currentIndex].description}
            iconName={pageItems.pageContent[currentIndex].github.iconName}
            hrefUrl={pageItems.pageContent[currentIndex].github.hrefUrl}
            iconStyle={pageItems.pageContent[currentIndex].github.style}
          />
         <Showcase images={pageItems.pageContent[currentIndex].images} />
        </div>

        <div className="w-full flex justify-center items-center gap-4 cursor-pointer">
          <button
            className="flex"
            onClick={() =>
              setCurrentIndex(
                (currentIndex + pageItems.pageContent.length - 1) %
                  pageItems.pageContent.length
              )
            }
            aria-label="Previous slide"
          >
            <span className="text-6xl text-blue">{`<`}</span>
          </button>

          <div
            className="w-1/2 relative h-32 overflow-x-auto flex items-center no-scrollbar"
            aria-live="polite"
            aria-atomic="true"
            ref={sliderRef}
            style={{ scrollSnapType: "x mandatory" }}
          >
            {pageItems.pageContent.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Slide ${index}`}
                className={`slide rounded-lg w-32 h-28 object-cover mx-2 transition-opacity duration-500 cursor-pointer slide-${index} ${getSlideStyle(
                  index
                )}`}
                data-index={index}
                style={{ scrollSnapAlign: "center" }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <button
            className="flex"
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % pageItems.pageContent.length)
            }
            aria-label="Next slide"
          >
            <span className="text-6xl text-blue">{`>`}</span>
          </button>
        </div>

        <div className="flex items-center justify-center px-10 pt-4">
          {pageItems.pageContent.map((image, index) => (
            <span
              key={index}
              className={`h-3 w-3 mx-1 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-blue" : "bg-blue opacity-30"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageContent;
