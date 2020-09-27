import os
import requests
import json
import base64
import csv
import GPSInfoClient

url = 'https://whispering-castle-08366.herokuapp.com/'

response = requests.get(url, verify=False)

with open("dh_images.csv", "w") as csv_file:
    writer = csv.writer(csv_file, delimiter=',')
    writer.writerow(["id", "user", "email", "content", "lat", "lng", "date"])

    for obj in response.json():
        j = json.loads(json.dumps(obj))
        image_decode = base64.b64decode(j["image"])
        image = open(str(j["id"]) + '.jpg', 'wb+')
        image.write(image_decode)

        lat = j["latitude"]
        lng = j["longitude"]
        address = j["address"]

        if(lat is None or lng is None or address is None):
            writer.writerow([j["id"], j["name"], j["email"], j["content"], '-', '-', '-'])
            continue

        writer.writerow([j["id"], j["name"], j["email"], j["content"], lat, lng, address])

