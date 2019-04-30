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
import SVProgressHUD

class LoginViewController: UIViewController {
    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
     
    }
    
    @IBAction func loginPressed(_ sender: Any) {
        SVProgressHUD.show()
        
        Auth.auth().signIn(withEmail: emailTextField.text!, password: passwordTextField.text!) {
            (AuthDataResult, Error) in
            if Error != nil {
                print(Error!)
                SVProgressHUD.dismiss()
                let alert = UIAlertController(title: "Error", message: "Incorrect Email or Password", preferredStyle: .alert)
                let action = UIAlertAction(title: "Ok", style: .cancel) { (action:UIAlertAction) in
                    print("You've pressed ok")
                }
                alert.addAction(action)
                self.present(alert, animated: true, completion: nil)
            }
            else {
                print("Logged in successfully")
                SVProgressHUD.dismiss()
                self.performSegue(withIdentifier: "goToTabViewController", sender: self)
            }
        }
    }
    
}

