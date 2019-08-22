import { Component, OnInit } from "@angular/core";
import * as fs from 'tns-core-modules/file-system';
import {ImageSource} from 'tns-core-modules/image-source';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';


global['window'] = {
 'document': {
 'createElementNS': () => { return {} }
}
};
global['document'] = {
 'createElement': (str) => { return {} }
};
global['navigator'] = {};
// import * as jsPDF from 'jspdf';
// var base64 = require('base-64');
var base64 = require('base-64');
var jsPDF = require('../../../node_modules/jspdf');
global['btoa'] = (str) => {
 return base64.encode(str);
};
global['atob'] = (bytes) => {
 return base64.decode(bytes);
};
global['u8'] = {};

declare var android;

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class HomeComponent implements OnInit {
    exportPath: fs.Folder;

    constructor() {
        
    }

    ngOnInit(): void {
        // let externPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        // console.log(`external path: ${externPath}`);
        // let customFolderPath = fs.path.join(externPath, "pdf-export");
        // console.log(`customer folder: ${customFolderPath}`);
        // this.exportPath = fs.Folder.fromPath(customFolderPath);
        // console.log(`export path: ${this.exportPath}`);
        let documentsFolder = fs.knownFolders.documents();
        let path = fs.path.join(documentsFolder.path, 'pdfExport');
        this.exportPath = fs.Folder.fromPath(path);
    }

    public async createPdf() {
        try {
            let doc;
            // Letter Demensions in mm is 216 x 279
            doc = new jsPDF("portrait", "mm", "letter");

            doc.setFontSize(14);

            doc.text('Hello World!', 10, 10);

            // add an image from the app file system
            const imgSrc = new ImageSource();

            const imageAsset = new ImageAsset('https://images.pexels.com/photos/2440080/pexels-photo-2440080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
            // const imageAsset = new ImageAsset('../../assets/image.jpeg');
            imgSrc.fromAsset(imageAsset);
            let imgString = await imgSrc.toBase64String('jpeg');
            imgString = 'data:image/jpeg;base64,' + imgString;

            doc.addImage(imgString,'JPEG', 10, 20, 30, 30, null, 'FAST');

            let fileData = doc.output('datauristring');

            const file: fs.File = <fs.File>this.exportPath.getFile("pdf-export.pdf");
            // Cut out the data piece .. remove 'data:...;base64,'
            const tempData = fileData.split(",")[1];
            // decode the base64 piece
            let data = android.util.Base64.decode(tempData, android.util.Base64.DEFAULT);
            // write to the file
            file.writeSync(data);
            alert('File written');
            // let myPath = fs.path.join(this.exportPath.path, 'pdf-export.pdf');

        } catch (e) {
            console.log(`Unable to create pdf. Error: ${e.message}`);
        }
    }
}
