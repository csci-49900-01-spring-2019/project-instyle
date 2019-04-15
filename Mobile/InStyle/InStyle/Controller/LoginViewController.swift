//
//  LoginViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/7/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import Foundation
import UIKit
import Firebase
import SwiftKeychainWrapper

class LoginViewController: UIViewController {
    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
     
    }
    
    @IBAction func loginPressed(_ sender: Any) {
        Auth.auth().signIn(withEmail: emailTextField.text!, password: passwordTextField.text!) {
            (AuthDataResult, Error) in
            if Error != nil {
                print(Error!)
            }
            
            else {
                print("Logged in successfully")
                AuthDataResult!.user.getIDTokenResult(forcingRefresh: true, completion: {
                    (AuthTokenResult, Error) in
                    if Error != nil {
                        print(Error!)
                    }
                    
                    else {
                        let token = AuthTokenResult!.token
                        let saveSuccessful: Bool = KeychainWrapper.standard.set(token, forKey: "accessToken")
                        print("Save Token was successful: \(saveSuccessful)")
//                        let retrievedToken: String? = KeychainWrapper.standard.string(forKey: "accessToken")
//                        print("Retrieved Token: \(retrievedToken!)")
                    }
                })
                
                
                self.performSegue(withIdentifier: "goToTabViewController", sender: self)
            }
        }
    }
    
}

