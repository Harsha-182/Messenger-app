import { Box, Typography } from "@mui/material";

interface HeaderProps{
	name: string;
	picture: string;
}

const Header: React.FC<HeaderProps> = ({name, picture}) => {
	const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

	return (
		<Box
			sx={{
				p: 2,
				borderBottom: "1px solid #dbdbdb",
				backgroundColor: "#F0F2F5",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				
			</Box>
			<Typography variant="h6" sx={{ display: "flex", alignItems: "center",
				 fontWeight: 600,
				 fontStyle: "Work Sans",
				 fontSize: '20px',
			 }}>
			<img
					src={picture}
					onError={(e) => {
						e.currentTarget.src = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
					}}
					alt="Profile"
					style={{
						width: 40,
						height: 40,
						borderRadius: "50%",
						marginRight: 10,
					}}
				/>
				{name}
			</Typography>
		</Box>
	);
}

export default Header;