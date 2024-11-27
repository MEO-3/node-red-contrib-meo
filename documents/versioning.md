# Versioning log for MEO Node project

## 1.0.0 - Initial version

(What) In this version, we introduced meo-in and meo-out nodes that can interact with devices that use MEO FDK and/or able to send MQTT message. This version use for interacting with DIY devices like ThingBot or ESP32, enabling students or starter to create their own IoT project.

(Why) This version is the first version of MEO Node project, which create a basic interaction between NodeRED and DIY devices. It is a good start for students or starter to learn about IoT and create their own IoT project. Moreover, it is a good start for us to getting started with the project.

(How) We created meo-in and meo-out nodes that can interact with devices that use MEO FDK and/or able to send MQTT message. We also created a simple example to show how to use these nodes to interact with DIY devices through a MQTT Broker.

## 1.1.0 - MEO Link Node (Released)

(What) Version 1.1.0 introduces MEO Link node - a node that allow user to control smart device on Rogo IoT Platform

(Why) The new feature aims to provide student and starter a new way to interact with smart devices on Rogo IoT Platform, inspiring them by allowing DIY and smart devices can work together.

(How) MEO Link node communicate with MEO Link IoT application through User Diagram Protocol (UDP), and MEO Link IoT application will control smart device by using RogoSDK written in Java

## 1.2.0 - MEO Node enhancement (On development)

(What) Version 1.2.0 aims for creating better user experiences for students and beginners, and adding more tutorials and examples for them.

(Why) MEO node in early version is not user-friendly, especially for students and beginners, which require a lot of technical knowledge to config and deploy. Therefore, we design and develop a better user experience for them, based on their feedback and our observation. Moreover, we also want to provide more tutorials and examples for them to learn and create their own IoT project.

(How) By getting feedbacks & refer to some education-based NodeRED nodes project, we will release a Software Design Document (SDD) that describe the new user experience and features that we will add to MEO Node.