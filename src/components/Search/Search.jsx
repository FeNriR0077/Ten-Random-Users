import { useContext } from "react";
import { UserContext } from "src/contexts";

const Search = () => {
	const { actions: { handleSearch }, queries: { search } } = useContext(UserContext);

	return (
		<div className="relative search-box">
			<i className="absolute px-2 py-2 text-white fa-solid fa-magnifying-glass"></i>

			<input
				ref={search}
				id="user-action-search"
				type="text"
				className="px-2 py-1 text-lg text-white capitalize rounded-md placeholder:text-slate-50 pl-9 border-slate-700 bg-sky-500 hover:bg-sky-600"
				placeholder="Search By First Name"
				onChange={() => handleSearch(search.current.value.toLowerCase())}
			/>
		</div>
	);
};

export default Search;