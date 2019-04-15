//
//  PostTableViewCell.swift
//  InStyle
//
//  Created by Super MattMatt on 4/11/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit

class PostTableViewCell: UITableViewCell {
    
    @IBOutlet var username: UILabel!
    @IBOutlet var product: UILabel!
    @IBOutlet var productImage: UIImageView!
    @IBOutlet var price: UILabel!
    @IBOutlet var buyButton: UIButton!
    @IBOutlet var profileImage: UIImageView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
