"use client";

import { useParams } from "next/navigation";

const Dashboard = () => {
  const { userId } = useParams(); // Obtiene el ID del usuario desde la URL

  return (
    <div>
      <h1>Perfil de {userId}</h1>
      <p>Gestiona tus pedidos</p>
    </div>
  );
};

export default Dashboard;
