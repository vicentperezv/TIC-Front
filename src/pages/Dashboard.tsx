import React, { useState, useEffect } from 'react';
import { Download, Maximize2, AlertTriangle } from 'lucide-react';
import { LineChart } from '../components/LineChart';
import { Layout } from '../components/Layout';
import { sensorData } from '../services/api';
import { SensorData } from '../types/sensordata';


const getAverages = (data: any[]) => {
  const sum = data.reduce((acc, curr) => ({
    temperature: acc.temperature + curr.temperature,
    noise: acc.noise + curr.noise,
    light: acc.light + curr.light,
  }), { temperature: 0, noise: 0, light: 0 });

  return {
    temperature: (sum.temperature / data.length).toFixed(1),
    noise: (sum.noise / data.length).toFixed(0),
    light: (sum.light / data.length).toFixed(1),
  };
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [averages, setAverange] = useState<{
    temperature: string;
    noise: string;
    light: string;
}
>( { temperature: "0", noise: "0", light: "0" })

  const [data, setData] = useState<SensorData[] | null>(null);
  useEffect(()=>{
    const fetch = async()=>{
      try{
        const result = await sensorData()
        setData(result)
        if(data) 
        setAverange(getAverages(data))
      }catch{

      }

    }
    fetch()
  },[])
  useEffect(()=>{
    if(data) 
      setAverange(getAverages(data))
  },[data])
  

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Average Temperature</h3>
              <span className="text-2xl font-bold text-blue-600">{averages.temperature}°C</span>
            </div>
            <p className="text-sm text-gray-600">Optimal range: 20-25°C</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(Number(averages.temperature) / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Ruido promedio</h3>
              <span className="text-2xl font-bold text-green-600">{averages.noise}db</span>
            </div>
            <p className="text-sm text-gray-600">Rango optimo: 50-60 dB</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${(Number(averages.noise) / 100) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Luminosidad</h3>
              <span className="text-2xl font-bold text-purple-600">{averages.light} cd</span>
            </div>
            <p className="text-sm text-gray-600">Rango optimo:</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${(Number(averages.light) / 300) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Temperatura del local</h2>
                <button 
                  onClick={() => setShowFullscreen(!showFullscreen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Maximize2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <LineChart
                data={data? data.map(d => d.temperature) : []}
                labels={data ? data.map(d => d.timestamp): []}
                label="Temperature"
                color="#3B82F6"
                unit="°C"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Niveles de Ruido</h2>
                <button 
                  onClick={() => setShowFullscreen(!showFullscreen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Maximize2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <LineChart
                data={data?data.map(d => d.noise) :[]}
                labels={data?data.map(d => d.timestamp) : []}
                label="desibeles"
                color="#10B981"
                unit="dB"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Niveles de luminosidad</h2>
                <button 
                  onClick={() => setShowFullscreen(!showFullscreen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Maximize2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <LineChart
                data={data?data.map(d => d.light) :[]}
                labels={data?data.map(d => d.timestamp) : []}
                label="Candela"
                color="#9333ea"
                unit="cd"
              />
            </div>
          </div>

          
          
          
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;