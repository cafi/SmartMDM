'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import { AddCustomerForm } from '@/components/superuser/add-customer-form';

type Customer = {
  id: string;
  name: string;
  createdAt: string;
  status: 'active' | 'inactive';
};

const initialCustomers: Customer[] = [
  { id: 'CUST-001', name: 'Acme Inc.', createdAt: '2023-01-15', status: 'active' },
  { id: 'CUST-002', name: 'Globex Corporation', createdAt: '2023-02-20', status: 'active' },
  { id: 'CUST-003', name: 'Soylent Corp', createdAt: '2023-03-10', status: 'inactive' },
  { id: 'CUST-004', name: 'Initech', createdAt: '2023-04-05', status: 'active' },
  { id: 'CUST-005', name: 'Wayne Enterprises', createdAt: '2023-05-21', status: 'active' },
];

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddCustomer = (newCustomerData: { name: string }) => {
    const newCustomer: Customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomerData.name,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    setCustomers(prev => [...prev, newCustomer]);
    setModalOpen(false);
  };
  
  return (
    <div className="p-4 md:p-8 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle className="text-2xl font-bold font-headline">SuperUser: Clientes</CardTitle>
                <CardDescription>Gerenciamento de clientes da plataforma.</CardDescription>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="ml-auto gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Novo Cliente
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                        <DialogDescription>
                            Preencha as informações para cadastrar um novo cliente.
                        </DialogDescription>
                    </DialogHeader>
                    <AddCustomerForm onSubmit={handleAddCustomer} />
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Data Criação</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(customer.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={customer.status === 'active' ? 'secondary' : 'outline'}>
                      {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
