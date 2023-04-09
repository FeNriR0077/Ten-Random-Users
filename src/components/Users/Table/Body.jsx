import { useContext } from "react";
import { UserContext } from "../Users";

const Body = () => {
	const list = useContext(UserContext);
	console.log(list);
	return (
		<tbody className="table-body">
			{list.map((user) => {
				const { login } = user;
				const { uuid } = login;

				return (
					<tr className="table-row table-data-row" key={uuid}>
						<td className="table-data">
						hello
						</td>
						<td className="table-data">
						hello
						</td>
						<td className="table-data">
						hello
						</td>
						<td className="table-data">
						hello
						</td>
					</tr>
				);

			})}
		</tbody>
	);
};

export default Body;