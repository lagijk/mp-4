// handles user input of champion names

"use client";
import { useState, useEffect } from "react";

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
        <form method="GET" action={`/champion/${selected}`}>

            <select value={selected} onChange={(e) => setSelected(e.target.value)} required>
                <option value="">Look up a Champion</option>
                {champ.map( name => 
                    <option key={name} value={name}>
                        {name}
                    </option>
                )}
            </select>
        
            <button type="submit">View</button>
        </form >
    );

}