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
    
    init(username: String?, product: String?, price: String?, imageUrl: String?) {
        self.username = username
        self.product = product
        self.price = "$ \(price!)"
        self.imageUrl = imageUrl
    }
}
