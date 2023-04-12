import { useContext } from "react";
import { UserContext } from "src/contexts";
import { Error } from "src/components/Common";
import Table from "src/components/Table";
import Filter from "src/components/Filter";
import Search from "src/components/Search";

const Users = () => {
	const {
		states: { loading, error },
		actions: { handleRefresh },
	} = useContext(UserContext);

	const isError = !!error;

	return (
		<div className="mx-auto">
			<button
				type="button"
				id="user-actionrefresh"
				className="block px-4 py-1 mx-auto mb-6 text-lg border-2 rounded-md mt-9 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
				disabled={loading ? "disabled" : ""}
				onClick={handleRefresh}
			>
        		REFRESH
			</button>

			{isError && <Error />}

			<div className="mx-auto w-fit user-table">
				<div className="flex justify-between w-full mb-3 search-and-filter">
					{isError === false && <Search />}

					{isError === false && <Filter />}
				</div>

				{isError === false && <Table />}
			</div>
		</div>
	);
};

export default Users;
