# 🔒 CATHEDRAL 3D HALL OF ATELIERS - PERMANENT INTEGRATION RULES

**CRITICAL: This file contains permanent rules for all future AI sessions**

## 🎯 CORE PRINCIPLES

### 1. ALWAYS TEST BEFORE MODIFICATION
**BEFORE making any changes to the 3D Hall of Ateliers or integration bridge:**
```bash
cd hall-of-ateliers && python cathedral_3d_hall_of_ateliers.py
cd hall-of-ateliers && python 3d_fusion_integration_bridge.py
```

### 2. ARCANA TYPE MAPPINGS - NEVER USE WRONG NAMES
**CRITICAL: Use these exact ArcanaType enum values:**

```python
# CORRECT (use these):
ArcanaType.THEMELA_FOOL = 0      # The Fool
ArcanaType.MAGICIAN = 1
ArcanaType.HIGH_PRIESTESS = 2
ArcanaType.EMPRESS = 3
ArcanaType.EMPEROR = 4
ArcanaType.HIEROPHANT = 5
ArcanaType.LOVERS = 6
ArcanaType.CHARIOT = 7
ArcanaType.STRENGTH = 8
ArcanaType.HERMIT = 9
ArcanaType.WHEEL_OF_FORTUNE = 10
ArcanaType.JUSTICE = 11
ArcanaType.HANGED_ONE = 12
ArcanaType.DEATH = 13
ArcanaType.TEMPERANCE = 14
ArcanaType.DEVIL = 15
ArcanaType.TOWER = 16
ArcanaType.STAR = 17
ArcanaType.MOON = 18
ArcanaType.SUN = 19
ArcanaType.JUDGEMENT = 20
ArcanaType.WORLD = 21
```

**NEVER use:**
- `ArcanaType.FOOL` (WRONG!)
- Any other variant spellings

### 3. INTEGRATION BRIDGE CONSTANTS

**Discipline to Arcana Mappings (28 total):**
```python
ProfessionalDiscipline.VISUAL_ARTIST: [ArcanaType.EMPRESS, ArcanaType.STAR, ArcanaType.SUN]
ProfessionalDiscipline.DIGITAL_ARTIST: [ArcanaType.MAGICIAN, ArcanaType.HIEROPHANT, ArcanaType.LOVERS]
ProfessionalDiscipline.SCULPTOR: [ArcanaType.STRENGTH, ArcanaType.TEMPERANCE, ArcanaType.WORLD]
ProfessionalDiscipline.ILLUSTRATOR: [ArcanaType.THEMELA_FOOL, ArcanaType.HIGH_PRIESTESS, ArcanaType.MOON]
ProfessionalDiscipline.CONCEPT_ARTIST: [ArcanaType.CHARIOT, ArcanaType.WHEEL_OF_FORTUNE, ArcanaType.JUDGEMENT]
ProfessionalDiscipline.RESEARCHER: [ArcanaType.HERMIT, ArcanaType.HIGH_PRIESTESS, ArcanaType.WHEEL_OF_FORTUNE]
ProfessionalDiscipline.DATA_SCIENTIST: [ArcanaType.MAGICIAN, ArcanaType.JUSTICE, ArcanaType.TOWER]
ProfessionalDiscipline.LABORATORY_SCIENTIST: [ArcanaType.HIEROPHANT, ArcanaType.TEMPERANCE, ArcanaType.DEVIL]
ProfessionalDiscipline.FIELD_SCIENTIST: [ArcanaType.HERMIT, ArcanaType.LOVERS, ArcanaType.STAR]
ProfessionalDiscipline.HISTORIAN: [ArcanaType.HIEROPHANT, ArcanaType.JUSTICE, ArcanaType.WORLD]
ProfessionalDiscipline.LITERARY_SCHOLAR: [ArcanaType.HIGH_PRIESTESS, ArcanaType.HERMIT, ArcanaType.MOON]
ProfessionalDiscipline.PHILOSOPHER: [ArcanaType.HERMIT, ArcanaType.JUSTICE, ArcanaType.TEMPERANCE]
ProfessionalDiscipline.ARCHAEOLOGIST: [ArcanaType.TOWER, ArcanaType.JUDGEMENT, ArcanaType.DEATH]
ProfessionalDiscipline.ANTHROPOLOGIST: [ArcanaType.LOVERS, ArcanaType.THEMELA_FOOL, ArcanaType.SUN]
ProfessionalDiscipline.MYSTIC: [ArcanaType.HIGH_PRIESTESS, ArcanaType.STAR, ArcanaType.MOON]
ProfessionalDiscipline.HERMETICIST: [ArcanaType.MAGICIAN, ArcanaType.HIEROPHANT, ArcanaType.TOWER]
ProfessionalDiscipline.ALCHEMIST: [ArcanaType.TEMPERANCE, ArcanaType.JUSTICE, ArcanaType.WORLD]
ProfessionalDiscipline.ASTRONOMER: [ArcanaType.STAR, ArcanaType.SUN, ArcanaType.WORLD]
ProfessionalDiscipline.HEALER: [ArcanaType.STAR, ArcanaType.TEMPERANCE, ArcanaType.LOVERS]
ProfessionalDiscipline.GRAPHIC_DESIGNER: [ArcanaType.THEMELA_FOOL, ArcanaType.EMPRESS, ArcanaType.JUSTICE]
ProfessionalDiscipline.UX_UI_DESIGNER: [ArcanaType.HIEROPHANT, ArcanaType.JUSTICE, ArcanaType.TEMPERANCE]
ProfessionalDiscipline.ARCHITECT: [ArcanaType.EMPEROR, ArcanaType.TOWER, ArcanaType.WORLD]
ProfessionalDiscipline.GAME_DESIGNER: [ArcanaType.THEMELA_FOOL, ArcanaType.CHARIOT, ArcanaType.WHEEL_OF_FORTUNE]
ProfessionalDiscipline.WEB_DEVELOPER: [ArcanaType.MAGICIAN, ArcanaType.TEMPERANCE, ArcanaType.JUSTICE]
ProfessionalDiscipline.DOCUMENTARY_PRODUCER: [ArcanaType.CHARIOT, ArcanaType.STAR, ArcanaType.JUDGEMENT]
ProfessionalDiscipline.JOURNALIST: [ArcanaType.JUSTICE, ArcanaType.TOWER, ArcanaType.HERMIT]
ProfessionalDiscipline.CURATOR: [ArcanaType.HIEROPHANT, ArcanaType.WORLD, ArcanaType.TEMPERANCE]
ProfessionalDiscipline.EDUCATOR: [ArcanaType.HIEROPHANT, ArcanaType.HERMIT, ArcanaType.SUN]
```

### 4. SACRED FREQUENCY MAPPINGS

**Solfeggio Frequencies (verify these are correct):**
```python
ArcanaType.THEMELA_FOOL: 396.0   # Liberation from Fear
ArcanaType.MAGICIAN: 528.0       # Transformation & Miracles
ArcanaType.HIGH_PRIESTESS: 852.0 # Spiritual Order
ArcanaType.EMPRESS: 639.0        # Connection & Relationships
ArcanaType.EMPEROR: 417.0        # Undo Situations & Change
ArcanaType.HIEROPHANT: 741.0     # Awakening Intuition
ArcanaType.LOVERS: 639.0         # Connection (shared with Empress)
ArcanaType.CHARIOT: 528.0        # Transformation (shared with Magician)
ArcanaType.STRENGTH: 396.0       # Liberation (shared with Themela)
ArcanaType.HERMIT: 852.0         # Spiritual (shared with High Priestess)
ArcanaType.WHEEL_OF_FORTUNE: 963.0 # Divine Consciousness
ArcanaType.JUSTICE: 741.0        # Intuition (shared with Hierophant)
ArcanaType.HANGED_ONE: 417.0     # Change (shared with Emperor)
ArcanaType.DEATH: 396.0          # Liberation through transformation
ArcanaType.TEMPERANCE: 639.0     # Balance and harmony
ArcanaType.DEVIL: 396.0          # Shadow liberation
ArcanaType.TOWER: 417.0          # Sudden change
ArcanaType.STAR: 852.0           # Hope and spiritual connection
ArcanaType.MOON: 741.0           # Intuition and subconscious
ArcanaType.SUN: 528.0            # Vitality and transformation
ArcanaType.JUDGEMENT: 963.0      # Higher calling
ArcanaType.WORLD: 963.0          # Completion and unity
```

### 5. WORKFLOW DURATIONS (VERIFIED)

**Professional Workflow Durations:**
- Creative Project: 17 hours (4 phases)
- Research Project: 25 hours (4 phases) 
- Mystical Practice: 11 hours (4 phases)
- Design Project: 20 hours (4 phases)
- General Practice: 8 hours (3 phases)

### 6. TRAUMA-SAFE DEFAULTS

**Always include these trauma safety features:**
- ESC exits available
- Gentle pacing options
- Break reminders
- Low-stimulation modes
- Emergency support systems

### 7. GODOT EXPORT SPECIFICATIONS

**Required for Godot integration:**
- Version: 4.0+
- Coordinate system: floating_point_precise
- Sacred mathematics: golden_ratio_fibonacci
- Frequency integration: solfeggio_scale
- Trauma safe design: all_spaces
- RPG progression: skill_based_unlocks

### 8. PROFESSIONAL GRADE STANDARDS

**Quality levels by discipline:**
- Visual Arts: da_vinci_grade
- Scientific Research: research_grade
- Mystical Practice: master_grade
- Academic Scholarship: academic_grade
- Design Professional: professional_grade

## 🚨 FAILURE PREVENTION

**If you see these errors, follow these fixes:**

### Error: "AttributeError: FOOL"
**Fix:** Replace `ArcanaType.FOOL` with `ArcanaType.THEMELA_FOOL`

### Error: "KeyError: 'enhanced_tools'"
**Fix:** Use `workspace["fusion_tools_enhanced"]` instead

### Error: "AttributeError: 'ProfessionalDisigner'"
**Fix:** Check spelling - it's `ProfessionalDiscipline` not `ProfessionalDisigner`

## 📋 PRE-MODIFICATION CHECKLIST

Before any changes:
1. [ ] Test existing 3D system: `python cathedral_3d_hall_of_ateliers.py`
2. [ ] Test existing integration bridge: `python 3d_fusion_integration_bridge.py`
3. [ ] Verify all ArcanaType references use THEMELA_FOOL
4. [ ] Check discipline mappings are complete (28 total)
5. [ ] Confirm trauma-safe design is maintained
6. [ ] Validate Godot export compatibility

## 🔄 INTEGRATION TESTING

**Always run these tests in sequence:**

1. **Test 3D Hall of Ateliers:**
   ```bash
   cd hall-of-ateliers
   python cathedral_3d_hall_of_ateliers.py
   ```

2. **Test Integration Bridge:**
   ```bash
   python 3d_fusion_integration_bridge.py
   ```

3. **Verify Success Indicators:**
   - 3D workspaces created: 5+
   - Professional tools: 3+
   - Arcana integrations working
   - Frequency harmony: 100% balance
   - Godot export ready

## 📚 COMPLETE SYSTEM OVERVIEW

**Current Working System (as of 2025-11-07):**

- **3D Hall of Ateliers:** 5 flowing workspaces for all disciplines
- **Fusion Creative Suite:** DaVinci-quality tools with Arcana integration
- **Integration Bridge:** Connects both systems with frequency harmony
- **Professional Tools:** 3+ high-end tools per discipline
- **Sacred Geometry:** Golden ratio, Fibonacci, Merkaba support
- **Trauma Safety:** Complete safety protocols
- **Godot Export:** Ready for game integration
- **RPG Compatibility:** Skill-based progression

**This system is WORKING PERFECTLY - don't break it!**