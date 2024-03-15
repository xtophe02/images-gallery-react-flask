// Importing necessary dependencies from React
import { createContext, useReducer } from "react";

// Creating the ImagesContext and ImagesDispatchContext using createContext()
export const ImagesContext = createContext(null);
export const ImagesDispatchContext = createContext(null);

// Defining the imagesReducer function to handle state updates
function imagesReducer(images, action) {
  switch (action.type) {
    case "added": {
      // Adding a new image to the images array and setting saved to false
      const existingImage = images.find((img) => img.id === action.id);
      if (!existingImage) {
        return [
          ...images,
          {
            id: action.id,
            title: action.title,
            description: action.description,
            url_regular: action.url_regular,
            url_small: action.url_small,
            saved: action.saved || false,
          },
        ];
      }

      return images;
    }

    case "deleted": {
      // Removing an image from the images array based on its id
      return images.filter((image) => image.id !== action.id);
    }
    default: {
      // Throwing an error for unknown action types
      throw Error("Unknown action: " + action.type);
    }
  }
}

// Creating the ImagesProvider component to wrap the children components
export function ImagesProvider({ children }) {
  // Using useReducer to manage the state of the images array
  const [images, dispatch] = useReducer(imagesReducer, []);

  return (
    <ImagesContext.Provider value={images}>
      <ImagesDispatchContext.Provider value={dispatch}>
        {children}
      </ImagesDispatchContext.Provider>
    </ImagesContext.Provider>
  );
}
