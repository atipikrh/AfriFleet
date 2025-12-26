import * as Tabs from '@radix-ui/react-tabs'

export default function VehicleDetail() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Détail du véhicule</h1>

      <div className="w-full">
        <Tabs.Root defaultValue="details">
          <Tabs.List className="flex gap-4 border-b">
            <Tabs.Trigger value="details">Détails</Tabs.Trigger>
            <Tabs.Trigger value="history">Historique</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="details" className="pt-4">
            Détails du véhicule
          </Tabs.Content>

          <Tabs.Content value="history" className="pt-4">
            Historique du véhicule
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
