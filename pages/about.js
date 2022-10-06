import Image from "next/image";
import Link from "next/link";
import Curiosity from "../public/Curiosity .webp";
import OppandSpirit from "../public/Spirit-Opportunity.jpeg";
import Perserverence from "../public/Perserverence.jpeg";
import NavBarTwo from "../components/NavBarTwo";

export default function about() {
  return (
    <>
      <NavBarTwo />
      <div className="flex column center light-1 font-light">
        <h1>Curiosity Rover</h1>
        <Image src={Curiosity} width="500px" height="300px" />
        <h1>Opportunity and Spirit Twin Rovers</h1>
        <Image src={OppandSpirit} width="500px" height="300px" />
        <h1>Perserverence Rover</h1>
        <Image src={Perserverence} width="500px" height="300px" />
      </div>
    </>
  );
}
