import { Box, Toolbar, Typography } from "@mui/material";

export default function Home() {
    return (
    <Box>
        <Toolbar sx={{ height: '105px'}} />
        <Typography sx={{ padding: '50px'}} paragraph>
        This is where my content will go
        </Typography>
        <Typography sx={{ padding: '50px'}} paragraph>
        More stuff here
        </Typography>
    </Box>)
}