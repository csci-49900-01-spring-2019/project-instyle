//
//  PostTableViewCell.swift
//  InStyle
//
//  Created by Super MattMatt on 4/11/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit

//protocol PostTableCellDelegate {
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
//                          size: String)
//}

class PostTableViewCell: UITableViewCell {
    
    @IBOutlet var username: UILabel!
    @IBOutlet var product: UILabel!
    @IBOutlet var productImage: UIImageView!
    @IBOutlet var price: UILabel!
    @IBOutlet var buyButton: UIButton!
    @IBOutlet var profileImage: UIImageView!
    
    
//    var delegate: PostTableCellDelegate?
    
    var pid = ""
    var sold = false
    var productDescription = ""
    var brand = ""
    var category = ""
    var gender = ""
    var size = ""
    
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
//    @IBAction func buyButtonPressed(_ sender: Any) {
//        delegate?.buyButtonPressed(username: username.text!,
//                                   product: product.text!,
//                                   productImage: productImage.image!,
//                                   price: price.text!,
//                                   pid: pid,
//                                   sold: sold,
//                                   description: productDescription,
//                                   brand: brand,
//                                   category: category,
//                                   gender: gender,
//                                   size: size)
//    }
}
