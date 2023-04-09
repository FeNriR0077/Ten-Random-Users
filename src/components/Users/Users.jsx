import { useEffect, useState } from "react";
import fetchUsers from "../../utils";
import Table from "./Table/Table";
import { createContext } from "react";

const TRUEFALSE = {
	TRUE: true,
	FALSE: false,
};

export const UserContext = createContext(null);

const Users = () => {
	const [ list, setList ] = useState(null);
	const isList = !!list;
	const [ refresh, setRefresh ] = useState(TRUEFALSE.FALSE);

	useEffect(() => {
		const abortController = new AbortController();

		const getUsers = async () => {
			try {
				const data = await fetchUsers(abortController);
				setList(data.results);
			} catch (error) {
				console.log(error.message);
			} finally {
				// console.log("finally ran");
			}
		};

		getUsers();
		return () => abortController.abort();
	}, [refresh]);

	const handleRefresh = () => setRefresh((r) => !r);

	return (
		<>
			<button type="button" id="user-actionrefresh" onClick={handleRefresh}>
                REFRESH
			</button>
			{isList &&
				<UserContext.Provider value={list}>
					{isList && <Table list={list} />}
				</UserContext.Provider>
			}
		</>

	);
};

export default Users;
