//
//  RegisterViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/7/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import Foundation
import UIKit
import Firebase
import SVProgressHUD


class RegisterViewController: UIViewController {
    

    @IBOutlet var firstName: UITextField!
    @IBOutlet var lastName: UITextField!
    @IBOutlet var userName: UITextField!
    @IBOutlet var email: UITextField!
    @IBOutlet var password: UITextField!
    

    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    @IBAction func registerPressed(_ sender: Any) {
        SVProgressHUD.show()
        Auth.auth().createUser(withEmail: email.text!, password: password.text!) {
            (AuthDataResult, error) in
            if error != nil {
                print(error!)
                SVProgressHUD.dismiss()
                let alert = UIAlertController(title: "Error", message: "Something Went Wrong", preferredStyle: .alert)
                let action = UIAlertAction(title: "Ok", style: .cancel) { (action:UIAlertAction) in
                    print("You've pressed ok")
                }
                alert.addAction(action)
                self.present(alert, animated: true, completion: nil)
            }
            else {
                print("Registration Successful")
                let db = Firestore.firestore()
                db.collection("users").document(AuthDataResult!.user.uid).setData([
                    "email": self.email.text!,
                    "first_name": self.firstName.text!,
                    "last_name": self.lastName.text!,
                    "user_name": self.userName.text!,
                    "uid": AuthDataResult!.user.uid,
                    "products": []
                    ])
                SVProgressHUD.dismiss()
                self.performSegue(withIdentifier: "goToTabViewController", sender: self)
            }
        }
    }
    
}

