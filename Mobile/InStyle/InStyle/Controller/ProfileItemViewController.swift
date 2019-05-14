//
//  ProfileItemViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/25/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit

class ProfileItemViewController: UIViewController {

    @IBOutlet var navbar: UINavigationItem!
    @IBOutlet var usernameLabel: UILabel!
    @IBOutlet var productNameLabel: UILabel!
    @IBOutlet var profileImageView: UIImageView!
    @IBOutlet var productImageView: UIImageView!
    
    @IBOutlet var priceLabel: UILabel!
    @IBOutlet var brandLabel: UILabel!
    @IBOutlet var categoryLabel: UILabel!
    @IBOutlet var sizeLabel: UILabel!
    @IBOutlet var genderLabel: UILabel!
    
    @IBOutlet var descriptionLabel: UILabel!
    var productUsername: String?
    var productName: String?
    var productDescription: String?
    var productPrice: String?
    var productBrand: String?
    var productCategory: String?
    var productGender: String?
    var productSize: String?
    var productImageUrl: String?
    
    var productImage: UIImage?
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navbar.title = productName
        profileImageView.image = UIImage(named: "user")
        productImageView.image = productImage
        usernameLabel.text = productUsername
        productNameLabel.text = productName
        priceLabel.text = productPrice
        brandLabel.text = "Brand: \(productBrand!)"
        categoryLabel.text = "Category: \(productCategory!)"
        genderLabel.text = "Gender: \(productGender!)"
        sizeLabel.text = "Size: \(productSize!)"


        descriptionLabel.text = "Description: \(productDescription!)"
        descriptionLabel.sizeToFit()

        
    }
    


}
