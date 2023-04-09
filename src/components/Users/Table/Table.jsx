import Body from "./Body";
import Head from "./Head";

const Table = () => {
	return (
		<div className="table-container">
			<table className="user-table">
				<Head />
				<Body />
			</table>
		</div>
	);
};

export default Table;
