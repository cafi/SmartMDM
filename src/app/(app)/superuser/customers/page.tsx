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
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Users, MoreHorizontal } from 'lucide-react';
import { AddCustomerForm } from '@/components/superuser/add-customer-form';
import { EditCustomerForm } from '@/components/superuser/edit-customer-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Customer = {
  id: string;
  name: string;
  createdAt: string;
  status: 'active' | 'inactive';
  userCount: number;
};

const initialCustomers: Customer[] = [
  { id: 'CUST-001', name: 'Acme Inc.', createdAt: '2023-01-15', status: 'active', userCount: 5 },
  { id: 'CUST-002', name: 'Globex Corporation', createdAt: '2023-02-20', status: 'active', userCount: 8 },
  { id: 'CUST-003', name: 'Soylent Corp', createdAt: '2023-03-10', status: 'inactive', userCount: 2 },
  { id: 'CUST-004', name: 'Initech', createdAt: '2023-04-05', status: 'active', userCount: 12 },
  { id: 'CUST-005', name: 'Wayne Enterprises', createdAt: '2023-05-21', status: 'active', userCount: 25 },
];

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isUsersModalOpen, setUsersModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (newCustomerData: { name: string }) => {
    const newCustomer: Customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomerData.name,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      userCount: 0,
    };
    setCustomers(prev => [...prev, newCustomer]);
    setAddModalOpen(false);
  };

  const handleEditCustomer = (updatedCustomerData: { name: string; status: 'active' | 'inactive' }) => {
    if (selectedCustomer) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === selectedCustomer.id ? { ...c, ...updatedCustomerData } : c
        )
      );
    }
    setEditModalOpen(false);
    setSelectedCustomer(null);
  };
  
  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  };

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  const openUsersModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setUsersModalOpen(true);
  }

  return (
    <div className="p-4 md:p-8 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle className="text-2xl font-bold font-headline">SuperUser: Clientes</CardTitle>
                <CardDescription>Gerenciamento de clientes da plataforma.</CardDescription>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="ml-auto gap-1">
                        <PlusCircle />
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
                    <AddCustomerForm onSubmit={handleAddCustomer} onCancel={() => setAddModalOpen(false)} />
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
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Usuários</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(customer.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'secondary' : 'outline'}>
                      {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{customer.userCount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditModal(customer)}>
                          <Edit className="mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openUsersModal(customer)}>
                          <Users className="mr-2" /> Usuários
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                               <Trash2 className="mr-2" /> Excluir
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o cliente e todos os seus dados associados.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCustomer(customer.id)}>
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={(isOpen) => { setEditModalOpen(isOpen); if (!isOpen) setSelectedCustomer(null); }}>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>Editar Cliente</DialogTitle>
                  <DialogDescription>
                      Atualize as informações do cliente.
                  </DialogDescription>
              </DialogHeader>
              {selectedCustomer && <EditCustomerForm onSubmit={handleEditCustomer} customer={selectedCustomer} onCancel={() => { setEditModalOpen(false); setSelectedCustomer(null); }} />}
          </DialogContent>
      </Dialog>
      
      <Dialog open={isUsersModalOpen} onOpenChange={(isOpen) => { setUsersModalOpen(isOpen); if (!isOpen) setSelectedCustomer(null); }}>
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle>Usuários do Cliente: {selectedCustomer?.name}</DialogTitle>
                <DialogDescription>
                    Gerencie os usuários associados a este cliente.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>Página de gerenciamento de usuários em construção...</p>
              <p className="text-sm text-muted-foreground mt-2">Aqui você poderá adicionar, editar e remover usuários para o cliente <strong>{selectedCustomer?.name}</strong>.</p>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
