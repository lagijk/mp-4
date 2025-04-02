// app/rotation/page.tsx.  Shows weekly free champion rotation page

"use client";
import {useEffect, useState} from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Champion } from "@/type"

export default function WeeklyRotation() {
    // store list of free champion ids from riot api, or null before loading
    const [freeChampId, setFreeChampId] = useState<number[] | null>(null);
    // store all champion data such as champion name/image from public api (Data Dragon)
    const [champData, setChampData] = useState<Record<string, Champion>>({});
    // error handling and loading variables
    const [error, setError] = useState("");
    const [load, setLoad] = useState(true);

    // fetch weekly rotation's champion ids from secret api
    useEffect(() => {
        const fetchRotation = async () => {
            try {
                const result = await fetch("/api/rotationData");
                // if riot api never respond throw error so page doesn't load forever
                if (!result.ok) {
                  let errorMsg = "Failed to fetch weekly champion rotation data";
                  try {
                    const errorData = await result.json();
                    errorMsg = errorData.error || errorMsg;
                  } catch {
                    // ignore if the response is not json
                  }
                  // throw custom error message for catch
                  throw new Error(errorMsg);
                }

                // if api fetch was successful, save the list of weekly rotation champion ids
                const data = await result.json();
                setFreeChampId(data.freeChampionIds);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
              setLoad(false); //done loading
            }
        };

        fetchRotation();
    }, []);

    // fetch champion image and name from public api Data Dragon
    useEffect(() => {
        const fetchChampData = async () => {
            try {
                const result = await fetch("https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/champion.json");
                const data = await result.json();
                setChampData(data.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };

        fetchChampData();
    
    }, []);
    
    // helper function that gets champion data by their unique id
    const getChampById = (id: number) => {
        for (const key in champData) {
            if (parseInt(champData[key].key) === id) {
                return champData[key];
            }
        }
        return null;
    };

    // page rendering of weekly champion rotation
    return (
        <Box maxWidth="lg" mx="auto" p={4}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" >Weekly Free Champion Rotation</Typography>
          
          {load ? (
            <p>Please wait, loading weekly champion rotation...</p>
          ) : null}

          {error !== "" ? (
            <p>
              Error: {error}
            </p>
          ) : null}

          {!load && error === "" && Array.isArray(freeChampId)? (
            <Grid container spacing={3}>
              {freeChampId.map(id => {
                const champ = getChampById(id);
                return champ ? (
                  <Grid key={id}>
                      <Card sx={{
                        width: 140,
                        height: 180,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: "center",
                        boxShadow: 3,
                        "&:hover": { boxShadow: 6 },
                      }}>
                      <CardMedia 
                        component="img"
                        image={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${champ.image.full}`}
                        alt={`an image of ${champ.name}`}
                        sx={{
                          width: "96px",
                          height: "96px",
                          objectFit: "cover",
                          mt: 2,
                        }}
                      />
                      
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {champ.name}
                      </Typography>
                    </CardContent>
                   
                    </Card>
                  </Grid>
                ) : null;
              })}
            </Grid>
          ): null }
        </Box>
      );
    
}