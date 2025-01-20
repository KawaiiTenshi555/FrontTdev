import '../assets/Dashboard.css';
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
export default function Dashboard() {
    return (
        <div id="main">
            <h1>Dashboard</h1>
            <section>
                <div className="kpi-div">
                    <h2>Produit les plus vendus</h2>
                    <div className="center">
                        <BarChart
                            xAxis={[
                                {
                                id: 'barCategories',
                                data: ['banane', 'eau', 'lait','brioche'],
                                scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                data: [20, 54, 31, 63],
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>
                </div>
                <div className="kpi-div">
                    <h2>Produit les moins vendus</h2>
                    <div className="center">
                        <BarChart
                            xAxis={[
                                {
                                id: 'barCategories',
                                data: ['mouchoirs', 'savon', 'shampoingdanstagueule', 'zharicovert'],
                                scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                data: [4, 8, 3,1],
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>
                </div>
                <div className="kpi-div">
                    <h2>Taux de conversion</h2>
                    <p className='font-size-3'>30%</p>
                    <div className="center">
                        <PieChart
                            series={[
                                {
                                data: [
                                    { id: 0, value: 30, label: 'convertis' },
                                    { id: 1, value: 70, label: 'non convertis' },
                                ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                </div>
                <div className="kpi-div">
                    <h2>Taux de rupture des stocks</h2>
                    <p className='font-size-3'>18%</p>
                    <div className="center">
                        <PieChart
                            series={[
                                {
                                data: [
                                    { id: 0, value: 18, label: 'plus en stock' },
                                    { id: 1, value: 70, label: 'en stock' },
                                ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                </div>
                <div className="kpi-div">
                    <h2>Valeur moyenne des paniers</h2>
                    <p className='font-size-3'>56.32€</p>
                </div>
            </section>
        </div>
    );
}
// npm install @mui/x-charts
// npm install @mui/material @emotion/react @emotion/styled