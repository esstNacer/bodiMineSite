// src/pages/ArticlePage.tsx
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

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

interface Article {
  article_id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string; // ISO string
  author_id: number | null;
}

type FormState = {
  file: File | null;
  imagePreview: string;
  title: string;
  content: string;
  authorId: string;
};

/* -------------------------------------------------------------------------- */
/*                               Composant                                    */
/* -------------------------------------------------------------------------- */

export default function ArticlePage() {
  /* ---------------------------- States ---------------------------------- */
  const [articles, setArticles] = useState<Article[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [form, setForm] = useState<FormState>({
    file: null,
    imagePreview: "",
    title: "",
    content: "",
    authorId: "",
  });

  /* --------------------------- API calls -------------------------------- */
  const loadArticles = async () => {
    const res = await fetch("/api/articles");
    if (!res.ok) return console.error("Fail fetch articles");
    const data = (await res.json()) as Article[];
    setArticles(data);
  };

  const saveArticle = async () => {
    try {
      const formData = new FormData();
      if (form.file) formData.append("image", form.file);
      formData.append("title", form.title);
      formData.append("content", form.content);
      if (form.authorId) formData.append("author_id", form.authorId);

      const url = editArticle
        ? `/api/articles/${editArticle.article_id}`
        : "/api/articles";
      const method = editArticle ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Erreur HTTP");

      await loadArticles();

      /* reset */
      if (form.imagePreview.startsWith("blob:"))
        URL.revokeObjectURL(form.imagePreview);
      setForm({
        file: null,
        imagePreview: "",
        title: "",
        content: "",
        authorId: "",
      });
      closeDialog();
    } catch (err) {
      console.error(err);
      alert("Erreur : impossible de sauvegarder l'article.");
    }
  };

  const removeArticle = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
    if (res.ok) setArticles((prev) => prev.filter((a) => a.article_id !== id));
    else alert("Erreur lors de la suppression");
  };

  /* ----------------------- UI helpers ----------------------------------- */
  const openNewDialog = () => {
    setEditArticle(null);
    setForm({
      file: null,
      imagePreview: "",
      title: "",
      content: "",
      authorId: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (article: Article) => {
    setEditArticle(article);
    setForm({
      file: null,
      imagePreview: article.image_url ?? "",
      title: article.title,
      content: article.content,
      authorId: article.author_id?.toString() ?? "",
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditArticle(null);
  };

  /* -------------------------- Lifecycle --------------------------------- */
  useEffect(() => {
    loadArticles();
  }, []);

  /* --------------------------- Render ----------------------------------- */
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">BodyMine Admin</h2>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block hover:text-blue-400">
            Dashboard
          </a>
          <a href="/admin/professionals" className="block hover:text-blue-400">
            Professionals
          </a>
          <a href="/admin/services" className="block hover:text-blue-400">
            Projet Patient
          </a>
          <a href="/admin/banners" className="block hover:text-blue-400">
            Bannières
          </a>
          <a href="/admin/articles" className="block hover:text-blue-400">
            Articles
          </a>
        </nav>
      </aside>

      <main className="flex-1 bg-muted/40 p-8 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Gestion des articles</h1>
            <Button onClick={openNewDialog} className="gap-2">
              <FiPlus /> Nouvel article
            </Button>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((a) => (
                <TableRow key={a.article_id}>
                  <TableCell>
                    {a.image_url ? (
                      <img
                        src={a.image_url}
                        alt={`article-${a.article_id}`}
                        className="h-12 w-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs italic text-gray-500">
                        N/A
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{a.title}</span>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {a.content}
                    </p>
                  </TableCell>
                  <TableCell>{a.author_id ?? "—"}</TableCell>
                  <TableCell>
                    {new Date(a.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditDialog(a)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeArticle(a.article_id)}
                    >
                      <FiTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Dialog create / edit */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-full max-w-xl">
              <DialogHeader>
                <DialogTitle>
                  {editArticle ? "Modifier l'article" : "Nouvel article"}
                </DialogTitle>
                <DialogDescription>
                  {editArticle
                    ? "Mettez à jour les champs nécessaires."
                    : "Renseignez les informations de l'article."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Image */}
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
                  required={!editArticle}
                />

                {/* Preview */}
                {form.imagePreview && (
                  <img
                    src={form.imagePreview}
                    alt="preview"
                    className="h-40 w-full object-cover rounded border"
                  />
                )}

                {/* Titre */}
                <Input
                  placeholder="Titre"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                />

                {/* Contenu */}
                <Textarea
                  placeholder="Contenu..."
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  required
                  className="min-h-[8rem]"
                />

                {/* Auteur (id numérique simple) */}
                <Input
                  type="number"
                  placeholder="ID auteur (professional)"
                  value={form.authorId}
                  onChange={(e) =>
                    setForm({ ...form, authorId: e.target.value })
                  }
                />

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={closeDialog}>
                    Annuler
                  </Button>
                  <Button onClick={saveArticle}>
                    {editArticle ? "Mettre à jour" : "Enregistrer"}
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
