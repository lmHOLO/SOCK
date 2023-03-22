import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState } from 'react'
import {storage} from '@/firebase'
export default function FirebaseUploadTest() {
    const [imageFile, setImageFile] = useState<File>()
    const [downloadURL, setDownloadURL] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [progressUpload, setProgressUpload] = useState(0)
  
    const handleSelectedFile = (files: any) => {
        if (files && files[0].size < 10000000) {
            setImageFile(files[0])
            console.log(files[0])} 
        else {
            console.error('File size to large')
        }
    }
  
    const handleUploadFile = () => {
        if (imageFile) {
            const name = imageFile.name
            const storageRef = ref(storage, `image/${name}`)
            const uploadTask = uploadBytesResumable(storageRef, imageFile)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgressUpload(progress) // to show progress upload
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break;
                        case 'running':
                            console.log('Upload is running')
                            break;
                    }
                },
                (error) => {
                    console.error(error.message)
                },
                () => 
                {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDownloadURL(url);
                        var now= new Date();
                        var File_id = name + " + " +now; 
                        console.log("storage에 파일 업로드 성공 url: ",url);
                        console.log("File_id: ",File_id);
                        console.log("File_Title: ",name);
                        console.log("Create_Date: ", now);
                    });
                }
            )
        }
        else {
            console.error('File not found')
        }
    }
  
    const handleRemoveFile = () => setImageFile(undefined)
  
    return (
        <div className="container mt-5">
        <div className="col-lg-8 offset-lg-2">
            <input
            type="file"
            placeholder="Select file to upload"
            accept="image/png"
            onChange={(files) => handleSelectedFile(files.target.files)}
            />
            </div>
            <div>
                <button onClick={handleUploadFile}>Upload 버튼 눌러</button>
            </div>
        </div>
    )
}