// app/champion/[name]/page.tsx  Uses [name] directory since champion name can change dynamically.
// Shows champion information after user selection

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
    if (!champ) return <p className="p-4">No champion data found.</p>;
    
    // page rendering
    return (
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-2">{champ.name} - {champ.title}</h1>
          <p className="mb-4">{champ.lore}</p>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
            alt={champ.name}
            className="mb-6 rounded"
            width="400"
          />
          <h2 className="text-xl font-semibold mb-2">Abilities</h2>
          <ul className="space-y-2">
            {champ.spells.map((spell: any) => (
              <li key={spell.id}>
                <strong>{spell.name}</strong>: {spell.description}
              </li>
            ))}
            <li>
              <strong>Passive - {champ.passive.name}</strong>: {champ.passive.description}
            </li>
          </ul>
        </div>
      );
}