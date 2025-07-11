// src/pages/BannersPage.tsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import Sidebar from "./AdminSidebar";

/* -------------------------------------------------------------------------- */
/*                                 Types                                      */
/* -------------------------------------------------------------------------- */

interface Banner {
  banner_id: number;
  image_url: string;
  banner_url: string;
  description: string;
}

type FormState = {
  file: File | null;
  imagePreview: string;
  description: string;
  banner_url: string;
};

/* -------------------------------------------------------------------------- */
/*                               Composant                                    */
/* -------------------------------------------------------------------------- */

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [form, setForm] = useState<FormState>({
    file: null,
    imagePreview: "",
    description: "",
    banner_url: "",
  });

  const loadBanners = async () => {
    const res = await fetch("/api/banners");
    if (!res.ok) return console.error("Fail fetch banners");
    const data = (await res.json()) as Banner[];
    setBanners(data);
  };

  const saveBanner = async () => {
    try {
      const formData = new FormData();
      if (form.file) formData.append("image", form.file);
      formData.append("description", form.description);
      formData.append("banner_url", form.banner_url);

      const url = editBanner
        ? `/api/banners/${editBanner.banner_id}`
        : "/api/banners";
      const method = editBanner ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Erreur HTTP");

      await loadBanners();

      if (form.imagePreview.startsWith("blob:"))
        URL.revokeObjectURL(form.imagePreview);
      setForm({ file: null, imagePreview: "", description: "", banner_url: "" });
      closeDialog();
    } catch (err) {
      console.error(err);
      alert("Erreur : impossible de sauvegarder la bannière.");
    }
  };

  const removeBanner = async (id: number) => {
    if (!confirm("Supprimer cette bannière ?")) return;
    const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
    if (res.ok) setBanners((prev) => prev.filter((b) => b.banner_id !== id));
    else alert("Erreur lors de la suppression");
  };

  const openNewDialog = () => {
    setEditBanner(null);
    setForm({ file: null, imagePreview: "", description: "", banner_url: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (banner: Banner) => {
    setEditBanner(banner);
    setForm({
      file: null,
      imagePreview: banner.image_url,
      description: banner.description,
      banner_url: banner.banner_url,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditBanner(null);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-muted/40 p-8 overflow-y-auto ml-64">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Gestion des bannières</h1>
            <Button onClick={openNewDialog} className="gap-2">
              <FiPlus /> Ajouter une bannière
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.banner_id}>
                  <TableCell>
                    <img
                      src={banner.image_url}
                      alt={`banner-${banner.banner_id}`}
                      className="h-12 w-full object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{banner.description}</TableCell>
                  <TableCell>
                    <a
                      href={banner.banner_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {banner.banner_url}
                    </a>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditDialog(banner)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeBanner(banner.banner_id)}
                    >
                      <FiTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-full max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editBanner ? "Modifier la bannière" : "Ajouter une bannière"}
                </DialogTitle>
                <DialogDescription>
                  {editBanner
                    ? "Modifiez l'image, l'URL et/ou la description."
                    : "Choisissez une image, renseignez l'URL et la description."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Fichier image */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (form.imagePreview.startsWith("blob:"))
                        URL.revokeObjectURL(form.imagePreview);
                      setForm({
                        ...form,
                        file,
                        imagePreview: URL.createObjectURL(file),
                      });
                    }
                  }}
                  required={!editBanner}
                />

                {/* URL */}
                <Input
                  type="url"
                  placeholder="Lien cible (ex: https://exemple.com)"
                  value={form.banner_url}
                  onChange={(e) =>
                    setForm({ ...form, banner_url: e.target.value })
                  }
                  required
                />

                {/* Description */}
                <Textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  className="min-h-[6rem]"
                />

                {/* Aperçu image */}
                {form.imagePreview && (
                  <img
                    src={form.imagePreview}
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
      </main>
    </div>
  );
}
