import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Measurement {
  id: string;
  value: number;
  timestamp: string;
  variation: number;
}

interface MeasurementsTableProps {
  measurements: Measurement[];
  title: string;
  unit: string;

}

export const MeasurementsTable: React.FC<MeasurementsTableProps> = ({
  measurements,
  title,
  unit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha y hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variación
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {measurements.map((measurement) => (
              <tr key={measurement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(measurement.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {measurement.value} {unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    {measurement.variation > 0 ? (
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : measurement.variation < 0 ? (
                      <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                    ) : null}
                    <span
                      className={
                        measurement.variation > 0
                          ? 'text-green-600'
                          : measurement.variation < 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }
                    >
                      {Math.abs(measurement.variation)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};