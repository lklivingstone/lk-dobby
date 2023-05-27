Deployment:
Frontend: Netlify
Backend: Render

Login credentials (You can create your own account and log in as well): 
Username: lk
Password: lk

Description of the application:
The User will log in with the option of uploading an image or viewing their uploaded images. They can also do search operations on their images.

The flow of the application:
The user will upload an image, the API will use Multer to handle file uploads through HTTP requests and save them in the server temporarily. Then the image will be uploaded to Imgur and the URL of the uploaded image is saved in MongoDB along with its name and the user id.
The search operation is done using RegExp, a built-in object in Javascript, which does pattern-matching on text with strings. A list of images uploaded by the users is loaded and then pattern-matching is done on its filenames.

Hosting images on a separate hosting platform and storing the image links in a database instead of uploading the entire image into the database has several advantages:
Storing images directly in a database can lead to increased storage requirements, especially for large numbers of images or high-resolution images. 
Image hosting platforms are designed to deliver images efficiently, with optimized caching, content delivery networks (CDNs), and other features that enhance performance. Serving images from a dedicated platform can reduce the load on your database and improve the overall responsiveness and scalability of your application.
When images are stored separately utilizing a CDN, images can be served from geographically distributed servers closer to the end-user, reducing latency and improving page load times. This can significantly enhance the user experience of your application, especially for users located in different regions.
Storing image links in the database enables efficient search operations without the need to search through binary image data. Search techniques can be based on attributes like image names, tags, etc.