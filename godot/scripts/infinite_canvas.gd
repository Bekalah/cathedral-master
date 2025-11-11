extends Camera2D
# INFINITE-CANVAS ENGINE: No squares, ever
# Rotating golden-ratio viewport that spirals to uncharted areas
# Perfect for hand-tracing or brush calligraphy

@export var zoom_speed: float = 0.15
@export var phi: float = 1.6180339887498948482

var spiral_offset := Vector2.ZERO

func _input(event):
    if event is InputEventMouseMotion and event.button_mask & MOUSE_BUTTON_MASK_LEFT:
        update_spiral_zoom(event.relative)

func update_spiral_zoom(delta: Vector2):
    var d = delta.length()
    if d > 2:  # ignore micro-move
        spiral_offset += delta.rotated(spiral_offset.angle() + d * phi)
        translate(spiral_offset)
        zoom *= Vector2.ONE.lerp(Vector2.ONE * phi, zoom_speed)

# Result: you will never scroll the same vector twice
# Perfect for hand-tracing or brush calligraphy