import { useContext, useState } from "react";
import { ImagesDispatchContext } from "../context/ImagesContext";
import axios from "axios";

const FLASK_APP_API_URL = "http://localhost:5050";

async function saveImageToDB(data) {
  const response = await axios.post(`${FLASK_APP_API_URL}/images`, data, {
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });
  console.log("RESPONSE", response);
}

export default function BlogImageCard({
  id,
  title,
  description,
  image_regular,
  image_small,
  saved,
}) {
  const dispatch = useContext(ImagesDispatchContext);
  const [savedAnchorVisible, setSavedAnchorVisible] = useState(true);
  const handleSaveClick = async () => {
    await saveImageToDB({
      id,
      title,
      description,
      image_small,
      image_regular,
    });
    setSavedAnchorVisible(false); // Hide the anchor after saving
  };
  async function deleteHandler(id) {
    dispatch({ type: "deleted", id });
    await axios.delete(`${FLASK_APP_API_URL}/images/${id}`, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
  }

  return (
    <div className="group rounded-xl overflow-hidden dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      <div className="sm:flex">
        <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
          <img
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
            src={image_small}
            alt={title}
          />
        </div>

        <div className="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white">
            {title.replace(/\b\w/g, (match) => match.toUpperCase())}
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {description ? description : "No description"}
          </p>
          <div className="flex gap-x-2">
            {!saved && savedAnchorVisible && (
              <a
                className="mt-4 inline-flex items-center gap-x-1 text-green-600 decoration-2 hover:underline font-medium cursor-pointer"
                onClick={handleSaveClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.1719L5.8281 12.0008L4.17188 13.8281L9 18L17.8281 10.1719L16.1719 8.50002L9 16.1719Z"
                    fill="#3F88C5"
                  />
                </svg>
                Save
              </a>
            )}
            <a
              className="mt-4 inline-flex items-center gap-x-1 text-red-600 decoration-2 hover:underline font-medium cursor-pointer"
              onClick={() => deleteHandler(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
