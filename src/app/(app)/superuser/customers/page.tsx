'use client';

import { useState, useEffect } from 'react';
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
import { AddUserForm } from '@/components/superuser/add-user-form';
import { EditUserForm } from '@/components/superuser/edit-user-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile: 'admin' | 'approver' | 'requester' | string;
  status: 'active' | 'inactive';
};

type Customer = {
  id: string;
  name: string;
  createdAt: string;
  status: 'active' | 'inactive';
  users: User[];
};

const initialUsers: { [customerId: string]: User[] } = {
  'CUST-001': [
    { id: 'USER-001', name: 'Alice', email: 'alice@acme.inc', phone: '111-111', profile: 'admin', status: 'active'},
    { id: 'USER-002', name: 'Bob', email: 'bob@acme.inc', phone: '222-222', profile: 'requester', status: 'active'},
  ],
  'CUST-002': [
    { id: 'USER-003', name: 'Charlie', email: 'charlie@globex.com', phone: '333-333', profile: 'approver', status: 'active'},
  ]
};

const initialCustomers: Customer[] = [
  { id: 'CUST-001', name: 'Acme Inc.', createdAt: '2023-01-15', status: 'active', users: initialUsers['CUST-001'] || [] },
  { id: 'CUST-002', name: 'Globex Corporation', createdAt: '2023-02-20', status: 'active', users: initialUsers['CUST-002'] || [] },
  { id: 'CUST-003', name: 'Soylent Corp', createdAt: '2023-03-10', status: 'inactive', users: [] },
  { id: 'CUST-004', name: 'Initech', createdAt: '2023-04-05', status: 'active', users: [] },
  { id: 'CUST-005', name: 'Wayne Enterprises', createdAt: '2023-05-21', status: 'active', users: [] },
];

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isClient, setIsClient] = useState(false);
  const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [isEditCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const [isUsersModalOpen, setUsersModalOpen] = useState(false);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddCustomer = (newCustomerData: { name: string }) => {
    const newCustomer: Customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomerData.name,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      users: [],
    };
    setCustomers(prev => [...prev, newCustomer]);
    setAddCustomerModalOpen(false);
  };

  const handleEditCustomer = (updatedCustomerData: { name: string; status: 'active' | 'inactive' }) => {
    if (selectedCustomer) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === selectedCustomer.id ? { ...c, ...updatedCustomerData } : c
        )
      );
    }
    setEditCustomerModalOpen(false);
    setSelectedCustomer(null);
  };
  
  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  };

  const openEditCustomerModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditCustomerModalOpen(true);
  };

  const openUsersModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setUsersModalOpen(true);
  };

  // User handlers
  const handleAddUser = (newUserData: Omit<User, 'id' | 'status'>) => {
    if (!selectedCustomer) return;

    const newUser: User = {
      ...newUserData,
      id: `USER-${String(Math.random().toString(36).substr(2, 9)).toUpperCase()}`,
      status: 'active',
    };

    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return { ...c, users: [...c.users, newUser] };
      }
      return c;
    }));

    setAddUserModalOpen(false);
  };

  const handleEditUser = (updatedUserData: Omit<User, 'id'>) => {
    if (!selectedCustomer || !selectedUser) return;
    
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          users: c.users.map(u => u.id === selectedUser.id ? { ...u, ...updatedUserData } : u)
        };
      }
      return c;
    }));

    setEditUserModalOpen(false);
    setSelectedUser(null);
  }

  const handleDeleteUser = (userId: string) => {
    if (!selectedCustomer) return;

    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return { ...c, users: c.users.filter(u => u.id !== userId) };
      }
      return c;
    }));
  };

  const openEditUserModal = (user: User) => {
    setSelectedUser(user);
    setEditUserModalOpen(true);
  };


  const renderUsersModal = () => {
    if (!selectedCustomer) return null;

    return (
      <Dialog open={isUsersModalOpen} onOpenChange={(isOpen) => { setUsersModalOpen(isOpen); if (!isOpen) setSelectedCustomer(null); }}>
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
                <DialogTitle>Usuários do Cliente: {selectedCustomer?.name}</DialogTitle>
                <DialogDescription>
                    Gerencie os usuários associados a este cliente.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex justify-end mb-4">
                  <Button size="sm" onClick={() => setAddUserModalOpen(true)}>
                      <PlusCircle className="mr-2"/> Novo Usuário
                  </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Perfil</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCustomer.users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="hidden sm:table-cell capitalize">{user.profile}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                          {user.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditUserModal(user)}>
                                <Edit className="mr-2" /> Editar
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
                                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o usuário.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
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
                  {selectedCustomer.users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">Nenhum usuário encontrado.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
             {/* Add User Modal */}
            <Dialog open={isAddUserModalOpen} onOpenChange={setAddUserModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                        <DialogDescription>
                            Preencha as informações para cadastrar um novo usuário para {selectedCustomer.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <AddUserForm onSubmit={handleAddUser} onCancel={() => setAddUserModalOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditUserModalOpen} onOpenChange={(isOpen) => { setEditUserModalOpen(isOpen); if (!isOpen) setSelectedUser(null); }}>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Editar Usuário</DialogTitle>
                      <DialogDescription>
                          Atualize as informações do usuário.
                      </DialogDescription>
                  </DialogHeader>
                  {selectedUser && <EditUserForm user={selectedUser} onSubmit={handleEditUser} onCancel={() => { setEditUserModalOpen(false); setSelectedUser(null); }} />}
              </DialogContent>
            </Dialog>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="w-full p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle className="text-2xl font-bold font-headline">SuperUser: Clientes</CardTitle>
                <CardDescription>Gerenciamento de clientes da plataforma.</CardDescription>
            </div>
            <Dialog open={isAddCustomerModalOpen} onOpenChange={setAddCustomerModalOpen}>
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
                    <AddCustomerForm onSubmit={handleAddCustomer} onCancel={() => setAddCustomerModalOpen(false)} />
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
                  <TableCell className="hidden md:table-cell">
                    {isClient ? new Date(customer.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ''}
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'secondary' : 'outline'}>
                      {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{customer.users.length}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditCustomerModal(customer)}>
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

      <Dialog open={isEditCustomerModalOpen} onOpenChange={(isOpen) => { setEditCustomerModalOpen(isOpen); if (!isOpen) setSelectedCustomer(null); }}>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>Editar Cliente</DialogTitle>
                  <DialogDescription>
                      Atualize as informações do cliente.
                  </DialogDescription>
              </DialogHeader>
              {selectedCustomer && <EditCustomerForm onSubmit={handleEditCustomer} customer={selectedCustomer} onCancel={() => { setEditCustomerModalOpen(false); setSelectedCustomer(null); }} />}
          </DialogContent>
      </Dialog>
      
      {renderUsersModal()}
    </div>
  );
}
