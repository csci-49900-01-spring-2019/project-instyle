//
//  ProductDetailViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/16/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import Alamofire
import AlamofireImage

class ProductDetailViewController: UIViewController {
    
    @IBOutlet var navbar: UINavigationItem!
    
    @IBOutlet var username: UILabel!
    @IBOutlet var product: UILabel!
    @IBOutlet var imageView: UIImageView!
    @IBOutlet var price: UILabel!
    @IBOutlet var brand: UILabel!
    @IBOutlet var gender: UILabel!
    @IBOutlet var size: UILabel!
    @IBOutlet var descriptionLabel: UILabel!
    @IBOutlet var buyButton: UIButton!
    @IBOutlet var profileImage: UIImageView!
    
    var productUsername = ""
    var productName = ""
    var productDescription = ""
    var productPrice = ""
    var productBrand = ""
    var productGender = ""
    var productSize = ""
    var productImageUrl = ""
    
    var productImage: UIImage?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navbar.title = productName
        profileImage.image = UIImage(named: "user")
        username.text = productUsername
        product.text = productName
        price.text = productPrice
        brand.text = "Brand: \(productBrand)"
        gender.text = "Gender: \(productGender)"
        size.text = "Size: \(productSize)"
        descriptionLabel.text = productDescription
        descriptionLabel.sizeToFit()
        imageView.image = productImage
        
//        Alamofire.request(productImageUrl).responseImage {
//            (response) in
//            debugPrint(response)
//            if let image = response.result.value {
//                self.imageView.image = image
//            }
//            else {
//                self.imageView.image = UIImage(named: "defaultProductImage")
//            }
//        }
        
    }
    

}
