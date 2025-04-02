// handles user input of champion names
// material ui code source: https://mui.com/material-ui/all-components/

"use client";
import { useState, useEffect } from "react";
import {Box, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

// handles user input of invalid champion name by adding a dropdown of all champions
export default function ChampionForm() {

    const [champ, setChamp] = useState<string[]>([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        async function fetchChamp() {
            try {
                const data = await fetch("https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/champion.json");
                const result = await data.json();
                //get name of all champions and sort in order for drop down menu
                const champNames = Object.keys(result.data); 
                setChamp(champNames.sort());
            } catch (err) {
                console.error("failed to fetch champion names", err);
            }
        }

        fetchChamp();
    },[]);

    // render the drop down menu and view button using dynamic routing
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Box
                component="form"
                method="GET"
                action={`/champion/${selected}`}
                sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 500 }}
            >
                <FormControl fullWidth>
                    <InputLabel>Look up a Champion</InputLabel>
                    <Select 
                        value={selected} 
                        onChange={(e) => setSelected(e.target.value)} 
                        required>
                        
                        {champ.map( name => 
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            
                <Button variant="contained" type="submit">View</Button>
            </Box>
        </Box>
    );

}