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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";

/**
 * TypeScript model for a banner row.
 */
interface Banner {
  banner_id: number;
  image_url: string;
  description: string;
}

/**
 * CRUD page for banners using shadcn/ui components.
 * Endpoints supposés :
 *   GET    /api/banners
 *   POST   /api/banners
 *   PUT    /api/banners/:banner_id
 *   DELETE /api/banners/:banner_id
 */
export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [form, setForm] = useState({ image_url: "", description: "" });

  /* ----------------- Fetch helpers ----------------- */
  const loadBanners = async () => {
    const res = await fetch("/api/banners");
    const data = await res.json();
    setBanners(data);
  };

  const saveBanner = async () => {
    const method = editBanner ? "PUT" : "POST";
    const endpoint = editBanner ? `/api/banners/${editBanner.banner_id}` : "/api/banners";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      await loadBanners();
      closeDialog();
    } else {
      alert("Erreur lors de la sauvegarde de la bannière");
    }
  };

  const removeBanner = async (id: number) => {
    if (!confirm("Supprimer cette bannière ?")) return;
    const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBanners((prev) => prev.filter((b) => b.banner_id !== id));
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  /* ----------------- UI helpers ----------------- */
  const openNewDialog = () => {
    setEditBanner(null);
    setForm({ image_url: "", description: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (banner: Banner) => {
    setEditBanner(banner);
    setForm({ image_url: banner.image_url, description: banner.description });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditBanner(null);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  /* ----------------- Render ----------------- */
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestion des bannières</h1>
        <Button onClick={openNewDialog} className="gap-2">
          <FiPlus /> Ajouter une bannière
        </Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Image</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-32 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.map((banner) => (
            <TableRow key={banner.banner_id}>
              <TableCell>
                <img
                  src={banner.image_url}
                  alt="banner"
                  className="h-12 w-full object-cover rounded"
                />
              </TableCell>
              <TableCell>{banner.description}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="icon" variant="ghost" onClick={() => openEditDialog(banner)}>
                  <FiEdit />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => removeBanner(banner.banner_id)}>
                  <FiTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog create / edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editBanner ? "Modifier la bannière" : "Ajouter une bannière"}
            </DialogTitle>
            <DialogDescription>
              {editBanner
                ? "Modifiez l'URL de l'image et/ou la description."
                : "Renseignez l'URL de l'image et la description."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="URL de l'image"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              required
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              className="min-h-[6rem]"
            />

            {form.image_url && (
              <img
                src={form.image_url}
                alt="preview"
                className="h-40 w-full object-cover rounded border" 
              />
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={closeDialog}>
                Annuler
              </Button>
              <Button onClick={saveBanner}>
                {editBanner ? "Mettre à jour" : "Enregistrer"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
