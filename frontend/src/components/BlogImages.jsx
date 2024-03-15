import { useContext, useEffect } from "react";
import { ImagesContext, ImagesDispatchContext } from "../context/ImagesContext";
import BlogImageCard from "./BlogImageCard";
import axios from "axios";

const FLASK_APP_API_URL = "http://localhost:5050";

async function fetchImagesFromAPI() {
  const url = `${FLASK_APP_API_URL}/images`;
  const { data } = await axios.get(url);

  return data;
}

export default function BlogImages() {
  const images = useContext(ImagesContext);

  const dispatch = useContext(ImagesDispatchContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const imagesFromAPI = await fetchImagesFromAPI();
        // console.log("imagesFromAPI", imagesFromAPI);
        for (const image of imagesFromAPI) {
          dispatch({
            type: "added",
            id: image.id,
            title: image.title,
            description: image.description,
            url_regular: image.image_small,
            url_small: image.image_small,
            saved: true,
          });
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchData();

    // Clean-up function (optional)
    return () => {
      // Perform clean-up actions if needed
    };
  }, [dispatch]);
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
        {images.length > 0
          ? images.map((image) => (
              <BlogImageCard
                key={image.id}
                image_regular={image.url_regular}
                image_small={image.url_small}
                title={image.title}
                description={image.description}
                id={image.id}
                saved={image.saved}
              />
            ))
          : null}
      </div>
    </div>
  );
}
