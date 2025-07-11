// src/pages/ProfessionalsPage.tsx
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

interface Professional {
  professional_id: number;
  clinic_id?: number;
  full_name: string;
  clinic_name?: string;
  city?: string;
  country?: string;
  email: string;
  password: string;
  phone_number?: string;
  specialization?: string;
  practice_tenure?: number;
  practice_start_date?: string;
  type?: string;
  is_premium?: boolean;
  created_at?: string;
  photo_url?: string; // ✅ Assure-toi que ce champ est là
}


export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editProfessional, setEditProfessional] = useState<Professional | null>(null);
  const [form, setForm] = useState<Partial<Professional>>({});

const loadProfessionals = async () => {
  const res = await fetch("/api/professional");
  if (!res.ok) return alert("Erreur lors du chargement");

  const data = await res.json();

  // Ajoute les photo_url à chaque professionnel
  const professionalsWithPhotos = await Promise.all(
    data.map(async (pro: Professional) => {
      const photo_url = await fetchProfilePhoto(pro.professional_id);
      return { ...pro, photo_url };
    })
  );

  setProfessionals(professionalsWithPhotos);
};

  const fetchProfilePhoto = async (professionalId: number): Promise<string | null> => {
  try {
    const res = await fetch(`/api/photos/pro/${professionalId}`);
    if (!res.ok) return null;

    const photos = await res.json();
    // Prends la première photo ou celle de type 'profile'
    const profilePhoto = photos.find((p: any) => p.type === 'profile') || photos[0];
    return profilePhoto?.photo_url || null;
  } catch (error) {
    console.error("Erreur chargement photo:", error);
    return null;
  }
};


  const saveProfessional = async () => {
    const method = editProfessional ? "PUT" : "POST";
    const url = editProfessional ? `/api/professional/${editProfessional.professional_id}` : "/api/professional";

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

    await loadProfessionals();
    closeDialog();
  };

  const removeProfessional = async (id: number) => {
    if (!confirm("Supprimer ce professionnel ?")) return;
    const res = await fetch(`/api/professional/${id}`, { method: "DELETE" });
    if (res.ok) setProfessionals((prev) => prev.filter((p) => p.professional_id !== id));
  };

  const openNewDialog = () => {
    setEditProfessional(null);
    setForm({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (professional: Professional) => {
    setEditProfessional(professional);
    setForm(professional);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditProfessional(null);
  };

  useEffect(() => {
    loadProfessionals();
  }, []);

  const filteredProfessionals = professionals.filter((p) =>
    p.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 bg-muted/40 h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Gestion des professionnels</h1>
            <Button onClick={openNewDialog} className="gap-2">
              <FiPlus /> Ajouter un professionnel
            </Button>
          </div>

          <Input
            placeholder="Rechercher par nom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <div className="overflow-y-auto flex-1 border rounded bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo de profile</TableHead>
                  <TableHead>Nom complet</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
<TableBody>
  {filteredProfessionals.map((p) => (
    <TableRow key={p.professional_id}>
      <TableCell>
        {p.photo_url ? (
          <img
            src={p.photo_url}
            alt="photo professionnel"
            className="h-10 w-10 object-cover rounded-full"
          />
        ) : (
          <div className="h-10 w-10 bg-gray-300 rounded-full" />
        )}
      </TableCell>
      <TableCell>{p.full_name}</TableCell>
      <TableCell>{p.email}</TableCell>
      <TableCell>{p.phone_number}</TableCell>
      <TableCell>{p.specialization}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button size="icon" variant="ghost" onClick={() => openEditDialog(p)}>
          <FiEdit />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => removeProfessional(p.professional_id)}>
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
                <DialogTitle>{editProfessional ? "Modifier le professionnel" : "Ajouter un professionnel"}</DialogTitle>
                <DialogDescription>Complétez les informations.</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Nom complet" value={form.full_name || ""} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                <Input placeholder="Email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input type="password" placeholder="Mot de passe" value={form.password || ""} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <Input placeholder="Téléphone" value={form.phone_number || ""} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
                <Input placeholder="Ville" value={form.city || ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <Input placeholder="Pays" value={form.country || ""} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                <Input placeholder="Spécialité" value={form.specialization || ""} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <Button variant="outline" onClick={closeDialog}>Annuler</Button>
                <Button onClick={saveProfessional}>{editProfessional ? "Mettre à jour" : "Enregistrer"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
