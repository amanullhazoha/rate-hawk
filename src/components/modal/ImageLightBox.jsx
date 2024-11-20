import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageLightBox = ({ images, open, setOpen }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides(
      images.map((image, index) => ({
        src: image,
        // caption: image.caption,
        // index: index + 1,
      }))
    );

    setOpen(false);
  }, [images]);

  return (
    <div>
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} />
    </div>
  );
};

export default ImageLightBox;
