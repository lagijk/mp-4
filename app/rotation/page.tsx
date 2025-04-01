// app/rotation/page.tsx.  Shows weekly free champion rotation page

"use client";
import {useEffect, useState} from "react";

export default function WeeklyRotation() {
    // store list of free champion ids from riot api, or null before loading
    const [freeChampId, setFreeChampId] = useState<number[] | null>(null);
    // store all champion data such as champion name/image from public api (Data Dragon)
    const [champData, setChampData] = useState<any>({});
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
            } catch (err: any) {
                setError(err.message); 
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
            } catch (err: any) {
                console.error(err.message);
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
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Weekly Free Champion Rotation</h1>
          
          {load ? (
            <p>Please wait, loading weekly champion rotation...</p>
          ) : null}

          {error !== "" ? (
            <p className="text-red-600 text-center font-semibold mb-4">
              Error: {error}
            </p>
          ) : null}

          {!load && error === "" && Array.isArray(freeChampId)? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {freeChampId.map(id => {
                const champ = getChampById(id);
                return champ ? (
                  <div key={id} className="text-center bg-white shadow rounded p-3 hover:shadow-md transition">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${champ.image.full}`}
                      alt={`an image of ${champ.name}`}
                      className="w-20 h-auto mx-auto mb-2"
                    />
                    <p>{champ.name}</p>
                  </div>
                ) : null;
              })}
            </div>
          ): null }

        </div>
      );
    
}