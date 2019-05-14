//
//  AddPostDetailsViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/21/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import Alamofire
import AlamofireImage


class PostDetails1ViewController: UIViewController {
    
  
    @IBOutlet var productImage: UIImageView!
    
    @IBOutlet var productNameTF: UITextField!
    @IBOutlet var brandTF: UITextField!
    @IBOutlet var categoryTF: UITextField!
    
    var imageUrl: String?


    override func viewDidLoad() {
        super.viewDidLoad()
        
        Alamofire.request(imageUrl!).responseImage {
            (response) in
            debugPrint(response)
            if let image = response.result.value {
                self.productImage.image = image
            }
            else {
                self.productImage.image = UIImage(named: "defaultProductImage")
            }
        }
    }
    
    @IBAction func nextTapped(_ sender: Any) {
        self.performSegue(withIdentifier: "addPostDetails1", sender: self)
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "addPostDetails1" {
            let VC = segue.destination as! PostDetails2ViewController
            VC.imageUrl = imageUrl
            VC.productName = productNameTF.text
            VC.brand = brandTF.text
            VC.category = categoryTF.text
        }
    }
    
}
