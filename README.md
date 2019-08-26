# ns-pdf-export
Nativescript Angular example with jsPdf

# Description
Generate a pdf from device that includes text and images.
This has not been tested on iOS.

# Running this example
Clone the repo

run npm i

run on an Android device/emulator

# Requesting Write Permission
In order to write to the device file system we installed the nativescript-permissions package. This was imported into the app.component and the request for permissions is in the ngOnInit(). Note that permissions must be manually accepted by the user via the package dialog on Android SDK API Level > 23.

Plugin docs: https://market.nativescript.org/plugins/nativescript-permissions

# Creating the PDF
We could not get the jsPDF package to work with {N} 6 at the latest version. Check the package.json and you'll see that we are using version 1.3.5 and @types/jspdf version 1.3.1
The createPdf() method in the home.component is where the magic happens and has comments throughout to explain what's happening. Note we are processing and adding an image from a file stored within the app.

Plugin docs: https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
