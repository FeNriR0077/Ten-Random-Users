import { useEffect, useState } from "react";
import fetchUsers from "src/utils";
import Table from "src/components/Table";
import UserContextProvider from "src/Hooks";
import { Loading, Error } from "src/components/Utils";

const TRUEFALSE = {
	TRUE: true,
	FALSE: false,
};

const Users = () => {
	const [ refresh, setRefresh ] = useState(TRUEFALSE.FALSE);
	const [ loading, setLoading ] = useState(TRUEFALSE.FALSE);
	const [ error, setError ] = useState(null);

	const [ list, setList ] = useState(null);
	const isList = !!list;

	useEffect(() => {
		const abortController = new AbortController();

		const getUsers = async () => {
			try {
				setList(null);
				setError(null);
				setLoading(TRUEFALSE.TRUE);

				const data = await fetchUsers(abortController);
				setList(data.results);

			} catch (error) {
				if (error.name === "AbortError") {
				} else {
					console.log(error.message);
					setError(error.message);
				}

			} finally {
				setLoading(TRUEFALSE.FALSE);
			}
		};

		getUsers();

		return () => abortController.abort();
	}, [refresh]);

	const handleRefresh = () => setRefresh((r) => !r);

	return (
		<div className="mx-auto">
			<button
				type="button"
				id="user-actionrefresh"
				className="block mt-9 mb-6 mx-auto px-4 py-1 border-2 rounded-md border-sky-600 text-sky-600 text-lg hover:bg-sky-600 hover:text-white"
				disabled={loading ? "disabled" : ""}
				onClick={handleRefresh}
			>
                REFRESH
			</button>

			{loading && <Loading />}
			{error && <Error />}

			{isList &&
				<UserContextProvider value={list}>
					<Table />
				</UserContextProvider>
			}
		</div>

	);
};

export default Users;
