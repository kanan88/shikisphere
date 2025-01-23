import Loading from "@/components/Loading";
import SearchAnime from "@/components/SearchAnime";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchAnime />
    </Suspense>
  );
};

export default HomePage;
