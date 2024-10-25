import React, { useState } from 'react';

const ChargingSchedule = ({ addChargingSchedule, vehicles }) => {
    const [vehicleId, setVehicleId] = useState('');
    const [chargingTime, setChargingTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addChargingSchedule({ vehicleId, chargingTime });
        setVehicleId('');
        setChargingTime('');
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Charging Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Vehicle ID:</label>
                    <select
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        className="border rounded w-full p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    >
                        <option value="">Select Vehicle</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.id}>{vehicle.id}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Charging Time:</label>
                    <input
                        type="datetime-local"
                        value={chargingTime}
                        onChange={(e) => setChargingTime(e.target.value)}
                        className="border rounded w-full p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200">Add Charging Schedule</button>
            </form>
        </div>
    );
};

export default ChargingSchedule;
