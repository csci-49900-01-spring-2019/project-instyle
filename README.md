# API DOCUMENTATION:    
We used Firebase Functions host our RESTful API.    
Firebase Functions is built on top of Node.js so that made it possible to use Express,     
which is a Node.js web application framework.     
All the endpoints are written under the Express framework.     


### Base URL for api is: https://.../api/


### URL: /register
```
Method: POST
Body: email, password
Description: logs a valid user in
Returns: isAuth, token, uid, user_name, first_name, last_name
```


### URL: /register
```
Method: POST
Body: email, password, user_name, first_name, last_name
Description: registers a new user
Returns: success, uid
```


### URL: /userInfo
```
Method: GET
Header: JWT Access Token
Description: Gets current user's information
Returns: success, uid, email, user_name, first_name, last_name
```


### URL: /user
```
Method: GET
Params: uid
Description: gets a user's information
Returns: email, user_name, first_name, last_name
```


### URL: /posts
```
Method: POST
Body: token, product_name, price, size, brand, gender, category, description, imageUrls
Description: uploads one post 
Returns: success, id
```


### URL: /posts
```
Method: GET
Params: id
Description: gets one post with that id
Returns: success, data
```


### URL: /posting
```
Method: GET
Description: gets all posts 
Returns: success, data
```


### URL: /uploadImage
```
Method: POST
Body: token, id, remoteFile
Description: uploads one image
Returns: success, imageUrl
```


### URL: /buy
```
Method: POST
Body: token, id
Description: uploads one post 
Returns: success
```


### URL: /user/posts
```
Method: GET
Params: uid
Description: gets all user's posts
Returns: posts
```


### URL: /user/purchases
```
Method: GET
Params: uid
Description: gets all user's purchases
Returns: posts
```


### URL: /user/soldItems
```
Method: GET
Params: uid
Description: gets all user's sold items
Returns: posts
```


