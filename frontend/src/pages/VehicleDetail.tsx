import * as Tabs from '@radix-ui/react-tabs'

export default function VehicleDetail() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Détail du véhicule</h1>

      {/* Wrapper pour le layout (Radix Tabs n'accepte pas className) */}
      <div className="w-full">
        <Tabs.Root defaultValue="details">
          <Tabs.List className="flex gap-4 border-b">
            <Tabs.Trigger
              value="details"
              className="pb-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-black"
            >
              Détails
            </Tabs.Trigger>

            <Tabs.Trigger
              value="history"
              className="pb-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-black"
            >
              Historique
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="details" className="pt-4">
            <p className="text-sm text-gray-600">
              Informations détaillées du véhicule.
            </p>
          </Tabs.Content>

          <Tabs.Content value="history" className="pt-4">
            <p className="text-sm text-gray-600">
              Historique et événements associés au véhicule.
            </p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
