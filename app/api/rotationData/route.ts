// api/rotationData/route.ts  API handler that gets weekly champion rotation information from api
// source code from: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET() {

    // shows error message if riot api is down
    if (!process.env.RIOT_GAMES_API_KEY) {
        return Response.json(
            {error: "Something went wrong with Riot's API key."}
        );
    }

    // fetch weekly champion rotation info from riot api
    try {       
        const rawData = await fetch('https://na1.api.riotgames.com/lol/platform/v3/champion-rotations', 
        { 
            headers: {
                'X-Riot-Token': process.env.RIOT_GAMES_API_KEY 
            }
        });
   
    const result = await rawData.json()
    return Response.json(result);
    } catch (err: unknown) {
        let message = "Unknown error";
            if (err instanceof Error) {
                message = err.message;
            }
        return Response.json({error: message});
    }

}