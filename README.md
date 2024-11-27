# MEO Node

MEO Node project is a collection of nodes created in NodeRED that can interact with devices connected to NodeRED with MEO-FDK. MEO Node also includes nodes that can control smart production devices base on Rogo IoT Platform through MEO Link IoT. This project aims to help students (from grade 6-12) and beginners to create their own IoT project & Automation flow with ease. 

## Installation

Before installing MEO Node, you need to download and install NodeRED. You can download NodeRED from the official website [here](https://nodered.org/).
After installing NodeRED, you can download and install MEO Node by using `npm install` command in your NodeRED directory.

```bash
cd ~/.node-red # change directory to NodeRED directory
npm install path/to/node-red-contrib-meo
```

## Usage 

After installing MEO Node, you can use it in NodeRED. You can find MEO Node in the palette on the left side of the screen. You can drag and drop MEO Node to the flow and connect it with other nodes to create your own IoT project.

## Roadmap

- [x] Create meo-in node that can interact with devices that use MEO FDK through MQTT. (currently support DIY devices like ThingBot or ESP32)
- [x] Create meo-link node that can interact with smart production devices that use Rogo IoT Platform through MEO Link IoT.
- [ ] Restructuring user experience suitable for students and beginners
- [ ] Add more tutorials and examples for beginners, students, and teachers

## Technical Details

MEO Node is created using NodeRED and JavaScript. MEO Node uses MQTT protocol to interact with devices that use MEO FDK. MEO Link node communicates with MEO Link IoT Application by UDP to interact with smart production devices that use Rogo IoT Platform.

Note: MEO Link IoT is a desktop application written in Kotlin, using Rogo SDK to interact with Rogo IoT Platform. MEO Link IoT is currently in development and will be released soon.