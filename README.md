# Abstract     
InStyle is a way creating a trusted community of people that wants to buy or sell all kinds of unique items at a bargain price. It is a platform connecting both seller and buyers and they are mutually benefit from using it.The users can be able to browse different items based on filters and purchase the items using a first come first serve policy, and also acts as a freelance retail consultant to sell items. Our project is going to have a web client and an IOS application, and these two clients will communicate with a RESTful API and exchange messages using the request–response messaging pattern. And the API is going to interact with the firebase database.      


# Introduction
Instyle is a selling app that have a web client and an IOS application. The mission is simple: to make selling easier than buying. Shopping agents can be everyone and making some money through a simple trip to the shops or your closets and post deals on the InStyle, buyers can find the best deals they can find anywhere. If user is interested in the product posted, the platform is using a first come first serve policy, the user can choose the buy option and the shopping agent can buy on behalf of buyers with some fees. The user can be able to browse different items based on filters, and also acts as a freelance retail consultant.  

Image a shopping day, you go to Nordstrom Rack and score a pair of Coach stilettos that you really like but not in your size. The price is reduced from $345 to $35 and you know that someone who can fits it will buy it without hesitation in the price of $35 or even $50. That’s where Instyle comes in. You can sell it in our App with  “post” bottom offer in our App, you spend a minute and take some pictures and describe the items with price,brand,and size information for potential buyers. Buyers who is viewing our Instyle App either through IOS or Web, they find your posting interested and decide to buy it from you at $50 because it is cheaper than anywhere they can find. On the same time, you get the selling fees of $15 by just posting it on Instyle.  Our App connect you as the sellers and potential buyers, it provides mutual benefits for both party.         


# Main content section   

## Recap: 
The whole idea of Instyle is to connect two types of users: buyers and sellers through an E-Commerce App/platform. Individual sellers will be able to post products they find while shopping and sell items they find for profit, and buyers will be able to scores the good deals that sellers find in stores. Sellers getting profit through setting product prices and taking selling fees into consideration, and buyer save the money through the good discount the buyer find in the stores. We are building the eCommerce website called Instyle with both web and IOS application and start selling products online. We are using restful APIs to communicate with  web, IOS client and firebase database.      


## The idea:  
Our Instyle App allow users to sign up an account, sign in, and sign out to identify the users.The sell function is very easy, you make posting as easy as 1-2-3! Snap a photo of item you want to sell with your iphone or web, fill in description, set the price and you are all done! To explore what’s currently selling, you can see details of the postings including pictures, brand, price,size and detail description. There is also keyword search function that will allow you to search for specific brands, size and products.      

    
# API DOCUMENTATION:    
We used Firebase Functions host our RESTful API.    
Firebase Functions is built on top of Node.js so that made it possible to use Express,     
which is a Node.js web application framework.     
All the endpoints are written under the Express framework.     


### Base URL for api is: https://instyle-5f93a.firebaseapp.com/api/


#### URL: /login
```
Method: POST
Body: email, password
Description: logs a valid user in
Returns: isAuth, token, uid, user_name, first_name, last_name
```


#### URL: /register
```
Method: POST
Body: email, password, user_name, first_name, last_name
Description: registers a new user
Returns: success, uid
```


#### URL: /signout
```
Method: POST
Description: Signs out the current user.
Returns: success, status, message
```


#### URL: /userInfo
```
Method: GET
Header: JWT Access Token
Description: Gets current user's information
Returns: success, uid, email, user_name, first_name, last_name
```


#### URL: /user
```
Method: GET
Params: uid
Description: gets a user's information
Returns: email, user_name, first_name, last_name
```


#### URL: /posts
```
Method: POST
Body: token, product_name, price, size, brand, gender, category, description, imageUrls
Description: uploads one post 
Returns: success, id
```


#### URL: /posts
```
Method: GET
Params: id
Description: gets one post with that id
Returns: success, data
```


#### URL: /posting
```
Method: GET
Description: gets all posts 
Returns: success, data
```


#### URL: /uploadImage
```
Method: POST
Body: token, id, remoteFile
Description: uploads one image
Returns: success, imageUrl
```


#### URL: /buy
```
Method: POST
Body: token, id
Description: uploads one post 
Returns: success
```


#### URL: /user/posts
```
Method: GET
Params: uid
Description: gets all user's posts
Returns: posts
```


#### URL: /user/purchases
```
Method: GET
Params: uid
Description: gets all user's purchases
Returns: posts
```


#### URL: /user/soldItems
```
Method: GET
Params: uid
Description: gets all user's sold items
Returns: posts
```


