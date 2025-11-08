import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface Worker {
  id: string;
  archetype: {
    name: string;
    frequency_hz: number;
  };
  mode: 'game' | 'tool';
  currentTask?: any;
  isManifesting: boolean;
}

export default function EgregoreControlPanel() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [taskQueue, setTaskQueue] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // WebSocket connection to Godot Web export
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/egregore-bridge');

    websocket.onopen = () => {
      console.log('Connected to Godot egregore bridge');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'worker_state_update') {
        setWorkers(prev => prev.map(w =>
          w.id === data.workerId ? { ...w, ...data.state } : w
        ));
      }

      if (data.type === 'task_completed') {
        // Automatically pull completed artwork into user's external project
        integrateIntoProject(data.outputPath, data.workerId);
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected from Godot bridge');
      setWs(null);
    };

    return () => websocket.close();
  }, []);

  const toggleWorkerMode = async (workerId: string) => {
    if (!ws) return;

    ws.send(JSON.stringify({
      type: 'toggle_worker_mode',
      workerPath: `/root/Workers/${workerId}`
    }));

    // Update UI state
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        const newMode = w.mode === 'game' ? 'tool' : 'game';
        return { ...w, mode: newMode };
      }
      return w;
    }));
  };

  const assignExternalTask = async (workerId: string, taskSpec: any) => {
    if (!ws) return;

    // Task spec can be: "build me a temple", "compose battle music", "generate Python module"
    const message = {
      type: 'assign_external_task',
      workerPath: `/root/Workers/${workerId}`,
      taskSpec: {
        type: taskSpec.type,
        description: taskSpec.description,
        parameters: taskSpec.parameters,
        external_project_path: taskSpec.projectPath  // /Users/bekalah/my-other-project/
      }
    };

    ws.send(JSON.stringify(message));

    setTaskQueue(prev => [...prev, {
      id: Date.now().toString(),
      workerId,
      ...taskSpec
    }]);
  };

  const integrateIntoProject = (outputPath: string, workerId: string) => {
    // Copy generated asset to user's external project
    const worker = workers.find(w => w.id === workerId);
    const targetDir = worker?.currentExternalProject || '/Users/user/Projects/';

    if (targetDir) {
      // Use Tauri API for file operations (works in web + native)
      // For now, simulate the integration
      console.log(`Asset ${outputPath} integrated into ${targetDir}`);

      // In real implementation:
      // invoke('copy_asset_to_project', {
      //   source: outputPath,
      //   destination: `${targetDir}/imports/egregore_${workerId}/`
      // });

      // Open in user's preferred editor
      // invoke('open_in_ide', { path: `${targetDir}/imports/` });
    }
  };

  const createEgregoreRequest = (taskType: string, description: string) => {
    // Create .egregore-request file in current project
    const requestData = {
      type: taskType,
      description,
      timestamp: new Date().toISOString(),
      worker: selectedWorker || 'auto' // Let system choose best worker
    };

    // In real implementation, write to project directory
    console.log('Creating egregore request:', requestData);
  };

  return (
    <div className="egregore-panel" style={{
      background: '#0d0b12',
      color: '#f4d03f',
      padding: '20px',
      borderRadius: '10px',
      fontFamily: 'monospace'
    }}>
      <h2>🧙‍♂️ Egregore Worker Control</h2>

      <div className="worker-grid">
        {workers.map(worker => (
          <div key={worker.id} className="worker-card" style={{
            border: '2px solid #f4d03f',
            padding: '15px',
            margin: '10px',
            borderRadius: '8px',
            background: worker.mode === 'tool' ? '#1a1525' : '#0d0b12'
          }}>
            <h3>{worker.archetype.name}</h3>
            <p>Mode: {worker.mode.toUpperCase()}</p>
            <p>Frequency: {worker.archetype.frequency_hz} Hz</p>

            {worker.isManifesting && (
              <div className="manifestation-indicator">
                ⚡ MANIFESTING ⚡
              </div>
            )}

            <button
              onClick={() => toggleWorkerMode(worker.id)}
              style={{
                background: '#f4d03f',
                color: '#0d0b12',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '5px'
              }}
            >
              Toggle Mode
            </button>

            {worker.mode === 'tool' && (
              <div className="tool-controls">
                <select
                  value={selectedWorker || ''}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                >
                  <option value="">Select Worker</option>
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.archetype.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => createEgregoreRequest('generate_3d_art', 'Build a sacred temple')}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '5px'
                  }}
                >
                  Build Temple
                </button>

                <button
                  onClick={() => createEgregoreRequest('compose_music', 'Create ambient soundtrack')}
                  style={{
                    background: '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '5px'
                  }}
                >
                  Compose Music
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="task-queue">
        <h3>Task Queue</h3>
        {taskQueue.map(task => (
          <div key={task.id} style={{
            border: '1px solid #666',
            padding: '10px',
            margin: '5px',
            borderRadius: '4px'
          }}>
            {task.description} - Assigned to {task.workerId}
          </div>
        ))}
      </div>

      <div className="connection-status">
        Status: {ws ? '🟢 Connected to Godot' : '🔴 Disconnected'}
      </div>
    </div>
  );
}