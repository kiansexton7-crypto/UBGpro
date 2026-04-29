import re

broken_ids = {1, 5, 8, 9, 10, 14, 21, 22, 23, 24, 25, 26, 28, 31, 32, 33, 34, 35, 36, 41, 42, 43, 45, 46, 49, 50, 52, 53, 54, 58, 67, 68, 74, 75, 76, 79, 82, 83, 86, 87, 88, 89, 91, 93, 94, 96, 100, 102, 103, 104}

with open('c:/Users/zoese/UBGPro/js/games.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Match each game object line
# Example: { id: 1,  name: "Stick Merge", ... },
game_pattern = re.compile(r'\s*\{ id: (\d+),.*\},?\n')

def filter_games(match):
    game_id = int(match.group(1))
    if game_id in broken_ids:
        return "" # Remove
    return match.group(0) # Keep

new_content = game_pattern.sub(filter_games, content)

with open('c:/Users/zoese/UBGPro/js/games.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully filtered games.js")
