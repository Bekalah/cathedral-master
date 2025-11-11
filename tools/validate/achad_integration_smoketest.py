"""Smoketest for Achad <-> Design Suite integration."""
from pathlib import Path
import sys

# Ensure the 'design-suite' package folder is importable when running from repo root
REPO_ROOT = Path(__file__).resolve().parents[2]
DESIGN_SUITE_DIR = REPO_ROOT / "design-suite"
if str(DESIGN_SUITE_DIR) not in sys.path:
    sys.path.insert(0, str(DESIGN_SUITE_DIR))

# Optional imports for design suite validation
try:
    from design_suite import (
        CathedralDesignSuite,
        build_integration_spec,
        render_integration_preview,
    )
    DESIGN_SUITE_AVAILABLE = True
except ImportError:
    DESIGN_SUITE_AVAILABLE = False

try:
    from design_suite.hall_of_mysteries_import import FraterAchadSystem
    HALL_OF_MYSTERIES_AVAILABLE = True
except ImportError:
    HALL_OF_MYSTERIES_AVAILABLE = False


def main() -> int:
    suite = CathedralDesignSuite()
    system = FraterAchadSystem()

    pathway = system.create_individual_pathway(
        name="Integration Tester",
        magical_motto="Scientia et Ars",
        will_statement="To balance truth and beauty through precise creation",
    )
    # Assign a few arcana to drive geometry choices
    system.assign_personal_arcana(pathway, num_cards=5)

    spec = build_integration_spec(pathway, system, suite)

    # Minimal assertions
    assert "design" in spec and "individual" in spec
    assert spec["design"]["geometries"], "No geometries chosen"
    assert spec["design"]["fractal"], "No fractal chosen"

    preview = render_integration_preview(suite, spec, size=256)
    gshape = preview["geometry"]["shape"]
    fshape = preview["fractal"]["shape"]

    print("OK: Achad integration spec built and preview rendered.")
    print(f"   • Geometry {preview['geometry']['key']} -> {gshape}")
    print(f"   • Fractal  {preview['fractal']['key']}  -> {fshape}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
