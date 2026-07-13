import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BarraLateral } from './BarraLateral';
import { BarraSuperior } from './BarraSuperior';

export function DisenoPrincipal() {
  const [menuAbierto, setMenuAbierto] = useState(true);

  return (
    <div className="flex h-screen bg-crema">
      <BarraLateral abierto={menuAbierto} />
      <div className="flex min-w-0 flex-1 flex-col">
        <BarraSuperior
          menuAbierto={menuAbierto}
          onAlternarMenu={() => setMenuAbierto((valor) => !valor)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
