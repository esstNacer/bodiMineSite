import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Calendar from "react-calendar";
import * as Toast from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";
import CalendarWithEvents from "@/components/CalendarWithEvents";

const pieColors = ["#34d399", "#60a5fa"];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, pros: 0, projects: 0, messages: 0, services: 0, revenue: 0 });
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [showToast, setShowToast] = useState(true);
  const [clinics, setClinics] = useState([]);
    const [professionals, setProfessionals] = useState([]);
  const [payments, setPayments] = useState([]);
    const [tickets, setTickets] = useState([]);

      const navigate = useNavigate();
  

useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard-stats");
      const data = await response.json();
console.log(data)
      setStats({
        users: data.users,
        pros: data.pros,
        projects: data.projects,
        messages: data.messages,
        services: data.services,
        revenue: data.revenue,
      });

      setBarData(data.servicesByMonth);
      setPieData(data.subscriptionDistribution);
    } catch (error) {
      console.error("Erreur de récupération des stats :", error);
    }
    fetch("/api/admin/clinics")
    .then(res => res.json())
    .then(data => setClinics(data))
    .catch(err => console.error("Erreur cliniques:", err));
    
    fetch("/api/admin/professionals")
    .then(res => res.json())
    .then(data => setProfessionals(data))
    .catch(err => console.error("Erreur cliniques:", err));

    fetch("/api/admin/payments")
    .then(res => res.json())
    .then(data => setPayments(data))
    .catch(err => console.error("Erreur cliniques:", err));

        fetch("/api/admin/tickets")
    .then(res => res.json())
    .then(data => setTickets(data))
    .catch(err => console.error("Erreur cliniques:", err));
  };

  fetchStats();
}, []);


  return (
    <Toast.Provider swipeDirection="right">
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
          <h2 className="text-xl font-bold">BodyMine Admin</h2>
          <nav className="space-y-2">
            <a href="/admin/dashboard" className="block hover:text-blue-400">Dashboard</a>
            <a href="/admin/professionals" className="block hover:text-blue-400">Professionals</a>
            <a href="/admin/services" className="block hover:text-blue-400">Projet Patient</a>
            <a href="/admin/banners" className="block hover:text-blue-400">bannnieres</a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <Button variant="outline" onClick={()=>navigate("/home")}>Déconnexion</Button>
          </div>



          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            <Card><CardHeader>Patients</CardHeader><CardContent><p className="text-2xl font-semibold">{stats.users}</p></CardContent></Card>
            <Card><CardHeader>Professionals</CardHeader><CardContent><p className="text-2xl font-semibold">{stats.pros}</p></CardContent></Card>
            <Card><CardHeader>My Body Projects</CardHeader><CardContent><p className="text-2xl font-semibold">{stats.projects}</p></CardContent></Card>
            <Card><CardHeader>Nombre de chats</CardHeader><CardContent><p className="text-2xl font-semibold">{stats.messages}</p></CardContent></Card>            
            <Card><CardHeader>Services vendus</CardHeader><CardContent><p className="text-2xl font-semibold">{stats.services}</p></CardContent></Card>
            <Card><CardHeader>Revenus</CardHeader><CardContent><p className="text-2xl font-semibold">{stats.revenue.toLocaleString()} €</p></CardContent></Card>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <Card>
              <CardHeader>Services vendus par mois</CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="services" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>Répartition abonnements professionals</CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={80} label>
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Map + Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <Card>
  <CardHeader>Localisation des cliniques</CardHeader>
  <CardContent className="h-[300px]">
    <MapContainer center={[36.75, 3.06]} zoom={5} className="h-full w-full rounded-xl z-0">
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clinics.map((clinic, index) => (
        <Marker
          key={index}
          position={[clinic.latitude, clinic.longitude]}
        >
          <Popup>
            <strong>{clinic.name}</strong><br />
            {clinic.address}, {clinic.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </CardContent>
</Card>


            <Card>
  <CardHeader>Événements à venir</CardHeader>
  <CardContent>
    <CalendarWithEvents />
  </CardContent>
</Card>
          </div>

          {/* Timeline */}
          <Card className="mb-10">
            <CardHeader>Historique des activités</CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 bg-green-500 rounded-full" />
                  <div>
                    <p><strong>Sara Benali</strong> a ajouté un nouveau service</p>
                    <span className="text-sm text-gray-500">il y a 2h</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 bg-blue-500 rounded-full" />
                  <div>
                    <p><strong>Ali Merabet</strong> a modifié son profil</p>
                    <span className="text-sm text-gray-500">il y a 6h</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Chat admin simplifié */}
         

          {/* Table avec Tabs */}
       <Card className="mb-10">
      <CardHeader>Comptes professionals</CardHeader>
      <CardContent>
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <table className="w-full mt-4 text-left">
              <thead>
                <tr>
                  <th className="py-2">Nom</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {professionals.map((pro, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{pro.full_name}</td>
                    <td className="py-2">{pro.email}</td>
                    <td className="py-2">{new Date(pro.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="payments">
            <table className="w-full mt-4 text-left">
              <thead>
                <tr>
                  <th className="py-2">Nom</th>
                  <th className="py-2">Montant</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((pay, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{pay.full_name}</td>
                    <td className="py-2">{pay.value} €</td>
                    <td className="py-2">{new Date(pay.start_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>

          {/* Tickets support */}
      <Card>
      <CardHeader>My Body Project</CardHeader>
      <CardContent>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">N° Ticket</th>
              <th className="py-2">Patient</th>
              <th className="py-2">Professionnel</th>
              <th className="py-2">Projet</th>
              <th className="py-2">Budget (€)</th>
              <th className="py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, i) => (
              <tr key={i} className="border-t">
                <td className="py-2">#{t.ticket_id}</td>
                <td className="py-2">{t.patient_first_name} {t.patient_last_name}</td>
                <td className="py-2">{t.professional_name}</td>
                <td className="py-2">{t.project_title}</td>
                <td className="py-2">{t.budget}</td>
              <td className={`py-2 ${t.status === "Fini" ? "text-red-500" : "text-green-600"}`}>
  {t.status}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
        </main>
      </div>
    </Toast.Provider>
  );
}
