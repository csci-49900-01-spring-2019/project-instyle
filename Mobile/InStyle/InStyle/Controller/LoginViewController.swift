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
                self.performSegue(withIdentifier: "goToTabViewController", sender: self)
            }
        }
    }
    
}

