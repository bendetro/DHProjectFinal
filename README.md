# Automated OCR Web Application

## Ben-Gurion University of the Negev, Digital Humanities Project 2020

### Web application for scanning, detecting & analayzing text in images.

#### This Service Facilitates an automated solution for data collection as part of the Mask Please! Linguistic Landscape of COVID-19 in Israel research [Link](http://yaeln.org/maskplease/s/masks/page/welcome).

Requirments:

- Mobile / Desktop device.
- Internet connectivity.
- Supported image.

Usage guidelines:

- Go to our project [site](https://lit-plateau-17372.herokuapp.com 'Automated OCR Web Application').
- Click on the "Upload" button or drag an image to that area.
- Image will be analyzed for a few seconds.
- On success, detected content will be available for editing.
- Make sure content analasys is valid, you should edit it if not.
- Insert your name & email and submit the form.

Supported images guidelines:

- Upload only a single image at a time.
- Image size should not exceed 4MB.
- Make sure image is croped & zoomed correctly over the sign.
- Sign content should be clear with suffice resolution.
- Make sure a single sign per image is submitted.

Example of a bad image:
![Image](https://user-images.githubusercontent.com/42215057/92302412-a2839a80-ef74-11ea-964e-6a64e2bc4095.jpeg)

Geolocation guidelines:

- Our service extracts image location if exsits.
- In order to enable geotagging on your mobile device
  - Android: Camera App -> Settings -> enable geolocation info.
  - IOS: Settings -> Privacy -> Location services -> Camera -> Allow location access.
- Make sure GPS is enabled when image is taken.

# Abstract Design

Here we can see the Use-Case diagram of the project.

![Diagram](https://user-images.githubusercontent.com/42215057/92303313-4cb2f080-ef7c-11ea-830d-09369a3c7655.png)

We designed our system as a composition of separate non dependent components s.t. each component can be utilized seperatly.

- Client: A React JS based solution deployed on Heroku infrestructure, facilitates the image submission UI in a convinient matter. Can be accessed via our project [site](https://lit-plateau-17372.herokuapp.com 'Automated OCR Web Application').

- Image Analasyis Service: a Node.JS Based solution deployed on Heroku infrestructure, with an Express server, following the Microservices Architecture pattern. Our service acts as the main business logic component handeling all Image Analasyis requierments - Upload image entry point, Interactivity with external services, db connectivity, mailing, etc..

- Owner Client: A python based solution interacting with our Image Analasyis Service. Serves as the main entry point for the system owner. The service fetches all of the data from our db, reconstructs the images locally, and builds a CSV file for all of the analayzed images data - id, content, geolocation, user name, email.

# API Documentation

## Upload Image

**You send:** Your image as binary form data.
**You get:** Image metadata object.

**Request:**

```json
curl 'https://whispering-castle-08366.herokuapp.com/' \
  -H 'Connection: keep-alive' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' \
  -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryN0Ts9ZfCr5CTrYZv' \
  -H 'Origin: https://lit-plateau-17372.herokuapp.com' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://lit-plateau-17372.herokuapp.com/' \
  -H 'Accept-Language: en-US,en;q=0.9,he;q=0.8' \
  --data-binary $'------WebKitFormBoundaryN0Ts9ZfCr5CTrYZv\r\nContent-Disposition: form-data; name="image"; filename="image79a94502a-db6a-5c58-a82d-672e12b09390.jpg"\r\nContent-Type: application/octet-stream\r\n\r\***example-binary-content***\r\n------WebKitFormBoundaryN0Ts9ZfCr5CTrYZv--\r\n' \
  --compressed
```

**Successful Response object:**

```json
{
  "id": 60,
  "content": "this is the image content",
  "address": "Default address",
  "latitude": "31.262325",
  "longitude": "34.804234"
}
```

## Update Image metadata

**You send:** Your updated image metadata, name and email.
**You get:** Empty response.

**Request:**

```json
curl 'https://whispering-castle-08366.herokuapp.com/' \
 -X 'PUT' \
 -H 'Connection: keep-alive' \
 -H 'Accept: application/json, text/plain, _/_' \
 -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' \
 -H 'Content-Type: application/json;charset=UTF-8' \
 -H 'Origin: https://lit-plateau-17372.herokuapp.com' \
 -H 'Sec-Fetch-Site: cross-site' \
 -H 'Sec-Fetch-Mode: cors' \
 -H 'Sec-Fetch-Dest: empty' \
 -H 'Referer: https://lit-plateau-17372.herokuapp.com/' \
 -H 'Accept-Language: en-US,en;q=0.9,he;q=0.8' \
 --data-binary '{"id":60,"email":"youremail@gmail.com","name":"John Doe","content":"this is the updated image content"}' \
 --compressed
```

**Successful Response object:**

```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy
```

## Fetch all Images and metadata

**You send:** An empty request.
**You get:** All Images and their metadata.

**Request:**

```json
curl --location --request GET 'https://whispering-castle-08366.herokuapp.com/'
```

**Successful Response object:**

```json
[
  {
    "id": 1,
    "content": "content 1",
    "image": "base64-image-data",
    "name": "user name",
    "email": "user email",
    "latitude": "31.262325",
    "longitude": "34.804234",
    "address": "address where image was taken"
  }
]
```

# External APIs

- Google Cloud Vision API [(Link)](https://cloud.google.com/vision/docs/ocr).
- Google Geocoding API [(Link)](https://developers.google.com/maps/documentation/geocoding/overview).
- Google Natural-Language API [(Link)](https://cloud.google.com/natural-language).
