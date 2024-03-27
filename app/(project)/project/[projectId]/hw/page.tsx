import DataTable from "@/components/data-table/data-table";
import { Hardware, hardwareColumns } from "@/components/data-table/columns";

async function getData(): Promise<Hardware[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        type: "CPU",
        masterCPU: "5000G-201-1",
        device: "ASRock IEP-5000G - EcoRT",
        fieldbus: "IEC-61499, EtherCAT",
        tag: "5000G-201-1",
        digitalIn: 0,
        digitalOut: 0,
        analogIn: 0,
        analogOut: 0,
        cabinetId: "201"
      },
      // ...
    ]
}

export default async function HarwareEditorPage(){
    const hwData = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={hardwareColumns} data={hwData} />
        </div>
    )
}