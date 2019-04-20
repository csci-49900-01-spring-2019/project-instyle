//
//  AddPostViewController.swift
//  InStyle
//
//  Created by Super MattMatt on 4/19/19.
//  Copyright © 2019 InStyle. All rights reserved.
//

import UIKit
import AVFoundation

class AddPostViewController: UIViewController {
    
    var captureSession = AVCaptureSession()
    
    
    var cameraPreviewLayer: AVCaptureVideoPreviewLayer?
    
    //output device
    var imageOutput: AVCapturePhotoOutput?
    var stillImage: UIImage?
    
    
    //camera inputs
    var backCamera: AVCaptureDevice?
    var frontCamera: AVCaptureDevice?
    var captureDevice: AVCaptureDevice?
    
    
    @IBOutlet var shutterButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        prepareCamera()
        

    }
    
    
    func prepareCamera() {
        
        //Specifies capture settings suitable for high-resolution photo quality output.
        captureSession.sessionPreset = AVCaptureSession.Preset.photo
        
        //find all available devices
        let availableDevices = AVCaptureDevice.DiscoverySession(deviceTypes: [.builtInWideAngleCamera], mediaType: .video, position: .back).devices
        
        //default device
        captureDevice = availableDevices.first
        
        beginSession()
        
        
       
    }
    
    
    func beginSession() {
        
        
        do {
           let captureDeviceInput = try AVCaptureDeviceInput(device: captureDevice!)
           captureSession.addInput(captureDeviceInput)
            
            //setup preview layer
            cameraPreviewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
            cameraPreviewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
            cameraPreviewLayer?.frame = view.layer.bounds
            view.layer.addSublayer(cameraPreviewLayer!)
            view.bringSubviewToFront(shutterButton)
            captureSession.startRunning()
            
        } catch {
            print(error.localizedDescription)
        }
        
        
    }
    
    
    

    @IBAction func shutterTapped(_ sender: Any) {
    }
    
}










