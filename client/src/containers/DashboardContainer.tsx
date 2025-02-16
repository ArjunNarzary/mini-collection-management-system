import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button"
import { ICustomer } from "@/interfaces"
import { useGetAllCustomersQuery } from "@/services"
import { ColumnDef } from "@tanstack/react-table"
import { PlusIcon } from "lucide-react"

const columns: ColumnDef<ICustomer>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Contact Number",
    accessorKey: "contact_number",
  },
  {
    header: "Payment Due Date",
    accessorKey: "payment_due_date",
  },
  {
    header: "Payment Status",
    accessorKey: "payment_status",
  },
]

const DashboardContainer = () => {
  const { data: allCustomers, isFetching } = useGetAllCustomersQuery()
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Button>
          <PlusIcon /> Add Customer
        </Button>
      </div>
      <div className="mt-4">
        <DataTable
          data={allCustomers?.customers || []}
          columns={columns}
          isLoading={isFetching}
        />
      </div>
    </div>
  )
}

export default DashboardContainer
