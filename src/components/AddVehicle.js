import React, { useState } from 'react';

const AddVehicle = ({ addVehicle }) => {
    const [vehicleId, setVehicleId] = useState('');
    const [battery, setBattery] = useState(100);
    const [distanceTravelled, setDistanceTravelled] = useState(0);
    const [lastCharge, setLastCharge] = useState('');
    const [status, setStatus] = useState('Idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        addVehicle({ id: vehicleId, battery, distanceTravelled, lastCharge, status });
        setVehicleId('');
        setBattery(100);
        setDistanceTravelled(0);
        setLastCharge('');
        setStatus('Idle');
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Vehicle ID:</label>
                    <input
                        type="text"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        required
                        className="border rounded w-full p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Battery:</label>
                    <input
                        type="number"
                        value={battery}
                        onChange={(e) => setBattery(Number(e.target.value))}
                        className="border rounded w-full p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Distance Travelled:</label>
                    <input
                        type="number"
                        value={distanceTravelled}
                        onChange={(e) => setDistanceTravelled(Number(e.target.value))}
                        className="border rounded w-full p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Charge:</label>
                    <input
                        type="datetime-local"
                        value={lastCharge}
                        onChange={(e) => setLastCharge(e.target.value)}
                        className="border rounded w-full p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded w-full p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="Idle">Idle</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Charging">Charging</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200">Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicle;
