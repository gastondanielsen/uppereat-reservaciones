"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getDynamicTitle() {
  const pathname = usePathname();

  switch (pathname) {
    case "/":
      return "Bienvenido administrador/a";
    case "/reservations":
      return "Reservas";
    case "/reservations/create":
      return "Crear reserva";
    case "/reservations/edit":
      return "Editar reserva";
    default:
      return "";
  }
}

export default function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden md:block">
            <nav aria-label="Global">
              <h1 className="text-black font-bold text-lg">
                {getDynamicTitle()}
              </h1>
            </nav>
          </div>
          {getDynamicTitle() === "Reservas" && (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  href={"/reservations/create"}
                  className="w-full px-4 py-2 text-white text-sm font-bold
              bg-indigo-600 rounded-md
              hover:bg-indigo-700 focus:outline-none
              focus:bg-indigo-700"
                >
                  Crear reserva
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
