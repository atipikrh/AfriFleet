const items = [
  'Tableau de bord',
  'Samba-Fleet',
  'Conducteurs',
  'Samba-Fuel',
  'Samba-Care',
  'Samba-Check',
  'Samba-Cash',
  'Samba-Route',
  'Samba-Pulse',
]

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white p-4">
      <div className="text-xl font-bold mb-6 text-orange-500">E-Samba</div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}
