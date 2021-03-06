# DASH7 Python Support
A collection of Python modules, supporting the DASH7 Alliance Protocol in general,
and [OSS-7](https://github.com/MOSAIC-LoPoW/dash7-ap-open-source-stack) in particular.

## Introduction

This repository contains a collection of Python modules that can help when working with the Dash7 Alliance Wireless Sensor and Actuator Network Protocol.

## Installation

We are currently targeting python v2.7.
Use the following commands to get started:

```bash
$ git clone https://github.com/MOSAIC-LoPoW/pyd7a.git
$ cd pyd7a
$ sudo pip install -r requirements.txt
```

You can verify that the installation succeeded by running the unit tests:
```bash
$ make test
*** running all tests
.................................................................................................................................
----------------------------------------------------------------------
Ran 129 tests in 1.064s

OK
```
If all tests ran without any errors, you're good to go.

## Modules

### ALP Parser

A parser/generator for Application Layer Protocol commands. From the specification:

"_ALP is the D7A Data Elements API. It is a generic API, optimized for usage with the D7A Session Protocol. It can be encapsulated in any other communication protocol. ALP defines a standard method to manage the Data Elements by the Application.
Any application action, data exchange method or protocol is mapped into manipulation of D7A Data Elements and their properties by means of ALP Commands._"

### DLL Parser

A parser for D7AP frames as transmitted over the air.

### OSS-7 Serial console interface parser

A parser for frames used by the serial console interface by OSS-7 nodes

### OSS-7 Modem interface

Allows to use a serial connected OSS-7 node as a modem. By sending ALP commands you can access the node's filesystem, or use the node's DASH7 interface to access the filesystem of nodes in the network.
