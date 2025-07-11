// src/pages/PatientsPage.tsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import Sidebar from "./AdminSidebar";

interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  photo_url?: string;
  birth_date?: string;
  address?: string;
  city?: string;
  country?: string;
  email: string;
  password: string;
  phone_number?: string;
  allergies_to_medicine?: string;
  blood_group?: string;
  height_cm?: number;
  weight_kg?: number;
  gender?: string;
  favorite_specialization?: string;
  created_at?: Date;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [form, setForm] = useState<Partial<Patient>>({});

  const loadPatients = async () => {
    const res = await fetch("/api/patients");
    if (!res.ok) return alert("Erreur lors du chargement");
    const data = await res.json();
    setPatients(data);
  };

const savePatient = async () => {
  const method = editPatient ? "PUT" : "POST";
  const url = editPatient ? `/api/patients/${editPatient.patient_id}` : "/api/patients";

  // Création d'une copie propre sans created_at
  const payload = { ...form };
  delete payload.created_at;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    alert("Erreur lors de la sauvegarde");
    return;
  }

  await loadPatients();
  closeDialog();
};


  const removePatient = async (id: number) => {
    if (!confirm("Supprimer ce patient ?")) return;
    const res = await fetch(`/api/patients/${id}`, { method: "DELETE" });
    if (res.ok) setPatients((prev) => prev.filter((p) => p.patient_id !== id));
  };

  const openNewDialog = () => {
    setEditPatient(null);
    setForm({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (patient: Patient) => {
    setEditPatient(patient);
    setForm(patient);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditPatient(null);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 bg-muted/40 h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Gestion des patients</h1>
            <Button onClick={openNewDialog} className="gap-2">
              <FiPlus /> Ajouter un patient
            </Button>
          </div>

          <Input
            placeholder="Rechercher un patient par nom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <div className="overflow-y-auto flex-1 border rounded bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((p) => (
                  <TableRow key={p.patient_id}>
                    <TableCell>
                      {p.photo_url ? (
                        <img
                          src={p.photo_url}
                          alt="patient"
                          className="h-10 w-10 object-cover rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-300 rounded-full" />
                      )}
                    </TableCell>
                    <TableCell>{p.first_name} {p.last_name}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>{p.phone_number}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog(p)}>
                        <FiEdit />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => removePatient(p.patient_id)}>
                        <FiTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editPatient ? "Modifier le patient" : "Ajouter un patient"}</DialogTitle>
                <DialogDescription>Remplissez les informations du patient.</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Prénom" value={form.first_name || ""} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                <Input placeholder="Nom" value={form.last_name || ""} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                <Input placeholder="Email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input
  placeholder="Mot de passe"
  type="password"
  value={form.password || ""}
  onChange={(e) => setForm({ ...form, password: e.target.value })}
/>
                <Input placeholder="Téléphone" value={form.phone_number || ""} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
                <Input placeholder="Adresse" value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <Input placeholder="Ville" value={form.city || ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <Input placeholder="Pays" value={form.country || ""} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                <Input placeholder="Groupe sanguin" value={form.blood_group || ""} onChange={(e) => setForm({ ...form, blood_group: e.target.value })} />
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <Button variant="outline" onClick={closeDialog}>Annuler</Button>
                <Button onClick={savePatient}>{editPatient ? "Mettre à jour" : "Enregistrer"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
