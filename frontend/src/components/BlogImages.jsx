import { useContext } from "react";
import { ImagesContext } from "../context/ImagesContext";
import BlogImageCard from "./BlogImageCard";

export default function BlogImages() {
  const images = useContext(ImagesContext);
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
        {images.length > 0
          ? images.map((image) => (
              <BlogImageCard
                key={image.id}
                image={image.url_small}
                title={image.title}
                description={image.description}
                id={image.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

// id: action.id,
// title: action.title,
// description: action.description,
// url_regular: action.url_regular,
// url_small: action.url_small,
