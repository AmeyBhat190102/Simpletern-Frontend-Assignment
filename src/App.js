import React, { useEffect, useState } from 'react';
import VehicleList from './components/VehicleList';
import AddVehicle from './components/AddVehicle';
import ChargingSchedule from './components/ChargingSchedule';
import Dashboard from './components/Dashboard';
import ChargingScheduleList from './components/ChargingScheduleList';

const App = () => {
    const [vehicles, setVehicles] = useState([]);
    const [chargingSchedules, setChargingSchedules] = useState([]);

    const addVehicle = (vehicle) => {
        setVehicles([...vehicles, vehicle]);
    };

    const addChargingSchedule = (schedule) => {
        setChargingSchedules([...chargingSchedules, schedule]);
    };

    const deleteVehicle = (vehicleId) => {
        setVehicles((prevVehicles) => prevVehicles.filter(vehicle => vehicle.id !== vehicleId));
    };

    const updateVehicleStatus = () => {
        setVehicles((prevVehicles) => 
            prevVehicles.map(vehicle => {
                if (vehicle.status === 'In Transit') {
                    const distanceTravelled = 3;
                    const batteryLoss = Math.max(0, vehicle.battery - Math.floor(distanceTravelled / 3));
                    return { ...vehicle, battery: batteryLoss };
                } else if (vehicle.status === 'Charging') {
                    const batteryIncrease = Math.min(100, vehicle.battery + 10);
                    return { ...vehicle, battery: batteryIncrease };
                }
                return vehicle;
            })
        );
    };

    const checkScheduledCharging = () => {
        const now = new Date();
        setVehicles(prevVehicles =>
            prevVehicles.map(vehicle => {
                const schedule = chargingSchedules.find(s => s.vehicleId === vehicle.id);
                if (schedule && new Date(schedule.startTime) <= now && vehicle.status !== 'Charging') {
                    return { ...vehicle, status: 'Charging' };
                }
                return vehicle;
            })
        );
    };

    useEffect(() => {
        const checkBatteryAlerts = () => {
            vehicles.forEach(vehicle => {
                if (vehicle.battery < 15) {
                    alert(`Low Battery Warning for Vehicle ID: ${vehicle.id}`);
                }
            });
        };

        const interval = setInterval(() => {
            updateVehicleStatus();
            checkBatteryAlerts();
            checkScheduledCharging();
        }, 60000);

        return () => clearInterval(interval);
    }, [vehicles, chargingSchedules]);

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <header className="bg-blue-700 text-white p-6 rounded-lg shadow-lg mb-6">
                <h1 className="text-3xl font-bold">Fleet Management Dashboard</h1>
            </header>
            <div className="bg-green-100 rounded-lg shadow-lg p-6 mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Add Vehicle</h2>
                <AddVehicle addVehicle={addVehicle} vehicles={vehicles} />
            </div>
            <div className="bg-yellow-100 rounded-lg shadow-lg p-6 mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Charging Schedule</h2>
                <ChargingSchedule addChargingSchedule={addChargingSchedule} vehicles={vehicles} />
            </div>
            <div className="bg-purple-100 rounded-lg shadow-lg p-6 mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Vehicle List</h2>
                <VehicleList vehicles={vehicles} deleteVehicle={deleteVehicle} />
            </div>
            <div className="bg-indigo-100 rounded-lg shadow-lg p-6 mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Charging Schedule List</h2>
                <ChargingScheduleList chargingSchedules={chargingSchedules} />
            </div>
            <div className="bg-red-100 rounded-lg shadow-lg p-6 mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
                <Dashboard vehicles={vehicles} chargingSchedules={chargingSchedules} />
            </div>
            <footer className="text-center mt-6 text-gray-500">
                <p>© 2024 Fleet Management Dashboard. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
