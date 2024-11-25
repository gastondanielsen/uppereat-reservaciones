export const statusTranslations = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada",
};

export const statusSelect = [
  {
    label: "Pendiente",
    value: "PENDING",
  },
  {
    label: "Confirmada",
    value: "CONFIRMED",
  },
  {
    label: "Cancelada",
    value: "CANCELLED",
  },
  {
    label: "Completada",
    value: "COMPLETED",
  },
];

export const columns = [
  "Nombre del cliente",
  "Nro. de personas",
  "Fecha y hora",
  "Estado",
];

export const colorOfStatus = (status: string) => {
  switch (status) {
    case "Pendiente":
      return "bg-yellow-200";
    case "Confirmada":
      return "bg-blue-200";
    case "Cancelada":
      return "bg-red-200";
    case "Completada":
      return "bg-green-200";
    default:
      return "";
  }
};

export const paths = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Reservas",
    path: "/reservations",
  },
];