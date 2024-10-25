import React from 'react';

const Dashboard = ({ vehicles }) => {
    const vehicleStatusCounts = vehicles.reduce(
        (acc, vehicle) => {
            if (vehicle.status in acc) {
                acc[vehicle.status] += 1;
            }
            return acc;
        },
        { InTransit: 0, Charging: 0, Idle: 0 }
    );

    const totalVehicles = vehicles.length;
    const avgBattery = totalVehicles
        ? vehicles.reduce((sum, vehicle) => sum + (vehicle.battery || 0), 0) / totalVehicles
        : 0;

    const lowBatteryCount = vehicles.filter(vehicle => (vehicle.battery || 0) < 20).length;

    const estimatedChargeTime = vehicles
        .filter(vehicle => vehicle.status === 'Charging')
        .reduce((totalTime, vehicle) => {
            const timeToFull = vehicle.battery ? (100 - vehicle.battery) / 10 : 0;
            return totalTime + timeToFull;
        }, 0);

    const totalDistance = vehicles.reduce((sum, vehicle) => sum + (vehicle.distanceTravelled || 0), 0);
    const fuelSavings = totalDistance * 0.1; 
    const co2EmissionsAvoided = totalDistance * 0.12; 

    return (
        <div className="mb-4 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Fleet Overview Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Vehicles</h3>
                    <p className="text-xl font-bold">{totalVehicles}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">In Transit</h3>
                    <p className="text-xl font-bold">{vehicleStatusCounts.InTransit}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Charging</h3>
                    <p className="text-xl font-bold">{vehicleStatusCounts.Charging}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Idle</h3>
                    <p className="text-xl font-bold">{vehicleStatusCounts.Idle}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Average Battery</h3>
                    <p className="text-xl font-bold">{avgBattery.toFixed(2)}%</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Vehicles {"< 20%"} Battery</h3>
                    <p className="text-xl font-bold">{lowBatteryCount}</p>
                </div>
                <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Estimated Charge Time (min)</h3>
                    <p className="text-xl font-bold">{estimatedChargeTime > 0 ? estimatedChargeTime.toFixed(2) : 'N/A'}</p>
                </div>
            </div>
            <h3 className="text-xl font-bold mt-6 text-blue-700">Bonus Insights</h3>
            <div className="mt-4">
                <div className="bg-green-50 p-4 rounded-lg shadow-md mb-2">
                    <h4 className="text-lg font-semibold">Fuel Savings</h4>
                    <p className="text-xl font-bold">{fuelSavings.toFixed(2)} units</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow-md mb-2">
                    <h4 className="text-lg font-semibold">Total Distance Traveled</h4>
                    <p className="text-xl font-bold">{totalDistance} km</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-md mb-2">
                    <h4 className="text-lg font-semibold">CO₂ Emissions Avoided</h4>
                    <p className="text-xl font-bold">{co2EmissionsAvoided.toFixed(2)} kg</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
