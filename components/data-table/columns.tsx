"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { DataTableColumnHeader } from "./data-table-column-header"

//Will be Prisma Schema
export type Hardware = {
    id: string
    type: "CPU" | "Bus Coupler" | "IO Device" | "VSD" | "ETH Switch"
    masterCPU: string
    device: string
    fieldbus: "IEC-61499, EtherCAT" | "IEC-61499, Modbus" | "Modbus" | "Proprietary"
    tag: string
    digitalIn: number
    digitalOut: number
    analogIn: number
    analogOut: number
    cabinetId: string
}

export const hardwareColumns: ColumnDef<Hardware>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "tag",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tag"/>
        ),
        cell: ({ row }) => <div className="w-[111px]">{row.getValue("tag")}</div>,
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type"/>
        )
    },
    {
        accessorKey: "masterCPU",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Master CPU"/>
        )
    },
    {
        accessorKey: "device",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Device"/>
        )
    },
    {
        accessorKey: "fieldbus",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fieldbus"/>
        )
    },
    {
        accessorKey: "digitalIn",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="DI"/>
        ),
        enableSorting: false,
        enableHiding: true
    },
    {
        accessorKey: "digitalOut",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="DO"/>
        ),
        enableSorting: false
    },
    {
        accessorKey: "analogIn",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="AI (4-20mA)"/>
        ),
        enableSorting: false
    },
    {
        accessorKey: "analogOut",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="AO (4-20mA)"/>
        ),
        enableSorting: false
    },
    {
        accessorKey: "cabinetId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cabinet Id"/>
        )
    }
]