"""Run a simple Agency of Tomorrow simulation from the terminal."""

brief = input("Campaign brief: ").strip()
audience = input("Audience: ").strip()
goal = input("Goal: ").strip()

print("\n--- Agency of Tomorrow simulation ---")
print(f"\nSTRATEGY\nPosition {brief} as a point of view for {audience}, not simply a product release.")
print("\nCREATIVE\nBuild one visual world and three repeatable content expressions around the central insight.")
print(f"\nMEDIA\nStart with one discovery channel and one capture channel. Test whether the work can {goal.lower()}.")
print("\nQUALITY\nCheck brand fit, factual claims, and whether the message is clear before publishing.")
print("\nHUMAN APPROVAL\nA person signs off on the strategic territory, creative route, and final claims.")
