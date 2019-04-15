//
//  HomeTableViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/11/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import Firebase
import Alamofire
import AlamofireImage
import SwiftKeychainWrapper

class HomeTableViewController: UITableViewController {

 
    @IBOutlet var homeTableView: UITableView!
    
    //user information
    var currentUid: String!
    var username: String!
    var email: String!
    let db = Firestore.firestore()
    
    var postArray = [Post]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //retrieve current user's uid and information
        let user = Auth.auth().currentUser
        if let user = user {

            currentUid = user.uid
            
            db.collection("users").document(currentUid!).getDocument {
                (document, error) in
                if let document = document, document.exists {
                    let data = document.data()!
                    self.username = data["user_name"] as? String
                    self.email = data["email"] as? String
                    
                    self.db.collection("posting").whereField("uid", isEqualTo: self.currentUid!).getDocuments() {
                        (snapshot, error) in
                        if error != nil {
                            print(error!)
                        }
                        else {
                            for document in snapshot!.documents {
                                //print("\(document.documentID) => \(document.data())")
                                let data = document.data()
                                let productName = data["product_name"] as? String
                                let productPrice = data["price"] as? String
                                let productImageUrl = data["imageUrl"] as? String
                                
                                let p = Post(username: self.username,
                                             product: productName,
                                             price: productPrice,
                                             imageUrl: productImageUrl)
                            
                                self.postArray.append(p)
                               
                            }
                            
                            self.configureTableView()
                            self.homeTableView.reloadData()
                        }
                    }
                }
                else {
                    print("Document does not exist.")
                }

            }
        
            
        }
       
        //Registering PostTableViewCell.xib
        homeTableView.register(UINib(nibName: "PostTableViewCell", bundle: nil), forCellReuseIdentifier: "PostTableViewCell")
        
        configureTableView()

    

    }

    
    //*********************************************************************************************************
    //*********************************************************************************************************
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return postArray.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "PostTableViewCell", for: indexPath) as! PostTableViewCell

        
        let post = postArray[indexPath.row]

        cell.price.text = post.price
        cell.username.text = post.username
        cell.product.text = post.product
        cell.profileImage.image = UIImage(named: "user")
        
        if post.imageUrl == nil || post.imageUrl == "" {
            cell.productImage.image = UIImage(named: "defaultProductImage")
        }
        
        else {
            Alamofire.request(post.imageUrl!).responseImage {
                (response) in
                debugPrint(response)
                if let image = response.result.value {
                    cell.productImage.image = image
                }
            }
        }
        
        return cell
    }

  
    func configureTableView() {
        homeTableView.rowHeight = UITableView.automaticDimension
        homeTableView.estimatedRowHeight = 475.0
        
    }

    //*********************************************************************************************************
    //*********************************************************************************************************
    
    @IBAction func logoutPressed(_ sender: Any) {
        do {
            try Auth.auth().signOut()
            dismiss(animated: true, completion: nil)
        }
        catch {
            print("Error signing out")
        }
    }
    
}
