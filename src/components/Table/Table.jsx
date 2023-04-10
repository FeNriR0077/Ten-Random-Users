import Head from "src/components/Table/Head";
import Body from "src/components/Table/Body";

const Table = () => (
	<div className="flex justify-center w-full text-center table-container">
		<table className="shadow-md user-table ">
			<Head />
			<Body />
		</table>
	</div>
);

export default Table;
