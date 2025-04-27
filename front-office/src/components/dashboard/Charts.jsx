import { Bar, Pie } from 'react-chartjs-2';


export const UserRolePieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.title),
        datasets: [
            {
                data: data.map(item => item.total),
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A8'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Répartition des rôles d'utilisateurs</h3>
            <Pie data={chartData} height={150} />
        </div>
    );
};

export const CategoryPieChart = ({ categories }) => {
    const chartData = {
        labels: categories.map(item => item.title),
        datasets: [
            {
                data: categories.map(item => item.total),
                backgroundColor: ['#FFDDC1', '#FFC3A0', '#FF9778', '#F47B6B', '#D96C60', '#C46B5C'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Répartition des catégories</h3>
            <Pie data={chartData} height={150} />
        </div>
    );
};

export const ReservationLineChart = ({ reservationData }) => {
    const chartData = {
        labels: reservationData.map(item => `${item.month}/${item.year}`),
        datasets: [
            {
                label: 'Nombre de réservations',
                data: reservationData.map(item => item.total),
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                fill: true,
            },
        ],
    };

    return (
        <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Évolution des réservations</h3>
            <Line data={chartData} height={200} />
        </div>
    );
};

export const BadgeBarChart = ({ badges }) => {
    const chartData = {
        labels: badges.map(item => item.title),
        datasets: [
            {
                label: 'Nombre d\'utilisateurs par badge',
                data: badges.map(item => item.total),
                backgroundColor: ['#FF8C00', '#FFD700', '#228B22', '#DC143C'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Répartition des badges des utilisateurs</h3>
            <Bar data={chartData} height={200} />
        </div>
    );
};

