# Part-DB-Smart-Shelf-Light
A browser automation project that connects a Part-DB inventory system with physical LED indicators via Node-RED, creating an interactive "smart shelf" system that visually guides users to component locations.

## 🎯 Project Overview
This project solves a common workshop problem: quickly finding physical components in storage shelves. When you view a part in your Part-DB web interface, the system automatically sends its storage location to Node-RED, which can then control LED lights or other indicators to visually highlight the correct shelf.

Core Concept: Browser extension → Node-RED → Physical indicators

### Start with the documentation
1. Install the [docker-compose](docker-compose.yml)
2. Follow the  [csp-modification-guide](/documentation/csp-modification-guide.md)
3. Follow the  [node-red-flow-guide](/documentation/node-red-flow-guide.md)
4. Follow the  [esp-setup-guide](/documentation/esp-setup-guide.md)

### 📁 Project Structure
```
partdb-smart-shelf/
├── userscripts/
│   ├── partdb-location-finder.js  # Main Tampermonkey script
├── node-red-flows/
│   └── partdb-shelf-flow.json     # Node-RED flow import
├── docker-compose.yml             # Part-DB & Node-RED setup
├── documentation/
│   ├── csp-modification-guide.md  # Detailed CSP change steps
│   └── node-red-flow-guide.md
│   └── esp-setup-guide.md
```
