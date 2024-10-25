import React from 'react';

const VehicleList = ({ vehicles, deleteVehicle }) => {
    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>
            {vehicles.length === 0 ? (
                <p>No vehicles added.</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Vehicle ID</th>
                            <th className="border p-2">Battery (%)</th>
                            <th className="border p-2">Distance Travelled (km)</th>
                            <th className="border p-2">Last Charge</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td className="border p-2">{vehicle.id}</td>
                                <td className={`border p-2 ${vehicle.battery < 15 ? 'text-red-500' : ''}`}>{vehicle.battery}</td>
                                <td className="border p-2">{vehicle.distanceTravelled}</td>
                                <td className="border p-2">{new Date(vehicle.lastCharge).toLocaleString()}</td>
                                <td className="border p-2">{vehicle.status}</td>
                                <td className="border p-2">
                                    <button 
                                        onClick={() => deleteVehicle(vehicle.id)} 
                                        className="text-white bg-red-500 hover:bg-red-700 font-bold py-1 px-2 rounded transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VehicleList;
