import Head from "./Head";
import Body from "./Body";

const Table = () => (
	<div className="flex justify-center w-full text-center table-container">
		<table className="shadow-md user-table ">
			<Head />
			<Body />
		</table>
	</div>
);

export default Table;
