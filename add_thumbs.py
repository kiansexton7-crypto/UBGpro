import re
import urllib.parse

with open('js/games.js', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    full_line = match.group(0)
    name = match.group(1)
    
    # URL encode the query
    query = urllib.parse.quote_plus(name + " game thumbnail")
    thumb_url = f"https://tse2.mm.bing.net/th?q={query}&w=320&h=200&c=7"
    
    # insert thumb before url
    return full_line.replace('url: ', f'thumb: "{thumb_url}", url: ')

new_content = re.sub(r'name:\s*"([^"]+)",.*?(?=url:)', replacer, content)

with open('js/games.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
