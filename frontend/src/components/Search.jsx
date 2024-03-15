import { useContext } from "react";
import { ImagesDispatchContext } from "../context/ImagesContext";
import axios from "axios";

const FLASK_APP_API_URL = "http://localhost:5050";
// const FLASK_APP_API_URL =
//   import.meta.env.VITE_FLASK_APP_API_URL || "http://localhost:5050";

console.log("FLASK_APP_API_URL", FLASK_APP_API_URL);
// console.log(import.meta.env);
export default function Search() {
  const dispatch = useContext(ImagesDispatchContext);
  async function search(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    const formData = new FormData(event.target);
    const query = formData.get("query");
    // console.log(`You searched for '${query}'`);

    try {
      const url = `${FLASK_APP_API_URL}/new-image?query=${query}`;
      const { data } = await axios.get(url);

      console.log("RESPONSE", data);
      dispatch({
        type: "added",
        id: data.id,
        title: data.alt_description,
        description: data.description,
        url_regular: data.urls.regular,
        url_small: data.urls.small,
      });

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={search}>
      <div className="mt-7 grid gap-3 w-full sm:inline-flex">
        <input
          type="text"
          id="hero-input"
          name="query"
          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="Search for a photo"
        />
        <button
          className="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href="#"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}
