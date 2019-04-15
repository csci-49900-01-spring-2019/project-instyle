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
import SwiftKeychainWrapper

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
        
        Auth.auth().createUser(withEmail: email.text!, password: password.text!) {
            (AuthDataResult, error) in
            if error != nil {
                print(error!)
            }
            else {
                print("Registration Successful")
                
                AuthDataResult!.user.getIDTokenResult(forcingRefresh: true, completion: {
                    (AuthTokenResult, error) in
                    if error != nil {
                        print(error!)
                    }
                    else {
                        let token = AuthTokenResult!.token
                        let saveSuccessful: Bool = KeychainWrapper.standard.set(token, forKey: "accessToken")
                        //print("Save was successful: \(saveSuccessful)")
                        let db = Firestore.firestore()
                        db.collection("users").document(AuthDataResult!.user.uid).setData([
                            "email": self.email.text!,
                            "first_name": self.firstName.text!,
                            "last_name": self.lastName.text!,
                            "user_name": self.userName.text!,
                            "uid": AuthDataResult!.user.uid,
                            "products": []
                            ])
                        
                    }
                })
                
                
                self.performSegue(withIdentifier: "goToTabViewController", sender: self)
            }
        }
    }
    
}

