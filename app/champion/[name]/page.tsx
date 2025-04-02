// app/champion/[name]/page.tsx  Uses [name] directory since champion name can change dynamically.
// Shows champion information after user selection

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

export default function ChampionDisplay() {
    // stores champion data and any error
    const [champ, setChamp] = useState<any>(null);
    const [error, setError] = useState("");

    // gets dynamic route parameters from
    // champion name like Aatrox with /champion/Aatrox
    const {name} = useParams();
    
    useEffect(() =>{
        // if no champion name found return error
        if (!name || typeof name !== "string") {
            setError("No champion name provided");
            return;
        }

        // fetch champion data from public api Data Dragon
        const fetchChamp = async () => {
            try {
                // make sure the api url includes the champion name
                const data = await fetch(`https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/champion/${name}.json`);
                const result = await data.json();
                // save result based on champion name
                setChamp(result.data[name]);

            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchChamp();
    }, []);

    // error handling
    if (error) return <Typography color="error" variant="body1" p={4}>Error: {error}</Typography>;
    if (!champ) return <Typography variant="body1" p={4}>No champion data found.</Typography>;
    
    // page rendering
    return (
          <Box maxWidth="md" mx="auto" my={6} px={2}>
            <Typography variant="h4" fontWeight="bold">{champ.name} - {champ.title}</Typography>
            <Typography variant="body1">{champ.lore}</Typography>
          
            <Box display="flex" justifyContent="center" my={4}>
              <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
                  alt={champ.name}
                  style={{
                    borderRadius: "8px",
                    width: "100%",             
                    maxWidth: "400px",        
                    height: "500px",           
                    objectFit: "contain"        
                  }}
                />
            </Box>
            
            <Typography variant="h5" fontWeight="medium">Abilities</Typography>
            <Paper elevation={2}>
              <List> 
                <ListItem>
                <ListItemText
                  primary={`Passive - ${champ.passive.name}`}
                  secondary={champ.passive.description}
                />
                </ListItem>

                {champ.spells.map((spell: any) => (
                  <Box key={spell.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={spell.name}
                        secondary={spell.description}
                      />
                    </ListItem>
                  </Box>
                ))}
                </List>
            </Paper>
          </Box>
      );
}