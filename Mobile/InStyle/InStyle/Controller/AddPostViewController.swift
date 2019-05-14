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
            
            // Get an instance of ACCapturePhotoOutput class
            imageOutput = AVCapturePhotoOutput()
            imageOutput?.isHighResolutionCaptureEnabled = true
            
            // Set the output on the capture session
            captureSession.addOutput(imageOutput!)
            
            //setup preview layer
            cameraPreviewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
            cameraPreviewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
            cameraPreviewLayer?.frame = view.layer.bounds
            view.layer.addSublayer(cameraPreviewLayer!)
            view.bringSubviewToFront(shutterButton)

            //start video capture
            captureSession.startRunning()
            
        } catch {
            print(error.localizedDescription)
        }
        
        
    }
    
    
    

    @IBAction func shutterTapped(_ sender: Any) {
        
        //make sure imageOutput is valid
        guard let imageOutput = self.imageOutput else { return }
        
        //Get a instance of AVCapturePhotoSettings class
        let photoSettings = AVCapturePhotoSettings()
        
        //Setup photo settings
        photoSettings.isAutoStillImageStabilizationEnabled = true
        photoSettings.isHighResolutionPhotoEnabled = true
        photoSettings.flashMode = .off
        
        // Call capturePhoto method by passing our photo settings
        //and a delegate implementing AVCapturePhotoCaptureDelegate
        imageOutput.capturePhoto(with: photoSettings, delegate: self)
 
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showPhoto" {
            let imageVC = segue.destination as! ImageViewController
            imageVC.image = stillImage
            
        }
    }
    
}


extension AddPostViewController : AVCapturePhotoCaptureDelegate {
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        
        // Check if there is any error in capturing
        guard error == nil else {
            print("Fail to capture photo: \(String(describing: error))")
            return
        }
        
        // Check if the pixel buffer could be converted to image data
        guard let imageData = photo.fileDataRepresentation() else {
            print("Fail to convert pixel buffer")
            return
        }
        
        // Check if UIImage could be initialized with image data
        guard let capturedImage = UIImage.init(data: imageData , scale: 1.0) else {
            print("Fail to convert image data to UIImage")
            return
        }
        
        stillImage = capturedImage
        
        //UIImageWriteToSavedPhotosAlbum(capturedImage, nil, nil, nil)
        
        // Stop video capturing session (Freeze preview)
        //captureSession.stopRunning()
        
        performSegue(withIdentifier: "showPhoto", sender: self)
    }
    
    
}








