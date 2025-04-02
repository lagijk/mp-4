import ChampionForm from "../../components/champion-form";
import { Box, Typography } from "@mui/material";

// app/about/page.tsx.  Home page for user input
export default function Home() {
  return (
    <>
    <Box textAlign="center" mt={6}>
        <Typography variant="h4" fontWeight="bold"> Welcome to Champion Finder</Typography>
        <Typography variant="subtitle1">Select a Champion name to view their abilities and lore.</Typography>
        <ChampionForm />
    </Box>
    </>
  );
}
