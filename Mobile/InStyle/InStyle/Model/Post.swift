//
//  Post.swift
//  InStyle
//  This is the model class that represents the blueprint for a Post
//  Created by Super MattMatt on 4/11/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import Foundation
import UIKit

class Post {
    var username: String?
    var product: String?
    var price: String?
    var imageUrl: String?
    var description: String?
    var brand: String?
    var category: String?
    var gender: String?
    var size: String?
    var sold: Bool?
    var pid: String?
    
    var defaultImage = true
    var postImage = UIImage(named: "defaultProductImage")
    
    init(username: String?,
         product: String?,
         price: String?,
         imageUrl: String?,
         description: String?,
         brand: String?,
         category: String?,
         gender: String?,
         size: String?,
         sold: Bool?,
         pid: String?) {
        
        self.username = username
        self.product = product
        self.price = "$ \(price!)"
        self.imageUrl = imageUrl
        self.description = description
        self.brand = brand
        self.category = category
        self.gender = gender
        self.size = size
        self.sold = sold
        self.pid = pid
    }
    
    func setImage(image: UIImage?) {
        self.postImage = image
        self.defaultImage = false
    }
}
