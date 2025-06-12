import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Tarea {
  id: string;
  nombre: string;
  descripcion: string;
  completado: boolean;
  fechaInicio: string;
  fechaFinal: string;
}

interface Props {
  tareas: Tarea[];
}

const EstadisticasTareas: React.FC<Props> = ({ tareas }) => {
  const tareasCompletadas = tareas.filter((t) => t.completado).length;
  const tareasPendientes = tareas.filter((t) => !t.completado).length;
  const totalTareas = tareasCompletadas + tareasPendientes;

  // Datos para la gráfica Pie
  const pieData = {
    labels: ['Completadas', 'Pendientes'],
    datasets: [
      {
        data: [tareasCompletadas, tareasPendientes],
        backgroundColor: ['#FFB74D', '#64B5F6'], 
        hoverBackgroundColor: ['#FFA726', '#42A5F5'],
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  // Datos para la gráfica Bar
  const barData = {
    labels: ['Completadas', 'Pendientes'],
    datasets: [
      {
        label: 'Cantidad de Tareas',
        data: [tareasCompletadas, tareasPendientes],
        backgroundColor: ['#81C784', '#FFAB91'], 
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#fff',
          font: {
            size: 14,
            family: "'Segoe UI', Tahoma, sans-serif",
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Estado de Tareas (Pie)',
        color: '#fff',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Segoe UI', Tahoma, sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: {
            family: "'Segoe UI', Tahoma, sans-serif",
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Comparativa de Tareas (Barra)',
        color: '#fff',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Segoe UI', Tahoma, sans-serif",
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
          font: {
            family: "'Segoe UI', Tahoma, sans-serif",
            size: 14,
          },
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      y: {
        ticks: {
          color: '#fff',
          font: {
            family: "'Segoe UI', Tahoma, sans-serif",
            size: 14,
          },
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
        beginAtZero: true,
      },
    },
  };

  // Nueva sección de estadísticas adicionales
  const promedioTareasPorDia = totalTareas > 0 ? (totalTareas / 7).toFixed(2) : '0';
  const porcentajeCompletadas = totalTareas > 0 ? ((tareasCompletadas / totalTareas) * 100).toFixed(1) : '0';
  const porcentajePendientes = totalTareas > 0 ? ((tareasPendientes / totalTareas) * 100).toFixed(1) : '0';

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '16px',
        maxWidth: '960px',
        margin: '40px auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'nowrap',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.15)',
            border: '1px solid #555',
            flex: '1 1 400px',
            minWidth: '320px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '12px',
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
              fontWeight: 'bold',
              fontSize: '20px',
              userSelect: 'none',
            }}
          >
            Estado de Tareas (Pie)
          </h3>
          <div style={{ flexGrow: 1 }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.15)',
            border: '1px solid #555',
            flex: '1 1 400px',
            minWidth: '320px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '12px',
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
              fontWeight: 'bold',
              fontSize: '20px',
              userSelect: 'none',
            }}
          >
            Comparativa de Tareas (Barra)
          </h3>
          <div style={{ flexGrow: 1 }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 0 12px rgba(255, 255, 255, 0.15)',
          border: '1px solid #555',
          marginTop: '24px',
          maxWidth: '720px',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#fff',
          fontFamily: "'Segoe UI', Tahoma, sans-serif",
        }}
      >
        <h3
          style={{
            fontWeight: 'bold',
            fontSize: '20px',
            marginBottom: '16px',
            userSelect: 'none',
            textAlign: 'center',
          }}
        >
          Resumen de Tareas
        </h3>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '24px',
            fontSize: '16px',
          }}
        >
          <div style={{ minWidth: '180px', textAlign: 'center' }}>
            <strong>Total de Tareas:</strong>
            <p style={{ color: '#90caf9' }}>{totalTareas}</p>
          </div>
          <div style={{ minWidth: '180px', textAlign: 'center' }}>
            <strong>Tareas Completadas:</strong>
            <p style={{ color: '#a5d6a7' }}>
              {tareasCompletadas} ({porcentajeCompletadas}%)
            </p>
          </div>
          <div style={{ minWidth: '180px', textAlign: 'center' }}>
            <strong>Tareas Pendientes:</strong>
            <p style={{ color: '#ffab91' }}>
              {tareasPendientes} ({porcentajePendientes}%)
            </p>
          </div>
          <div style={{ minWidth: '180px', textAlign: 'center' }}>
            <strong>Promedio de Tareas por Día:</strong>
            <p style={{ color: '#f48fb1' }}>{promedioTareasPorDia}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasTareas;

