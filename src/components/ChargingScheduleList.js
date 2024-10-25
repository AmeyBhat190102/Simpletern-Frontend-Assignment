import React from 'react';

const ChargingScheduleList = ({ chargingSchedules }) => {
    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Charging Schedule</h2>
            {chargingSchedules.length === 0 ? (
                <p>No charging schedules added.</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Vehicle ID</th>
                            <th className="border p-2">Charging Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chargingSchedules.map((schedule, index) => (
                            <tr key={index}>
                                <td className="border p-2">{schedule.vehicleId}</td>
                                <td className="border p-2">{new Date(schedule.chargingTime).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ChargingScheduleList;
