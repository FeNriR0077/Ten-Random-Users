import { useContext, useRef } from "react";
import { UserContext } from "src/contexts";

const Search = () => {
	const { actions: { handleSearch } } = useContext(UserContext);
	const searchInput = useRef();

	return (
		<div className="relative search-box">
			<i className="absolute px-2 py-2 text-white fa-solid fa-magnifying-glass"></i>

			<input
				ref={searchInput}
				id="user-action-search"
				type="text"
				className="px-2 py-1 text-lg text-white capitalize rounded-md placeholder:text-slate-300 pl-9 border-slate-400 bg-sky-600"
				placeholder="Search By First Name"
				onChange={() => handleSearch(searchInput.current.value.toLowerCase())}
			/>
		</div>
	);
};

export default Search;