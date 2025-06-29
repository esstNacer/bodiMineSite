// src/pages/ProfessionalPage.tsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiEdit3, FiTrash, FiPlus, FiGift } from "react-icons/fi";
import * as Toast from "@radix-ui/react-toast";
import { toast } from "sonner"; // ou react-hot-toast / shadcn toast



//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

interface Professional {
  professional_id: number;
  clinic_id?: number | null;
  full_name: string;
  clinic_name?: string | null;
  city?: string | null;
  country?: string | null;
  email: string;
  password: string;
  phone_number?: string | null;
  specialization?: string | null;
  practice_tenure?: number | null;
  practice_start_date?: string | null; // format YYYY-MM-DD
  type?: string | null;
  is_premium: boolean;
   subscription_name?: string | null;
  subscription_value?: number | null;
  subscription_end?: string | null;
  created_at?: Date|null;
}

interface Clinic {
  clinic_id: number;
  name: string;
  address: string | null;
  city: string | null;
  country: string | null;
  email: string | null;
}

type SubscriptionType = "basic" | "standard" | "premium";


//
// ─── PAGE COMPONENT ─────────────────────────────────────────────────────────────
//

export default function ProfessionalPage() {
  const [pros, setPros] = useState<Professional[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
// ID numérique
const [selectedPro, setSelectedPro] = useState<number | null>(null);
  // dialogs
  const [showProDialog, setShowProDialog] = useState(false);
  const [showClinicDialog, setShowClinicDialog] = useState(false);
 const [showGiftDialog, setShowGiftDialog] = useState(false);
  // editable records
  const [editPro, setEditPro] = useState<Partial<Professional> | null>(null);
  const [editClinic, setEditClinic] = useState<Partial<Clinic> | null>(null);
const [subscriptionType, setSubscriptionType] = useState("premium");
 const [endDate, setEndDate] = useState("");



  //
  // ─── DATA FETCH ───────────────────────────────────────────────────────────────
  //
  useEffect(() => {
    fetchProfessionals();
    fetchClinics();
  }, []);

  useEffect(() => {
  if (selectedPro) setShowGiftDialog(true);
}, [selectedPro]);


  async function fetchProfessionals() {
    const res = await fetch("/api/professional");
    setPros(await res.json());
  }

  async function fetchClinics() {
    const res = await fetch("/api/clinics");
    setClinics(await res.json());
  }

  //
  // ─── CRUD PROFESSIONALS ───────────────────────────────────────────────────────
  //
  function openNewPro() {
    setEditPro({
      professional_id: 0,
      full_name: "",
      email: "",
      specialization: "",
      is_premium: false,
    });
    setShowProDialog(true);
  }

  function startEditPro(p: Professional) {
    setEditPro({ ...p });
    setShowProDialog(true);
  }

  async function savePro() {
  if (!editPro) return;

  // on enlève les champs virtuels
  const {
    subscription_name,
    subscription_end,
    subscription_value,
    created_at,   
    ...payload
  } = editPro;

  const method = payload.professional_id ? "PUT" : "POST";
  const url =
    payload.professional_id
      ? `/api/professional/${payload.professional_id}`
      : "/api/professional";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  setShowProDialog(false);
  fetchProfessionals();
}


  async function deletePro(id: number) {
    if (!confirm("Supprimer ce professionnel ?")) return;
    await fetch(`/api/professional/${id}`, { method: "DELETE" });
    fetchProfessionals();
  }


  const offerSubscription = async (professionalId: number, type: string, endDate: string) => {
  try {
    const res =await fetch(`/api/admin/offert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ professional_id: professionalId, subscriptions_name: type, end_date: endDate }),
    });
    if (res.ok) {
  setPros(prev =>
    prev.map(pro =>
      pro.professional_id === professionalId
        ? { ...pro, is_premium: true }      // mutation locale
        : pro
    )
  );

  toast.success("Abonnement offert avec succès !");
}

  } catch (err) {
    console.error(err);
    alert("Erreur lors de l’attribution de l’abonnement.");
  }
};


  //
  // ─── CRUD CLINICS ─────────────────────────────────────────────────────────────
  //
  function openNewClinic() {
    setEditClinic({
      clinic_id: 0,
      name: "",
      address: "",
      city: "",
      country: "",
      email: "",
    });
    setShowClinicDialog(true);
  }

  function startEditClinic(c: Clinic) {
    setEditClinic({ ...c });
    setShowClinicDialog(true);
  }

  async function saveClinic() {
    if (!editClinic) return;
    const method = editClinic.clinic_id ? "PUT" : "POST";
    const url =
      editClinic.clinic_id !== 0
        ? `/api/clinics/${editClinic.clinic_id}`
        : "/api/clinics";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editClinic),
    });
    setShowClinicDialog(false);
    fetchClinics();
  }

  async function deleteClinic(id: number) {
    if (!confirm("Supprimer cette clinique ?")) return;
    await fetch(`/api/clinics/${id}`, { method: "DELETE" });
    fetchClinics();
  }

  //
  // ─── RENDER ───────────────────────────────────────────────────────────────────
  //
  return (
     <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">BodyMine Admin</h2>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block hover:text-blue-400">Dashboard</a>
          <a href="/admin/professionals" className="block hover:text-blue-400">Professionals</a>
          <a href="/admin/services" className="block hover:text-blue-400">Projet Patient</a>
          <a href="/admin/banners" className="block hover:text-blue-400">bannnieres</a>
        </nav>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
    <Card className="max-w-7xl mx-auto my-10">
      <CardHeader>Gestion des Professionnels & Cliniques</CardHeader>
      <CardContent>
        <Tabs defaultValue="pros">
          <TabsList>
            <TabsTrigger value="pros">Professionnels</TabsTrigger>
            <TabsTrigger value="clinics">Cliniques</TabsTrigger>
          </TabsList>

          {/* ───────────────── PROFESSIONNELS ───────────────── */}
          <TabsContent value="pros">
            <div className="flex justify-end mb-4">
              <Button onClick={openNewPro} className="flex items-center gap-2">
                <FiPlus /> Nouveau pro
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th style={{ width: 180 }}>Nom</th>
                    <th>Email</th>
                    <th>Spécialité</th>
                    <th>Abonné ?</th>
                    <th>Abonnement</th>
                    <th>Montant (€)</th>
                    <th>Fin de l'abonnement</th>
                    <th style={{ width: 120 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pros.map((p, i) => (
                    <tr key={p.professional_id}>
                      <td>{i + 1}</td>
                      <td>{p.full_name}</td>
                      <td>{p.email}</td>
                      <td>{p.specialization ?? "—"}</td>
                      <td className={p.is_premium ? "text-green-600" : "text-red-500"}>
                        {p.is_premium ? "Oui" : "Non"}
                      </td>
                      <td>{p.subscription_name ?? "—"}</td>
                      <td>{p.subscription_value ?? "—"}</td>
                      <td>{p.subscription_end ?? "—"}</td>
                      <td>
                        <button
                          className="tbl-btn edit"
                          onClick={() => startEditPro(p)}
                        >
                          <FiEdit3 />
                        </button>
                        <button
                          className="tbl-btn del"
                          onClick={() => deletePro(p.professional_id)}
                        >
                          <FiTrash />
                        </button>
                        <button
  className="tbl-btn"
  onClick={() => setSelectedPro(p.professional_id)}
>
  <FiGift /> {/* Icône cadeau par exemple */}
</button>

                      </td>
                    </tr>
                  ))}
                  {pros.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-10">
                        Aucun professionnel.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ───────────────── CLINIQUES ───────────────── */}
          <TabsContent value="clinics">
            <div className="flex justify-end mb-4">
              <Button onClick={openNewClinic} className="flex items-center gap-2">
                <FiPlus /> Nouvelle clinique
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th style={{ width: 200 }}>Nom</th>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Pays</th>
                    <th>Email</th>
                    <th style={{ width: 120 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics.map((c, i) => (
                    <tr key={c.clinic_id}>
                      <td>{i + 1}</td>
                      <td>{c.name}</td>
                      <td>{c.address ?? "—"}</td>
                      <td>{c.city ?? "—"}</td>
                      <td>{c.country ?? "—"}</td>
                      <td>{c.email ?? "—"}</td>
                      <td>
                        <button
                          className="tbl-btn edit"
                          onClick={() => startEditClinic(c)}
                        >
                          <FiEdit3 />
                        </button>
                        <button
                          className="tbl-btn del"
                          onClick={() => deleteClinic(c.clinic_id)}
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {clinics.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-10">
                        Aucune clinique.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* ─── DIALOG PROFESSIONNEL ────────────────────────── */}
      {showProDialog && editPro && (
        <Dialog open={showProDialog} onOpenChange={setShowProDialog}>
          <DialogContent className="w-full max-w-lg">
            <DialogHeader>
              <DialogTitle>{editPro.professional_id ? "Modifier" : "Ajouter"} un professionnel</DialogTitle>
            </DialogHeader>

<form
  onSubmit={(e) => {
    e.preventDefault();
    savePro();
  }}
  className="space-y-4"
>
  <Input
    placeholder="Nom complet"
    value={editPro.full_name || ""}
    onChange={(e) => setEditPro({ ...editPro, full_name: e.target.value })}
    required
  />
  <Input
    placeholder="Nom de la clinique"
    value={editPro.clinic_name || ""}
    onChange={(e) => setEditPro({ ...editPro, clinic_name: e.target.value })}
  />
  <Input
    placeholder="Ville"
    value={editPro.city || ""}
    onChange={(e) => setEditPro({ ...editPro, city: e.target.value })}
  />
  <Input
    placeholder="Pays"
    value={editPro.country || ""}
    onChange={(e) => setEditPro({ ...editPro, country: e.target.value })}
  />
  <Input
    placeholder="Email"
    type="email"
    value={editPro.email || ""}
    onChange={(e) => setEditPro({ ...editPro, email: e.target.value })}
    required
  />{}
  <Input
    placeholder="Mot de passe"
    type="password"
    value={editPro.password || ""}
    onChange={(e) => setEditPro({ ...editPro, password: e.target.value })}
    required={!editPro.professional_id} // obligatoire en création, pas en modif
  />
  <Input
    placeholder="Téléphone"
    value={editPro.phone_number || ""}
    onChange={(e) => setEditPro({ ...editPro, phone_number: e.target.value })}
  />
  <Input
    placeholder="Spécialité"
    value={editPro.specialization || ""}
    onChange={(e) => setEditPro({ ...editPro, specialization: e.target.value })}
  />
  <Input
    placeholder="Durée d’expérience (en années)"
    type="number"
    value={editPro.practice_tenure ?? ""}
    onChange={(e) =>
      setEditPro({ ...editPro, practice_tenure: parseInt(e.target.value) })
    }
  />
  <Input
    placeholder="Date de début de pratique"
    type="date"
    value={editPro.practice_start_date || ""}
    onChange={(e) =>
      setEditPro({ ...editPro, practice_start_date: e.target.value })
    }
  />
  <Input
    placeholder="Type (ex: doctor, assistant...)"
    value={editPro.type || ""}
    onChange={(e) => setEditPro({ ...editPro, type: e.target.value })}
  />
  <div className="flex items-center gap-2">
    <input
      id="is_premium"
      type="checkbox"
      checked={!!editPro.is_premium}
      onChange={(e) =>
        setEditPro({ ...editPro, is_premium: e.target.checked })
      }
    />
    <label htmlFor="is_premium">Est premium</label>
  </div>

  <Button type="submit" className="w-full">
    Enregistrer
  </Button>
</form>

          </DialogContent>
        </Dialog>
      )}

      {/* ─── DIALOG CLINIQUE ────────────────────────────── */}
      {showClinicDialog && editClinic && (
        <Dialog open={showClinicDialog} onOpenChange={setShowClinicDialog}>
          <DialogContent className="w-full max-w-lg">
            <DialogHeader>
              <DialogTitle>{editClinic.clinic_id ? "Modifier" : "Ajouter"} une clinique</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveClinic();
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Nom"
                value={editClinic.name || ""}
                onChange={(e) =>
                  setEditClinic({ ...editClinic, name: e.target.value })
                }
                required
              />
              <Input
                placeholder="Adresse"
                value={editClinic.address || ""}
                onChange={(e) =>
                  setEditClinic({ ...editClinic, address: e.target.value })
                }
              />
              <Input
                placeholder="Ville"
                value={editClinic.city || ""}
                onChange={(e) =>
                  setEditClinic({ ...editClinic, city: e.target.value })
                }
              />
              <Input
                placeholder="Pays"
                value={editClinic.country || ""}
                onChange={(e) =>
                  setEditClinic({ ...editClinic, country: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                type="email"
                value={editClinic.email || ""}
                onChange={(e) =>
                  setEditClinic({ ...editClinic, email: e.target.value })
                }
              />
              <Button type="submit" className="w-full">
                Enregistrer
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {showGiftDialog && (
  <Dialog open={showGiftDialog} onOpenChange={setShowGiftDialog}>
    <DialogContent className="w-full max-w-md">
      <DialogHeader>
        <DialogTitle>Offrir un abonnement</DialogTitle>
        <DialogDescription>
          Choisissez le type d’abonnement et la date de fin pour ce professionnel.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <select
          className="w-full border rounded p-2"
          value={subscriptionType}
          onChange={(e) => setSubscriptionType(e.target.value)}
        >
          <option value="basic">Basique</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>

        <input
          type="date"
          className="w-full border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <Button
          onClick={async () => {
            if (selectedPro === null) return;
            await offerSubscription(selectedPro, subscriptionType, endDate);
            setShowGiftDialog(false);
            setSelectedPro(null);
          }}
        >
          Offrir l’abonnement
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)}

    </Card>
    </main>
    </div>
  );
}
