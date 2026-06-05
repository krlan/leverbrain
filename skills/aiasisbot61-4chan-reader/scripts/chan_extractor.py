#!/usr/bin/env python3
import sys
import os
import json
import re
import html
import urllib.request
from datetime import datetime

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"

def clean_html(raw_html):
    if not raw_html:
        return ""
    # Replace <br> tags with newlines
    text = re.sub(r'<br\s*/?>', '\n', raw_html)
    # Strip other HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Unescape HTML entities
    text = html.unescape(text)
    return text.strip()

def limit_words(text, limit):
    if not limit or limit <= 0:
        return text
    words = text.split()
    if len(words) <= limit:
        return text
    return " ".join(words[:limit]) + "..."

import ssl

def fetch_json(url):
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': USER_AGENT}
    )
    try:
        context = ssl._create_unverified_context()
        with urllib.request.urlopen(req, context=context) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching data from {url}: {e}", file=sys.stderr)
        sys.exit(1)

def cmd_catalog(board):
    url = f"https://a.4cdn.org/{board}/catalog.json"
    catalog = fetch_json(url)
    
    for page in catalog:
        threads = page.get("threads", [])
        for t in threads:
            thread_id = t.get("no")
            replies = t.get("replies", 0)
            
            # Extract teaser text
            subject = t.get("sub", "")
            comment = t.get("com", "")
            
            teaser = subject if subject else clean_html(comment)
            # Make teaser single line
            teaser_single = " ".join(teaser.split())
            if len(teaser_single) > 100:
                teaser_single = teaser_single[:97] + "..."
                
            print(f"{thread_id}|{replies}|{teaser_single}")

def cmd_thread(board, thread_id, output_root_dir=None, word_limit=None):
    url = f"https://a.4cdn.org/{board}/thread/{thread_id}.json"
    thread_data = fetch_json(url)
    posts = thread_data.get("posts", [])
    
    output_lines = []
    output_lines.append(f"Thread: {thread_id} on board: {board}")
    output_lines.append(f"Retrieved on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    output_lines.append("-" * 60)
    output_lines.append("")
    
    for post in posts:
        post_id = post.get("no")
        name = post.get("name", "Anonymous")
        date_str = post.get("now", "")
        comment = clean_html(post.get("com", ""))
        
        if word_limit:
            comment = limit_words(comment, word_limit)
            
        output_lines.append(f"Post #{post_id} by {name} on {date_str}")
        
        # Check for file attachments
        tim = post.get("tim")
        ext = post.get("ext")
        if tim and ext:
            filename = post.get("filename", "file")
            w = post.get("w", 0)
            h = post.get("h", 0)
            fsize = post.get("fsize", 0)
            file_url = f"https://i.4cdn.org/{board}/{tim}{ext}"
            output_lines.append(f"Attachment: {file_url} ({filename}{ext}, {w}x{h}, {fsize} bytes)")
            
        output_lines.append("-" * 40)
        if comment:
            output_lines.append(comment)
        else:
            output_lines.append("[No text content]")
        output_lines.append("=" * 60)
        output_lines.append("")
        
    full_output = "\n".join(output_lines)
    
    if output_root_dir:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        dir_name = f"{board}_{timestamp}"
        target_dir = os.path.join(output_root_dir, dir_name)
        os.makedirs(target_dir, exist_ok=True)
        
        file_path = os.path.join(target_dir, f"{thread_id}.txt")
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(full_output)
            print(f"Successfully extracted thread {thread_id} to: {file_path}")
        except Exception as e:
            print(f"Error writing thread file: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        print(full_output)

def main():
    if len(sys.argv) < 3:
        print("Usage:", file=sys.stderr)
        print("  python3 chan_extractor.py catalog <board>", file=sys.stderr)
        print("  python3 chan_extractor.py thread <board> <thread_id> [output_root_dir] [word_limit]", file=sys.stderr)
        sys.exit(1)
        
    command = sys.argv[1].lower()
    
    if command == "catalog":
        board = sys.argv[2]
        cmd_catalog(board)
    elif command == "thread":
        if len(sys.argv) < 4:
            print("Error: Missing thread_id.", file=sys.stderr)
            sys.exit(1)
        board = sys.argv[2]
        thread_id = sys.argv[3]
        
        output_root_dir = sys.argv[4] if len(sys.argv) > 4 else None
        
        word_limit = None
        if len(sys.argv) > 5:
            try:
                word_limit = int(sys.argv[5])
            except ValueError:
                print(f"Warning: Invalid word limit '{sys.argv[5]}'. Ignoring limit.", file=sys.stderr)
                
        cmd_thread(board, thread_id, output_root_dir, word_limit)
    else:
        print(f"Error: Unknown command '{command}'. Use 'catalog' or 'thread'.", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
