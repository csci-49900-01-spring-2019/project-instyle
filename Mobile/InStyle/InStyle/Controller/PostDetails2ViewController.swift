//
//  PostDetails2ViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/24/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import Firebase
import DropDown
import SVProgressHUD

class PostDetails2ViewController: UIViewController {
    
    
    @IBOutlet var priceTextField: UITextField!
    @IBOutlet var sizeTextField: UITextField!
    @IBOutlet var genderSelection: UIButton!
    @IBOutlet var descriptionTextField: UITextView!
    
    var imageUrl: String?
    var productName: String?
    var brand: String?
    var category: String?
    
    var gender = ""
    let genderDropDown = DropDown()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupGenderDropDown()
    
    }
    
    func setupGenderDropDown() {
        genderDropDown.anchorView = genderSelection
        genderDropDown.direction = .bottom
        genderDropDown.dataSource = ["M", "F"]
        genderDropDown.selectionAction = { [weak self] (index, item) in
            self?.genderSelection.setTitle(item, for: .normal)
            self?.gender = item
        }
    }
    
    
    @IBAction func genderSelectionTapped(_ sender: Any) {
        genderDropDown.show()
    }
    
    @IBAction func finishTapped(_ sender: Any) {
        
        
//        print("imageUrl: \(imageUrl!)")
//        print("productName: \(productName!)")
//        print("brand: \(brand!)")
//        print("cat: \(category!)")
//        print("gender: \(gender)")
//        print("price: \(priceTextField.text!)")
//        print("size: \(sizeTextField.text!)")
//        print("descr: \(descriptionTextField.text!)")
        
        SVProgressHUD.show()
        let user = Auth.auth().currentUser
        if let currentUser = user {
            let uid = currentUser.uid
            let db = Firestore.firestore()
            let pid = db.collection("posting").document().documentID
            
            
            db.collection("posting").document(pid).setData([
                    "imageUrls": [imageUrl!],
                    "uid": uid,
                    "id": pid,
                    "sold": false,
                    "product_name": productName!,
                    "brand": brand!,
                    "category": category!,
                    "gender": gender,
                    "price": priceTextField.text!,
                    "size" : sizeTextField.text!,
                    "description": descriptionTextField.text!,
                    "timestamp": Date().timeIntervalSince1970
                ])
        }

        
        SVProgressHUD.dismiss()
        navigationController?.popToRootViewController(animated: true)
        
       
    }
    

}
