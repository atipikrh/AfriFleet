type Props = {
  status: 'active' | 'maintenance' | 'inactive'
  className?: string
}

export function StatusBadge({ status, className = '' }: Props) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Actif',
          classes: 'bg-green-100 text-green-700',
        }
      case 'maintenance':
        return {
          label: 'Maintenance',
          classes: 'bg-orange-100 text-orange-700',
        }
      case 'inactive':
        return {
          label: 'Inactif',
          classes: 'bg-gray-100 text-gray-700',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full ${config.classes} ${className}`}
    >
      {config.label}
    </span>
  )
}

