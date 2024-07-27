import requests
import re

def text_to_speech(transcript):
    headers = {
        'AUTHORIZATION': 'c433a125c3d5408bad2741a19d07123f',
        'X-USER-ID': 'eMDse1RdDIg22fQwm71rBK3HGgi1',
        'accept': 'text/event-stream',
        'content-type': 'application/json',
    }
    json_data = {
        'text': transcript,
        'voice': 's3://voice-cloning-zero-shot/b8b61505-3523-4dd9-a599-70b572db2a69/dumbledore/manifest.json',
        'output_format': 'mp3',
        'voice_engine': 'PlayHT2.0',
        'speed': 0.8,
    }

    response = requests.post('https://api.play.ht/api/v2/tts', headers=headers, json=json_data)
    
    # Define a regular expression pattern to match the URL
    url_pattern = r'url":\s*"([^"]*)"'

    # Use regex to find the URL in the text
    url_match = re.search(url_pattern, response.text)

    if url_match:
        # Extract the URL from the matched group
        url = url_match.group(1)
        print("Extracted URL:", url)
        
        # Download the audio file
        try:
            response = requests.get(url)
            if response.status_code == 200:
                # Specify the file path where you want to save the audio file
                file_path = r'/Users/mohammedamin/Desktop/Projects/calhacks_narration_learning/nextjs-flask/public/audio.mp3'  # You can change the filename if needed
                
                with open(file_path, 'wb') as f:
                    f.write(response.content)
                
                #print(f"Audio file downloaded successfully and saved as '{file_path}'.")
            else:
                print(f"Failed to download the audio file. Status code: {response.status_code}")
        except requests.RequestException as e:
            print(f"Error downloading the audio file: {e}")
    else:
        print("URL not found in the text.")

    return file_path