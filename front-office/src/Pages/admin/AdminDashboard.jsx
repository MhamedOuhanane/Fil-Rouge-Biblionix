import TitlePage from "../../components/Headers/responsable/TitlePage";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AdminDashboard = () => {
  // Chart references
  const booksPerCategoryChartRef = useRef(null);
  const reservationsChartRef = useRef(null);
  const moneyPerMonthChartRef = useRef(null);
  const reservationStatusChartRef = useRef(null);

  useEffect(() => {
    // Books per Category (Line Chart)
    const booksPerCategoryCtx = document.getElementById("booksPerCategoryChart").getContext("2d");
    if (booksPerCategoryChartRef.current) {
      booksPerCategoryChartRef.current.destroy();
    }
    booksPerCategoryChartRef.current = new Chart(booksPerCategoryCtx, {
      type: "line",
      data: {
        labels: ["Fiction", "Non-Fiction", "Science", "Histoire", "Biographie"],
        datasets: [
          {
            label: "Nombre de Livres",
            data: [3442, 2942, 1642, 2342, 1242],
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Livres par Catégorie", color: "#1F2937", font: { size: 16 } },
        },
        scales: {
          x: { title: { display: true, text: "Catégorie", color: "#1F2937" } },
          y: { title: { display: true, text: "Nombre de Livres", color: "#1F2937" }, beginAtZero: true },
        },
      },
    });

    // Reservations Over Time (Bar Chart)
    const reservationsCtx = document.getElementById("reservationsChart").getContext("2d");
    if (reservationsChartRef.current) {
      reservationsChartRef.current.destroy();
    }
    reservationsChartRef.current = new Chart(reservationsCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
        datasets: [
          {
            label: "Réservations",
            data: [300, 450, 200, 500, 600, 700, 400, 350, 500, 600, 550, 700],
            backgroundColor: "#EC4899",
            borderColor: "#EC4899",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Réservations par Mois", color: "#1F2937", font: { size: 16 } },
        },
        scales: {
          x: { title: { display: true, text: "Mois", color: "#1F2937" } },
          y: { title: { display: true, text: "Nombre de Réservations", color: "#1F2937" }, beginAtZero: true },
        },
      },
    });

    // Money Per Month (Bar Chart)
    const moneyPerMonthCtx = document.getElementById("moneyPerMonthChart").getContext("2d");
    if (moneyPerMonthChartRef.current) {
      moneyPerMonthChartRef.current.destroy();
    }
    moneyPerMonthChartRef.current = new Chart(moneyPerMonthCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
        datasets: [
          {
            label: "Argent (€)",
            data: [1200, 1500, 800, 2000, 2500, 3000, 1800, 1600, 2200, 2700, 2400, 3100],
            backgroundColor: "#A855F7",
            borderColor: "#A855F7",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Argent Gagné par Mois", color: "#1F2937", font: { size: 16 } },
        },
        scales: {
          x: { title: { display: true, text: "Mois", color: "#1F2937" } },
          y: { title: { display: true, text: "Montant (€)", color: "#1F2937" }, beginAtZero: true },
        },
      },
    });

    // Reservation Status (Pie Chart)
    const reservationStatusCtx = document.getElementById("reservationStatusChart").getContext("2d");
    if (reservationStatusChartRef.current) {
      reservationStatusChartRef.current.destroy();
    }
    reservationStatusChartRef.current = new Chart(reservationStatusCtx, {
      type: "pie",
      data: {
        labels: ["Confirmée", "En Attente", "Annulée"],
        datasets: [
          {
            label: "Statut des Réservations",
            data: [60, 30, 10],
            backgroundColor: ["#3B82F6", "#EC4899", "#A855F7"],
            borderColor: ["#fff", "#fff", "#fff"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Statut des Réservations", color: "#1F2937", font: { size: 16 } },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (booksPerCategoryChartRef.current) booksPerCategoryChartRef.current.destroy();
      if (reservationsChartRef.current) reservationsChartRef.current.destroy();
      if (moneyPerMonthChartRef.current) moneyPerMonthChartRef.current.destroy();
      if (reservationStatusChartRef.current) reservationStatusChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-custom-blue text-white p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-8">Tableau de Bord</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded">
            <span>📊</span> Tableau de Bord
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded">
            <span>📚</span> Gestion des Livres
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded">
            <span>👥</span> Gestion des Utilisateurs
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded">
            <span>📅</span> Gestion des Réservations
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded">
            <span>⭐</span> Gestion des Avis
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:bg-blue-700 p-2 rounded">
            <span>💰</span> Gestion des Transactions
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Vue d'Ensemble</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Utilisateur Admin</span>
            <button className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Déconnexion
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          {/* Nombre de Livres */}
          <div className="bg-gradient-to-r from-custom-gradient-purple to-custom-gradient-blue text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Nombre de Livres</h3>
            <p className="text-3xl font-bold mt-2">3659</p>
            <div className="w-full bg-white/30 h-2 rounded-full mt-4">
              <div className="bg-white h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          {/* Nombre d'Utilisateurs */}
          <div className="bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-pink text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Nombre d'Utilisateurs</h3>
            <p className="text-3xl font-bold mt-2">44542</p>
            <div className="w-full bg-white/30 h-2 rounded-full mt-4">
              <div className="bg-white h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>
          </div>

          {/* Nombre de Réservations */}
          <div className="bg-gradient-to-r from-custom-gradient-pink to-custom-gradient-purple text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Nombre de Réservations</h3>
            <p className="text-3xl font-bold mt-2">23342</p>
            <div className="w-full bg-white/30 h-2 rounded-full mt-4">
              <div className="bg-white h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>

          {/* Moyenne des Évaluations */}
          <div className="bg-gradient-to-r from-custom-gradient-purple to-custom-gradient-green text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Moyenne des Évaluations</h3>
            <p className="text-3xl font-bold mt-2">4.7/5</p>
            <div className="w-full bg-white/30 h-2 rounded-full mt-4">
              <div className="bg-white h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
          </div>

          {/* Montant Total des Transactions */}
          <div className="bg-gradient-to-r from-custom-gradient-green to-custom-gradient-blue text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Montant Total (€)</h3>
            <p className="text-3xl font-bold mt-2">398721</p>
            <div className="w-full bg-white/30 h-2 rounded-full mt-4">
              <div className="bg-white h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Books per Category Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <canvas id="booksPerCategoryChart"></canvas>
          </div>

          {/* Reservation Status Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <canvas id="reservationStatusChart"></canvas>
          </div>

          {/* Reservations Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <canvas id="reservationsChart"></canvas>
          </div>

          {/* Money Per Month Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <canvas id="moneyPerMonthChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;