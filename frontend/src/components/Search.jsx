import { useContext } from "react";
import { ImagesDispatchContext } from "../context/ImagesContext";

export default function Search() {
  const dispatch = useContext(ImagesDispatchContext);
  async function search(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    const formData = new FormData(event.target);
    const query = formData.get("query");
    // console.log(`You searched for '${query}'`);

    try {
      const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_API_KEY}`;
      const data = await fetch(url);
      const response = await data.json();
      // console.log(response);
      // id: action.id,
      // title: action.title,
      // description: action.description,
      // alt_description: action.alt_description,
      // url_regular: action.url_regular,
      // url_small: action.url_small,
      dispatch({
        type: "added",
        id: response.id,
        title: response.alt_description,
        description: response.description,
        url_regular: response.urls.regular,
        url_small: response.urls.small,
      });

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  }
  const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
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
