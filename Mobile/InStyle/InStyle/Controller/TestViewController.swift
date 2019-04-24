//
//  TestViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/23/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import DropDown

class TestViewController: UIViewController {

   
    @IBOutlet var genderSelection: UIButton!
    
    let dd = DropDown()
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupDD()
    }
    
    @IBAction func buttontap(_ sender: Any) {
        dd.show()
        
    }
    
    func setupDD() {
        dd.anchorView = genderSelection
        dd.direction = .bottom
        dd.dataSource = ["Car", "Motorcycle", "Truck"]
        dd.selectionAction = { [weak self] (index, item) in
            self?.genderSelection.setTitle(item, for: .normal)
        }
    
    }
}
