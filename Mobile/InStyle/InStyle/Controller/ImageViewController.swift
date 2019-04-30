//
//  ImageViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/21/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import Firebase
import SVProgressHUD

class ImageViewController: UIViewController {

    var imageUrl: String?
    
    @IBOutlet var capturedImageOutput: UIImageView!
    
    var image: UIImage?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        capturedImageOutput.image = image!
    }
    
    
    @IBAction func continueTapped(_ sender: Any) {
        SVProgressHUD.show()
        guard let image = image,
            let data = image.jpegData(compressionQuality: 1.0) else {
            print("Something went wrong converting UIImage to data")
            return
        }
        
        let imageName = UUID().uuidString
        let storageRef = Storage.storage().reference()
        
        let imageRef = storageRef.child("ios/images/\(imageName).jpeg")
        
        imageRef.putData(data, metadata: nil) {
            (metadata, error) in
            if let error = error {
                print(error)
                return
            }
            
            
            imageRef.downloadURL(completion: {
                (url, error) in
                
                if let error = error {
                    print(error)
                    return
                }
                
                guard let downloadUrl = url else {
                    print("Something went wrong getting imageUrl")
                    return
                }
                
                self.imageUrl = downloadUrl.absoluteString
                
                SVProgressHUD.dismiss()
                
                self.performSegue(withIdentifier: "addPostDetails", sender: self)
            })
        }
        
    }
    

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "addPostDetails" {
            let addPostDetailsVC = segue.destination as! PostDetails1ViewController
            addPostDetailsVC.imageUrl = imageUrl
        }
    }
    
}
