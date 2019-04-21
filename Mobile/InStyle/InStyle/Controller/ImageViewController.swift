//
//  ImageViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/21/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit

class ImageViewController: UIViewController {

    @IBOutlet var capturedImageOutput: UIImageView!
    
    var image: UIImage?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        capturedImageOutput.image = image!
    }
    

}
