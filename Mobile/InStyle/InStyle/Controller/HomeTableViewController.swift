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


class HomeTableViewController: UITableViewController{

    var firstLoad = true
    
    @IBOutlet var homeTableView: UITableView!
    
    //user information
    var currentUid: String!
    var username: String!
    var email: String!
    let db = Firestore.firestore()
    
    var postArray = [Post]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        listenToChanges()
    
       
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

        cell.profileImage.image = UIImage(named: "user")
        cell.username.text = post.username
        cell.price.text = post.price
        cell.product.text = post.product
        cell.brand = post.brand!
        cell.category = post.category!
        if post.pid != nil{
            cell.pid = post.pid!
        }
        cell.gender = post.gender!
        cell.size = post.size!
        cell.sold = post.sold!
        cell.productDescription = post.description!
        cell.productImage.image = post.postImage
        
        if post.defaultImage && post.imageUrl != nil {
            Alamofire.request(post.imageUrl!).responseImage {
                (response) in
                debugPrint(response)
                if let image = response.result.value {
                    cell.productImage.image = image
                    self.postArray[indexPath.row].setImage(image: image)
                }
              
            }
        }
        
        
        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        performSegue(withIdentifier: "showProductDetails", sender: indexPath)
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showProductDetails" {
            let VC = segue.destination as! ProductDetailViewController
            let indexPath = sender as! IndexPath
            
            let post = postArray[indexPath.row]
            
            VC.productUsername = post.username!
            VC.productName = post.product!
            VC.productDescription = post.description!
            VC.productImageUrl = post.imageUrl!
            VC.productPrice = post.price!
            VC.productBrand = post.brand!
            VC.productGender = post.gender!
            VC.productSize = post.size!
            VC.productImage = post.postImage
        }
    }
    
//    func buyButtonPressed(username: String,
//                          product: String,
//                          productImage: UIImage,
//                          price: String,
//                          pid: String,
//                          sold: Bool,
//                          description: String,
//                          brand: String,
//                          category: String,
//                          gender: String,
//                          size: String) {
//        print(product, pid, description)
//
//    }
  
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
    
    
    //*********************************************************************************************************
    //*********************************************************************************************************
    
    
    func firstRetrieval() {
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
                    
                    self.db.collection("posting")
                        .whereField("uid", isEqualTo: self.currentUid!)
                        .order(by: "timestamp", descending: false)
                        .getDocuments {
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
                                    let productImageUrl = data["imageUrls"] as? Array<String>
                                    let productDescription = data["description"] as? String
                                    let productBrand = data["brand"] as? String
                                    let productCategory = data["category"] as? String
                                    let productGender = data["gender"] as? String
                                    let productSize = data["size"] as? String
                                    let productSold = data["sold"] as? Bool
                                    let productPid = data["id"] as? String
                                    
                                    let p = Post(username: self.username,
                                                 product: productName,
                                                 price: productPrice,
                                                 imageUrl: productImageUrl?[0],
                                                 description: productDescription,
                                                 brand: productBrand,
                                                 category: productCategory,
                                                 gender: productGender,
                                                 size: productSize,
                                                 sold: productSold,
                                                 pid: productPid)
                                    
                                    
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
        
    }
    
    
    func listenToChanges() {
        
        db.collection("posting")
            .order(by: "timestamp", descending: true)
            .addSnapshotListener {
                (snapshot, error) in
                if error != nil {
                    print(error!)
                }
                else {
                    snapshot?.documentChanges.forEach  {
                        documentChange in
                        if (documentChange.type == .added) {
                            let data = documentChange.document.data()
                            let productName = data["product_name"] as? String
                            let productPrice = data["price"] as? String
                            let productImageUrl = data["imageUrls"] as? Array<String>
                            let productDescription = data["description"] as? String
                            let productBrand = data["brand"] as? String
                            let productCategory = data["category"] as? String
                            let productGender = data["gender"] as? String
                            let productSize = data["size"] as? String
                            let productSold = data["sold"] as? Bool
                            let productPid = data["id"] as? String
                            let uid = data["uid"] as? String
                            
                            self.db.collection("users").document(uid!).getDocument {
                                (document, error) in
                                if let document = document, document.exists {
                                    let data = document.data()
                                    let productUsername = data?["user_name"] as? String
                                    let p = Post(username: productUsername,
                                                 product: productName,
                                                 price: productPrice,
                                                 imageUrl: productImageUrl?[0],
                                                 description: productDescription,
                                                 brand: productBrand,
                                                 category: productCategory,
                                                 gender: productGender,
                                                 size: productSize,
                                                 sold: productSold,
                                                 pid: productPid)
                                   
                                    self.postArray.append(p)
                                    self.configureTableView()
                                    self.homeTableView.reloadData()
                                }
                                else {
                                    print("Document does not exist")
                                }

                            }
                        }//if documentChange == .added
                    }//foreach
                    
                }
            }
    }
}
