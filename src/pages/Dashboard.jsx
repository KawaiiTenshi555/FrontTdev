import '../assets/Dashboard.css';
import { BarChart } from "@mui/x-charts/BarChart";
export default function Dashboard() {
    return (
        <div id="main">
            <h1>Dashboard</h1>
            <section>
                <div className="">Produit les plus vendus</div>
                <div className="">Produit les moins vendus</div>
                <div className="">Taux de conversion</div>
                <div className="">Taux de rupture des stocks</div>
                <div className="">
                    <h2>Valeur moyenne des paniers</h2>
                    <BarChart
                        xAxis={[
                            {
                            id: 'barCategories',
                            data: ['bar A', 'bar B', 'bar C'],
                            scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                            data: [2, 5, 3],
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </div>
            </section>
        </div>
    );
}
// npm install @mui/x-charts
// npm install @mui/material @emotion/react @emotion/styled