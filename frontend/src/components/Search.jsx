export default function Search() {
  function search(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    const formData = new FormData(event.target);
    const query = formData.get("query");
    console.log(`You searched for '${query}'`);
  }
  return (
    <section className="px-32 my-8 mx-8">
      <form onSubmit={search}>
        <div className="w-full flex space-x-4">
          <input
            type="text"
            className="rounded border-2 border-slate-200 p-2 w-full"
            placeholder="Search a new image..."
            name="query"
          />
          <button
            type="submit"
            className="bg-slate-200 px-4 py-2 rounded hover:bg-slate-600 hover:text-white font-medium duration-150"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
}
