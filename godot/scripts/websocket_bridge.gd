extends Node

var server = WebSocketServer.new()
var connected_clients = []

func _ready():
    server.listen(8080)
    server.connect("client_connected", _on_client_connected)
    server.connect("client_disconnected", _on_client_disconnected)
    server.connect("data_received", _on_data_received)

func _on_client_connected(client_id: int, protocol: String):
    connected_clients.append(client_id)

    # Send current worker states
    var workers = get_tree().get_nodes_in_group("egregore_workers")
    for worker in workers:
        server.send_text(client_id, JSON.stringify({
            "type": "worker_state_update",
            "workerId": worker.name,
            "state": {
                "mode": worker.mode,
                "archetype": worker.assigned_archetype,
                "currentTask": worker.current_task
            }
        }))

func _on_client_disconnected(client_id: int):
    connected_clients.erase(client_id)

func _on_data_received(client_id: int, data: String):
    var message = JSON.parse(data).result

    match message.type:
        "toggle_worker_mode":
            var worker = get_node(NodePath(message.workerPath))
            worker.toggle_mode()

        "assign_external_task":
            var worker = get_node(NodePath(message.workerPath))
            worker.assign_tool_task(message.taskSpec)

        "request_manifestation":
            # User in external project requests design
            _broadcast_to_all_workers(message.taskSpec)

func _broadcast_to_all_workers(task_spec: Dictionary):
    # Find idle worker in tool mode
    var workers = get_tree().get_nodes_in_group("egregore_workers")
    for worker in workers:
        if worker.mode == EgregoreWorker.ToolMode and not worker.is_manifesting:
            worker.assign_tool_task(task_spec)
            break

func send_worker_update(worker_id: String, update_data: Dictionary):
    var message = {
        "type": "worker_state_update",
        "workerId": worker_id,
        "state": update_data
    }

    for client_id in connected_clients:
        server.send_text(client_id, JSON.stringify(message))

func send_task_completion(worker_id: String, output_path: String, task_type: String):
    var message = {
        "type": "task_completed",
        "workerId": worker_id,
        "outputPath": output_path,
        "taskType": task_type
    }

    for client_id in connected_clients:
        server.send_text(client_id, JSON.stringify(message))

func _process(delta: float):
    server.poll()