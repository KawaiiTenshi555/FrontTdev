import React, { useEffect, useState } from "react";
import "../assets/Dashboard.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import {
    fetchAverageBasketValue,
    fetchStockOutRate,
    fetchConversionRate,
    fetchTopSellingProducts,
    fetchLeastSellingProducts,
} from "../Api";

export default function Dashboard() {
    const [topSelling, setTopSelling] = useState([]);
    const [leastSelling, setLeastSelling] = useState([]);
    const [conversionRate, setConversionRate] = useState(null);
    const [stockOutRate, setStockOutRate] = useState(null);
    const [averageBasketValue, setAverageBasketValue] = useState(null);

    const formatPercentage = (value) => {
        const rounded = parseFloat(value).toFixed(1);
        return rounded.endsWith(".0") ? parseInt(rounded) : rounded;
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const topSellingData = await fetchTopSellingProducts();
                setTopSelling(topSellingData);

                const leastSellingData = await fetchLeastSellingProducts();
                setLeastSelling(leastSellingData);

                const conversionRateData = await fetchConversionRate();
                setConversionRate(formatPercentage(conversionRateData));

                const stockOutRateData = await fetchStockOutRate();
                setStockOutRate(formatPercentage(stockOutRateData));

                const averageBasketData = await fetchAverageBasketValue();
                setAverageBasketValue(averageBasketData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div id="main">
            <h1>Dashboard</h1>
            <section>
                {/* Produits les plus vendus */}
                <div className="kpi-div">
                    <h2>Produits les plus vendus</h2>
                    <div className="center">
                        <BarChart
                            xAxis={[
                                {
                                    id: "barCategories",
                                    data: topSelling.map((item) => item.name),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: topSelling.map((item) => item.total_ventes),
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>
                </div>

                {/* Produits les moins vendus */}
                <div className="kpi-div">
                    <h2>Produits les moins vendus</h2>
                    <div className="center">
                        <BarChart
                            xAxis={[
                                {
                                    id: "barCategories",
                                    data: leastSelling.map((item) => item.name),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: leastSelling.map((item) => item.total_ventes),
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>
                </div>

                {/* Taux de conversion */}
                <div className="kpi-div">
                    <h2>Taux de conversion</h2>
                    <p className="font-size-3">{conversionRate}%</p>
                    <div className="center">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: conversionRate, label: "convertis" },
                                        { id: 1, value: 100 - conversionRate, label: "non convertis" },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                </div>

                {/* Taux de rupture des stocks */}
                <div className="kpi-div">
                    <h2>Taux de rupture des stocks</h2>
                    <p className="font-size-3">{stockOutRate}%</p>
                    <div className="center">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: stockOutRate, label: "rupture de stock" },
                                        { id: 1, value: 100 - stockOutRate, label: "en stock" },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                </div>

                {/* Valeur moyenne des paniers */}
                <div className="kpi-div">
                    <h2>Valeur moyenne des paniers</h2>
                    <p className="font-size-3">{averageBasketValue}€</p>
                </div>
            </section>
        </div>
    );
}
