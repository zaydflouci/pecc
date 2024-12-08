export type Cheque = {
  id: string;
  emetteur: string;
  numero: string;
  statut: 'Provisionné' | 'Rejetée';
  date: Date;
  montant: number;
};

export const cheques: Cheque[] = [
  {
    id: '1',
    emetteur: 'Entreprise XYZ',
    numero: '1234567',
    statut: 'Provisionné',
    date: new Date('2024-12-08'),
    montant: 13450.00,
  },
  {
    id: '2',
    emetteur: 'Société ABC',
    numero: '7654321',
    statut: 'Rejetée',
    date: new Date('2024-12-10'),
    montant: 8750.50,
  },
  // Add more mock data here...
];

