import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,  
  LinearScale,    
  BarElement,     
  ArcElement,     
  PointElement,   
  LineElement,    
  Title,          
  Tooltip,        
  Legend          
);


function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export const UserRolePieChart = ({ data = [] }) => {
    const backgroundColors = data && data.map(() => generateRandomColor());
    const chartData = {
        labels: data.map(item => item.title),
        datasets: [
            {
                data: data.map(item => item.total),
                backgroundColor: backgroundColors,
                hoverOffset: 4,
            },
        ],
    };

    return (
        data &&
        <div className="bg-[#F0E6DC] p-5 rounded shadow-amber-800 shadow-2xl">
            <h3 className="text-xl font-bold mb-3">Répartition des rôles d'utilisateurs</h3>
            <Pie data={chartData} />
        </div>
    );
};

export const CategoryPieChart = ({ categories = [] }) => {
    const backgroundColors = categories && categories.map(() => generateRandomColor());
    const chartData = {
        labels: categories.map(item => item.title),
        datasets: [
            {
                data: categories.map(item => item.total),
                backgroundColor: backgroundColors,
                hoverOffset: 4,
            },
        ],
    };

    return (
        categories &&
        <div className="bg-[#F0E6DC] p-5 rounded shadow-amber-800 shadow-2xl">
            <h3 className="text-xl font-bold mb-3">Répartition des catégories</h3>
            <Pie data={chartData} />
        </div>
    );
};

export const ReservationLineChart = ({ reservationData = [] }) => {
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
        reservationData &&
        <div className="bg-[#F0E6DC] p-5 rounded shadow-amber-800 shadow-2xl">
            <h3 className="text-xl font-bold mb-3">Évolution des réservations</h3>
            <Line data={chartData} height={140} />
        </div>
    );
};

export const BadgeBarChart = ({ badges = [] }) => {
    const backgroundColors = badges && badges.map(() => generateRandomColor());
    const chartData = {
        labels: badges.map(item => item.title),
        datasets: [
            {
                label: 'Nombre d\'utilisateurs par badge',
                data: badges.map(item => item.total),
                backgroundColor: backgroundColors,
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        badges &&
        <div className="bg-[#F0E6DC] p-5 rounded shadow-amber-800 shadow-2xl">
            <h3 className="text-xl font-bold mb-3">Répartition des badges des utilisateurs</h3>
            <Bar data={chartData} height={140} />
        </div>
    );
};

