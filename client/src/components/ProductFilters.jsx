function ProductFilters({
  search,
  setSearch,
  sort,
  setSort,
  brand,
  setBrand,
  minRating,
  setMinRating,
  inStock,
  setInStock,
  maxPrice,
  setMaxPrice,
  resetFilters
}){

  return(
    <div className="bg-[#111827] rounded-2xl border border-cyan-400/20 p-6 sticky top-24">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Filters
      </h2>

      <div className="mb-5">
        <label className="text-gray-300 block mb-2">
          Search
        </label>

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          placeholder="Search..."
        />
      </div>

      <div className="mb-5">
        <label className="text-gray-300 block mb-2">
          Brand
        </label>

        <input
          value={brand}
          onChange={(e)=>setBrand(e.target.value)}
          className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          placeholder="Brand"
        />
      </div>

      <div className="mb-5">
        <label className="text-gray-300 block mb-2">
          Maximum Price
        </label>

        <input
          type="range"
          min="0"
          max="5000"
          value={maxPrice}
          onChange={(e)=>setMaxPrice(Number(e.target.value))}
          className="w-full"
        />

        <p className="text-cyan-400 mt-2">
          Up to ₹{maxPrice}
        </p>
      </div>

      <div className="mb-5">
        <label className="text-gray-300 block mb-2">
          Minimum Rating
        </label>

        <select
          value={minRating}
          onChange={(e)=>setMinRating(Number(e.target.value))}
          className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-3 text-white"
        >
          <option value="0">All</option>
          <option value="4">4★ & Above</option>
          <option value="4.5">4.5★ & Above</option>
        </select>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e)=>setInStock(e.target.checked)}
        />

        <label className="text-gray-300">
          In Stock Only
        </label>
      </div>

      <div className="mb-5">
        <label className="text-gray-300 block mb-2">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
          className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-3 text-white"
        >
          <option value="">Default</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold hover:scale-105 transition"
      >
        Reset Filters
      </button>

    </div>
  );
}

export default ProductFilters;