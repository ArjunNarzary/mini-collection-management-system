import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

const DashboardContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Button>
          <PlusIcon /> Add Customer
        </Button>
      </div>
    </div>
  )
}

export default DashboardContainer
