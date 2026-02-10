# 🔧 The Problem & Solution Journey
Initial Challenge: Content Security Policy (CSP) Blockage
Part-DB's default CSP prevented my Tampermonkey userscript from sending data directly to Node-RED (localhost:1880), throwing the error:
"Content Security Policy directive: 'default-src 'self'"

Solutions Explored & Implemented:
## 1. Direct CSP Modification (Chosen path)
### Importend make the change as user "www-data" not as root  if not you get nasty errors

Locate the NelmioSecurityBundle configuration in Part-DB: /html/config/packages/nelmio_security.yaml

Added connect-src: 


```
            connect-src:
                - "'self'"           # Allow (Part-DB)
                - "http://localhost:1880" # Allow Node-RED Server
```
before 
```
            default-src:
                - 'self'
```
## Clear Symfony cache
php bin/console cache:clear

## Exit and restart container
```
exit
docker restart partdb
```
