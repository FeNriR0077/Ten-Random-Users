import PropTypes from "prop-types";
import { useEffect, useState, createContext } from "react";
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

	const handleRefresh = () => setRefresh((r) => !r);

	const handleFilter = (type) => {
		const filterData = [...data];

		if (type === FILTEROPTIONS.DEF) {
			setData(rawData);
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

	const handleSearch = (inputValue) => {
		setSearchError(TRUEFALSE.FALSE);
		let isInputValue = !!inputValue;

		const searchDataList = rawData.filter((user) => {
			const { name } = user;
			return name.first.toLowerCase().startsWith(inputValue);
		});
		setData(searchDataList);

		if (isInputValue === false) {
			setData(rawData);
		}

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

	return (
		<>
			<UserContext.Provider
				value={{
					states,
					actions,
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
