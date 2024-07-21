import React, { useState, useEffect, useRef } from "react";
import Textbox from "./text";
import Background from "./background";
import Showcase from "./imgSlider";
import PropTypes from 'prop-types';
import 'animate.css';

const PageContent = (pageItems) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Center the active image smoothly
  useEffect(() => {
    if (sliderRef.current) {
      const middleImage = sliderRef.current.querySelector(
        `.slide-${currentIndex}`
      );
      if (middleImage) {
        const containerWidth = sliderRef.current.offsetWidth;
        const imageWidth = middleImage.offsetWidth;
        const scrollPosition = middleImage.offsetLeft - (containerWidth / 2) + (imageWidth / 2);
        
        // Add the smooth scrolling class
        sliderRef.current.classList.add('scroll-smooth');
        sliderRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
        // Remove the smooth scrolling class after the transition
        setTimeout(() => {
          sliderRef.current.classList.remove('scroll-smooth');
        }, 2000); // match the duration of your transition
      }
    }
  }, [currentIndex]);

  // Define styles for the active and non-active images
  const getSlideStyle = (index) => {
    return index === currentIndex
      ? "opacity-100 border-2 border-[crimson] z-10 transform scale-125"
      : "opacity-50";
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Background bgStyle={pageItems.pageContent[currentIndex].bgStyle} />

      <div className="w-full m-auto flex flex-col justify-center items-center -mt-16 animate__animated animate__fadeInUp animate__slow">
        <div className="w-full *:z-50 px-16 flex justify-between items-start pb-10">
          <Textbox
            title={pageItems.pageContent[currentIndex].title}
            description={pageItems.pageContent[currentIndex].description}
            Icon={pageItems.pageContent[currentIndex].icon.Icon}
            iconName={pageItems.pageContent[currentIndex].icon.iconName}
            hrefUrl={pageItems.pageContent[currentIndex].icon.hrefUrl}
            iconStyle={pageItems.pageContent[currentIndex].icon.style}
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
            <span className="text-6xl text-blue opacity-50 hover:opacity-100">{`<`}</span>
          </button>

          <div
            className="max-w-[50%] p-4 relative h-32 overflow-x-auto flex items-center no-scrollbar"
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
                className={`slide rounded-lg w-32 h-24 object-cover mx-3 transition duration-[2s] cursor-pointer slide-${index} ${getSlideStyle(
                  index
                )}`}
                data-index={index}
                // style={{ scrollSnapAlign: "center" }}
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
            <span className="text-6xl text-blue opacity-50 hover:opacity-100">{`>`}</span>
          </button>
        </div>

        <div className="flex items-center justify-center px-10 pt-4">
          {pageItems.pageContent.map((image, index) => (
            <span
              key={index}
              className={`h-3 w-3 mx-1 rounded-full cursor-pointer transition duration-1000 ${
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

PageContent.propTypes = {
  pageItems: PropTypes.shape({
    pageContent: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        bgStyle: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired
          })
        ).isRequired,
        icon: PropTypes.shape({
          Icon: PropTypes.elementType.isRequired,
          iconName: PropTypes.string.isRequired,
          hrefUrl: PropTypes.string.isRequired,
          style: PropTypes.object
        }).isRequired
      })
    ).isRequired
  }).isRequired
};

export default PageContent;
