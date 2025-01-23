import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl font-bold">Explore Anime</h2>

      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        <ModeToggle />
        <Button>Click me</Button>
      </section>
    </main>
  );
};

export default HomePage;
