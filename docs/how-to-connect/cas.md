---
title: CAS
---
## Using Casdoor as CAS server

Casdoor now can be used as CAS server. Up to now the casdoor have supported the feature of CAS2.0 .

*Considering that the concept of 'application' and 'organization' simply does not exist, so all CAS users are included in a special application called "app-built-in-cas" which belong to 'built-in' organization*.

The prefix of CAS url in Casdoor is `<url of casdoor>/cas`,which means:
- url of /login handler is /cas/login
- url of /logout handler is /cas/logout
- url of /proxyValidate is /cas/proxyValidate
- url of /serviceValidate is /cas/serviceValidate
- url of /proxy is /cas/proxy

See <https://apereo.github.io/cas/6.0.x/protocol/CAS-Protocol-Specification.html> for more information about CAS and its different versions, as well as parameters for these handlers.