import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Package,
  List,
  PlusCircle,
  Wrench,
  ClipboardCheck,
  Copy,
  BadgeCheck,
  Settings,
  Database,
  Truck,
  Building,
  Factory,
  Warehouse,
  ShoppingBasket,
  Book,
  Ruler,
  GitFork,
  Network,
  Users,
  Shield,
  UserCog,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: 'Início',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Itens',
    icon: Package,
    children: [
      {
        label: 'Listar todos',
        href: '/items',
        icon: List,
      },
      {
        label: 'Solicitar Novo',
        href: '/items/new-request',
        icon: PlusCircle,
      },
      {
        label: 'Solicitar Ajuste',
        href: '/items/adjustment-request',
        icon: Wrench,
      },
    ],
  },
  {
    label: 'Mesa de Trabalho',
    icon: ClipboardCheck,
    children: [
      {
        label: 'Aprovações',
        href: '/workbench/approvals',
        icon: ClipboardCheck,
      },
      {
        label: 'Duplicidades',
        href: '/workbench/duplicates',
        icon: Copy,
      },
      {
        label: 'Data Quality',
        href: '/workbench/data-quality',
        icon: BadgeCheck,
      },
    ],
  },
  {
    label: 'Configurações',
    icon: Settings,
    children: [
      {
        label: 'Dados Mestre',
        icon: Database,
        children: [
          {
            label: 'Materiais (TIPI)',
            href: '/settings/master-data/materials',
            icon: Package,
          },
          {
            label: 'Serviços (LC116)',
            href: '/settings/master-data/services',
            icon: Truck,
          },
          {
            label: 'Empresas',
            href: '/settings/master-data/companies',
            icon: Building,
          },
          {
            label: 'Plantas',
            href: '/settings/master-data/plants',
            icon: Factory,
          },
          {
            label: 'Armazéns',
            href: '/settings/master-data/warehouses',
            icon: Warehouse,
          },
          {
            label: 'Grupos de Compra',
            href: '/settings/master-data/purchasing-groups',
            icon: ShoppingBasket,
          },
          {
            label: 'Classes de Avaliação',
            href: '/settings/master-data/valuation-classes',
            icon: Book,
          },
          {
            label: 'Unidades de Medida',
            href: '/settings/master-data/units-of-measure',
            icon: Ruler,
          },
          {
            label: 'Workflows',
            href: '/settings/master-data/workflows',
            icon: GitFork,
          },
        ],
      },
    ],
  },
  {
    label: 'Árvore de Categorias',
    href: '/category-tree',
    icon: Network,
  },
  {
    label: 'SuperUser',
    icon: Shield,
    children: [
      {
        label: 'Clientes',
        href: '/superuser/customers',
        icon: Users,
      },
      {
        label: 'Usuários por Cliente',
        href: '/superuser/users',
        icon: UserCog,
      },
    ],
  },
];
