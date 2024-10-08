import React, { useState, useRef, useEffect } from "react";
import Textbox from "./text";
import Background from "./background";
import Showcase from "./imgSlider";
import ToSite from "./toSite";
import { motion, useScroll, useSpring } from "framer-motion";

const slideVariants = {
  animation: {
    x: [0, -3, 0],
    y: [4, -4, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 4,
        ease: "easeInOut",
      },
      y: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 4,
        ease: "easeInOut",
      },
    },
  },
};

const PageContent = ({ pageContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const slider = scrollRef.current;
    if (slider) {
      const selectedImage = slider.querySelector(`.slide-${currentIndex}`);
      if (selectedImage) {
        selectedImage.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentIndex]);

  const getSlideStyle = (index) =>
    index === currentIndex ? "current-slide" : "";

  const currentPageContent = pageContent[currentIndex];

  return (
    <>
      <div className="w-screen h-screen">
        {/* scroll progress bar */}
        <motion.div
          viewport={{ root: scrollRef }}
          style={{ scaleY }}
          className={`bg-blue fixed top-0 right-0 bottom-0 w-2 rounded origin-top`}
        />

        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50%] h-full">
            <Background
              bgImg={currentPageContent.bgImg}
              bgStyle={currentPageContent.bgStyle}
            />
            <div className="w-full flex flex-col justify-between gap-3 pl-16 -mt-10">
              <div className="w-full flex items-start">
                <div className="w-[80%]">
                  <Textbox
                    title={currentPageContent.title}
                    description={currentPageContent.description}
                  />
                </div>
                <div className="w-20%">
                  {currentPageContent.toSite && (
                    <ToSite
                      siteName={currentPageContent.toSite.siteName}
                      hrefUrl={currentPageContent.toSite.hrefUrl}
                      githubName={currentPageContent.toSite.githubName}
                      githubUrl={currentPageContent.toSite.githubUrl}
                    />
                  )}
                </div>
              </div>
              <Showcase images={currentPageContent.images} />
            </div>

            {/* <div className="w-full flex justify-between cursor-pointer pl-16 my-32">
          <button
            className="flex"
            onClick={() =>
              setCurrentIndex(
                (currentIndex + pageContent.length - 1) % pageContent.length
              )
            }
            aria-label="Previous slide"
          >
            <span className="text-4xl text-blue opacity-50 hover:opacity-100">
              {`<`}Prev
            </span>
          </button>

          <button
            className="flex"
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % pageContent.length)
            }
            aria-label="Next slide"
          >
            <span className="text-4xl text-blue opacity-50 hover:opacity-100">
              Nxt{`>`}
            </span>
          </button>
        </div> */}
          </div>

          <div className="w-[50%] h-full flex items-center justify-between gap-8 pt-16 pr-16">
            <div
              className="slide-cont w-full h-full px-4 flex flex-col items-center gap-4 overflow-y-scroll overflow-x-hidden no-scrollbar -skew-x-[10deg]"
              aria-live="polite"
              aria-atomic="true"
              ref={scrollRef}
            >
              <div className="w-[90%] h-[70%] text-transparent cursor-default">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                quam at autem dolorum eligendi praesentium, deleniti similique
                illo molestiae vero eaque. Nostrum sapiente aliquam aut, impedit
                at autem dolorum eligendi praesentium, deleniti similique illo
                molestiae vero eaque. Nostrum sapiente aliquam aut, impedit
              </div>
              {pageContent.map((image, index) => (
                <motion.div
                  key={index}
                  data-index={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`slide relative w-[80%] h-[60%] cursor-pointer slide-${index} ${getSlideStyle(
                    index
                  )}`}
                >
                  {/* animation div and concave and convex shapes */}
                  <motion.div
                    className="absolute m-auto -left-5 right-0 top-0 bottom-0 w-[110%] h-[105%] bg-transparent"
                    variants={slideVariants}
                    animate={currentIndex === index ? "animation" : ""}
                  >
                    <div class="absolute inset-y-0 right-0 w-9 bg-darkBlue"></div>
                    <div class="absolute inset-y-0 left-0 w-8 bg-darkBlue"></div>
                    {/* <div class="absolute inset-x-0 top-0 h-7 bg-blue"></div> */}
                    {/* <div class="absolute inset-x-0 bottom-0 h-7 bg-blue"></div> */}

                    {/* convex and concave shapes */}
                    <div className="top absolute top-0 -right-7 w-full h-[20%] bg-darkBlue"></div>
                    <div className="bottom absolute bottom-0 -right-7 w-full h-[15%] bg-darkBlue"></div>
                  </motion.div>

                  {/* image */}
                  <img
                    src={image.url}
                    alt={`Slide ${index}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}

              <div className="w-[90%] h-[70%] text-transparent cursor-default">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                quam at autem dolorum eligendi praesentium, deleniti similique
                illo molestiae vero eaque. Nostrum sapiente aliquam aut, impedit
              </div>
            </div>

            <div className="relative flex flex-col cursor-pointer group">
              {pageContent.map((_, index) => (
                <span
                  key={index}
                  className={`mx-1 rounded-full my-2 ${
                    currentIndex === index
                      ? "bg-blue h-6 w-3 origin-center transition-all duration-700"
                      : "h-3 w-3 border-2 border-blue"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></span>
              ))}
              <div
                className={`absolute w-[10rem] flex flex-col top-0 right-0 bg-darkBlue scale-0 origin-right rounded-lg p-2 text-sm shadow-md transition-all duration-300 ease-in-out group-hover:scale-100`}
              >
                {pageContent.map((pageContent, index) => (
                  <p
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="py-1 hover:text-blue"
                  >
                    {pageContent.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageContent;
