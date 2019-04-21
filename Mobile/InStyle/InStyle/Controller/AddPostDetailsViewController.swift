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


class AddPostDetailsViewController: UIViewController {
    
    @IBOutlet var productImage: UIImageView!
    
    var imageUrl: String?

    override func viewDidLoad() {
        super.viewDidLoad()

        print(imageUrl!)
        
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
    

}
