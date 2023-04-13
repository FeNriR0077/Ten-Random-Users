import { useContext } from "react";
import { UserContext } from "src/contexts";

const Filter = () => {
	const { queries: { filter }, actions: { handleFilter } } = useContext(UserContext);

	return (
		<div className="relative filter-options">
			<i className="absolute px-2 py-2 text-white fa-solid fa-filter"></i>

			<select
				id= "user-action-filter"
				name="Filter"
				ref={filter}
				className="px-2 py-1.5 pl-8 text-lg text-white rounded-md bg-sky-500 hover:bg-sky-600 cursor-pointer"
				onChange={() => handleFilter(filter.current.value)}
			>
				<option value="def">
                	Default
				</option>

				<option value="asc">
                	Ascending
				</option>

				<option value="desc" >
                	Descending
				</option>
			</select>
		</div>
	);
};

export default Filter;