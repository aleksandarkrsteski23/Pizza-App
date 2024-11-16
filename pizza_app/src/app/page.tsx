import Image from "next/image";
import Banner from "./components/BannerPageComponents/Banner";
import Statistics from "./components/BannerPageComponents/Statistics";
import Facts from "./components/BannerPageComponents/Facts";

export default function Home() {
  return (
    <>
      <Banner />
      <Statistics />
      <Facts />
    </>
  );
}
