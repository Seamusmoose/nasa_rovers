import Image from "next/image";
import Link from "next/link";
import Curiosity from "../public/Curiosity .webp";
import OppandSpirit from "../public/Spirit-Opportunity.jpeg";
import Perserverence from "../public/Perserverence.jpeg";

export default function about() {
  return (
    <div>
      <Image src={Curiosity} />
      <Image src={OppandSpirit} />
      <Image src={Perserverence} />
    </div>
  );
}
