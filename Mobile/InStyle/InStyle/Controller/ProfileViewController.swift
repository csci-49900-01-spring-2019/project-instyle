//
//  ProfileViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/9/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import Firebase

class ProfileViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

  
    @IBAction func logoutPressed(_ sender: Any) {
        do {
            try Auth.auth().signOut()
            dismiss(animated: true, completion: nil)
        }
        catch {
            print("Error signing out")
        }
    }
    
}
