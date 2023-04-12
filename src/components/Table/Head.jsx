const Head = () => {
	const tableHeadStyles = "bg-sky-200 text-left ";
	const headingStyles = "px-6 py-3";

	return(
		<>
			<thead className={`table-head ${tableHeadStyles}`}>
				<tr className="table-row table-heading-row">
					<th className={`table-heading ${headingStyles}`}>
						{/* profile-image */}
					</th>
					<th className={`table-heading ${headingStyles}`}>
                        NAME
					</th>
					<th className={`table-heading ${headingStyles}`}>
                        DATE OF BIRTH
					</th>
					<th className={`table-heading ${headingStyles}`}>
                        LOCATION
					</th>
					<th className={`table-heading ${headingStyles}`}>
                        PHONE
					</th>
					<th className={`table-heading ${headingStyles}`}>
                        EMAIL
					</th>
				</tr>
			</thead>
		</>
	);
};
export default Head;