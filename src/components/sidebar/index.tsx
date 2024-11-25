import { paths } from "@/constants";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white p-4">
      <h1 className="text-center font-bold mt-2">UPPEREAT</h1>
      <ul className="space-y-4 mt-10">
        {paths.map((data) => (
          <li>
            <Link href={data.path}>{data.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
