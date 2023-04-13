import PropTypes from "prop-types";
import { useEffect, useState, createContext, useRef } from "react";
import fetchUsers from "src/utils";

const TRUEFALSE = {
	TRUE: true,
	FALSE: false,
};

const FILTEROPTIONS = {
	ASC: "asc",
	DESC: "desc",
	DEF: "def",
};

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
	const [ refresh, setRefresh ] = useState(TRUEFALSE.FALSE);
	const [ loading, setLoading ] = useState(TRUEFALSE.FALSE);
	const [ searchError, setSearchError ] = useState(TRUEFALSE.FALSE);
	const [ error, setError ] = useState(null);

	const filter = useRef();
	const search = useRef();

	const [ rawData, setRawData ] = useState(null);
	const [ data, setData ] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();

		const getUsers = async () => {
			try {
				setData(null);
				setError(null);
				setLoading(TRUEFALSE.TRUE);

				const res = await fetchUsers(abortController);
				setRawData(res.results);
				setData(res.results);
			} catch (error) {
				if (error.name === "AbortError") {
				} else {
					setError(error.message);
				}
			} finally {
				setLoading(TRUEFALSE.FALSE);
			}
		};

		getUsers();

		return () => abortController.abort();
	}, [refresh]);

	const handleRefresh = () => {
		setRefresh((r) => !r);
		return search.current.value = "";
	};

	const handleFilter = (type) => {
		const filterData = [...data];

		if (type === FILTEROPTIONS.DEF) {
			setData(rawData);
			search.current.value = "";
		}

		if (type === FILTEROPTIONS.ASC) {
			const ascData = filterData.sort((a, b) =>
				a.name.first.toLowerCase().localeCompare(b.name.first)
			);
			setData(ascData);
		}

		if (type === FILTEROPTIONS.DESC) {
			const descData = filterData.sort((a, b) =>
				b.name.first.toLowerCase().localeCompare(a.name.first)
			);
			setData(descData);
		}
	};

	const handleSearch = (query) => {
		setSearchError(TRUEFALSE.FALSE);

		const searchDataList = rawData.filter((user) => {
			const { name } = user;
			return name.first.toLowerCase().startsWith(query);
		});
		setData(searchDataList);

		if (searchDataList.length === 0) {
			setSearchError(TRUEFALSE.TRUE);
		}
	};

	const states = {
		rawData,
		data,
		error,
		loading,
		searchError,
	};

	const actions = {
		handleRefresh,
		handleFilter,
		handleSearch,
	};

	const queries = {
		search,
		filter
	};

	return (
		<>
			<UserContext.Provider
				value={{
					states,
					actions,
					queries
				}}
			>
				{children}
			</UserContext.Provider>
		</>
	);
};

UserContextProvider.propTypes = {
	children: PropTypes.element,
};

export default UserContextProvider;
