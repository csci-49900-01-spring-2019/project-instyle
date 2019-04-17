//
//  ProductDetailViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/16/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit

class ProductDetailViewController: UIViewController {
    
    @IBOutlet var navbar: UINavigationItem!
    
    var product = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navbar.title = product
        
    }
    

}
