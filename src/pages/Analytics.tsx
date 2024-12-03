import React, { useEffect, useId, useState } from 'react';
import { Layout } from '../components/Layout';
import { MeasurementsTable } from '../components/MeasurementsTable';
import { sensorData } from '../services/api';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [measurements, setMeasurements] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sensorData();
        setMeasurements(data);
      } catch (err) {
        setError('Failed to load measurements');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

    const calculateVariation = (values: number[]): number[] => {
      return values.map((value, index) =>
          index === 0 ? 0 : parseFloat((value - values[index - 1]).toFixed(2))
      );
  };
    // Organiza los datos en listas para cada categoría
    const temperatures = measurements.map((item) => item.temperature);
    const noises = measurements.map((item) => item.noise);
    const lights = measurements.map((item) => item.light);
    const timestamps = measurements.map((item) => item.timestamp);

    // Calcula variaciones para cada categoría
    const temperaureMeasurements = temperatures
    .map((m,index) => ({
      id: `${index}-temperatura`,
      value:m,
      timestamp: timestamps[index],
      variation: index < temperatures.length -1 ? parseFloat((((m - temperatures[index + 1]) / temperatures[index +1]) * 100).toFixed(2)) : 0,
    }));
    const noiseMeasurements = noises
    .map((m,index) => ({
      id: `${index}-noise`,
      value:m,
      timestamp: timestamps[index],
      variation: index < noises.length - 1 ? parseFloat((((m - noises[index + 1]) / noises[index +1]) * 100).toFixed(2)) : 0,
    }));
    const lightMeasurements = lights
    .map((m,index) => ({
      id: `${index}-light`,
      value:m,
      timestamp: timestamps[index],
      variation: index < lights.length - 1 ? parseFloat((((m - lights[index +1]) / lights[index + 1]) * 100).toFixed(2)) : 0,
    }));
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MeasurementsTable
            measurements={temperaureMeasurements}
            
            title="Medidas de temperatura"
            unit="°C"
          />
          <MeasurementsTable
            measurements={noiseMeasurements}
            title="Medidas de ruido"
            unit="dB"
          />
         
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;