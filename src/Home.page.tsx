import { Box, Toolbar, Typography } from "@mui/material";

export default function Home() {
    return (
    <Box>
        <Toolbar sx={{ height: '105px'}} />
        <Typography sx={{ padding: '50px'}} paragraph>
        This is MERN stack application to demonstrate my skills in building a simple full-stack web application, as well as showcase my solutions to algorithm exercises that commonly appear during technical interview processes.
        </Typography>
        <Typography sx={{ padding: '50px'}} paragraph>
        More to come, keep checking back for updates!
        </Typography>
    </Box>)
}