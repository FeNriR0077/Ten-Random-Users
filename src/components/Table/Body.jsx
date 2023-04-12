import { useContext } from "react";
import { UserContext } from "src/contexts";
import { Loading } from "src/components/Common";

const Body = () => {
	const {
		states: { data, loading, searchError },
	} = useContext(UserContext);

	return (
		<tbody className="table-body">
			{loading && (
				<tr>
					<td colSpan={"100%"}>
						<Loading />
					</td>
				</tr>
			)}

			{searchError && (
				<tr>
					<td colSpan={"100%"} className="p-12">
            Sorry, we cound not find any user with that name.
					</td>
				</tr>
			)}

			{data &&
				data.map((user) => {
					const {
						picture: { thumbnail },
						name: { first, last },
						gender,
						dob: { age, date },
						location: { city, country },
						cell,
						email,
						login: { uuid, username },
					} = user;

					const dateOfBirth = date.slice(0, 10);
					const fullName = first + " " + last;

					const rowStyles = "px-6 even:bg-sky-50";
					const dataStyles = "py-2 px-6 text-left";

					return (
						<tr key={uuid} className={`table-row table-data-row ${rowStyles}`}>
							<td className={`table-data ${dataStyles}`}>
								<img src={thumbnail} alt={fullName} className="rounded-md" />
							</td>

							<td className={`table-data ${dataStyles}`}>
								<p className="name">
									{fullName} ({gender})
								</p>

								<p className="username">@{username}</p>
							</td>

							<td className={`table-data ${dataStyles}`}>
								<p className="dob">{dateOfBirth}</p>

								<p className="age">({age})</p>
							</td>

							<td className={`table-data ${dataStyles}`}>
								{city}, {country}
							</td>

							<td className={`table-data ${dataStyles}`}>{cell}</td>

							<td className={`table-data ${dataStyles}`}>{email}</td>
						</tr>
					);
				})}
		</tbody>
	);
};

export default Body;
