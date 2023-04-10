import PropTypes from "prop-types";
import { createContext } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ value, children }) => {
	return (
		<>
			<UserContext.Provider value={value}>
				{children}
			</UserContext.Provider>
		</>
	);
};

UserContextProvider.propTypes = {
	value: PropTypes.array,
	children: PropTypes.element,
};

export default UserContextProvider;