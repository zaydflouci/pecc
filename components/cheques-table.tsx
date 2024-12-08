"use client"

import { useState, useEffect } from 'react'
import { ChevronDown, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Cheque, cheques } from '../lib/data.ts'
import { DateRangePicker, DateRange } from './date-range-picker'

export function ChequesTable() {
  const [filteredCheques, setFilteredCheques] = useState<Cheque[]>(cheques)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>(undefined)
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [isFilterApplied, setIsFilterApplied] = useState(false)

  useEffect(() => {
    let result = cheques

    if (searchTerm) {
      result = result.filter(cheque => 
        cheque.emetteur.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (dateRange?.from && dateRange?.to) {
      result = result.filter(cheque => 
        cheque.date >= dateRange.from && cheque.date <= dateRange.to
      )
    }

    if (statusFilter.length > 0) {
      result = result.filter(cheque => statusFilter.includes(cheque.statut))
    }

    setFilteredCheques(result)

    // Check if any filter is applied
    setIsFilterApplied(
      searchTerm !== '' || 
      (dateRange?.from !== undefined && dateRange?.to !== undefined) || 
      statusFilter.length > 0
    )
  }, [searchTerm, dateRange, statusFilter])

  const resetFilters = () => {
    setSearchTerm('')
    setDateRange(undefined)
    setStatusFilter([])
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center py-4 gap-4">
        <Input
          placeholder="Rechercher par émetteur..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm"
        />
        <DateRangePicker
          className="w-full sm:w-auto"
          onChange={(range) => setDateRange(range)}
          value={dateRange}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Statut <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {["Provisionné", "Rejetée"].map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                className="capitalize"
                checked={statusFilter.includes(status)}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, status]
                      : statusFilter.filter((s) => s !== status)
                  )
                }}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {isFilterApplied && (
          <Button 
            variant="ghost" 
            onClick={resetFilters}
            className="w-full sm:w-auto"
          >
            Réinitialiser les filtres
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>L'émetteur</TableHead>
              <TableHead>Chèque N°</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCheques.map((cheque) => (
              <TableRow key={cheque.id}>
                <TableCell className="font-medium">{cheque.emetteur}</TableCell>
                <TableCell>{cheque.numero}</TableCell>
                <TableCell>
                  <Badge variant={cheque.statut === 'Provisionné' ? 'success' : 'destructive'}>
                    {cheque.statut}
                  </Badge>
                </TableCell>
                <TableCell>{cheque.date.toLocaleDateString('fr-FR')}</TableCell>
                <TableCell className="font-medium text-right">
                  {new Intl.NumberFormat('fr-TN', {
                    style: 'currency',
                    currency: 'TND',
                  }).format(cheque.montant)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

