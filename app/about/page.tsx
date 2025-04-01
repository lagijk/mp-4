import ChampionForm from "../../components/champion-form";

// app/about/page.tsx.  Home page for user input
export default function Home() {
  return (
    <>
    <div>
        <h1>Welcome to Champion Finder</h1>
        <p>Select a Champion name to view their abilities and lore.</p>
        <ChampionForm />
    </div>
    </>
  );
}
