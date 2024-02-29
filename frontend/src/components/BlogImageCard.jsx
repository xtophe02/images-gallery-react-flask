import { useContext } from "react";
import { ImagesDispatchContext } from "../context/ImagesContext";

export default function BlogImageCard({ id, title, description, image }) {
  const dispatch = useContext(ImagesDispatchContext);
  return (
    <div className="group rounded-xl overflow-hidden dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      <div className="sm:flex">
        <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
          <img
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
            src={image}
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
          <a
            className="mt-4 inline-flex items-center gap-x-1 text-red-600 decoration-2 hover:underline font-medium cursor-pointer"
            onClick={() => dispatch({ type: "deleted", id })}
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
  );
}
