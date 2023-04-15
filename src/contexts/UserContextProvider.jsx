import PropTypes from "prop-types";
import { useEffect, useState, createContext, useRef } from "react";
import fetchUsers from "src/utils";

const FILTEROPTIONS = {
	ASC: "asc",
	DESC: "desc",
	DEF: "def",
};

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
	const [ refresh, setRefresh ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ searchError, setSearchError ] = useState(false);

	const [ orderType, setOrderType ] = useState("asc");

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
				setLoading(true);
				setSearchError(false);

				const res = await fetchUsers(abortController);
				setRawData(res.results);
				setData(res.results);
			} catch (error) {
				if (error.name === "AbortError") {
				} else {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		};

		getUsers();

		return () => abortController.abort();
	}, [refresh]);

	const handleRefresh = () => {
		setRefresh((r) => !r);
		return search.current.value = "";
	};

	const handleFilter = (type,dataArr=[]) => {
		const filterData = dataArr.length === 0 ? [...data] : [...dataArr];
		setOrderType(type);

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
		setSearchError(false);
		const isQuery = !!query;
		handleFilter(orderType,rawData);

		const searchDataList = data.filter((user) => {
			const { name } = user;
			return name.first.toLowerCase().startsWith(query);
		});

		if (searchDataList) {
			setData(searchDataList);
		}

		if(searchDataList.length === 0) {
			setSearchError(true);
		}

		if (isQuery === false) {
			setSearchError(false);
			handleFilter(orderType,rawData);

		};

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
