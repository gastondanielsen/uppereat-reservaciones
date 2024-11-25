import Image from "next/image";
import Img from '@/assets/image.jpg'

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center bg-gray-100">
        <Image src={Img} alt="Image" />
      </div>
    </>
  );
}
