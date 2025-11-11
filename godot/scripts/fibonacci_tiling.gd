extends Control
# FIBONACCI TILING ALGORITHM: Breaks every rigid grid
# Every UI element rescaled to nearest golden-rectangle, sheared 7°
# Your eye never returns the same angle

func _ready():
    rect_rotation = rand_range(-7.0, 7.0)
    rect_size = rect_size.snapped(Vector2(ONE * 1.6180339887498948482))

# Result: UI elements morph on spawn, breaking grid monotony
# Perfect for inventory slots, quest markers, palette buttons